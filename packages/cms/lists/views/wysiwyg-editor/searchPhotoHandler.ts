import type { ImageFromDbConfig } from '@twreporter/lexical-editor/core'

type PhotoSearchResponse = {
  data?: {
    photos?: Array<{
      id: string
      name: string | null
      resized: {
        original: string | null
      } | null
    }>
    photosCount?: number
  }
  errors?: Array<{
    message?: string
  }>
}

const imageSizes = [400, 800, 1200, 2000] as const

export const searchPhotoHandler: ImageFromDbConfig['search'] = async ({
  keyword,
  page,
  pageSize,
  signal,
}) => {
  const where = keyword ? { name: { contains: keyword } } : {}
  const query = `
    query SearchPhotos($where: PhotoWhereInput!, $take: Int, $skip: Int!) {
      photos(
        where: $where,
        orderBy: [{ createdAt: desc }],
        take: $take,
        skip: $skip
      ) {
        id
        name
        resized {
          original
        }
      }
      photosCount(where: $where)
    }
  `

  const response = await fetch('/api/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      query,
      variables: {
        where,
        take: pageSize,
        skip: (page - 1) * pageSize,
      },
    }),
    signal,
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`HTTP ${response.status}: ${errorText}`)
  }

  const data = (await response.json()) as PhotoSearchResponse
  if (data.errors?.length) {
    const errorMessage = data.errors
      .map((error) => error.message || 'Unknown GraphQL error')
      .join('; ')
    throw new Error(`GraphQL error: ${errorMessage}`)
  }

  return {
    items: (data.data?.photos ?? [])
      .map((photo) => ({
        id: photo.id,
        title: photo.name ?? '',
        url: photo.resized?.original ?? '',
      }))
      .filter((photo) => photo.url),
    total: data.data?.photosCount ?? 0,
  }
}

export function getDbImageSrcSet(url: string): string {
  const baseOrigin =
    typeof window === 'undefined' ? 'http://localhost' : window.location.origin
  const parsedUrl = new URL(url, baseOrigin)
  const filenameWithExtension = parsedUrl.pathname.split('/').pop()

  if (!filenameWithExtension) {
    return ''
  }

  const filename = filenameWithExtension.replace(/\.[^.]+$/, '')
  const origin = parsedUrl.origin === baseOrigin ? '' : parsedUrl.origin

  return imageSizes
    .map((size) => `${origin}/resized-images/${filename}-${size}.webp ${size}w`)
    .join(', ')
}

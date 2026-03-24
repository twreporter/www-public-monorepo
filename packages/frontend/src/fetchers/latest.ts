import useSWR, { type SWRConfiguration } from 'swr'
// type
import type { ArticleMeta } from '@/types/article'
import type { PostMetaFromRes } from '@/fetchers/type'
// utils
import { latestPostsKey } from '@/fetchers/key'
import getPostMeta from '@/utils/get-post-meta'

export type FetchLatestPostsParams = {
  tagSlug: string | null
  take: number
  skip: number
}

const fetchLatestPosts = async (
  key: readonly [
    string,
    'LatestPosts',
    { tagSlug: string | null; take: number; skip: number },
  ]
): Promise<ArticleMeta[]> => {
  const [, , params] = key
  const { tagSlug, take, skip } = params

  const url = process.env.NEXT_PUBLIC_API_URL as string
  const query = `
    query LatestPosts($where: PostWhereInput!, $take: Int, $skip: Int!, $orderBy: [PostOrderByInput!]!) {
      posts(where: $where, take: $take, skip: $skip, orderBy: $orderBy) {
        slug
        title
        subtitle
        style
        publishedDate
        ogImage {
          imageFile {
            url
          }
          name
        }
        tags {
          name
          slug
        }
        subcategories {
          category {
            name
          }
        }
      }
    }
  `

  type WhereInput = {
    state: { equals: string }
    tags?: { some: { slug: { equals: string } } }
  }

  const where: WhereInput = {
    state: { equals: 'published' },
  }

  if (tagSlug) {
    where.tags = { some: { slug: { equals: tagSlug } } }
  }

  const variables = {
    where,
    take,
    skip,
    orderBy: [{ publishedDate: 'desc' }],
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  if (!res.ok) throw new Error('Failed to fetch latest posts')

  const data = await res.json()
  const posts: PostMetaFromRes[] | undefined = data?.data?.posts

  if (!posts) {
    throw new Error('No posts data returned')
  }

  return posts.map(getPostMeta())
}

const useLatestPosts = (
  params: FetchLatestPostsParams,
  options?: SWRConfiguration<ArticleMeta[]>
) => {
  const key = latestPostsKey(params)
  const { data, isLoading, error } = useSWR<ArticleMeta[]>(
    key,
    fetchLatestPosts,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      ...options,
    }
  )

  return {
    posts: data,
    isLoading,
    error,
  }
}

export default useLatestPosts

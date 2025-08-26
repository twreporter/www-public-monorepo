import type { FetchBySlugParams } from '@/fetchers/type'

export const tagPostsKey = (params: FetchBySlugParams) =>
  [
    '/api/graphql',
    'TagPosts',
    { slug: params.slug, take: params.take, skip: params.skip },
  ] as const

export const categoryPostsKey = (
  params: FetchBySlugParams & { subcategorySlug?: string }
) =>
  [
    '/api/graphql',
    'CategoryPosts',
    {
      slug: params.slug,
      subcategorySlug: params.subcategorySlug,
      take: params.take,
      skip: params.skip,
    },
  ] as const

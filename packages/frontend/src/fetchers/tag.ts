import useSWR, { type SWRConfiguration } from 'swr'
// type
import type { ArticleMeta } from '@/type/article'
import type { PostMetaFromRes } from '@/fetchers/type'
// utils
import { tagPostsKey } from '@/fetchers/key'
import getPostMeta from '@/utils/get-post-meta'

type TagDataFromRes = {
  slug: string
  posts: PostMetaFromRes[]
}

export type FetchPostsOfATagParams = {
  slug: string
  take: number
  skip: number
}

const fetchPostsOfATag = async (
  key: readonly [
    string,
    'TagPosts',
    { slug: string; take: number; skip: number },
  ]
): Promise<ArticleMeta[]> => {
  const [, , params] = key
  const { slug, take, skip } = params

  const url = process.env.NEXT_PUBLIC_API_URL as string
  const query = `
    query Query($where: TagWhereUniqueInput!, $take: Int, $skip: Int!, $orderBy: [PostOrderByInput!]!, $postsWhere2: PostWhereInput!) {
      tag(where: $where) {
        slug
        posts(take: $take, skip: $skip, orderBy: $orderBy, where: $postsWhere2) {
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
    }
  `

  const variables = {
    where: {
      slug,
    },
    take,
    skip,
    orderBy: [
      {
        publishedDate: 'desc',
      },
    ],
    postsWhere2: {
      state: {
        equals: 'published',
      },
    },
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

  if (!res.ok) throw new Error(`Failed to fetch tag, slug: ${slug}`)

  const data = await res.json()
  const tag: TagDataFromRes | undefined = data?.data?.tag
  if (!tag) {
    throw 'not found'
  }

  return tag.posts.map(getPostMeta)
}

const usePostsOfATag = (
  params: FetchPostsOfATagParams,
  options?: SWRConfiguration<ArticleMeta[]>
) => {
  const key = params ? tagPostsKey(params) : null
  const { data, isLoading, error } = useSWR<ArticleMeta[]>(
    key,
    fetchPostsOfATag,
    {
      keepPreviousData: true,
      revalidateOnFocus: false,
      ...options,
    }
  )

  return {
    posts: data ?? [],
    isLoading,
    error,
  }
}

export default usePostsOfATag

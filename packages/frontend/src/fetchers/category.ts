import useSWR, { type SWRConfiguration } from 'swr'
// type
import type { ArticleMeta } from '@/type/article'
import type { PostMetaFromRes } from '@/fetchers/type'
// utils
import getPostMeta from '@/utils/get-post-meta'
import { categoryPostsKey } from '@/fetchers/key'

type CategoryDataFromRes = {
  posts: PostMetaFromRes[]
}

type FetchCategoryParams = {
  slug: string
  subcategorySlug?: string
  take: number
  skip: number
}

export const fetchPostsOfACategorySet = async (
  key: readonly [
    string,
    'CategoryPosts',
    { slug: string; subcategorySlug?: string; take: number; skip: number },
  ]
): Promise<ArticleMeta[]> => {
  const [, , params] = key
  const { slug, subcategorySlug, take, skip } = params

  const url = process.env.NEXT_PUBLIC_API_URL as string
  const query = `
    query Category($where: CategoryWhereUniqueInput!, $postsWhere2: PostWhereInput!, $take: Int, $skip: Int!) {
      category(where: $where) {
        posts(where: $postsWhere2, take: $take, skip: $skip) {
          slug
          title
          style
          publishedDate
          ogImage {
            imageFile {
              url
            }
            name
          }
          subtitle
          tags {
            name
            slug
          }
        }
      }
    }
  `

  type Variable = {
    where: {
      slug: string
    }
    take: number
    skip: number
    orderBy: {
      publishedDate: 'desc' | 'asc'
    }[]
    postsWhere2: {
      state: {
        equals: string
      }
      subcategories?: {
        some: {
          slug: {
            equals: string
          }
        }
      }
    }
  }
  const variables: Variable = {
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
  if (subcategorySlug) {
    variables.postsWhere2.subcategories = {
      some: {
        slug: {
          equals: subcategorySlug,
        },
      },
    }
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

  if (!res.ok)
    throw new Error(
      `Failed to fetch category, slug: ${slug}, subcategory slug: ${subcategorySlug}`
    )

  const data = await res.json()

  const category: CategoryDataFromRes | undefined = data?.data?.category
  if (!category) {
    throw 'not found'
  }

  return category.posts.map(getPostMeta())
}

const usePostsOfACategorySet = (
  params: FetchCategoryParams,
  options?: SWRConfiguration<ArticleMeta[]>
) => {
  const key = params ? categoryPostsKey(params) : null
  const { data, isLoading, error } = useSWR<ArticleMeta[]>(
    key,
    fetchPostsOfACategorySet,
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

export default usePostsOfACategorySet

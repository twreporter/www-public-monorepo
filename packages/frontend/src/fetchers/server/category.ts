import { keystoneFetch } from '@/app/api/graphql/keystone'
// type
import type { ArticleMeta } from '@/type/article'
import type { PostMetaFromRes } from '@/fetchers/type'
import type { Category, Subcategory } from '@/type/category'
// constants
import { POSTS_PER_PAGE } from '@/constants'
// utils
import getPostMeta from '@/utils/get-post-meta'
// lodash
import { get } from 'lodash'
const _ = {
  get,
}

type CategoryDataFromRes = {
  name: string
  slug: string
  postsCount: number
  posts: PostMetaFromRes[]
  subcategories: Subcategory[]
}

type CategoryData = Category & {
  postsCount: number
  posts: ArticleMeta[]
}

type FetchCategoryParams = {
  slug: string
  subcategorySlug?: string
}

export const fetchCategoryWithFirstPagePost = async ({
  slug,
  subcategorySlug,
}: FetchCategoryParams): Promise<CategoryData> => {
  const query = `
    query Category($where: CategoryWhereUniqueInput!, $postsWhere2: PostWhereInput!, $take: Int, $skip: Int!) {
      category(where: $where) {
        name
        slug
        postsCount
        subcategories {
          name
          slug
          sortOrder
        }
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
    take: POSTS_PER_PAGE,
    skip: 0,
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

  try {
    const data = await keystoneFetch<{ category: CategoryDataFromRes }>(
      JSON.stringify({ query, variables }),
      false
    )

    const category: CategoryDataFromRes | undefined = data?.data?.category
    if (!category) {
      throw 'not found'
    }

    return {
      name: category.name,
      slug: category.slug,
      postsCount: category.postsCount,
      posts: category.posts.map(getPostMeta()),
      subcategories: category.subcategories,
    }
  } catch (err) {
    throw new Error(`Failed to fetch category data, slug: ${slug}, err: ${err}`)
  }
}

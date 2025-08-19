import { keystoneFetch } from '@/app/api/graphql/keystone'
// type
import type { ArticleMeta } from '@/type/article'
import type { PostMetaFromRes } from '@/fetchers/type'
// utils
import { getImageLink } from '@/utils/get-image-link'
// lodash
import { get } from 'lodash'
const _ = {
  get,
}

type TagDataFromRes = {
  slug: string
  name: string
  postsCount: number
  posts: PostMetaFromRes[]
}

type TagData = {
  slug: string
  name: string
  postsCount: number
  posts: ArticleMeta[]
}

type FetchTagParams = {
  slug: string
}

export const fetchTagWithFirstPagePost = async ({
  slug,
}: FetchTagParams): Promise<TagData> => {
  const query = `
    query Query($where: TagWhereUniqueInput!, $take: Int, $skip: Int!, $orderBy: [PostOrderByInput!]!, $postsWhere2: PostWhereInput!) {
      tag(where: $where) {
        slug
        name
        postsCount
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
    take: 1,
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
    }
  }

  try {
    const data = await keystoneFetch<{ tag: TagDataFromRes }>(
      JSON.stringify({ query, variables }),
      false
    )

    const tag: TagDataFromRes | undefined = data?.data?.tag
    if (!tag) {
      throw 'not found'
    }

    return {
      name: tag.name,
      slug: tag.slug,
      postsCount: tag.postsCount,
      posts: tag.posts.map(({ ogImage, subcategories, tags, ...rest }) => ({
        image: ogImage ? { src: getImageLink(ogImage), alt: ogImage.name } : undefined,
        category: _.get(subcategories, '[0].category.name', ''),
        tags: tags.map(({ slug, ...rest}) => ({
          slug,
          selected: slug === tag.slug,
          ...rest
        })),
        ...rest
      }))
    }
  } catch (err) {
    throw new Error(`Failed to fetch tag data, slug: ${slug}, err: ${err}`)
  }
}

import { keystoneFetch } from '@/app/api/graphql/keystone'

export type TopicData = {
  slug: string
  title: string
  updatedAt: Date
  ogDescription: string
  heroImage: {
    imageFile: {
      url: string
    }
  }
  posts: {
    slug: string
    title: string
    heroImage: {
      imageFile: {
        url: string
      }
    }
  }[]
}

// TODO: need to add pagination support
export const fetchTopics = async (): Promise<TopicData[]> => {
  const query = `
    query Topics($where: TopicWhereInput!, $orderBy: [TopicOrderByInput!]!) {
      topics(where: $where, orderBy: $orderBy) {
        slug
        title
        updatedAt
        ogDescription
        heroImage {
          imageFile {
            url
          }
        }
        posts {
          slug
          title
          heroImage {
            imageFile {
              url
            }
          }
        }
      }
    }
  `

  const variables = {
    where: {
      state: {
        equals: 'published',
      },
    },
    orderBy: [
      {
        updatedAt: 'desc',
      },
    ],
  }

  try {
    const data = await keystoneFetch<{ topics: TopicData[] }>(
      JSON.stringify({ query, variables }),
      false
    )
    return data?.data?.topics || []
  } catch (err) {
    throw new Error(`Failed to fetch topics data, err: ${err}`)
  }
}

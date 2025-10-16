import { keystoneFetch } from '@/app/api/graphql/keystone'
import { TOPICS_PER_PAGE } from '@/constants'
import type { TopicData } from '@/type/topic'

export const fetchTopics = async (page: number = 1): Promise<TopicData[]> => {
  const query = `
    query Topics($where: TopicWhereInput!, $orderBy: [TopicOrderByInput!]!, $take: Int, $skip: Int!) {
      topics(where: $where, orderBy: $orderBy, take: $take, skip: $skip) {
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

  const skip = (page - 1) * TOPICS_PER_PAGE

  const variables = {
    where: {
      state: {
        equals: 'published',
      },
    },
    take: TOPICS_PER_PAGE,
    skip,
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

export const fetchTopicsCount = async (): Promise<number> => {
  const query = `
    query TopicsCount($where: TopicWhereInput!) {
      topicsCount(where: $where)
    }
  `

  const variables = {
    where: {
      state: {
        equals: 'published',
      },
    },
  }

  try {
    const data = await keystoneFetch<{ topicsCount: number }>(
      JSON.stringify({ query, variables }),
      false
    )
    return data?.data?.topicsCount || 0
  } catch (err) {
    throw new Error(`Failed to fetch topics count, err: ${err}`)
  }
}

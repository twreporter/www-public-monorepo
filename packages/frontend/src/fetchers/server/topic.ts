import { keystoneFetch } from '@/app/api/graphql/keystone'
import { TOPICS_PER_PAGE } from '@/constants'
import type { TopicData } from '@/type/topic'

type FetchTopicsData = {
  topics: TopicData[]
  topicsCount: number
}

export const fetchTopics = async (
  page: number = 1
): Promise<FetchTopicsData> => {
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
      topicsCount(where: $where)
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
    const data = await keystoneFetch<{
      topics: TopicData[]
      topicsCount: number
    }>(JSON.stringify({ query, variables }), false)
    return {
      topics: data?.data?.topics || [],
      topicsCount: data?.data?.topicsCount ?? 0,
    }
  } catch (err) {
    throw new Error(`Failed to fetch topics data, err: ${err}`)
  }
}

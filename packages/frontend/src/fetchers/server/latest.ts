import { keystoneFetch } from '@/app/api/graphql/keystone'

export type LatestTab = {
  slug: string
  name: string
}

type LatestFromRes = {
  id: string
  tag: {
    slug: string
    name: string
  }
  order: number
}

export const fetchLatestTabs = async (): Promise<LatestTab[]> => {
  const query = `
    query Latests($orderBy: [LatestOrderByInput!]!) {
      latests(orderBy: $orderBy) {
        id
        tag {
          slug
          name
        }
        order
      }
    }
  `

  const variables = {
    orderBy: [{ order: 'asc' }],
  }

  try {
    const data = await keystoneFetch<{ latests: LatestFromRes[] }>(
      JSON.stringify({ query, variables }),
      false
    )

    const latests = data?.data?.latests
    if (!latests) return []

    return latests
      .filter((l) => l.tag)
      .map((l) => ({
        slug: l.tag.slug,
        name: l.tag.name,
      }))
  } catch (err) {
    throw new Error(`Failed to fetch latest tabs, err: ${err}`)
  }
}

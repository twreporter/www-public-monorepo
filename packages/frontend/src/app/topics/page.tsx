export const dynamic = 'force-dynamic'

// components
import { Topics } from '@/components/topics'
// fetchers
import { fetchTopics } from '@/fetchers/server/topic'
// logger
import logger from '@/utils/logger'

export default async function Page() {
  try {
    const topics = await fetchTopics()
    return <Topics topics={topics} />
  } catch (error) {
    logger.error(error, 'Error fetching topic data')
    return <div>Failed to load topic data. Please try again later.</div>
  }
}

// components
import { Topics } from '@/components/topics'
// fetchers
import { fetchTopics } from '@/fetchers/server/topic'
// logger
import { logger } from '@/utils/logger'

export default async function Page() {
  try {
    const topics = await fetchTopics()
    return <Topics topics={topics} />
  } catch (error) {
    logger.error('Error fetching topic data:', error)
    return <div>Failed to load topic data. Please try again later.</div>
  }
}

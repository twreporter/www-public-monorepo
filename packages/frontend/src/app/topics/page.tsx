export const dynamic = 'force-dynamic'

// components
import { Topics } from '@/components/topics'
// fetchers
import { fetchTopics } from '@/fetchers/server/topic'
// logger
import logger from '@/utils/logger'
// constants
import { TOPICS_PER_PAGE } from '@/constants'

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  try {
    const { page } = await searchParams
    let pageNumber = page ? parseInt(page, 10) : 1
    let { topics, topicsCount } = await fetchTopics(pageNumber)
    // If there is only one page in total but the requested page > 1, force page to 1
    // or if the requested page exceeds the total pages, also force page to 1
    if (pageNumber > 1) {
      const totalPages = Math.ceil(topicsCount / TOPICS_PER_PAGE)
      if (totalPages < pageNumber || topicsCount <= TOPICS_PER_PAGE) {
        const res = await fetchTopics(1)
        topics = res.topics
        topicsCount = res.topicsCount
        pageNumber = 1
      }
    }
    return (
      <Topics
        topics={topics}
        topicsCount={topicsCount}
        currentPage={pageNumber}
      />
    )
  } catch (error) {
    logger.error(error, 'Error fetching topic data')
    return <div>Failed to load topic data. Please try again later.</div>
  }
}

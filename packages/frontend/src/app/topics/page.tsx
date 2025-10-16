export const dynamic = 'force-dynamic'

// components
import { Topics } from '@/components/topics'
// fetchers
import { fetchTopics, fetchTopicsCount } from '@/fetchers/server/topic'
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
    const topicsCount = await fetchTopicsCount()
    const totalPages = Math.ceil(topicsCount / TOPICS_PER_PAGE)
    if (totalPages < pageNumber) {
      pageNumber = totalPages
    }
    if (pageNumber < 1) {
      pageNumber = 1
    }
    const topics = await fetchTopics(pageNumber)
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

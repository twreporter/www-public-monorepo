// components
import BrowsingHistory from '@/components/my-reading/browsing-history'
import { fakeBrowsingHistory } from '@/components/my-reading/fake-data'
// constants
import { BROWSING_HISTORY_PER_PAGE } from '@/components/my-reading/constants'
// utils
import { pageParamParser } from '@/utils/page-param-parser'

// TODO: get from api, error handling
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const { page } = await searchParams
  const totalPages = Math.ceil(
    fakeBrowsingHistory.length / BROWSING_HISTORY_PER_PAGE
  )
  const currentPage = pageParamParser(page, totalPages)
  return <BrowsingHistory currentPage={currentPage} />
}

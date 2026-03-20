export const dynamic = 'force-dynamic'

// components
import { Latest } from '@/components/latest'
// fetchers
import { fetchLatestTabs } from '@/fetchers/server/latest'
// logger
import logger from '@/utils/logger'

export default async function Page() {
  try {
    const tabs = await fetchLatestTabs()
    return <Latest tabs={tabs} />
  } catch (error) {
    logger.error(error, 'Error fetching latest data')
    return <div>Failed to load latest data. Please try again later.</div>
  }
}

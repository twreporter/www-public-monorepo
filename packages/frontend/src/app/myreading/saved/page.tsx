// components
import SavedBookmarks from '@/components/my-reading/saved-bookmarks'
import { fakeSavedBookmarks } from '@/components/my-reading/fake-data'
// constants
import { SAVED_BOOKMARKS_PER_PAGE } from '@/components/my-reading/constants'
// utils
import { pageParamParser } from '@/utils/page-param-parser'

// TODO: get from api, error handling
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; empty?: string }>
}) {
  const { page, empty } = await searchParams
  const totalPages = Math.ceil(
    fakeSavedBookmarks.length / SAVED_BOOKMARKS_PER_PAGE
  )
  const currentPage = pageParamParser(page, totalPages)
  return (
    <SavedBookmarks currentPage={currentPage} isEmpty={empty !== undefined} />
  )
}

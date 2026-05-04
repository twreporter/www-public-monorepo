'use client'
import { type FC, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import clsx from 'clsx'
// @twreporters
import { Title1 } from '@twreporter/react-typescript-components/lib/title-bar'
import { Divider } from '@twreporter/react-typescript-components/lib/divider'
// components
import ReadingListRow from '@/components/my-reading/reading-list-row'
import Pagination from '@/components/pagination'
// fake data
import { fakeSavedBookmarks } from '@/components/my-reading/fake-data'
// constants
import { INTERNAL_ROUTES } from '@/constants/routes'
import { SAVED_BOOKMARKS_PER_PAGE } from '@/components/my-reading/constants'

type SavedBookmarksProps = {
  currentPage: number
}

// TODO: empty state, get data from API, error handling, bookmark action
const SavedBookmarks: FC<SavedBookmarksProps> = ({ currentPage }) => {
  const router = useRouter()
  const totalPage = Math.ceil(fakeSavedBookmarks.length / SAVED_BOOKMARKS_PER_PAGE)
  const totalCount = fakeSavedBookmarks.length

  const buildUrl = (page: number) => {
    const p = Math.max(1, Math.min(page, Math.max(1, totalPage)))
    return `${INTERNAL_ROUTES.savedBookmark}?page=${p}`
  }

  const handleClickPage = useCallback((page: number) => { router.push(buildUrl(page)) }, [router, totalPage])
  const handleClickPrev = useCallback(() => { router.push(buildUrl(currentPage - 1)) }, [router, currentPage, totalPage])
  const handleClickNext = useCallback(() => { router.push(buildUrl(currentPage + 1)) }, [router, currentPage, totalPage])

  const start = (currentPage - 1) * SAVED_BOOKMARKS_PER_PAGE
  const items = fakeSavedBookmarks.slice(start, start + SAVED_BOOKMARKS_PER_PAGE)

  return (
    <div className={clsx(
      'w-full height-auto flex flex-col px-[24px] pb-[120px]',
      'tablet:px-[32px] tablet:grid tablet:grid-cols-12 tablet:gap-x-[24px]',
      'desktop:px-[48px] desktop:gap-x-[32px]',
      'hd:w-[1280px] hd:mx-auto hd:px-0'
    )}>
      <div className={clsx(
        'w-full flex flex-col',
        'tablet:col-start-2 tablet:col-end-12'
      )}>
        <Title1 title="已收藏" subtitle={`共${totalCount}篇`} />
        <div className="pt-[24px] grid grid-cols-1 gap-[24px]">
          {items.map((item) => (
            <div key={item.slug}>
              <ReadingListRow item={item} />
              <Divider className="mt-[24px]" />
            </div>
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPage={totalPage}
          handleClickPage={handleClickPage}
          handleClickPrev={handleClickPrev}
          handleClickNext={handleClickNext}
        />
      </div>
    </div>
  )
}

export default SavedBookmarks

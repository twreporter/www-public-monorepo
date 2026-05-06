'use client'
import { type FC, useCallback, useContext, useState } from 'react'
import { useRouter } from 'next/navigation'
import clsx from 'clsx'
// @twreporters
import { Title1 } from '@twreporter/react-typescript-components/lib/title-bar'
import { Divider } from '@twreporter/react-typescript-components/lib/divider'
import { EmptyState } from '@twreporter/react-typescript-components/lib/empty-state'
import { P2 } from '@twreporter/react-typescript-components/lib/text/paragraph'
import { Bookmark } from '@twreporter/react-typescript-components/lib/icons'
// components
import ReadingListRow from '@/components/my-reading/reading-list-row'
import Pagination from '@/components/pagination'
// fake data
import { fakeSavedBookmarks } from '@/components/my-reading/fake-data'
// constants
import { INTERNAL_ROUTES } from '@/constants/routes'
import { SAVED_BOOKMARKS_PER_PAGE } from '@/components/my-reading/constants'
// context
import { BaseContext } from '@/contexts'

type SavedBookmarksProps = {
  currentPage: number
  isEmpty?: boolean
}

// TODO: get data from API, error handling
const SavedBookmarks: FC<SavedBookmarksProps> = ({
  currentPage,
  isEmpty = false,
}) => {
  const { releaseBranch } = useContext(BaseContext)
  const router = useRouter()
  const [bookmarks, setBookmarks] = useState(fakeSavedBookmarks)
  const totalPage = Math.ceil(bookmarks.length / SAVED_BOOKMARKS_PER_PAGE)
  const totalCount = bookmarks.length

  const handleToggleBookmark = useCallback((slug: string) => {
    setBookmarks((prev) =>
      prev.map((item) =>
        item.slug === slug ? { ...item, isBookmark: !item.isBookmark } : item
      )
    )
  }, [])

  const buildUrl = useCallback(
    (page: number) => {
      const p = Math.max(1, Math.min(page, Math.max(1, totalPage)))
      return `${INTERNAL_ROUTES.savedBookmark}?page=${p}`
    },
    [totalPage]
  )

  const handleClickPage = useCallback(
    (page: number) => {
      router.push(buildUrl(page))
    },
    [router, buildUrl]
  )
  const handleClickPrev = useCallback(() => {
    router.push(buildUrl(currentPage - 1))
  }, [router, currentPage, buildUrl])
  const handleClickNext = useCallback(() => {
    router.push(buildUrl(currentPage + 1))
  }, [router, currentPage, buildUrl])

  const start = (currentPage - 1) * SAVED_BOOKMARKS_PER_PAGE
  const items = isEmpty
    ? []
    : bookmarks.slice(start, start + SAVED_BOOKMARKS_PER_PAGE)

  return (
    <div
      className={clsx(
        'w-full height-auto flex flex-col px-[24px] pb-[120px]',
        'tablet:px-[32px] tablet:grid tablet:grid-cols-12 tablet:gap-x-[24px]',
        'desktop:px-[48px] desktop:gap-x-[32px]',
        'hd:w-[1280px] hd:mx-auto hd:px-0'
      )}
    >
      <div
        className={clsx(
          'w-full flex flex-col',
          'tablet:col-start-2 tablet:col-end-12'
        )}
      >
        <Title1
          title="已收藏"
          subtitle={totalCount ? `共${totalCount}篇` : undefined}
        />
        {items.length > 0 ? (
          <>
            <div className="pt-[24px] grid grid-cols-1 gap-[24px]">
              {items.map((item) => (
                <div key={item.slug}>
                  <ReadingListRow
                    item={item}
                    onBookmarkClick={() => handleToggleBookmark(item.slug)}
                  />
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
          </>
        ) : (
          <EmptyState
            className="mt-[72px] mb-[120px]"
            style={EmptyState.Style.default}
            title="你還沒有收藏任何報導"
            guide={
              <>
                <P2 text="點擊" />
                <Bookmark
                  type={Bookmark.Type.ADD}
                  releaseBranch={releaseBranch}
                />
                <P2 text="將喜愛的文章加入我的書籤" />
              </>
            }
            buttonText="前往首頁"
            buttonUrl={`${INTERNAL_ROUTES.home}`}
            releaseBranch={releaseBranch}
          />
        )}
      </div>
    </div>
  )
}

export default SavedBookmarks

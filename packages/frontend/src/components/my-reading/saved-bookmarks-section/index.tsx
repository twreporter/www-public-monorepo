'use client'
import { type FC, useEffect, useState } from 'react'
// @twreporters
import { Divider } from '@twreporter/react-typescript-components/lib/divider'
import { Title2 } from '@twreporter/react-typescript-components/lib/title-bar'
import ArticleCard from '@twreporter/react-typescript-components/lib/card/article'
// components
import EmptyBox from '@/components/my-reading/empty-box'
import MoreButton from '@/components/my-reading/more-button'
import ReadingListRow from '@/components/my-reading/reading-list-row'
import type { ReadingListItem } from '@/components/my-reading/types'
// constants
import { INTERNAL_ROUTES } from '@/constants/routes'
// store
import { useMyReadingStore } from '@/stores/my-reading'

const MOBILE_LIMIT = 4
const DESKTOP_LIMIT = 6

type SavedBookmarksSectionProps = {
  isLoading: boolean
  items: ReadingListItem[]
}

const SavedBookmarksSection: FC<SavedBookmarksSectionProps> = ({
  isLoading,
  items,
}) => {
  const { toggleBookmark } = useMyReadingStore()
  // Freeze the initially displayed slugs per breakpoint so the list doesn't
  // refill when items are removed and items.length > display limit.
  const [initialMobileSlugs, setInitialMobileSlugs] =
    useState<Set<string> | null>(null)
  const [initialDesktopSlugs, setInitialDesktopSlugs] =
    useState<Set<string> | null>(null)

  useEffect(() => {
    if (initialMobileSlugs === null && !isLoading && items.length > 0) {
      setInitialMobileSlugs(
        new Set(items.slice(0, MOBILE_LIMIT).map((i) => i.slug))
      )
      setInitialDesktopSlugs(
        new Set(items.slice(0, DESKTOP_LIMIT).map((i) => i.slug))
      )
    }
  }, [isLoading, items, initialMobileSlugs])

  const mobileVisibleItems = initialMobileSlugs
    ? items.filter((i) => initialMobileSlugs.has(i.slug))
    : items.slice(0, MOBILE_LIMIT)

  const desktopVisibleItems = initialDesktopSlugs
    ? items.filter((i) => initialDesktopSlugs.has(i.slug))
    : items.slice(0, DESKTOP_LIMIT)

  return (
    <section>
      <Title2
        title="已收藏"
        renderButton={
          items.length > 0 ? (
            <MoreButton href={INTERNAL_ROUTES.savedBookmark} />
          ) : null
        }
      />
      {isLoading ? (
        <div className="pt-[24px] pb-[24px]">
          <div className="desktop:hidden">
            <ArticleCard size={ArticleCard.Size.s} isLoading />
          </div>
          <div className="hidden desktop:block">
            <ArticleCard size={ArticleCard.Size.l} isLoading />
          </div>
        </div>
      ) : items.length === 0 ? (
        <EmptyBox type="bookmark" />
      ) : (
        <>
          <div className="tablet:hidden pt-[24px] pb-[24px] grid grid-cols-1 gap-[24px]">
            {mobileVisibleItems.length === 0 ? (
              <EmptyBox type={EmptyBox.Type.ShowMoreBookmark} isMobile />
            ) : (
              mobileVisibleItems.map((item) => (
                <div key={item.slug}>
                  <ReadingListRow
                    item={item}
                    onBookmarkClick={() => toggleBookmark(item.slug)}
                  />
                  <Divider className="mt-[24px]" />
                </div>
              ))
            )}
          </div>
          <div className="hidden tablet:grid pt-[24px] pb-[24px] grid-cols-1 gap-[24px]">
            {desktopVisibleItems.length === 0 ? (
              <EmptyBox type={EmptyBox.Type.ShowMoreBookmark} />
            ) : (
              desktopVisibleItems.map((item) => (
                <div key={item.slug}>
                  <ReadingListRow
                    item={item}
                    desktopSize={ArticleCard.Size.l}
                    onBookmarkClick={() => toggleBookmark(item.slug)}
                  />
                  <Divider className="mt-[24px]" />
                </div>
              ))
            )}
          </div>
        </>
      )}
    </section>
  )
}

export default SavedBookmarksSection

'use client'
import type { FC } from 'react'
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

type SavedBookmarksSectionProps = {
  isLoading: boolean
  items: ReadingListItem[]
}

const SavedBookmarksSection: FC<SavedBookmarksSectionProps> = ({
  isLoading,
  items,
}) => {
  const { toggleBookmark } = useMyReadingStore()
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
            {items.slice(0, 4).map((item) => (
              <div key={item.slug}>
                <ReadingListRow
                  item={item}
                  onBookmarkClick={() => toggleBookmark(item.slug)}
                />
                <Divider className="mt-[24px]" />
              </div>
            ))}
          </div>
          <div className="hidden tablet:grid pt-[24px] pb-[24px] grid-cols-1 gap-[24px]">
            {items.slice(0, 6).map((item) => (
              <div key={item.slug}>
                <ReadingListRow
                  item={item}
                  desktopSize={ArticleCard.Size.l}
                  onBookmarkClick={() => toggleBookmark(item.slug)}
                />
                <Divider className="mt-[24px]" />
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  )
}

export default SavedBookmarksSection

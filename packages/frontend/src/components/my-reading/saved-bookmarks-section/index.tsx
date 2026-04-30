import { Divider } from '@twreporter/react-typescript-components/lib/divider'
import { Title2 } from '@twreporter/react-typescript-components/lib/title-bar'
import ArticleCard from '@twreporter/react-typescript-components/lib/card/article'

import EmptyBox from '@/components/my-reading/empty-box'
import MoreButton from '@/components/my-reading/more-button'
import ReadingListRow from '@/components/my-reading/reading-list-row'
import type { ReadingListItem } from '@/components/my-reading/types'

type SavedBookmarksSectionProps = {
  isLoading: boolean
  items: ReadingListItem[]
}

export default function SavedBookmarksSection({
  isLoading,
  items,
}: SavedBookmarksSectionProps) {
  return (
    <section>
      <Title2
        title="已收藏"
        renderButton={
          items.length > 0 ? (
            <MoreButton href="/my-reading/saved-bookmarks" />
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
        <div className="pt-[24px] pb-[24px] grid grid-cols-1 gap-[24px]">
          {items.map((item) => (
            <div key={item.slug}>
              <ReadingListRow item={item} desktopSize={ArticleCard.Size.l} />
              <Divider className="mt-[24px]" />
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

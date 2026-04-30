import { Divider } from '@twreporter/react-typescript-components/lib/divider'
import { Title2 } from '@twreporter/react-typescript-components/lib/title-bar'
import ArticleCard from '@twreporter/react-typescript-components/lib/card/article'
import ShortCard from '@twreporter/react-typescript-components/lib/card/short'

import EmptyBox from '@/components/my-reading/empty-box'
import MoreButton from '@/components/my-reading/more-button'
import type { ReadingListItem } from '@/components/my-reading/types'

type BrowsingHistorySectionProps = {
  isLoading: boolean
  items: ReadingListItem[]
}

export default function BrowsingHistorySection({
  isLoading,
  items,
}: BrowsingHistorySectionProps) {
  return (
    <section>
      <Title2
        title="造訪紀錄"
        renderButton={
          items.length > 0 ? (
            <MoreButton href="/my-reading/browsing-history" />
          ) : null
        }
      />
      {isLoading ? (
        <div className="pt-[24px] pb-[24px]">
          <ArticleCard size={ArticleCard.Size.s} isLoading />
        </div>
      ) : items.length === 0 ? (
        <EmptyBox type="browsing-history" />
      ) : (
        <div className="pt-[24px] pb-[24px] grid grid-cols-1 tablet:grid-cols-2 gap-y-[24px] tablet:gap-x-[24px] desktop:gap-x-[32px]">
          {items.map((item) => (
            <div key={item.slug}>
              <div className="desktop:hidden">
                <ShortCard
                  title={item.title}
                  categoryLabel={item.category}
                  image={{ src: item.image, alt: item.title }}
                  size={ShortCard.Size.s}
                />
              </div>
              <div className="hidden desktop:block">
                <ShortCard
                  title={item.title}
                  categoryLabel={item.category}
                  image={{ src: item.image, alt: item.title }}
                  size={ShortCard.Size.l}
                />
              </div>
              <Divider className="mt-[24px]" />
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

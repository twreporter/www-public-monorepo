'use client'
import type { FC } from 'react'
// @twreporters
import { Divider } from '@twreporter/react-typescript-components/lib/divider'
import { Title2 } from '@twreporter/react-typescript-components/lib/title-bar'
import ArticleCard from '@twreporter/react-typescript-components/lib/card/article'
import ShortCard from '@twreporter/react-typescript-components/lib/card/short'
// components
import EmptyBox from '@/components/my-reading/empty-box'
import MoreButton from '@/components/my-reading/more-button'
import type { ReadingListItem } from '@/components/my-reading/types'
// constants
import { INTERNAL_ROUTES } from '@/constants/routes'

type BrowsingHistorySectionProps = {
  isLoading: boolean
  items: ReadingListItem[]
}

const BrowsingHistorySection: FC<BrowsingHistorySectionProps> = ({
  isLoading,
  items,
}) => {
  return (
    <section>
      <Title2
        title="造訪紀錄"
        renderButton={
          items.length > 0 ? (
            <MoreButton href={INTERNAL_ROUTES.browsingHistory} />
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
          {items.slice(0, 6).map((item) => (
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

export default BrowsingHistorySection

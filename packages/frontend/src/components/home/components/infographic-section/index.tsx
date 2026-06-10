'use client'
import { type FC, useContext } from 'react'
import clsx from 'clsx'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useRouter } from 'next/navigation'
// react-typescript-components
import { TextButton } from '@twreporter/react-typescript-components/lib/button'
import { Arrow } from '@twreporter/react-typescript-components/lib/icons'
// styles
import { rwdGridColGapClass } from '@/styles/layout'
// components
import { InfographicSectionCard } from '@/components/home/components/infographic-section/card'
import { SectionBadge } from '@/components/home/components/section-badge'
// context
import { BaseContext } from '@/contexts'
// constants
import { INTERNAL_ROUTES } from '@/constants/routes'
import { SECTION_NAME } from '@/components/home/constants'
// types
import type { HomePageInfographicSectionArticle } from '@/types/home'

export const InfographicSection: FC<{
  articles: HomePageInfographicSectionArticle[]
}> = ({ articles }) => {
  const router = useRouter()
  const { releaseBranch } = useContext(BaseContext)
  const handleMoreClick = () => {
    router.push(`${INTERNAL_ROUTES.topics}`)
  }
  return (
    <div
      className={clsx(
        'col-span-full',
        'pt-[32px] pb-[48px] relative',
        'flex flex-col gap-[24px]',
        'tablet:grid tablet:grid-cols-subgrid',
        'desktop:py-[56px]',
        ...rwdGridColGapClass
      )}
    >
      <div className="tablet:hidden absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <SectionBadge label={SECTION_NAME.infographic} />
      </div>

      {/* Mobile: Swiper */}
      <div className="tablet:hidden">
        <Swiper
          slidesPerView="auto"
          centeredSlides={true}
          spaceBetween={24}
          className="w-screen mt-[24px] !-mx-[24px]" // Parent container has padding-x 24px, so need to offset that for mobile swiper
        >
          {articles.map((item) => (
            <SwiperSlide
              key={item.slug}
              className="max-w-[calc(100vw-96px)]" // 24px padding and 24px gap
            >
              <InfographicSectionCard
                slug={item.slug}
                title={item.title}
                categoryLabel={item.categoryLabel}
                image={item.image}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* Tablet+: Masonry — articles are distributed round-robin (i % 3) into 3 flex columns
           so they read left-to-right visually while each column stacks at its own natural height. */}
      <div
        className={clsx(
          'col-span-full',
          'hidden tablet:grid',
          'grid-cols-3',
          ...rwdGridColGapClass
        )}
      >
        {[0, 1, 2].map((colIndex) => (
          <div
            key={colIndex}
            className="flex flex-col gap-y-[24px] desktop:gap-y-[32px]"
          >
            {articles
              .filter((_, i) => i % 3 === colIndex)
              .map((item, rowIndex) => {
                const isOddRow = rowIndex % 2 === 0
                const isPortrait = isOddRow ? colIndex === 0 : colIndex > 0
                return (
                  <InfographicSectionCard
                    key={item.slug}
                    slug={item.slug}
                    title={item.title}
                    categoryLabel={item.categoryLabel}
                    image={item.image}
                    isPortrait={isPortrait}
                  />
                )
              })}
          </div>
        ))}
      </div>

      <div className="col-span-full flex justify-center mt-[32px]">
        <TextButton
          text={'更多多媒體新聞'}
          rightIconComponent={
            <Arrow
              direction={Arrow.Direction.right}
              releaseBranch={releaseBranch}
            />
          }
          onClick={handleMoreClick}
        />
      </div>
    </div>
  )
}

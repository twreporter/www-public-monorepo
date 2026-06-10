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
import { TopicSectionCard } from '@/components/home/components/topic-section/card'
import { SectionBadge } from '@/components/home/components/section-badge'
// context
import { BaseContext } from '@/contexts'
// constants
import { INTERNAL_ROUTES } from '@/constants/routes'
import { SECTION_NAME } from '@/components/home/constants'
// types
import type { HomePageTopicSectionMeta } from '@/types/home'

export const TopicSection: FC<{ topics: HomePageTopicSectionMeta[] }> = ({
  topics,
}) => {
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
        <SectionBadge label={SECTION_NAME.topic} />
      </div>

      {/* Mobile: Swiper */}
      <div className="tablet:hidden">
        <Swiper
          slidesPerView="auto"
          centeredSlides={true}
          spaceBetween={24}
          className="w-screen mt-[24px] !-mx-[24px]" // Parent container has padding-x 24px, so need to offset that for mobile swiper
        >
          {topics.map((item) => (
            <SwiperSlide key={item.slug} className="max-w-[calc(100vw-96px)]">
              {' '}
              {/* 24px padding and 24px gap */}
              <TopicSectionCard
                slug={item.slug}
                title={item.title}
                ogDescription={item.ogDescription}
                image={item.image}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* Tablet: Grid */}
      <div
        className={clsx(
          'col-start-2 col-end-12',
          'hidden tablet:grid',
          'grid-cols-subgrid',
          'gap-y-[32px]',
          'hd:col-start-3',
          'hd:col-end-11',
          'hd:gap-y-[40px]'
        )}
      >
        {topics.map((item) => (
          <div className="col-span-5 hd:col-span-4" key={item.slug}>
            <TopicSectionCard
              slug={item.slug}
              title={item.title}
              ogDescription={item.ogDescription}
              image={item.image}
            />
          </div>
        ))}
      </div>

      <div className="col-span-full flex justify-center mt-[32px]">
        <TextButton
          text={'更多報導者專題'}
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

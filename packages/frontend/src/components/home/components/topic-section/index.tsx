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
        <SectionBadge label="專題" />
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
            <SwiperSlide key={item.slug} className="max-w-[280px]">
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
      {/* Desktop: Grid */}
      <div
        className={clsx(
          'col-span-full',
          'hidden tablet:grid',
          'grid-cols-subgrid',
          'gap-y-[32px]',
          'desktop:gap-y-[40px]'
        )}
      >
        {topics.map((item) => (
          <div className="col-span-6" key={item.slug}>
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

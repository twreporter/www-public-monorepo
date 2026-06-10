'use client'
import { type FC, useContext } from 'react'
import clsx from 'clsx'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useRouter } from 'next/navigation'
// react-typescript-components
import {
  P1,
  P3,
} from '@twreporter/react-typescript-components/lib/text/paragraph'
import { H2 } from '@twreporter/react-typescript-components/lib/text/heading'
import { TextButton } from '@twreporter/react-typescript-components/lib/button'
import { Arrow } from '@twreporter/react-typescript-components/lib/icons'
// styles
import { rwdGridColGapClass } from '@/styles/layout'
// components
import { LatestTopicCard } from '@/components/home/components/latest-topic-section/card'
import { SectionBadge } from '@/components/home/components/section-badge'
// context
import { BaseContext } from '@/contexts'
// constants
import { INTERNAL_ROUTES } from '@/constants/routes'
import { SECTION_NAME } from '@/components/home/constants'
// types
import type { HomePageLatestTopicSectionArticle } from '@/types/home'

type LatestTopicSectionProps = {
  slug: string
  topicName: string
  title: string
  ogDescription: string
  posts: HomePageLatestTopicSectionArticle[]
}
export const LatestTopicSection: FC<LatestTopicSectionProps> = ({
  slug,
  topicName,
  title,
  ogDescription,
  posts,
}) => {
  const router = useRouter()
  const { releaseBranch } = useContext(BaseContext)
  const handleMoreClick = () => {
    router.push(`${INTERNAL_ROUTES.topics}/${slug}`)
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
        <SectionBadge label={SECTION_NAME.latestTopic} />
      </div>
      <div
        className={clsx(
          'w-full flex flex-col gap-[12px] text-center',
          'tablet:col-start-4 tablet:col-end-10'
        )}
      >
        <div>
          <P3 className="text-supportive-heavy" text={`專題・${topicName}`} />
          <H2
            className={clsx(
              'text-gray-800',
              'desktop:col-start-5 desktop:col-end-9'
            )}
            type={H2.Type.article}
            text={title}
          />
        </div>
        <P1 className="text-gray-800" text={ogDescription} />
      </div>

      {/* Mobile: Swiper */}
      <div className="tablet:hidden">
        <Swiper
          slidesPerView="auto"
          centeredSlides={true}
          spaceBetween={24}
          className="w-screen mt-[24px] !-mx-[24px]" // Parent container has padding-x 24px, so need to offset that for mobile swiper
        >
          {posts.map((item) => (
            <SwiperSlide
              key={item.slug}
              className="max-w-[calc(100vw-96px)]" // 24px padding and 24px gap
            >
              <LatestTopicCard
                slug={item.slug}
                categoryLabel={topicName}
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
          'gap-y-[16px]'
        )}
      >
        {posts.map((item) => (
          <div className="col-span-4" key={item.slug}>
            <LatestTopicCard
              key={item.slug}
              slug={item.slug}
              categoryLabel={topicName}
              title={item.title}
              ogDescription={item.ogDescription}
              image={item.image}
            />
          </div>
        ))}
      </div>

      <div className="col-span-full flex justify-center mt-[32px]">
        <TextButton
          text={`更多${topicName}文章`}
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

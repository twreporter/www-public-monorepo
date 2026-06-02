'use client'
import { type FC, useContext } from 'react'
import clsx from 'clsx'
import { Swiper, SwiperSlide } from 'swiper/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
// components
import { ReviewSectionCard } from '@/components/home/components/review-section/card'
import { SectionBadge } from '@/components/home/components/section-badge'
// styles
import { rwdGridContainerClass } from '@/styles/layout'
// react-typescrip-components
import { TextButton } from '@twreporter/react-typescript-components/lib/button'
import { Arrow } from '@twreporter/react-typescript-components/lib/icons'
import { INTERNAL_LINKS } from '@twreporter/react-typescript-components/lib/constants/internal-links'
// context
import { BaseContext } from '@/contexts'
// types
import type { HomePageArticle } from '@/types/home'

export const ReviewSection: FC<{ articles: HomePageArticle[] }> = ({
  articles,
}) => {
  const router = useRouter()
  const { releaseBranch } = useContext(BaseContext)
  const handleMoreClick = () => {
    router.push(INTERNAL_LINKS.categories.opinion.index)
  }
  return (
    <div
      className={clsx(
        'w-screen h-full bg-gray-white relative',
        'pt-[32px] pb-[48px]',
        'tablet:pb-[64px]',
        'desktop:pt-[56px] desktop:pb-[120px]',
        '-mx-[24px]',
        'tablet:col-span-12 tablet:-mx-[32px]',
        'desktop:-mx-[48px]',
        'hd:-mx-[calc((100vw-1280px)/2)]'
      )}
    >
      {/* Mobile: Swiper */}
      <div className="tablet:hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <SectionBadge label="評論" />
        </div>
        <Swiper
          slidesPerView="auto"
          centeredSlides={true}
          spaceBetween={24}
          className="w-full"
        >
          {articles.map((item) => (
            <SwiperSlide key={item.slug} className="max-w-[280px]">
              <ReviewSectionCard
                slug={item.slug}
                categoryLabel={item.categoryLabel}
                title={item.title}
                description={item.ogDescription}
                image={item.image}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Tablet+: grid layout */}
      <div className={clsx(rwdGridContainerClass, 'hidden !pb-0 gap-y-[32px]')}>
        {articles.map((item) => (
          <div key={item.slug} className="col-span-3">
            <ReviewSectionCard
              slug={item.slug}
              categoryLabel={item.categoryLabel}
              title={item.title}
              description={item.ogDescription}
              image={item.image}
            />
          </div>
        ))}
      </div>
      <div className="col-span-full flex justify-center mt-[32px]">
        <TextButton
          text={'更多評論文章'}
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

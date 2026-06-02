'use client'
import type { FC } from 'react'
import clsx from 'clsx'
import { Swiper, SwiperSlide } from 'swiper/react'
// components
import { CategorySectionCard } from '@/components/home/components/category-section/card'
import { SectionBadge } from '@/components/home/components/section-badge'
// styles
import { rwdGridColGapClass } from '@/styles/layout'
// types
import type { HomePageCategorySectionMeta } from '@/types/home'

export const CategorySection: FC<{ meta: HomePageCategorySectionMeta[] }> = ({
  meta,
}) => {
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
      {/* Mobile: Swiper */}
      <div className="tablet:hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <SectionBadge label="議題" />
        </div>
        <Swiper
          slidesPerView="auto"
          centeredSlides={true}
          spaceBetween={24}
          className="w-full"
        >
          {meta.map((item) => (
            <SwiperSlide key={item.category.label} className="max-w-[280px]">
              <CategorySectionCard
                slug={item.slug}
                title={item.title}
                image={item.image}
                category={item.category}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Tablet+: grid layout */}
      <div
        className={clsx(
          'hidden col-span-full',
          'tablet:grid tablet:grid-cols-subgrid tablet:gap-y-[32px]',
          'desktop:gap-y-[40px]'
        )}
      >
        {meta.map((item) => (
          <div key={item.slug} className="col-span-3 flex flex-col gap-[12px]">
            <CategorySectionCard
              slug={item.slug}
              title={item.title}
              image={item.image}
              category={item.category}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

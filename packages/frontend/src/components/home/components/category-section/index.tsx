'use client'
import type { FC } from 'react'
import clsx from 'clsx'
import { Swiper, SwiperSlide } from 'swiper/react'
// components
import { CategorySectionCard } from '@/components/home/components/category-section/card'
import { SectionBadge } from '@/components/home/components/section-badge'
// styles
import { rwdGridContainerClass } from '@/styles/layout'
// types
import type { HomePageCategorySectionMeta } from '@/types/home'

export const CategorySection: FC<{ meta: HomePageCategorySectionMeta[] }> = ({
  meta,
}) => {
  return (
    <div
      className={clsx(
        'w-screen h-full relative bg-gray-200',
        'pt-[32px] pb-[48px]',
        'desktop:py-[56px]',
        '-mx-[24px]',
        'tablet:col-span-12 tablet:-mx-[32px]',
        'desktop:-mx-[48px]',
        'hd:-mx-[calc((100vw-1280px)/2)]'
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
          rwdGridContainerClass,
          'hidden !pb-0 gap-y-[32px] desktop:gap-y-[40px]'
        )}
      >
        {meta.map((item) => (
          <div key={item.slug} className="col-span-3">
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

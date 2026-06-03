'use client'
import { type FC, useContext, useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
// react-typescript-components
import { TextButton } from '@twreporter/react-typescript-components/lib/button'
import { Arrow } from '@twreporter/react-typescript-components/lib/icons'
// components
import { PhotographySectionCard } from '@/components/home/components/photography-section/card'
import { SectionBadge } from '@/components/home/components/section-badge'
// styles
import { rwdGridContainerClass } from '@/styles/layout'
// types
import type { HomePagePhotographySectionArticle } from '@/types/home'
// context
import { BaseContext } from '@/contexts'
// constants
import { INTERNAL_ROUTES } from '@/constants/routes'

export const PhotographySection: FC<{
  articles: HomePagePhotographySectionArticle[]
}> = ({ articles }) => {
  const router = useRouter()
  const { releaseBranch } = useContext(BaseContext)
  const [activeSlug, setActiveSlug] = useState<string | null>(null)
  const mobileListRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = mobileListRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const slug = (entry.target as HTMLElement).dataset.slug
          if (!slug) continue
          if (entry.isIntersecting) {
            setActiveSlug(slug)
          } else {
            setActiveSlug((prev) => (prev === slug ? null : prev))
          }
        }
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    )

    const items = container.querySelectorAll('[data-slug]')
    items.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const handleMoreClick = () => {
    router.push(INTERNAL_ROUTES.photography)
  }

  return (
    <div
      className={clsx(
        'w-screen h-full relative bg-gray-white',
        'pb-[48px]',
        'tablet:pt-[32px] tablet:pb-[48px] tablet:bg-photo-dark',
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
          <SectionBadge label="攝影" />
        </div>
        <div className="w-full flex flex-col" ref={mobileListRef}>
          {articles.map((item) => (
            <div key={item.slug} data-slug={item.slug}>
              <PhotographySectionCard
                slug={item.slug}
                title={item.title}
                imageUrl={item.imageUrl}
                isActive={activeSlug === item.slug}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Tablet+: grid layout */}
      <div className={clsx(rwdGridContainerClass, 'hidden !pb-0 !gap-0')}>
        {articles.map((item) => (
          <div key={item.slug} className="col-span-6">
            <PhotographySectionCard
              slug={item.slug}
              title={item.title}
              imageUrl={item.imageUrl}
            />
          </div>
        ))}
      </div>

      <div className="col-span-full flex justify-center mt-[32px]">
        <div className="tablet:hidden">
          <TextButton
            text={'更多影像新聞'}
            rightIconComponent={
              <Arrow
                direction={Arrow.Direction.right}
                releaseBranch={releaseBranch}
              />
            }
            onClick={handleMoreClick}
          />
        </div>
        <div className="hidden tablet:flex">
          <TextButton
            theme={TextButton.Theme.photography}
            text={'更多影像新聞'}
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
    </div>
  )
}

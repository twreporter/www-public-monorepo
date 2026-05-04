'use client'

import { useMemo, useRef, useState, useContext } from 'react'
import { useEffect } from 'react'
import clsx from 'clsx'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
// @twreporters
import { Title2 } from '@twreporter/react-typescript-components/lib/title-bar'
import { IconButton } from '@twreporter/react-typescript-components/lib/button'
import { Arrow } from '@twreporter/react-typescript-components/lib/icons'
import {
  P1,
  P2,
  P3,
} from '@twreporter/react-typescript-components/lib/text/paragraph'
import { H5 } from '@twreporter/react-typescript-components/lib/text/heading'
// components
import type { TrackingArticle } from '@/components/my-reading/types'
// constants
import { INTERNAL_ROUTES } from '@/constants/routes'
// context
import { BaseContext } from '@/contexts'

type ArticleTrackingSectionProps = {
  isLoading: boolean
  trackingArticles: TrackingArticle[]
}

type TrackingOrBlank = TrackingArticle | { id: string; type: 'blank' }

const isTrackingArticle = (item: TrackingOrBlank): item is TrackingArticle => {
  return 'trackingTitle' in item
}

function TrackingCard({ article }: { article: TrackingArticle }) {
  return (
    <Link
      href={`${INTERNAL_ROUTES.article}/${encodeURIComponent(article.trackingArticleSlug)}`}
      className={clsx(
        'no-underline block',
        'border border-gray-300 rounded-[8px] p-[24px]',
        'flex flex-col justify-between',
        'w-[280px] h-[317px] gap-0',
        'desktop:w-full desktop:h-full desktop:gap-[48px]'
      )}
    >
      <div className="flex flex-col">
        <P3 className="text-gray-600" text={article.publishDate} />
        <div className="line-clamp-2">
          <H5 className="text-gray-800" text={article.trackingTitle} />
        </div>
        <div className="line-clamp-3">
          <P1 className="text-gray-700" text={article.trackingContent} />
        </div>
      </div>
      <div className="border-t border-gray-300 pt-[16px]">
        <div className="line-clamp-2">
          <P2 className="text-gray-600" text={article.trackingArticleTitle} />
        </div>
      </div>
    </Link>
  )
}

function LoadingCard() {
  return (
    <div className="border border-gray-300 rounded-[8px] p-[24px] animate-pulse">
      <div className="h-[12px] w-[48px] bg-gray-200 rounded" />
      <div className="mt-[16px] h-[16px] w-full bg-gray-200 rounded" />
      <div className="mt-[12px] h-[16px] w-[55%] bg-gray-200 rounded" />
      <div className="mt-[24px] h-[12px] w-full bg-gray-200 rounded" />
      <div className="mt-[10px] h-[12px] w-full bg-gray-200 rounded" />
      <div className="mt-[10px] h-[12px] w-[75%] bg-gray-200 rounded" />
      <div className="mt-[32px] h-[1px] w-full bg-gray-200" />
      <div className="mt-[16px] h-[12px] w-full bg-gray-200 rounded" />
      <div className="mt-[10px] h-[12px] w-[75%] bg-gray-200 rounded" />
    </div>
  )
}

export default function ArticleTrackingSection({
  isLoading,
  trackingArticles,
}: ArticleTrackingSectionProps) {
  const { releaseBranch } = useContext(BaseContext)
  const [swiper, setSwiper] = useState<SwiperType | null>(null)
  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(false)
  const [offset, setOffset] = useState(24)
  const sectionRef = useRef<HTMLDivElement | null>(null)

  const cardsForDesktop = useMemo(() => {
    const cardPerRow = 3
    const remainder = trackingArticles.length % cardPerRow
    if (!trackingArticles.length || remainder === 0) {
      return trackingArticles
    }

    const blanks = Array.from({ length: cardPerRow - remainder }).map(
      (_, index) => ({ id: `blank-${index}`, type: 'blank' as const })
    )

    return [...trackingArticles, ...blanks] satisfies TrackingOrBlank[]
  }, [trackingArticles])

  useEffect(() => {
    const setSwiperOffset = () => {
      if (!sectionRef.current) return
      setOffset(sectionRef.current.offsetLeft)
    }

    setSwiperOffset()
    window.addEventListener('resize', setSwiperOffset)

    return () => {
      window.removeEventListener('resize', setSwiperOffset)
    }
  }, [])

  const handleDesktopArrow = (direction: 'left' | 'right') => {
    if (!swiper) return
    if (direction === 'left') {
      swiper.slidePrev()
    } else {
      swiper.slideNext()
    }
  }

  if (!isLoading && trackingArticles.length === 0) {
    return null
  }

  return (
    <section ref={sectionRef}>
      <Title2 title="報導後續追蹤" />

      {isLoading ? (
        <div className="mt-[24px] grid grid-cols-1 desktop:grid-cols-3 gap-[16px]">
          {['one', 'two', 'three'].map((id) => (
            <LoadingCard key={`tracking-loading-${id}`} />
          ))}
        </div>
      ) : (
        <>
          <div className="hidden desktop:grid mt-[24px] grid-cols-[24px_minmax(0,1fr)_24px] items-center gap-[16px] w-[calc((16px+24px)+100%+(16px+24px))] ml-[-40px]">
            <IconButton
              className={clsx(
                'h-[24px] w-[24px] flex items-center justify-center',
                isBeginning && 'invisible'
              )}
              onClick={() => handleDesktopArrow('left')}
              aria-label="上一組追蹤文章"
              iconComponent={
                <Arrow
                  direction={Arrow.Direction.left}
                  releaseBranch={releaseBranch}
                />
              }
            />
            <div className="min-w-0">
              <Swiper
                className="w-full [&_.swiper-wrapper]:items-stretch [&_.swiper-slide]:h-auto"
                observer
                observeParents
                updateOnWindowResize
                slidesPerView={3}
                slidesPerGroup={3}
                spaceBetween={16}
                breakpoints={{
                  1024: {
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                    spaceBetween: 16,
                  },
                }}
                onSwiper={(instance: SwiperType) => {
                  setSwiper(instance)
                  requestAnimationFrame(() => {
                    instance.update()
                    setIsBeginning(instance.isBeginning)
                    setIsEnd(instance.isEnd)
                  })
                }}
                onSlideChange={(instance: SwiperType) => {
                  setIsBeginning(instance.isBeginning)
                  setIsEnd(instance.isEnd)
                }}
              >
                {cardsForDesktop.map((item) => {
                  if (isTrackingArticle(item)) {
                    return (
                      <SwiperSlide key={item.slug} className="!h-auto">
                        <TrackingCard article={item} />
                      </SwiperSlide>
                    )
                  }

                  return (
                    <SwiperSlide key={item.id} className="h-auto">
                      <div className="h-full" />
                    </SwiperSlide>
                  )
                })}
              </Swiper>
            </div>
            <IconButton
              className={clsx(
                'h-[24px] w-[24px] flex items-center justify-center',
                isEnd && 'invisible'
              )}
              onClick={() => handleDesktopArrow('right')}
              aria-label="下一組追蹤文章"
              iconComponent={
                <Arrow
                  direction={Arrow.Direction.right}
                  releaseBranch={releaseBranch}
                />
              }
            />
          </div>

          <div
            className="mt-[24px] desktop:hidden w-screen"
            style={{ marginLeft: offset > 0 ? `-${offset}px` : '-24px' }}
          >
            {offset > 0 && (
              <Swiper
                slidesPerView="auto"
                spaceBetween={16}
                slidesOffsetBefore={offset}
                slidesOffsetAfter={offset}
              >
                {trackingArticles.map((article) => (
                  <SwiperSlide key={article.slug} className="!w-[280px] !h-auto">
                    <TrackingCard article={article} />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
        </>
      )}
    </section>
  )
}

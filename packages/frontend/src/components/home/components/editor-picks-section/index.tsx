'use client'
import {
  type FC,
  useState,
  useContext,
  useCallback,
  useRef,
  useEffect,
} from 'react'
import clsx from 'clsx'
import { Swiper, SwiperSlide } from 'swiper/react'
import Image from 'next/image'
import Link from 'next/link'
// components
import { EditorPickCard } from '@/components/home/components/editor-picks-section/card'
import { SectionBadge } from '@/components/home/components/section-badge'
// styles
import { rwdGridContainerClass } from '@/styles/layout'
// react-typescrip-components
import {
  P1,
  P3,
} from '@twreporter/react-typescript-components/lib/text/paragraph'
import {
  H2,
  H6,
} from '@twreporter/react-typescript-components/lib/text/heading'
import { IconButton } from '@twreporter/react-typescript-components/lib/button'
import { Arrow } from '@twreporter/react-typescript-components/lib/icons'
import ImgPlaceholder from '@twreporter/react-typescript-components/lib/card/img-placeholder'
// constants
import { INTERNAL_ROUTES } from '@/constants/routes'
import { SECTION_NAME } from '@/components/home/constants'
// context
import { BaseContext } from '@/contexts'
// types
import type { HomePageArticle } from '@/types/home'

export const EditorPicksSection: FC<{ articles: HomePageArticle[] }> = ({
  articles,
}) => {
  const [activeIndex, setActiveIndex] = useState(() => {
    return articles && articles.length > 1 ? 1 : 0
  })
  const [isVisible, setIsVisible] = useState(true)
  const { releaseBranch } = useContext(BaseContext)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const changeIndex = useCallback((updater: (prev: number) => number) => {
    setIsVisible(false)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      setActiveIndex(updater)
      setIsVisible(true)
    }, 150)
  }, [])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handlePrevClick = () => {
    changeIndex((prevIndex) =>
      prevIndex === 0 ? articles.length - 1 : prevIndex - 1
    )
  }
  const handleNextClick = () => {
    changeIndex((prevIndex) =>
      prevIndex === articles.length - 1 ? 0 : prevIndex + 1
    )
  }

  if (!articles || articles.length === 0) {
    return null
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
          <SectionBadge label={SECTION_NAME.editorPicks} />
        </div>
        <Swiper
          slidesPerView="auto"
          centeredSlides={true}
          spaceBetween={24}
          className="w-full"
        >
          {articles.map((item) => (
            <SwiperSlide key={item.slug} className="max-w-[280px]">
              <EditorPickCard
                slug={item.slug}
                categoryLabel={item.categoryLabel}
                title={item.title}
                ogDescription={item.ogDescription}
                image={item.image}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Tablet+: grid layout */}
      <div className={clsx(rwdGridContainerClass, 'hidden !pb-0 gap-y-[16px]')}>
        <div className="col-start-1 col-end-3 row-start-2 flex items-center">
          {activeIndex > 0 ? (
            <button
              className="flex flex-col text-center hover:cursor-pointer"
              onClick={handlePrevClick}
              type="button"
            >
              <P3
                className="text-supportive-heavy"
                text={articles[activeIndex - 1].categoryLabel}
              />
              <H6
                className="text-gray-800"
                type={H6.Type.article}
                text={articles[activeIndex - 1].title}
              />
            </button>
          ) : null}
        </div>
        <Link
          className={clsx(
            'col-start-3 col-end-11 row-span-2',
            'grid grid-cols-subgrid grid-rows-subgrid',
            'text-center',
            'transition-opacity duration-[300ms]',
            'hover:opacity-70 has-[button:hover]:opacity-100'
          )}
          href={`${INTERNAL_ROUTES.article}/${articles[activeIndex].slug}`}
        >
          <div
            className={clsx(
              'col-span-full row-start-1 grid grid-cols-subgrid gap-y-[12px]',
              'transition-opacity duration-[150ms] ease-in-out',
              isVisible ? 'opacity-100' : 'opacity-0'
            )}
          >
            <div className="col-start-2 col-end-8">
              <P3
                className="text-supportive-heavy text-center"
                text={articles[activeIndex].categoryLabel}
              />
              <H2
                className="text-gray-800 line-clamp-2"
                type={H2.Type.article}
                text={articles[activeIndex].title}
              />
            </div>
            <P1
              className="col-span-full text-gray-800 line-clamp-2"
              text={articles[activeIndex].ogDescription}
            />
          </div>
          <div className="col-span-full row-start-2 aspect-[3/2] relative">
            <div
              className={clsx(
                'absolute inset-0',
                'transition-opacity duration-[150ms] ease-in-out',
                isVisible ? 'opacity-100' : 'opacity-0'
              )}
            >
              {articles[activeIndex].image ? (
                <Image
                  fill={true}
                  src={articles[activeIndex].image.src}
                  alt={articles[activeIndex].image.alt}
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex justify-center items-center bg-gray-100">
                  <ImgPlaceholder />
                </div>
              )}
            </div>
            {activeIndex > 0 ? (
              <IconButton
                // tablet grid gap is 24px, desktop grid gap is 32px, so the button needs to be offset by half of that from the edge of the image
                className="absolute top-1/2 left-0 -translate-x-[calc(50%+12px)] desktop:-translate-x-[calc(50%+16px)] -translate-y-1/2"
                active={true}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  handlePrevClick()
                }}
                iconComponent={
                  <Arrow
                    direction={Arrow.Direction.left}
                    releaseBranch={releaseBranch}
                  />
                }
              />
            ) : null}
            {activeIndex < articles.length - 1 ? (
              <IconButton
                // tablet grid gap is 24px, desktop grid gap is 32px, so the button needs to be offset by half of that from the edge of the image
                className="absolute top-1/2 right-0 translate-x-[calc(50%+12px)] desktop:translate-x-[calc(50%+16px)] -translate-y-1/2"
                active={true}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  handleNextClick()
                }}
                iconComponent={
                  <Arrow
                    direction={Arrow.Direction.right}
                    releaseBranch={releaseBranch}
                  />
                }
              />
            ) : null}
          </div>
        </Link>
        <div className="col-start-11 col-end-13 row-start-2 flex items-center">
          {activeIndex < articles.length - 1 ? (
            <button
              className="flex flex-col text-center hover:cursor-pointer"
              onClick={handleNextClick}
              type="button"
            >
              <P3
                className="text-supportive-heavy"
                text={articles[activeIndex + 1].categoryLabel}
              />
              <H6
                className="text-gray-800"
                type={H6.Type.article}
                text={articles[activeIndex + 1].title}
              />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  )
}

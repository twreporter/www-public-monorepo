'use client'
import Link from 'next/link'
import { useMemo, useState, useContext } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/free-mode'
// @twreporters
import { Divider } from '@twreporter/react-typescript-components/lib/divider'
import { Title2 } from '@twreporter/react-typescript-components/lib/title-bar'
import LookBackCard from '@twreporter/react-typescript-components/lib/card/look-back'
import { TextButton } from '@twreporter/react-typescript-components/lib/button'
import { Arrow } from '@twreporter/react-typescript-components/lib/icons'
// components
import EmptyBox from '@/components/my-reading/empty-box'
import type { ReviewingArticle } from '@/components/my-reading/types'
// constants
import { INTERNAL_ROUTES } from '@/constants/routes'
// context
import { BaseContext } from '@/contexts'

type ReviewingArticleSectionProps = {
  isLoading: boolean
  items: ReviewingArticle[]
}

export default function ReviewingArticleSection({
  isLoading,
  items,
}: ReviewingArticleSectionProps) {
  const { releaseBranch } = useContext(BaseContext)
  const [showMore, setShowMore] = useState(false)

  const showingItems = useMemo(() => {
    if (showMore) {
      return items
    }
    return items.slice(0, 3)
  }, [showMore, items])

  return (
    <section>
      <Title2 title="報導回顧" subtitle="和我們一起與議題持續對話" />
      {isLoading ? (
        <div className="mt-[24px] h-[120px] bg-gray-100 rounded-[8px] animate-pulse" />
      ) : items.length === 0 ? (
        <EmptyBox type="reviewing-article" />
      ) : (
        <>
          <div className="hidden tablet:flex flex-col mt-[24px]">
            {showingItems.map((item) => (
              <div key={item.slug} className="mb-[16px]">
                <Link href={`${INTERNAL_ROUTES.article}/${item.slug}`}>
                  <LookBackCard
                    title={item.title}
                    reviewWord={item?.reviewWord}
                    ogDescription={item.ogDescription}
                    bgImage={item.bgImage}
                  />
                </Link>
                <Divider className="mt-[16px]" />
              </div>
            ))}
            {!showMore && items.length > 3 ? (
              <TextButton
                className="w-full flex justify-center item-center text-gray-800"
                text="展開更多"
                size={TextButton.Size.l}
                rightIconComponent={
                  <Arrow
                    direction={Arrow.Direction.down}
                    releaseBranch={releaseBranch}
                  />
                }
                onClick={() => setShowMore(true)}
              />
            ) : null}
          </div>
          <div className="tablet:hidden mt-[24px] w-screen ml-[-24px]">
            <Swiper
              modules={[FreeMode]}
              freeMode
              slidesPerView="auto"
              spaceBetween={24}
              slidesOffsetBefore={24}
              slidesOffsetAfter={24}
            >
              {items.map((item) => (
                <SwiperSlide
                  key={item.slug}
                  className="!w-[75vw] max-w-[400px]"
                >
                  <Link href={`${INTERNAL_ROUTES.article}/${item.slug}`}>
                    <LookBackCard
                      title={item.title}
                      reviewWord={item?.reviewWord}
                      ogDescription={item.ogDescription}
                      bgImage={item.bgImage}
                    />
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </>
      )}
    </section>
  )
}

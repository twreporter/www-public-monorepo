'use client'
import { type FC, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import clsx from 'clsx'
// react-typescript-components
import { H1 } from '@twreporter/react-typescript-components/lib/text/heading'
import { Title2 } from '@twreporter/react-typescript-components/lib/title-bar'
// components
import FirstTopic from '@/components/topics/components/first-topic'
import TopicItem from '@/components/topics/components/topic-item'
import Pagination from '@/components/pagination'
// types
import type { TopicData } from '@/type/topic'
// utils
import { formatDate } from '@/utils/date-formatters'
import { getImageLink } from '@/utils/get-image-link'
// constants
import { TOPICS_PER_PAGE } from '@/constants'
import { INTERNAL_ROUTES } from '@/constants/routes'

type TopicsProps = {
  topics: TopicData[]
  topicsCount: number
  currentPage: number
}

// TODO: empty state
export const Topics: FC<TopicsProps> = ({
  topics,
  topicsCount,
  currentPage,
}) => {
  const router = useRouter()

  const totalPage = useMemo(
    () => Math.ceil(topicsCount / TOPICS_PER_PAGE),
    [topicsCount]
  )

  const buildUrl = (page: number) => {
    const p = Math.max(1, Math.min(page, Math.max(1, totalPage)))
    return `${INTERNAL_ROUTES.topics}?page=${p}`
  }

  const handleClickPage = (selectedPage: number) => {
    router.push(buildUrl(selectedPage))
  }

  const handleClickPrev = () => {
    router.push(buildUrl(currentPage - 1))
  }

  const handleClickNext = () => {
    router.push(buildUrl(currentPage + 1))
  }

  const isFirstPage = currentPage === 1

  return (
    <div
      className={clsx(
        'flex flex-col mx-auto px-[24px]',
        'tablet:w-[698px] tablet:px-0',
        'desktop:w-[922px]',
        'hd:w-[1130px]'
      )}
    >
      {isFirstPage ? (
        <>
          <H1 className="text-gray-800" text="深度專題" />
          <Title2 className="pt-[24px]" title={'最新專題'} />
          {topics.length > 0 ? (
            <div className="mt-[24px] mb-[48px]">
              <FirstTopic topic={topics[0]} />
            </div>
          ) : (
            <div className="mt-[24px] mb-[48px] text-gray-500">
              No topics available.
            </div>
          )}
          <Title2 title={'所有專題'} />
          <div className="flex flex-col gap-[48px] my-[24px]">
            {topics.slice(1).map((topic) => (
              <TopicItem
                key={topic.slug}
                title={topic.title}
                description={topic?.ogDescription || undefined}
                slug={topic.slug}
                imageUrl={
                  topic.heroImage ? getImageLink(topic.heroImage) : undefined
                }
                lastUpdatedAt={formatDate(topic.updatedAt, 'YYYY.MM.DD')}
              />
            ))}
          </div>
        </>
      ) : (
        <>
          <Title2 title={'所有專題'} />
          <div className="flex flex-col gap-[48px] my-[24px]">
            {topics.map((topic) => (
              <TopicItem
                key={topic.slug}
                title={topic.title}
                description={topic?.ogDescription || undefined}
                slug={topic.slug}
                imageUrl={
                  topic.heroImage ? getImageLink(topic.heroImage) : undefined
                }
                lastUpdatedAt={formatDate(topic.updatedAt, 'YYYY.MM.DD')}
              />
            ))}
          </div>
        </>
      )}
      <Pagination
        className="w-full flex justify-center items-center"
        currentPage={currentPage}
        totalPage={totalPage}
        handleClickPage={handleClickPage}
        handleClickPrev={handleClickPrev}
        handleClickNext={handleClickNext}
      />
    </div>
  )
}

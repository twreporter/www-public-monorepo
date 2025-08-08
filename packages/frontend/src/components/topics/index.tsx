import clsx from 'clsx'
// react-typescript-components
import { H1 } from '@twreporter/react-typescript-components/lib/text/heading'
import { Title2 } from '@twreporter/react-typescript-components/lib/title-bar'
// components
import FirstTopic from '@/components/topics/components/first-topic'
import TopicItem from '@/components/topics/components/topic-item'
// types
import type { TopicData } from '@/fetchers/server/topic'
// utils
import { formatDate } from '@/utils/date-formatters'
import { getImageLink } from '@/utils/get-image-link'

type TopicsProps = {
  topics: TopicData[]
}

// TODO: component & pagination & empty state
export const Topics: React.FC<TopicsProps> = ({ topics }) => {
  return (
    <div
      className={clsx(
        'flex flex-col mx-auto',
        'tablet:w-[698px]',
        'desktop:w-[922px]',
        'hd:w-[1130px]'
      )}
    >
      <H1 className="text-gray-800" text="深度專題" />
      <Title2 className="pt-[24px]" title={'最新專題'} />
      {topics.length > 0 ? (
        <div className="my-[24px]">
          <FirstTopic topic={topics[0]} />
        </div>
      ) : (
        <div className="my-[24px] text-gray-500">No topics available.</div>
      )}
      {topics.length > 1 && (
        <>
          <Title2 title={'所有專題'} />
          <div className="my-[24px]">
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
      )}
    </div>
  )
}

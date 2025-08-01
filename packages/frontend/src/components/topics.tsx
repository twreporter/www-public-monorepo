// react-typescript-components
import { H1 } from '@twreporter/react-typescript-components/lib/text/heading'
import { Title2 } from '@twreporter/react-typescript-components/lib/title-bar'
import clsx from 'clsx'
// types
import type { TopicData } from '@/fetchers/server/topic'

type TopicsProps = {
  topics: TopicData[]
}

// TODO: componet & pageination
export const Topics: React.FC<TopicsProps> = ({ topics }) => {
  return (
    <div
      className={clsx(
        'flex w-full flex-col px-[24px] pt-[24px] pb-[64px] bg-gray-100',
        'tablet:pt-[32px] tablet:pb-[120px]',
        'desktop:pt-[64px]'
      )}
    >
      <H1 className="text-gray-800">深度專題</H1>
      <Title2 className="pt-[24px]" title={'最新專題'} />
      <div className="my-[24px]">
        <div className="flex flex-col gap-2">
          <h2>{topics[0].title}</h2>
          <p>{topics[0].ogDescription}</p>
        </div>
      </div>
      <Title2 title={'所有專題'} />
      <div className="my-[24px]">
        {topics.slice(1).map((topic) => (
          <div key={topic.slug} className="flex flex-col gap-2">
            <h2>{topic.title}</h2>
            <p>{topic.ogDescription}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

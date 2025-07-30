// types
import type { TopicData } from '@/fetchers/server/topic'

type TopicsProps = {
  topics: TopicData[]
}

export const Topics: React.FC<TopicsProps> = ({ topics }) => {
  return (
    <div className="flex w-full flex-col">
      <h1>深度專題</h1>
      {topics.map((topic) => (
        <div key={topic.slug} className="flex flex-col gap-2">
          <h2>{topic.title}</h2>
          <p>{topic.ogDescription}</p>
        </div>
      ))}
    </div>
  )
}

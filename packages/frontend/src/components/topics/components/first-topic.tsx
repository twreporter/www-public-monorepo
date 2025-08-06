import clsx from 'clsx'
import type React from 'react'
// components
import RelatedPost from '@/components/topics/components/related-post'
import TopicItem from '@/components/topics/components/topic-item'
// types
import type { TopicData } from '@/fetchers/server/topic'
// utils
import { formatDate } from '@/utils/date-formatters'
import { getImageLink } from '@/utils/get-image-link'

const FirstTopic: React.FC<{ topic: TopicData }> = ({ topic }) => {
  return (
    <div className="flex flex-col gap-[16px]">
      <TopicItem
        title={topic.title}
        description={topic?.ogDescription || undefined}
        slug={topic.slug}
        imageUrl={topic.heroImage ? getImageLink(topic.heroImage) : undefined}
        lastUpdatedAt={formatDate(topic.updatedAt, 'YYYY.MM.DD')}
      />
      <div
        className={clsx(
          'flex flex-col gap-2',
          'tablet:flex-row! tablet:justify-between'
        )}
      >
        {topic.posts.length
          ? topic.posts.map((post) => {
              return (
                <RelatedPost
                  className={clsx(
                    'py-[12px] px-[6px]',
                    'not-last:border-b-[1px] not-last:border-gray-300'
                  )}
                  key={post.slug}
                  title={post.title}
                  slug={post.slug}
                  imageUrl={
                    post.heroImage ? getImageLink(post.heroImage) : undefined
                  }
                />
              )
            })
          : null}
      </div>
    </div>
  )
}

export default FirstTopic

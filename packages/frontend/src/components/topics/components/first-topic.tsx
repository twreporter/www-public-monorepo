import clsx from 'clsx'
import type React from 'react'
// components
import RelatedPost from '@/components/topics/components/related-post'
import TopicItem from '@/components/topics/components/topic-item'
// types
import type { TopicData } from '@/type/topic'
// utils
import { formatDate } from '@/utils/date-formatters'
import { getImageLink } from '@/utils/get-image-link'

const FirstTopic: React.FC<{ topic: TopicData }> = ({ topic }) => {
  return (
    <div className="flex flex-col gap-[24px]">
      <TopicItem
        title={topic.title}
        description={topic?.ogDescription || undefined}
        slug={topic.slug}
        imageUrl={topic.heroImage ? getImageLink(topic.heroImage) : undefined}
        lastUpdatedAt={formatDate(topic.updatedAt, 'YYYY.MM.DD')}
      />
      <div
        className={clsx(
          'flex flex-col gap-[12px]',
          'tablet:flex-row! tablet:justify-between'
        )}
      >
        {topic.posts.length > 0
          ? topic.posts.map((post) => {
              return (
                <RelatedPost
                  className={clsx(
                    '[&:not(:last-child)]:border-b-[1px] [&:not(:last-child)]:border-gray-300 [&:not(:last-child)]:pb-[12px]',
                    'tablet:[&:not(:last-child)]:pb-0'
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

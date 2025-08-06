import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import type React from 'react'
// react-typescript-components
import { H1 } from '@twreporter/react-typescript-components/lib/text/heading'
import {
  P1,
  P2,
} from '@twreporter/react-typescript-components/lib/text/paragraph'

// TODO: handle image loading or no image
export type TopicItemProps = {
  title: string
  description?: string
  slug: string
  imageUrl?: string
  lastUpdatedAt: string
  className?: string
}
const TopicItem: React.FC<TopicItemProps> = ({
  title,
  description,
  slug,
  imageUrl,
  lastUpdatedAt,
  className = '',
}) => {
  return (
    <Link
      href={`/topics/${slug}`}
      className={clsx(
        'hover:opacity-70',
        'transition-opacity duration-200 ease-linear',
        className
      )}
    >
      <div className={clsx('flex flex-row gap-[24px]')}>
        <div
          className={clsx(
            'relative',
            'w-[150px] h-[200px]',
            'tablet:w-[164px] tablet:h-[206px]'
          )}
        >
          {imageUrl && (
            <Image
              className="object-cover"
              fill={true}
              src={imageUrl}
              alt={title}
            />
          )}
        </div>
        <div className="flex flex-col">
          <H1 className="text-gray-900" text={title} type={H1.Type.article} />
          <P2
            className="text-gray-900 py-[16px] font-bold"
            text={`最後更新 ${lastUpdatedAt}`}
          />
          {description ? (
            <P1
              className={clsx('text-gray-900 hidden!', 'tablet:flex!')}
              text={description}
            />
          ) : null}
        </div>
      </div>
      <div className={clsx('flex mt-[12px]', 'tablet:hidden!')}>
        <P1 className="text-gray-900" text={description} />
      </div>
    </Link>
  )
}

export default TopicItem

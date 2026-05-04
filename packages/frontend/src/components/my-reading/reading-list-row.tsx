'use client'
import type { FC } from 'react'
import Link from 'next/link'
// @twreporters
import ArticleCard from '@twreporter/react-typescript-components/lib/card/article'
// types
import type { ReadingListItem } from '@/components/my-reading/types'
// constants
import { INTERNAL_ROUTES } from '@/constants/routes'

type ReadingListRowProps = {
  item: ReadingListItem
  desktopSize?: typeof ArticleCard.Size.l | typeof ArticleCard.Size.s
  mobileSize?: typeof ArticleCard.Size.l | typeof ArticleCard.Size.s
}

const ReadingListRow: FC<ReadingListRowProps> = ({
  item,
  desktopSize = ArticleCard.Size.l,
  mobileSize = ArticleCard.Size.s,
}: ReadingListRowProps) => {
  return (
    <Link
      href={`${INTERNAL_ROUTES.article}/${encodeURIComponent(item.slug)}`}
      className="block no-underline"
    >
      <div className="desktop:hidden">
        <ArticleCard
          title={item.title}
          description={item.description}
          categoryLabel={item.category}
          publishedDate={item.publishedDate}
          image={{ src: item.image, alt: item.title }}
          size={mobileSize}
        />
      </div>
      <div className="hidden desktop:block">
        <ArticleCard
          title={item.title}
          description={item.description}
          categoryLabel={item.category}
          publishedDate={item.publishedDate}
          image={{ src: item.image, alt: item.title }}
          size={desktopSize}
        />
      </div>
    </Link>
  )
}

export default ReadingListRow

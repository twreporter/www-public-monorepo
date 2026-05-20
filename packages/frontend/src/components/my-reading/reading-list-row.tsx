'use client'
import type { FC } from 'react'
import Link from 'next/link'
// @twreporters
import ArticleCard from '@twreporter/react-typescript-components/lib/card/article'
// types
import type { ReadingListItem } from '@/components/my-reading/types'
// constants
import { INTERNAL_ROUTES } from '@/constants/routes'
// utils
import { formatDate } from '@/utils/date-formatters'

type ReadingListRowProps = {
  item: ReadingListItem
  desktopSize?: typeof ArticleCard.Size.l | typeof ArticleCard.Size.s
  mobileSize?: typeof ArticleCard.Size.l | typeof ArticleCard.Size.s
  onBookmarkClick?: () => void
}

const ReadingListRow: FC<ReadingListRowProps> = ({
  item,
  desktopSize = ArticleCard.Size.l,
  mobileSize = ArticleCard.Size.s,
  onBookmarkClick,
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
          publishedDate={formatDate(item.publishedDate, 'YYYY/M/DD')}
          image={{ src: item.image, alt: item.title }}
          size={mobileSize}
          isBookmark={item.isBookmark}
          showIsBookmarked={!!onBookmarkClick}
          onBookmarkClick={onBookmarkClick}
        />
      </div>
      <div className="hidden desktop:block">
        <ArticleCard
          title={item.title}
          description={item.description}
          categoryLabel={item.category}
          publishedDate={formatDate(item.publishedDate, 'YYYY/M/DD')}
          image={{ src: item.image, alt: item.title }}
          size={desktopSize}
          isBookmark={item.isBookmark}
          showIsBookmarked={!!onBookmarkClick}
          onBookmarkClick={onBookmarkClick}
        />
      </div>
    </Link>
  )
}

export default ReadingListRow

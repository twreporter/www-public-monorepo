import Link from 'next/link'
import ArticleCard from '@twreporter/react-typescript-components/lib/card/article'
import type { ReadingListItem } from '@/components/my-reading/types'
import { INTERNAL_ROUTES } from '@/constants/routes'

type ReadingListRowProps = {
  item: ReadingListItem
  desktopSize?: typeof ArticleCard.Size.l | typeof ArticleCard.Size.s
}

export default function ReadingListRow({
  item,
  desktopSize = ArticleCard.Size.l,
}: ReadingListRowProps) {
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
          size={ArticleCard.Size.s}
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

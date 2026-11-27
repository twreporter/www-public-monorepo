import clsx from 'clsx'
import Link from 'next/link'
import { H6 } from '@twreporter/react-typescript-components/lib/text/heading'
import ImageWithSkeleton from '@/components/image-with-skeleton'
import { INTERNAL_ROUTES } from '@/constants/routes'
import { Style } from '@/enums/article'
import type { RelatedArticle } from '@/types/article-detail'
import { articleDate, articleImageUrl } from '../lexical/data'

type RelatedArticleCardProps = {
  post: RelatedArticle
  className?: string
}

export default function RelatedArticleCard({
  post,
  className,
}: RelatedArticleCardProps) {
  const image = articleImageUrl(post.ogImage)
  const date = articleDate(post.publishedDate)
  const route =
    post.style === Style.INTERACTIVE
      ? INTERNAL_ROUTES.interactiveArticle
      : INTERNAL_ROUTES.article

  return (
    <Link
      href={`${route}/${encodeURIComponent(post.slug)}`}
      className={clsx(
        'group flex w-full min-w-0 items-center gap-4 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--article-link)]',
        'desktop:flex-col desktop:items-start desktop:gap-2.5',
        className
      )}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-1 desktop:order-2 desktop:w-full desktop:flex-none">
        <H6
          text={post.title}
          type={H6.Type.article}
          className="w-full break-words text-[var(--article-primary)] transition-colors group-hover:text-[var(--article-link)] group-focus-visible:text-[var(--article-link)]"
        />
        {date && (
          <time
            dateTime={post.publishedDate}
            className="font-default text-sm leading-normal text-[var(--article-card-date)]"
          >
            {date}
          </time>
        )}
      </div>
      <div className="size-20 shrink-0 overflow-hidden bg-[var(--article-placeholder)] desktop:order-1 desktop:aspect-[296/197] desktop:h-auto desktop:w-full">
        {image && (
          <ImageWithSkeleton
            src={image}
            alt={post.ogImage?.name || ''}
            width={592}
            height={394}
            sizes="(min-width: 1440px) 296px, (min-width: 1024px) 25vw, 80px"
            className="h-full w-full object-cover"
          />
        )}
      </div>
    </Link>
  )
}

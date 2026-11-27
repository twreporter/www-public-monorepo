import clsx from 'clsx'
import Link from 'next/link'
import { H1 } from '@twreporter/react-typescript-components/lib/text/heading'
import { P2 } from '@twreporter/react-typescript-components/lib/text/paragraph'
import { INTERNAL_ROUTES } from '@/constants/routes'
import { Style } from '@/enums/article'
import type { ArticleDetail } from '@/types/article-detail'
import { articleImageUrl } from '../lexical/data'
import Lexical, { contentNodes } from '../lexical/rich-text'
import HeroImage from './image'

type HeroProps = {
  article: Pick<
    ArticleDetail,
    | 'title'
    | 'subtitle'
    | 'style'
    | 'relatedTopics'
    | 'heroImage'
    | 'heroEmbedded'
    | 'heroCaption'
  >
  className?: string
}

export default function Hero({ article, className }: HeroProps) {
  const topic = article.relatedTopics[0]
  const image = articleImageUrl(article.heroImage)
  const isEmbedded = article.style === Style.EMBEDDED
  const hasMedia = isEmbedded
    ? contentNodes(article.heroEmbedded).length > 0
    : Boolean(image)

  const heading = (
    <div className="col-span-4 flex min-w-0 max-w-[624px] flex-col items-start gap-4 tablet:col-span-10 tablet:col-start-2 desktop:col-span-8 desktop:col-start-3 hd:col-span-6 hd:col-start-4">
      {topic && (
        <Link
          href={`${INTERNAL_ROUTES.topics}/${encodeURIComponent(topic.slug)}`}
          className="max-w-full border border-[var(--article-link)] p-2.5 text-[var(--article-link)] hover:bg-[var(--article-link)] hover:text-gray-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--article-link)]"
        >
          <P2 text={topic.title} className="break-words" />
        </Link>
      )}
      <div className="flex w-full flex-col gap-3 break-words text-[var(--article-emphasis)]">
        {article.subtitle && (
          <p className="font-default text-[18px] font-bold leading-normal desktop:text-[22px]">
            {article.subtitle}
          </p>
        )}
        <H1 text={article.title} type={H1.Type.article} className="w-full" />
      </div>
      {isEmbedded && hasMedia && article.heroCaption && (
        <p className="w-full break-words font-default text-sm leading-normal text-[var(--article-secondary)] desktop:text-base">
          {article.heroCaption}
        </p>
      )}
    </div>
  )

  return (
    <header
      className={clsx(
        'mx-auto grid w-full max-w-[1440px] grid-cols-4 items-start gap-x-6 gap-y-8 px-6 pt-12',
        'tablet:grid-cols-12 tablet:gap-y-10 tablet:px-8',
        'desktop:gap-x-8 desktop:border-b desktop:border-[var(--article-divider)] desktop:px-12 desktop:py-14 hd:px-20 hd:pt-16',
        className
      )}
    >
      {!isEmbedded && heading}
      {hasMedia && (
        <figure className="col-span-4 flex min-w-0 flex-col gap-4 tablet:col-span-12 desktop:col-span-10 desktop:col-start-2">
          <div className="-mx-6 tablet:mx-0">
            {isEmbedded ? (
              <div className="w-full [&_.article-embed>iframe]:aspect-[3/2] [&_.article-embed>iframe]:h-auto [&_.article-embed>iframe]:w-full [&_.article-embed>iframe]:border-0">
                <Lexical value={article.heroEmbedded} />
              </div>
            ) : (
              image && (
                <HeroImage
                  key={image}
                  src={image}
                  alt={article.heroImage?.name || article.title}
                />
              )
            )}
          </div>
          {!isEmbedded && article.heroCaption && (
            <figcaption className="break-words font-default text-sm leading-normal text-[var(--article-secondary)] tablet:px-4 desktop:text-base">
              {article.heroCaption}
            </figcaption>
          )}
        </figure>
      )}
      {isEmbedded && heading}
    </header>
  )
}

'use client'

import { useId, useState } from 'react'
import clsx from 'clsx'
import { PillButton } from '@twreporter/react-typescript-components/lib/button'
import type { RelatedArticle } from '@/types/article-detail'
import RelatedArticleCard from './card'
import type { ArticleTheme } from '../theme'

const PAGE_SIZE = 6

type RelatedArticlesProps = {
  posts: RelatedArticle[]
  className?: string
  theme?: ArticleTheme
}

export default function RelatedArticles({
  posts,
  className,
  theme = 'normal',
}: RelatedArticlesProps) {
  const [take, setTake] = useState(PAGE_SIZE)
  const titleId = useId()
  const listId = useId()

  return (
    <section
      id="related-articles"
      aria-labelledby={titleId}
      className={clsx(
        'mx-auto grid w-full max-w-[1440px] grid-cols-4 gap-x-6 gap-y-8 px-6 pb-14 text-[var(--article-primary)]',
        'tablet:grid-cols-12 tablet:px-8 tablet:pb-16',
        'desktop:gap-x-8 desktop:gap-y-10 desktop:px-12 desktop:pb-[120px] hd:px-20',
        className
      )}
    >
      <div className="col-span-4 tablet:col-span-10 tablet:col-start-2 desktop:col-span-3 desktop:col-start-1 desktop:row-start-1 desktop:max-w-[296px]">
        <div
          aria-hidden="true"
          className="hidden h-3 w-full bg-[var(--article-divider)] [mask-image:url(/images/article/related-articles/title-divider-desktop.svg)] [mask-size:100%_100%] desktop:block hd:[mask-image:url(/images/article/related-articles/title-divider-hd.svg)]"
        />
        <h2
          id={titleId}
          className="font-default text-base font-bold leading-normal desktop:pt-2"
        >
          相關文章
        </h2>
      </div>
      <div className="col-span-4 tablet:col-span-10 tablet:col-start-2 desktop:col-span-9 desktop:col-start-4 desktop:row-start-1">
        {posts.length ? (
          <ul
            id={listId}
            className="grid grid-cols-1 gap-6 desktop:grid-cols-3 desktop:gap-8"
          >
            {posts.slice(0, take).map((post) => (
              <li key={post.id} className="min-w-0">
                <RelatedArticleCard post={post} />
                <div
                  aria-hidden="true"
                  className="mt-6 h-px w-full bg-[var(--article-divider)] desktop:hidden"
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className="font-default text-base leading-normal">
            目前沒有相關文章。
          </p>
        )}
      </div>
      {take < posts.length && (
        <div className="col-span-4 flex justify-center tablet:col-span-10 tablet:col-start-2 desktop:col-span-9 desktop:col-start-4 desktop:row-start-2">
          <PillButton
            text="載入更多文章"
            theme={theme}
            size={PillButton.Size.l}
            type={PillButton.Type.secondary}
            style={PillButton.Style.dark}
            className="w-full! max-w-[480px] justify-center border! desktop:w-[136px]!"
            onClick={() => setTake((current) => current + PAGE_SIZE)}
          />
        </div>
      )}
    </section>
  )
}

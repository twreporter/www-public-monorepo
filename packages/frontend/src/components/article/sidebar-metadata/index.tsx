import clsx from 'clsx'
import Link from 'next/link'
import { P2 } from '@twreporter/react-typescript-components/lib/text/paragraph'
import { INTERNAL_ROUTES } from '@/constants/routes'
import type { ArticleCredit, ArticleDetail } from '@/types/article-detail'
import { articleDate } from '../lexical/data'
import styles from './sidebar-metadata.module.css'

type SidebarMetadataProps = {
  article: Pick<
    ArticleDetail,
    'subcategories' | 'publishedDate' | 'authorsJSON' | 'authors' | 'tags'
  >
  className?: string
}

const EDITORIAL_ROLES = new Set(['核稿', '責任編輯'])
const linkClass =
  'rounded-sm hover:text-[var(--article-tag-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--article-link)]'

function MetadataDivider({
  position,
}: {
  position: 'top' | 'middle' | 'bottom'
}) {
  return (
    <div
      aria-hidden="true"
      className={clsx(styles.divider, styles[position])}
    />
  )
}

export default function SidebarMetadata({
  article,
  className,
}: SidebarMetadataProps) {
  const credits = article.authorsJSON ?? []
  const roles = [...new Set(credits.map(({ role }) => role))]
  const contributorRoles = roles.filter((role) => !EDITORIAL_ROLES.has(role))
  const editorialRoles = roles.filter((role) => EDITORIAL_ROLES.has(role))
  const date = articleDate(article.publishedDate)

  const renderContributor = (credit: ArticleCredit) => {
    const author = article.authors.find(({ id }) => id === credit.id)
    return author?.slug && credit.type === 'link' ? (
      <Link
        href={`${INTERNAL_ROUTES.author}/${encodeURIComponent(author.slug)}`}
        className={clsx(linkClass, 'underline decoration-[0.05em]')}
      >
        {credit.name}
      </Link>
    ) : (
      credit.name
    )
  }

  return (
    <div
      className={clsx(
        styles.container,
        'w-full min-w-0 font-default font-normal leading-normal',
        className
      )}
    >
      {article.subcategories.length > 0 && (
        <>
          <MetadataDivider position="top" />
          <div className="flex flex-col pt-2 pb-4 text-base text-[var(--article-link)]">
            {article.subcategories.map(({ slug, name, category }) => (
              <div key={slug} className={styles.category}>
                {category ? (
                  <>
                    <Link
                      href={`${INTERNAL_ROUTES.category}/${encodeURIComponent(category.slug)}`}
                      className={clsx(linkClass, 'font-bold')}
                    >
                      {category.name}
                    </Link>
                    <Link
                      href={`${INTERNAL_ROUTES.category}/${encodeURIComponent(category.slug)}/${encodeURIComponent(slug)}`}
                      className={linkClass}
                    >
                      {name}
                    </Link>
                  </>
                ) : (
                  <span className="col-span-2">{name}</span>
                )}
              </div>
            ))}
          </div>
        </>
      )}
      <MetadataDivider position="middle" />
      <div className="flex flex-col gap-8 pt-2 pb-4">
        {(date || credits.length > 0) && (
          <div className="flex flex-col gap-3">
            {date && (
              <p className="flex flex-wrap items-center gap-x-4 text-sm text-[var(--article-meta)]">
                <span>刊出日期</span>
                <time dateTime={article.publishedDate}>{date}</time>
              </p>
            )}
            {contributorRoles.map((role) => (
              <div key={role} className="flex items-center gap-1">
                <P2
                  text={role}
                  className="shrink-0 text-[var(--article-tertiary)]"
                />
                <span className="shrink-0 text-sm text-[var(--article-link)]">
                  ／
                </span>
                <div className="flex min-w-0 flex-1 flex-wrap items-center gap-[5px] text-base text-[var(--article-link)]">
                  {credits
                    .filter((credit) => credit.role === role)
                    .map((credit, index) => (
                      <span
                        key={`${credit.id ?? credit.name}-${index}`}
                        className="max-w-full break-words"
                      >
                        {renderContributor(credit)}
                      </span>
                    ))}
                </div>
              </div>
            ))}
            {editorialRoles.length > 0 && (
              <p className="break-words text-sm text-[var(--article-tertiary)]">
                {editorialRoles.map((role, roleIndex) => (
                  <span key={role}>
                    {roleIndex > 0 && '；'}
                    {role}／
                    {credits
                      .filter((credit) => credit.role === role)
                      .map((credit, index) => (
                        <span key={`${credit.id ?? credit.name}-${index}`}>
                          {index > 0 && '、'}
                          {renderContributor(credit)}
                        </span>
                      ))}
                  </span>
                ))}
              </p>
            )}
          </div>
        )}
        {article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2.5">
            {article.tags.map(({ slug, name }) => (
              <Link
                key={slug}
                href={`${INTERNAL_ROUTES.tag}/${encodeURIComponent(slug)}`}
                className="max-w-full rounded-full border border-[var(--article-tertiary)] px-2.5 py-[5px] text-[var(--article-tertiary)] hover:border-[var(--article-tag-hover)] hover:text-[var(--article-tag-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--article-link)]"
              >
                <P2 text={`#${name}`} className="break-words" />
              </Link>
            ))}
          </div>
        )}
      </div>
      <MetadataDivider position="bottom" />
    </div>
  )
}

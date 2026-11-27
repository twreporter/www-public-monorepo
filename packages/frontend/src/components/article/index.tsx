import clsx from 'clsx'
import { SiteArticleTheme } from '@/contexts/article-theme'
import { getArticleTheme, getArticleThemeStyle } from './theme'
import type { ArticleDetail } from '@/types/article-detail'
import { rwdGridContainerClass } from '@/styles/layout'
import { ARTICLE_RELATED_POST_ANCHOR_ID } from '@/constants/anchor'
import { INTERNAL_ROUTES } from '@/constants/routes'
import Lexical, { contentNodes } from './lexical/rich-text'
import ArticleToolbar from './toolbar'
import Hero from './hero'
import RelatedArticles from './related-articles'
import SupportBox from './support-box'
import Copyright from './copyright'
import SidebarMetadata from './sidebar-metadata'
import { articleLayout as styles } from './layout-classes'

function ArticleDivider({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={clsx(
        'block h-6 bg-[var(--article-divider)] [mask-image:url(/images/article/divider-mobile.svg)] [mask-size:100%_100%] tablet:h-[27px] tablet:[mask-image:url(/images/article/divider.svg)]',
        className
      )}
    />
  )
}

export default function ArticlePage({ article }: { article: ArticleDetail }) {
  const theme = getArticleTheme(article.style)
  const topic = article.relatedTopics[0]
  const topicHref = topic
    ? `${INTERNAL_ROUTES.topics}/${encodeURIComponent(topic.slug)}`
    : undefined
  const hasBrief = contentNodes(article.brief).length > 0

  return (
    <article
      id="article"
      data-article-theme={theme}
      style={getArticleThemeStyle(theme)}
      className={styles.page}
    >
      <SiteArticleTheme theme={theme} />
      <Hero article={article} />
      <div className={clsx(rwdGridContainerClass, styles.body)}>
        <div className={styles.sidebar}>
          <aside className={styles.sidebarGroup} aria-label="文章資訊">
            <SidebarMetadata article={article} />
          </aside>
          <div className={styles.toolbarTrack}>
            <div className={styles.stickyToolbar}>
              <ArticleToolbar title={article.title} />
            </div>
          </div>
          <aside className={styles.sidebarGroup} aria-label="文末文章資訊">
            <SidebarMetadata article={article} />
          </aside>
        </div>
        <div className={styles.reading}>
          <aside className={styles.metadataTop} aria-label="文章資訊">
            <SidebarMetadata article={article} />
          </aside>
          {hasBrief && (
            <>
              <div className={styles.brief}>
                <Lexical value={article.brief} />
              </div>
              <ArticleDivider className={styles.divider} />
            </>
          )}
          <div className={styles.prose}>
            <Lexical value={article.content} />
          </div>
          <aside className={styles.metadataBottom} aria-label="文末文章資訊">
            <SidebarMetadata article={article} />
          </aside>
        </div>
        <div className={styles.support}>
          <SupportBox />
        </div>
        <div className={styles.copyright} id={ARTICLE_RELATED_POST_ANCHOR_ID}>
          <Copyright
            license={article.copyright}
            publishedDate={article.publishedDate}
            createdAt={article.createdAt}
          />
        </div>
        <ArticleDivider className={styles.endDivider} />
      </div>
      <RelatedArticles posts={article.relatedPosts} theme={theme} />
      <ArticleToolbar title={article.title} topic={topicHref} mobile />
    </article>
  )
}

'use client'
import { type FC, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import clsx from 'clsx'
// stores
import { useLatestStore } from '@/stores/latest'
// fetchers
import useLatestPosts from '@/fetchers/latest'
// constants
import { POSTS_PER_PAGE } from '@/constants'
import { INTERNAL_ROUTES } from '@/constants/routes'
// react-typescript-components
import { TitleTab } from '@twreporter/react-typescript-components/lib/title-bar'
import { Divider } from '@twreporter/react-typescript-components/lib/divider'
import { PillButton } from '@twreporter/react-typescript-components/lib/button'
import ArticleCard from '@twreporter/react-typescript-components/lib/card/article'
// utils
import { formatDate } from '@/utils/date-formatters'
// styles
import {
  rwdGridOuterClass,
  rwdGridContainerClass,
  rwdGridInnerClass,
  rwdGridChildFullClass,
} from '@/styles/layout'

type LatestTab = {
  slug: string
  name: string
}

type LatestProps = {
  tabs: LatestTab[]
}

export const Latest: FC<LatestProps> = ({ tabs }) => {
  const searchParams = useSearchParams()
  const currentTagSlug = searchParams.get('tag')

  const { articles, hasMore, currentTag, setArticles, appendArticles, reset } =
    useLatestStore()
  const [skip, setSkip] = useState(0)
  const lastSyncedKeyRef = useRef<string>('')

  // Build TitleTab tabs array
  const titleTabs = [
    { text: '所有文章', isExternal: false, link: INTERNAL_ROUTES.latest },
    ...tabs.map((tab) => ({
      text: tab.name,
      isExternal: false,
      link: `${INTERNAL_ROUTES.latest}?tag=${tab.slug}`,
    })),
  ]

  // Determine active tab index
  const activeTabIndex = currentTagSlug
    ? tabs.findIndex((t) => t.slug === currentTagSlug) + 1
    : 0

  // Reset store when tag changes
  useEffect(() => {
    reset(currentTagSlug)
    setSkip(0)
    lastSyncedKeyRef.current = ''
  }, [currentTagSlug, reset])

  // SWR fetch
  const {
    posts: fetchedPosts,
    isLoading,
    error,
  } = useLatestPosts({
    tagSlug: currentTagSlug,
    take: POSTS_PER_PAGE,
    skip,
  })
  const hasError = Boolean(error)

  // Sync SWR data into Zustand store
  useEffect(() => {
    if (isLoading || hasError || fetchedPosts === undefined) return
    const key = `${currentTagSlug ?? 'all'}-${skip}`
    if (lastSyncedKeyRef.current === key) return
    lastSyncedKeyRef.current = key

    if (skip === 0) {
      setArticles(fetchedPosts, currentTagSlug)
    } else {
      appendArticles(fetchedPosts)
    }
  }, [
    fetchedPosts,
    isLoading,
    hasError,
    skip,
    currentTagSlug,
    setArticles,
    appendArticles,
  ])

  // Derive display articles to avoid stale data flash on tab switch
  const displayArticles = currentTag === currentTagSlug ? articles : []

  const handleLoadMore = () => {
    if (isLoading || hasError || !hasMore) return
    setSkip((prev) => prev + POSTS_PER_PAGE)
  }

  return (
    <div className={clsx(rwdGridOuterClass)}>
      <div className={clsx(rwdGridContainerClass)}>
        <div className={clsx(rwdGridInnerClass)}>
          <div className={clsx(rwdGridChildFullClass)}>
            <TitleTab
              title="最新"
              tabs={titleTabs}
              activeTabIndex={activeTabIndex}
            />
          </div>
          {displayArticles.map((article) => (
            <div
              key={article.slug}
              className={clsx(rwdGridChildFullClass, 'flex flex-col pt-[24px]')}
            >
              {/* Tablet and below: size S */}
              <div className="desktop:hidden">
                <Link
                  href={`${INTERNAL_ROUTES.article}/${article.slug}`}
                  className="no-underline"
                >
                  <ArticleCard
                    title={article.title}
                    description={article.subtitle ?? ''}
                    categoryLabel={article.category}
                    publishedDate={formatDate(
                      article.publishedDate,
                      'YYYY-MM-DD'
                    )}
                    image={article.image}
                    size={ArticleCard.Size.s}
                  />
                </Link>
              </div>
              {/* Desktop and above: size L */}
              <div className="hidden desktop:block">
                <Link
                  href={`${INTERNAL_ROUTES.article}/${article.slug}`}
                  className="no-underline"
                >
                  <ArticleCard
                    title={article.title}
                    description={article.subtitle ?? ''}
                    categoryLabel={article.category}
                    publishedDate={formatDate(
                      article.publishedDate,
                      'YYYY-MM-DD'
                    )}
                    image={article.image}
                    size={ArticleCard.Size.l}
                  />
                </Link>
              </div>
              <Divider className="mt-[24px]" />
            </div>
          ))}
          {isLoading ? (
            <div className={clsx(rwdGridChildFullClass, 'flex flex-col')}>
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex flex-col pt-[24px]">
                  {/* Tablet and below: size S */}
                  <div className="desktop:hidden">
                    <ArticleCard size={ArticleCard.Size.s} isLoading />
                  </div>
                  {/* Desktop and above: size L */}
                  <div className="hidden desktop:block">
                    <ArticleCard size={ArticleCard.Size.l} isLoading />
                  </div>
                  <Divider className="mt-[24px]" />
                </div>
              ))}
            </div>
          ) : null}
          {hasError ? (
            <div
              className={clsx(
                rwdGridChildFullClass,
                'w-full flex justify-center mt-[24px] pt-[24px] pb-[64px]',
                'desktop:pt-[32px] desktop:pb-[120px]'
              )}
            >
              {/* TODO: error page not implemented */}
              文章載入失敗，請稍後再試。
            </div>
          ) : hasMore && !isLoading ? (
            <div
              className={clsx(
                rwdGridChildFullClass,
                'w-full flex justify-center pt-[48px] pb-[64px]',
                'desktop:pt-[64px] desktop:pb-[120px]'
              )}
            >
              <button
                onClick={handleLoadMore}
                type="button"
                className="w-full max-w-[480px]"
              >
                <PillButton
                  text="載入更多"
                  style={PillButton.Style.dark}
                  type={PillButton.Type.primary}
                  size={PillButton.Size.l}
                  className="w-full flex justify-center"
                />
              </button>
            </div>
          ) : (
            <div className={clsx(rwdGridChildFullClass, 'h-[120px]')} />
          )}
        </div>
      </div>
    </div>
  )
}

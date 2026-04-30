'use client'
import { type FC, useEffect } from 'react'
import clsx from 'clsx'
import { useMyReadingStore } from '@/stores/my-reading'
import ArticleTrackingSection from '@/components/my-reading/article-tracking-section'
import SavedBookmarksSection from '@/components/my-reading/saved-bookmarks-section'
import BrowsingHistorySection from '@/components/my-reading/browsing-history-section'
import ReviewingArticleSection from '@/components/my-reading/reviewing-article-section'

import { H2 } from '@twreporter/react-typescript-components/lib/text/heading'

export const MyReading: FC = () => {
  const {
    hydrateWithFakeData,
    isTrackingLoading,
    isBookmarksLoading,
    isHistoryLoading,
    isReviewingLoading,
    trackingArticles,
    savedBookmarks,
    browsingHistory,
    reviewingArticles,
  } = useMyReadingStore()

  useEffect(() => {
    hydrateWithFakeData()
  }, [hydrateWithFakeData])

  return (
    <div className="w-full overflow-hidden">
      <div
        className={clsx(
          'w-full px-[24px] pb-[120px]',
          'tablet:grid tablet:grid-cols-12 tablet:gap-x-[24px] tablet:px-[32px]',
          'desktop:gap-x-[32px] desktop:px-[48px]',
          'hd:w-[1280px] hd:mx-auto hd:px-0'
        )}
      >
        <div className={clsx('w-full', 'tablet:col-start-2 tablet:col-end-12')}>
          <H2 className="text-gray-800 mb-[24px]" text="我的閱讀" />

          <div className="pb-[24px]">
            <ArticleTrackingSection
              isLoading={isTrackingLoading}
              trackingArticles={trackingArticles}
            />
          </div>

          <div className="pb-[24px]">
            <SavedBookmarksSection
              isLoading={isBookmarksLoading}
              items={savedBookmarks}
            />
          </div>

          <div className="pb-[24px]">
            <BrowsingHistorySection
              isLoading={isHistoryLoading}
              items={browsingHistory}
            />
          </div>

          <div className="pb-[24px]">
            <ReviewingArticleSection
              isLoading={isReviewingLoading}
              items={reviewingArticles}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

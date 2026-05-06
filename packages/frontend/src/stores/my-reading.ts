import { create } from 'zustand'
import {
  fakeBrowsingHistory,
  fakeReviewingArticles,
  fakeSavedBookmarks,
  fakeTrackingArticles,
} from '@/components/my-reading/fake-data'
import type {
  ReadingListItem,
  ReviewingArticle,
  TrackingArticle,
} from '@/components/my-reading/types'

type MyReadingState = {
  isHydrated: boolean
  isTrackingLoading: boolean
  isBookmarksLoading: boolean
  isHistoryLoading: boolean
  isReviewingLoading: boolean
  trackingArticles: TrackingArticle[]
  savedBookmarks: ReadingListItem[]
  browsingHistory: ReadingListItem[]
  reviewingArticles: ReviewingArticle[]
  hydrateWithFakeData: () => void
  toggleBookmark: (slug: string) => void
}

export const useMyReadingStore = create<MyReadingState>((set, get) => ({
  isHydrated: false,
  isTrackingLoading: false,
  isBookmarksLoading: false,
  isHistoryLoading: false,
  isReviewingLoading: false,
  trackingArticles: [],
  savedBookmarks: [],
  browsingHistory: [],
  reviewingArticles: [],

  hydrateWithFakeData: () => {
    if (get().isHydrated) {
      return
    }

    set({
      isTrackingLoading: true,
      isBookmarksLoading: true,
      isHistoryLoading: true,
      isReviewingLoading: true,
    })

    setTimeout(() => {
      set({
        trackingArticles: fakeTrackingArticles,
        savedBookmarks: fakeSavedBookmarks,
        browsingHistory: fakeBrowsingHistory,
        reviewingArticles: fakeReviewingArticles,
        isTrackingLoading: false,
        isBookmarksLoading: false,
        isHistoryLoading: false,
        isReviewingLoading: false,
        isHydrated: true,
      })
    }, 250)
  },

  toggleBookmark: (slug: string) => {
    set((state) => ({
      savedBookmarks: state.savedBookmarks.map((item) =>
        item.slug === slug ? { ...item, isBookmark: !item.isBookmark } : item
      ),
    }))
  },
}))

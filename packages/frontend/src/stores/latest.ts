import { create } from 'zustand'
import type { ArticleMeta } from '@/types/article'
import { POSTS_PER_PAGE } from '@/constants'

type LatestState = {
  articles: ArticleMeta[]
  hasMore: boolean
  currentTag: string | null
  setArticles: (articles: ArticleMeta[], tag: string | null) => void
  appendArticles: (newArticles: ArticleMeta[]) => void
  reset: (tag: string | null) => void
}

export const useLatestStore = create<LatestState>((set) => ({
  articles: [],
  hasMore: false,
  currentTag: null,

  setArticles: (articles, tag) =>
    set({
      articles,
      hasMore: articles.length >= POSTS_PER_PAGE,
      currentTag: tag,
    }),

  appendArticles: (newArticles) =>
    set((state) => ({
      articles: [...state.articles, ...newArticles],
      hasMore: newArticles.length >= POSTS_PER_PAGE,
    })),

  reset: (tag) =>
    set({
      articles: [],
      hasMore: false,
      currentTag: tag,
    }),
}))

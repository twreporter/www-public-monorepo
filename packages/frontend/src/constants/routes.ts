import type { ValuesOf } from '@twreporter/react-typescript-components/lib/types'

const myReadingPath = '/myreading'

export const INTERNAL_ROUTES = {
  home: '/',
  article: '/a',
  interactiveArticle: '/i',
  tag: '/tag',
  category: '/categories',
  topics: '/topics',
  latest: '/latest',
  myReading: myReadingPath,
  savedBookmark: `${myReadingPath}/saved`,
  browsingHistory: `${myReadingPath}/history`,
} as const

export type InternalRoutes = ValuesOf<typeof INTERNAL_ROUTES>

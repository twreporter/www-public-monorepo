import type { ValuesOf } from '@twreporter/react-typescript-components/lib/types'

const myReadingPath = '/myreading'
const articlePath = '/a'

export const INTERNAL_ROUTES = {
  home: '/',
  article: articlePath,
  interactiveArticle: '/i',
  tag: '/tag',
  category: '/categories',
  topics: '/topics',
  latest: '/latest',
  myReading: myReadingPath,
  savedBookmark: `${myReadingPath}/saved`,
  browsingHistory: `${myReadingPath}/history`,
  podcast: `${articlePath}/podcast-list`,
  photography: '/photography',
} as const

export type InternalRoutes = ValuesOf<typeof INTERNAL_ROUTES>

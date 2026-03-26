import type { ValuesOf } from '@twreporter/react-typescript-components/lib/types'

export const INTERNAL_ROUTES = {
  home: '/',
  article: '/a',
  interactiveArticle: '/i',
  tag: '/tag',
  category: '/categories',
  topics: '/topics',
  latest: '/latest',
} as const

export type InternalRoutes = ValuesOf<typeof INTERNAL_ROUTES>

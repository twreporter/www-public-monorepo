import type { ValuesOf } from '../types'

export const THEME = {
  normal: 'normal',
  photography: 'photography',
  transparent: 'transparent',
  index: 'index',
} as const

export type Theme = ValuesOf<typeof THEME>

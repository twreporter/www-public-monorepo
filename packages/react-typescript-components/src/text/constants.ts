import type { ValuesOf } from '../types'

export const TYPE = {
  default: 'default',
  article: 'article',
} as const

export type Type = ValuesOf<typeof TYPE>

export const WEIGHT = {
  extraLight: 'extra-light',
  normal: 'normal',
  bold: 'bold',
} as const

export type Weight = ValuesOf<typeof WEIGHT>

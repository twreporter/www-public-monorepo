import type { ValuesOf } from '../types'

export const DIRECTION = {
  horizontal: 'horizontal',
  vertical: 'vertical',
} as const

export type Direction = ValuesOf<typeof DIRECTION>

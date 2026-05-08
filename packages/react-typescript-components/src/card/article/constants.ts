import type { ValuesOf } from '../../types'

export const SIZE = {
  s: 's',
  l: 'l',
} as const

export type Size = ValuesOf<typeof SIZE>

import type { ValuesOf } from '../types'

export const ICON_TYPE = {
  mask: 'mask',
  raw: 'raw',
} as const

export type IconType = ValuesOf<typeof ICON_TYPE>

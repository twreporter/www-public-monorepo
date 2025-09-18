import type { ValuesOf } from '../types'

export const ICON_TYPE = {
  mask: 'mask',
  raw: 'raw',
} as const

export type IconType = ValuesOf<typeof ICON_TYPE>

export const ARROW_DIRECTION = {
  right: 'right',
  left: 'left',
  up: 'up',
  down: 'down',
} as const

export type ArrowDirection = ValuesOf<typeof ARROW_DIRECTION>

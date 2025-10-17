import type { ValuesOf } from '../types'

// for text-field
export const TEXT_ALIGN = {
  left: 'left',
  center: 'center',
} as const
export type TextAlign = ValuesOf<typeof TEXT_ALIGN>

export const TEXT_STATE = {
  default: 'default',
  error: 'error',
  disabled: 'disabled',
} as const
export type TextState = ValuesOf<typeof TEXT_STATE>

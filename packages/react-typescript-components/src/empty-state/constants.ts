import type { ValuesOf } from '../types'

export const STYLE = {
  default: 'default',
  pencil: 'pencil',
  underConstruction: 'under_construction',
} as const

export type Style = ValuesOf<typeof STYLE>

export const BASE_GCS_DIR = 'https://www.twreporter.org/assets/empty-state'

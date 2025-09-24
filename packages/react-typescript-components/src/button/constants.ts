import type { ValuesOf } from '../types'

export const SIZE = {
  s: 's',
  l: 'l',
} as const

export type Size = ValuesOf<typeof SIZE>

export const STYLE = {
  brand: 'brand',
  dark: 'dark',
  light: 'light',
} as const

export type Style = ValuesOf<typeof STYLE>

export const TYPE = {
  primary: 'primary',
  secondary: 'secondary',
} as const

export type Type = ValuesOf<typeof TYPE>

import type { ValuesOf } from '../../types'

export const LOGO = {
  header: 'header',
  footer: 'footer',
  symbol: 'symbol',
  'loading-fallback': 'loading-fallback',
} as const

export type Logo = ValuesOf<typeof LOGO>

export const LOGO_TYPE = {
  default: 'default',
  white: 'white',
} as const

export type LogoType = ValuesOf<typeof LOGO_TYPE>

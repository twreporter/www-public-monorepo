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

export const LOGO_SYMBOL_TYPE = {
  default: 'default',
  white: 'white',
  black: 'black',
} as const

export type LogoSymbolType = ValuesOf<typeof LOGO_SYMBOL_TYPE>

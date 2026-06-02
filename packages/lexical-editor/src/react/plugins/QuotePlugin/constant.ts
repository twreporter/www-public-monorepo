export const WWW_QUOTE_LAYOUTS = ['default', 'blockquote'] as const
export type WwwQuoteLayout = (typeof WWW_QUOTE_LAYOUTS)[number]

export function isWwwQuoteLayout(value: unknown): value is WwwQuoteLayout {
  return WWW_QUOTE_LAYOUTS.includes(value as WwwQuoteLayout)
}

export const DEFAULT_QUOTE_CONTENT = '請直接編輯 Quote 內容'
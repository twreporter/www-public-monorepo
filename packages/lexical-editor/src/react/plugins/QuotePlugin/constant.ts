export const WWW_QUOTE_LAYOUTS = ['default', 'blockquote'] as const
export type wwwQuoteLayout = (typeof WWW_QUOTE_LAYOUTS)[number]

export function iswwwQuoteLayout(value: unknown): value is wwwQuoteLayout {
  return WWW_QUOTE_LAYOUTS.includes(value as wwwQuoteLayout)
}

export const DEFAULT_QUOTE_CONTENT = '請直接編輯 Quote 內容'
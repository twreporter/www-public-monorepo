import type { ArticlePhoto } from '@/types/article-detail'

export function articleImageUrl(photo?: ArticlePhoto): string | undefined {
  const url = photo?.imageFile?.url
  if (!url) return undefined
  if (/^https?:\/\//i.test(url)) return url
  const host = process.env.NEXT_PUBLIC_IMAGE_HOST
  return host ? `${host.replace(/\/$/, '')}/${url.replace(/^\//, '')}` : url
}

export function articleDate(value?: string): string {
  if (!value || Number.isNaN(Date.parse(value))) return ''
  // Locale punctuation/order can differ between the server and browser ICU data.
  const parts = new Intl.DateTimeFormat('en', {
    timeZone: 'Asia/Taipei',
    calendar: 'gregory',
    numberingSystem: 'latn',
    year: 'numeric',
    month: 'numeric',
    day: '2-digit',
  }).formatToParts(new Date(value))
  const part = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? ''
  return `${part('year')}/${part('month')}/${part('day')}`
}

export function safeContentUrl(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined
  const url = value.trim()
  // eslint-disable-next-line no-control-regex
  const hasControlChar = /[\u0000-\u001f\u007f]/.test(url)
  if (/^(https?:\/\/|mailto:|tel:|#|\/(?!\/))/i.test(url) && !hasControlChar) return url
  return undefined
}

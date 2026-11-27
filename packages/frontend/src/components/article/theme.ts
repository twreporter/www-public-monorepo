import type { CSSProperties } from 'react'
import { Style } from '@/enums/article'

export type ArticleTheme = 'normal' | 'photography'
export const getArticleTheme = (style?: string): ArticleTheme =>
  (style === Style.PHOTO) || (style === Style.PHOTOGRAPHY) ? 'photography' : 'normal'

const normal = {
  page: '#f1f1f1',
  placeholder: '#d8d8d8',
  primary: '#404040',
  emphasis: '#000000',
  secondary: '#808080',
  tertiary: '#808080',
  meta: '#9c9c9c',
  link: '#9f7544',
  quote: '#666666',
  'card-date': '#808080',
  gold: '#c09662',
  divider: '#cdcdcd',
  'box-surface': '#ffffff',
  'box-text': '#666666',
  'box-strong': '#262626',
  'box-highlight': '#e3be98',
  'box-border': '#f1f1f1',
  'annotation-body': '#000000',
  'annotation-quote': '#404040',
  'annotation-brief': '#404040',
  'annotation-box': '#262626',
  control: '#808080',
  'control-hover': '#404040',
  'tag-hover': '#9f7544',
  'toolbar-icon': '#808080',
  'social-surface': '#ffffff',
  'icon-filter': 'none',
}
const photography: typeof normal = {
  ...normal,
  page: '#08192d',
  placeholder: '#24364b',
  primary: '#cdcdcd',
  emphasis: '#ffffff',
  secondary: '#cdcdcd',
  link: '#c09662',
  quote: '#9c9c9c',
  'card-date': '#9c9c9c',
  divider: '#bbbbbb',
  'annotation-body': '#ffffff',
  'annotation-quote': '#cdcdcd',
  'annotation-brief': '#ffffff',
  control: '#bbbbbb',
  'control-hover': '#ffffff',
  'tag-hover': '#ffffff',
  'toolbar-icon': '#f1f1f1',
  'social-surface': '#24364b',
  'icon-filter': 'brightness(0) invert(0.945)',
}

export function getArticleThemeStyle(theme: ArticleTheme): CSSProperties {
  const colors = theme === 'photography' ? photography : normal
  const values: Record<string, string> = {}
  for (const [name, value] of Object.entries(colors))
    values[`--article-${name}`] = value
  for (const name of [
    'gold',
    'primary',
    'secondary',
    'tertiary',
    'box-text',
    'box-strong',
  ] as const) {
    values[`--article-underline-${name}`] =
      `color-mix(in srgb, ${colors[name]} 50%, transparent)`
  }
  return values as CSSProperties
}

// theme
import { THEME, type Theme } from '../../../constants/theme'
// type
import type { ClassArray } from 'clsx'
// constants
import { STYLE, type Style } from '../../constants'

type ThemeFunc = (theme: Theme, style?: Style) => ClassArray

export const getDisabledContainerTheme: ThemeFunc = (theme) => {
  return [
    // default theme
    'text-gray-400 hover:text-gray-400',
    // photography & transparent theme
    {
      'text-gray-500 hover:text-gray-500':
        theme === THEME.photography || theme === THEME.transparent,
    },
  ]
}

export const getActiveContainerTheme: ThemeFunc = (theme, style) => {
  return [
    // default theme
    {
      'text-gray-800 hover:text-gray-800': style === STYLE.light,
      'text-brand-heavy hover:text-brand-heavy': style === STYLE.dark,
      'text-brand-dark hover:text-brand-dark': style === STYLE.brand,
    },
    // photography theme
    {
      'text-gray-400 hover:text-gray-400':
        theme === THEME.photography && style === STYLE.light,
      'text-supportive-pastel hover:text-supportive-pastel':
        theme === THEME.photography && style !== STYLE.light,
    },
    // transparent theme
    {
      'text-gray-black hover:text-gray-black':
        theme === THEME.transparent && style === STYLE.light,
      'text-gray-200 hover:text-gray-200':
        theme === THEME.transparent && style !== STYLE.light,
    },
  ]
}

export const getContainerTheme: ThemeFunc = (theme, style) => {
  return [
    // default theme
    {
      'text-gray-600 hover:text-gray-800': style === STYLE.light,
      'text-gray-800 hover:text-brand-heavy': style === STYLE.dark,
      'text-brand-heavy hover:text-brand-dark': style === STYLE.brand,
    },
    // photography
    {
      'text-gray-300 hover:text-gray-400':
        theme === THEME.photography && style === STYLE.light,
      'text-gray-white hover:text-supportive-pastel':
        theme === THEME.photography && style === STYLE.dark,
      'text-supportive-faded hover:text-supportive-pastel':
        theme === THEME.photography && style === STYLE.brand,
    },
    // transparent theme
    {
      'text-gray-800 hover:text-gray-black':
        theme === THEME.transparent && style === STYLE.light,
      'text-gray-white hover:text-gray-200':
        theme === THEME.transparent && style !== STYLE.light,
    },
  ]
}

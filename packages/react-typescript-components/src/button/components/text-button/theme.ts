// constants
import { THEME } from '../../constant'
// type
import type { Theme } from '../../constant'
import type { ClassArray } from 'clsx'
// enum
import { Style } from '../../enum'

type ThemeFunc = (theme: Theme, style?: Style) => ClassArray

export const getDisabledContainerTheme: ThemeFunc = (theme) => {
  return [
    // default theme
    'text-gray-400 hover:text-gray-400',
    // photography & transparent theme
    {
      'text-gray-500 hover:text-gray-500': theme === THEME.photography || theme === THEME.transparent,
    }
  ]
}

export const getActiveContainerTheme: ThemeFunc = (theme, style) => {
  return [
    // default theme
    {
      'text-gray-800 hover:text-gray-800': style === Style.LIGHT,
      'text-brand-heavy hover:text-brand-heavy': style === Style.DARK,
      'text-brand-dark hover:text-brand-dark': style === Style.BRAND,
    },
    // photography theme
    {
      'text-gray-400 hover:text-gray-400': theme === THEME.photography && style === Style.LIGHT,
      'text-supportive-pastel hover:text-supportive-pastel': theme === THEME.photography && style !== Style.LIGHT,
    },
    // transparent theme
    {
      'text-gray-black hover:text-gray-black': theme === THEME.transparent && style === Style.LIGHT,
      'text-gray-200 hover:text-gray-200': theme === THEME.transparent && style !== Style.LIGHT,
    },
  ]
}

export const getContainerTheme: ThemeFunc = (theme, style) => {
  return [
    // default theme
    {
      'text-gray-600 hover:text-gray-800': style === Style.LIGHT,
      'text-gray-800 hover:text-brand-heavy': style === Style.DARK,
      'text-brand-heavy hover:text-brand-dark': style === Style.BRAND,
    },
    // photography
    {
      'text-gray-300 hover:text-gray-400': theme === THEME.photography && style === Style.LIGHT,
      'text-gray-white hover:text-supportive-pastel': theme === THEME.photography && style === Style.DARK,
      'text-supportive-faded hover:text-supportive-pastel': theme === THEME.photography && style === Style.BRAND,
    },
    // transparent theme
    {
      'text-gray-800 hover:text-gray-black': theme === THEME.transparent && style === Style.LIGHT,
      'text-gray-white hover:text-gray-200': theme === THEME.transparent && style !== Style.LIGHT,
    },
  ]
}
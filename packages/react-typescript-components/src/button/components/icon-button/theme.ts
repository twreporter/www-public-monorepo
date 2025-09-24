// constants
import { THEME, type Theme } from '../../../constants/theme'
// type
import type { ClassArray } from 'clsx'

type ThemeFunc = (
  theme: Theme,
  active: boolean,
  disabled: boolean
) => ClassArray

export const getPrimaryIconButtonTheme: ThemeFunc = (
  theme,
  active,
  disabled
) => {
  if (disabled) {
    return ['text-gray-400 hover:text-gray-400']
  }
  return [
    // default theme
    'text-gray-600 hover:text-gray-800 [&>svg]:bg-gray-600 desktop:[&>svg]:hover:bg-gray-800',
    {
      'text-brand-heavy hover:text-brand-heavy [&>svg]:bg-brand-heavy desktop:[&>svg]:hover:bg-brand-heavy':
        theme === THEME.normal && active,
    },
    // photography theme
    {
      'text-gray-white hover:text-supportive-pastel [&>svg]:bg-gray-white [&>svg]:hover:bg-supportive-pastel':
        theme === THEME.photography && !active,
      'text-supportive-pastel hover:text-supportive-pastel [&>svg]:bg-supportive-pastel [&>svg]:hover:bg-supportive-pastel':
        theme === THEME.photography && active,
    },
    // transparent theme
    {
      'text-gray-white hover:text-gray-200 [&>svg]:bg-gray-white [&>svg]:hover:bg-gray-200':
        theme === THEME.transparent && !active,
      'text-gray-white hover:text-gray-white [&>svg]:bg-gray-white [&>svg]:hover:bg-gray-white':
        theme === THEME.transparent && active,
    },
  ]
}

export const getSecondaryIconButtonTheme: ThemeFunc = (
  theme,
  active,
  disabled
) => {
  if (disabled) {
    return ['text-gray-400 hover:text-gray-400']
  }
  return [
    // default theme
    'text-gray-400 hover:text-gray-600 [&>svg]:bg-gray-400 [&>svg]:hover:bg-gray-600',
    {
      'text-brand-heavy hover:text-brand-heavy [&>svg]:bg-brand-heavy [&>svg]:hover:bg-brand-heavy':
        theme === THEME.normal && active,
    },
    // photography theme
    {
      'text-gray-400 hover:text-supportive-pastel [&>svg]:bg-gray-400 [&>svg]:hover:bg-supportive-pastel':
        theme === THEME.photography && !active,
      'text-supportive-pastel hover:text-supportive-pastel [&>svg]:bg-supportive-pastel [&>svg]:hover:bg-supportive-pastel':
        theme === THEME.photography && active,
    },
    // transparent theme
    {
      'text-gray-600 hover:text-gray-white [&>svg]:bg-gray-600 [&>svg]:hover:bg-gray-white':
        theme === THEME.transparent && !active,
      'text-gray-600 hover:text-gray-600 [&>svg]:bg-gray-600 [&>svg]:hover:bg-gray-600':
        theme === THEME.transparent && active,
    },
  ]
}

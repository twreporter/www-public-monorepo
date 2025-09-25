import { THEME, type Theme } from '../constants/theme'

export const selectTabBarTheme = (theme: Theme) => {
  switch (theme) {
    case THEME.photography:
      return {
        bgColor: 'bg-photo-dark',
      }
    default:
      return {
        bgColor: 'bg-gray-100',
      }
  }
}

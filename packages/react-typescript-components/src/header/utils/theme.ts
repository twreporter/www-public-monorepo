import { THEME, type Theme } from '../../constants/theme'
import { LOGO_TYPE } from '../../logo/constants'

export const selectLogoType = (theme: Theme) => {
  switch (theme) {
    case THEME.photography:
    case THEME.transparent:
      return LOGO_TYPE.white
    default:
      return LOGO_TYPE.default
  }
}

export const selectHeaderTheme = (theme: Theme) => {
  switch (theme) {
    case THEME.photography:
      return {
        bgColor: 'bg-photo-dark',
        topRowBgColor: 'bg-photo-dark',
      }
    case THEME.transparent:
      return {
        bgColor: 'bg-opacity-black-02',
        topRowBgColor: 'bg-transparent',
      }
    case THEME.index:
      return {
        bgColor: 'bg-gray-white',
        topRowBgColor: 'bg-gray-white',
      }
    default:
      return {
        bgColor: 'bg-gray-100',
        topRowBgColor: 'bg-gray-100',
      }
  }
}

export const selectSloganTheme = (theme: Theme) => {
  switch (theme) {
    case THEME.photography:
    case THEME.transparent:
      return 'text-gray-white'
    default:
      return 'text-gray-800'
  }
}

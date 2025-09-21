import { THEME, type Theme } from '../../constants/theme'
// logo
import { LOGO_SYMBOL_TYPE } from '../../logo/enum'

export const selectHamburgerMenuTheme = (theme: Theme) => {
  switch (theme) {
    case THEME.photography:
      return {
        bgColor: 'bg-photo-dark',
        scrollBarColor: 'scrollbar-thumb-opacity-white-08',
      }
    default:
      return {
        bgColor: 'bg-gray-white',
        scrollBarColor: 'scrollbar-thumb-opacity-black-02',
      }
  }
}

export const selectLogoType = (theme: Theme) => {
  switch (theme) {
    case THEME.photography:
    case THEME.transparent:
      return LOGO_SYMBOL_TYPE.white
    default:
      return LOGO_SYMBOL_TYPE.default
  }
}

export const selectHamburgerItemTheme = (theme: Theme, active = false) => {
  switch (theme) {
    case THEME.photography:
      return {
        color: active ? 'text-supportive-pastel' : 'text-gray-white',
        svgBgColor: active
          ? '[&>svg]:bg-supportive-pastel'
          : '[&>svg]:bg-gray-white',
        hoverBgColor: 'hover:bg-opacity-white-02',
        activeBgColor: 'active:bg-opacity-white-05',
      }
    default:
      return {
        color: active ? 'text-brand-heavy' : 'text-gray-800',
        svgBgColor: active ? '[&>svg]:bg-brand-heavy' : '[&>svg]:bg-gray-800',
        hoverBgColor: 'hover:bg-gray-100',
        activeBgColor: 'active:bg-gray-200',
      }
  }
}

export const selectHamburgerFooterTheme = (theme: Theme) => {
  switch (theme) {
    case THEME.photography:
      return {
        color: 'text-gray-400',
        hoverColor: 'hover:text-gray-400',
        hoverBgColor: 'hover:bg-opacity-white-02',
        svgHoverBgColor: 'hover:[&>svg]:bg-gray-400',
        svgBgColor: '[&>svg]:bg-gray-400',
        activeColor: 'active:text-gray-400',
        activeBgColor: 'active:bg-opacity-white-05',
        svgActiveBgColor: 'active:[&>svg]:bg-gray-400',
      }
    default:
      return {
        color: 'text-gray-600',
        hoverColor: 'hover:text-gray-800',
        hoverBgColor: 'hover:bg-gray-100',
        svgHoverBgColor: 'hover:[&>svg]:bg-gray-800',
        svgBgColor: '[&>svg]:bg-gray-600',
        activeColor: 'active:text-gray-800',
        activeBgColor: 'active:bg-gray-200',
        svgActiveBgColor: 'active:[&>svg]:bg-gray-800',
      }
  }
}

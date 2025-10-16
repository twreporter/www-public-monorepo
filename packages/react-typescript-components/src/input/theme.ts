import { THEME, type Theme } from '../constants/theme'

export const selectThemeStyle = (theme: Theme) => {
  switch (theme) {
    case THEME.photography:
      return {
        bgColor: 'bg-opacity-white-08',
        focusBgColor: 'focus:bg-gray-100',
        desktopBgColor: 'desktop:bg-gray-100',
        borderColor: 'border-supportive-pastel',
        color: 'text-gray-800',
        focusColor: 'focus:text-gray-800',
        placeholderColor: '[&::placeholder]:text-gray-800',
      }
    case THEME.transparent:
      return {
        bgColor: 'bg-opacity-gray100-08',
        focusBgColor: 'focus:bg-opacity-gray100-08',
        desktopBgColor: 'desktop:bg-gray-white',
        borderColor: 'border-gray-600',
        color: 'text-gray-800',
        focusColor: 'focus:text-gray-800',
        placeholderColor: '[&::placeholder]:text-gray-500',
      }
    default:
      return {
        bgColor: 'bg-opacity-gray100-08',
        focusBgColor: 'focus:bg-opacity-gray100-08',
        desktopBgColor: 'desktop:bg-gray-white',
        borderColor: 'border-gray-600',
        color: 'text-gray-800',
        focusColor: 'focus:text-gray-800',
        placeholderColor: '[&::placeholder]:text-gray-500',
      }
  }
}

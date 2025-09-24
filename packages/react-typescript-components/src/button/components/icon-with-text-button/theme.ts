import { THEME, type Theme } from '../../../constants/theme'

export const getIconWithTextButtonTheme = (
  theme: Theme,
  isActive: boolean,
  isDisabled: boolean
) => {
  if (isDisabled) {
    return {
      color: 'text-gray-400',
      hoverColor: 'hover:text-gray-400',
      svgBgColor: '[&>svg]:bg-gray-400',
      svgHoverBgColor: '[&>svg]:hover:bg-gray-400',
    }
  }

  const switchKey = isActive ? `${theme}-active` : theme
  switch (switchKey) {
    case THEME.photography:
      return {
        color: 'text-gray-200',
        hoverColor: 'hover:text-supportive-pastel',
        svgBgColor: '[&>svg]:bg-gray-200',
        svgHoverBgColor: '[&>svg]:hover:bg-supportive-pastel',
      }
    case `${THEME.photography}-active`:
      return {
        color: 'text-supportive-pastel',
        hoverColor: 'hover:text-supprotive-pastel',
        svgBgColor: '[&>svg]:bg-supportive-pastel',
        svgHoverBgColor: '[&>svg]:hover:supportive-pastel',
      }
    case THEME.transparent:
      return {
        color: 'text-gray-100',
        hoverColor: 'hover:text-gray-200',
        svgBgColor: '[&>svg]:bg-gray-100',
        svgHoverBgColor: '[&>svg]:hover:bg-gray-200',
      }
    case `${THEME.transparent}-active`:
      return {
        color: 'text-gray-white',
        hoverColor: 'hover:text-gray-white',
        svgBgColor: '[&>svg]:bg-gray-white',
        svgHoverBgColor: '[&>svg]:hover:bg-gray-white',
      }
    case `${THEME.normal}-active`:
      return {
        color: 'text-brand-heavy',
        hoverColor: 'hover:text-brand-heavy',
        svgBgColor: '[&>svg]:bg-brand-heavy',
        svgHoverBgColor: '[&>svg]:hover:bg-brand-heavy',
      }
    default:
      return {
        color: 'text-gray-600',
        hoverColor: 'hover:text-brand-heavy',
        svgBgColor: '[&>svg]:bg-gray-600',
        svgHoverBgColor: '[&>svg]:hover:bg-brand-heavy',
      }
  }
}

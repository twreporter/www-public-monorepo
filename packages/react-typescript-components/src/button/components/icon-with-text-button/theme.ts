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
      svgBgColor: '[&_svg]:bg-gray-400',
      svgHoverBgColor: '[&_svg]:hover:bg-gray-400',
    }
  }

  const switchKey = isActive ? `${theme}-active` : theme
  switch (switchKey) {
    case THEME.photography:
      return {
        color: 'text-gray-200',
        hoverColor: 'hover:text-supportive-pastel',
        svgBgColor: '[&_svg]:bg-gray-200',
        svgHoverBgColor: '[&_svg]:hover:bg-supportive-pastel',
      }
    case `${THEME.photography}-active`:
      return {
        color: 'text-supportive-pastel',
        hoverColor: 'hover:text-supportive-pastel',
        svgBgColor: '[&_svg]:bg-supportive-pastel',
        svgHoverBgColor: '[&_svg]:hover:bg-supportive-pastel',
      }
    case THEME.transparent:
      return {
        color: 'text-gray-100',
        hoverColor: 'hover:text-gray-200',
        svgBgColor: '[&_svg]:bg-gray-100',
        svgHoverBgColor: '[&_svg]:hover:bg-gray-200',
      }
    case `${THEME.transparent}-active`:
      return {
        color: 'text-gray-white',
        hoverColor: 'hover:text-gray-white',
        svgBgColor: '[&_svg]:bg-gray-white',
        svgHoverBgColor: '[&_svg]:hover:bg-gray-white',
      }
    case `${THEME.normal}-active`:
      return {
        color: 'text-brand-heavy',
        hoverColor: 'hover:text-brand-heavy',
        svgBgColor: '[&_svg]:bg-brand-heavy',
        svgHoverBgColor: '[&_svg]:hover:bg-brand-heavy',
      }
    default:
      return {
        color: 'text-gray-600',
        hoverColor: 'hover:text-brand-heavy',
        svgBgColor: '[&_svg]:bg-gray-600',
        svgHoverBgColor: '[&_svg]:hover:bg-brand-heavy',
      }
  }
}

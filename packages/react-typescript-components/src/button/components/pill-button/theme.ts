import { THEME, type Theme } from '../../../constants/theme'
import { STYLE, type Style } from '../../enum'

export const getFilledPillButtonTheme = (
  theme: Theme,
  disabled: boolean,
  style: Style
) => {
  if (disabled) {
    switch (theme) {
      case THEME.transparent:
        switch (style) {
          case STYLE.light:
            return {
              color: 'text-gray-white',
              bgColor: 'bg-gray-400',
              hoverColor: 'hover:text-gray-white',
              hoverBgColor: 'hover:bg-gray-400',
              borderColor: 'border-gray-400',
              svgBgColor: '[&>svg]:bg-gray-white',
              borderHoverColor: 'hover:border-gray-400',
              svgHoverBgColor: 'hover:[&>svg]:bg-gray-white',
            }
          default:
            return {
              color: 'text-gray-700',
              bgColor: 'bg-gray-500',
              hoverColor: 'hover:text-gray-700',
              hoverBgColor: 'hover:bg-gray-500',
              borderColor: 'border-gray-500',
              svgBgColor: '[&>svg]:bg-gray-700',
              borderHoverColor: 'hover:border-gray-500',
              svgHoverBgColor: 'hover:[&>svg]:bg-gray-500',
            }
        }
      case THEME.photography:
        return {
          color: 'text-gray-700',
          bgColor: 'bg-gray-500',
          hoverColor: 'hover:text-gray-700',
          hoverBgColor: 'hover:bg-gray-500',
          borderColor: 'border-gray-500',
          svgBgColor: '[&>svg]:bg-gray-700',
          borderHoverColor: 'hover:border-gray-500',
          svgHoverBgColor: 'hover:[&>svg]:bg-gray-700',
        }
      default:
        return {
          color: 'text-gray-white',
          bgColor: 'bg-gray-400',
          hoverColor: 'hover:text-gray-white',
          hoverBgColor: 'hover:bg-gray-400',
          borderColor: 'border-gray-400',
          svgBgColor: '[&>svg]:bg-gray-white',
          borderHoverColor: 'hover:border-gray-400',
          svgHoverBgColor: 'hover:[&>svg]:bg-gray-white',
        }
    }
  }
  switch (theme) {
    case THEME.photography:
      switch (style) {
        case STYLE.dark:
          return {
            color: 'text-phote-dark',
            bgColor: 'bg-gray-white',
            hoverColor: 'hover:text-photo-dark',
            hoverBgColor: 'hover:bg-gray-200',
            borderColor: 'border-gray-white',
            svgBgColor: '[&>svg]:bg-photo-dark',
            borderHoverColor: 'hover:border-gray-200',
            svgHoverBgColor: 'hover:[&>svg]:bg-photo-dark',
          }
        case STYLE.light:
          return {
            color: 'text-phote-dark',
            bgColor: 'bg-gray-gray300',
            hoverColor: 'hover:text-photo-dark',
            hoverBgColor: 'hover:bg-gray-400',
            borderColor: 'border-gray-300',
            svgBgColor: '[&>svg]:bg-photo-dark',
            borderHoverColor: 'hover:border-gray-400',
            svgHoverBgColor: 'hover:[&>svg]:bg-photo-dark',
          }
        default:
          return {
            color: 'text-phote-dark',
            bgColor: 'bg-supportive-faded',
            hoverColor: 'hover:text-photo-dark',
            hoverBgColor: 'hover:bg-supportive-pastel',
            borderColor: 'border-supportive-faded',
            svgBgColor: '[&>svg]:bg-phote-dark',
            borderHoverColor: 'hover:border-supportive-pastel',
            svgHoverBgColor: 'hover:[&>svg]:bg-photo-dark',
          }
      }
    case THEME.transparent:
      switch (style) {
        case STYLE.dark:
          return {
            color: 'text-gray-800',
            bgColor: 'bg-gray-300',
            hoverColor: 'hover:text-gray-800',
            hoverBgColor: 'hovver:bg-gray-400',
            borderColor: 'border-gray-300',
            svgBgColor: '[&>svg]:bg-gray-800',
            borderHoverColor: 'hover:border-gray-400',
            svgHoverBgColor: 'hover:[&>svg]:bg-gray-800',
          }
        case STYLE.light:
          return {
            color: 'text-gray-white',
            bgColor: 'bg-gray-800',
            hoverColor: 'hover:text-gray-white',
            hoverBgColor: 'hover:bg-gray-black',
            borderColor: 'border-gray-800',
            svgBgColor: '[&>svg]:bg-gray-white',
            borderHoverColor: 'hover:border-gray-black',
            svgHoverBgColor: 'hover:[&>svg]:bg-gray-white',
          }
        default:
          return {
            color: 'text-gray-800',
            bgColor: 'bg-gray-white',
            hoverColor: 'hover:text-gray-800',
            hoverBgColor: 'hover:bg-gray-200',
            borderColor: 'border-gray-white',
            svgBgColor: '[&>svg]:bg-gray-800',
            borderHoverColor: 'hover:border-gray-200',
            svgHoverBgColor: 'hover:[&>svg]:bg-gray-800',
          }
      }
    default:
      switch (style) {
        case STYLE.dark:
          return {
            color: 'text-gray-white',
            bgColor: 'bg-gray-800',
            hoverColor: 'hover:text-gray-white',
            hoverBgColor: 'hover:bg-gray-black',
            borderColor: 'border-gray-800',
            svgBgColor: '[&>svg]:bg-gray-white',
            borderHoverColor: 'hover:border-gray-black',
            svgHoverBgColor: 'hover:[&>svg]:bg-gray-white',
          }
        case STYLE.light:
          return {
            color: 'text-gray-800',
            bgColor: 'bg-gray-white',
            hoverColor: 'hover:text-gray-800',
            hoverBgColor: 'hover:bg-gray-200',
            borderColor: 'border-gray-white',
            svgBgColor: '[&>svg]:bg-gray-800',
            borderHoverColor: 'hover:border-gray-200',
            svgHoverBgColor: 'hover:[&>svg]:bg-gray-800',
          }
        default:
          return {
            color: 'text-gray-white',
            bgColor: 'bg-brand-heavy',
            hoverColor: 'hover:text-gray-white',
            hoverBgColor: 'hover:bg-brand-dark',
            borderColor: 'border-brand-heavy',
            svgBgColor: '[&>svg]:bg-gray-white',
            borderHoverColor: 'hover:border-brand-dark',
            svgHoverBgColor: 'hover:[&>svg]:bg-gray-white',
          }
      }
  }
}

export const getOutlinePillButtonTheme = (
  theme: Theme,
  disabled: boolean,
  style: Style
) => {
  if (disabled) {
    switch (theme) {
      case THEME.transparent:
        switch (style) {
          case STYLE.light:
            return {
              color: 'text-gray-400',
              bgColor: 'bg-gray-400',
              hoverColor: 'hover:text-gray-400',
              hoverBgColor: 'hover:bg-gray-400',
              borderColor: 'border-gray-400',
              svgBgColor: '[&>svg]:bg-gray-400',
              borderHoverColor: 'hover:border-gray-400',
              svgHoverBgColor: 'hover:[&>svg]:bg-gray-400',
            }
          default:
            return {
              color: 'text-gray-500',
              bgColor: 'bg-gray-500',
              hoverColor: 'hover:text-gray-500',
              hoverBgColor: 'hover:bg-gray-500',
              borderColor: 'border-gray-500',
              svgBgColor: '[&>svg]:bg-gray-500',
              borderHoverColor: 'hover:border-gray-500',
              svgHoverBgColor: 'hover:[&>svg]:bg-gray-500',
            }
        }
      case THEME.photography:
        return {
          color: 'text-gray-500',
          bgColor: 'bg-gray-500',
          hoverColor: 'hover:text-gray-500',
          hoverBgColor: 'hover:bg-gray-500',
          borderColor: 'border-gray-500',
          svgBgColor: '[&>svg]:bg-gray-500',
          borderHoverColor: 'hover:border-gray-500',
          svgHoverBgColor: 'hover:[&>svg]:bg-gray-500',
        }
      default:
        return {
          color: 'text-gray-400',
          bgColor: 'bg-gray-400',
          hoverColor: 'hover:text-gray-400',
          hoverBgColor: 'hover:bg-gray-400',
          borderColor: 'border-gray-400',
          svgBgColor: '[&>svg]:bg-gray-400',
          borderHoverColor: 'hover:border-gray-400',
          svgHoverBgColor: 'hover:[&>svg]:bg-gray-400',
        }
    }
  }

  switch (theme) {
    case THEME.photography:
      switch (style) {
        case STYLE.dark:
          return {
            color: 'text-gray-white',
            bgColor: 'bg-gray-white',
            hoverColor: 'hover:text-gray-200',
            hoverBgColor: 'hover:bg-gray-200',
            borderColor: 'border-gray-white',
            svgBgColor: '[&>svg]:bg-gray-white',
            borderHoverColor: 'hover:border-gray-200',
            svgHoverBgColor: 'hover:[&>svg]:bg-gray-200',
          }
        case STYLE.light:
          return {
            color: 'text-gray-300',
            bgColor: 'bg-gray-300',
            hoverColor: 'hover:text-gray-400',
            hoverBgColor: 'hover:bg-gray-400',
            borderColor: 'border-gray-300',
            svgBgColor: '[&>svg]:bg-gray-300',
            borderHoverColor: 'hover:border-gray-400',
            svgHoverBgColor: 'hover:[&>svg]:bg-gray-400',
          }
        default:
          return {
            color: 'text-supportive-faded',
            bgColor: 'bg-supportive-faded',
            hoverColor: 'hover:text-supportive-pastel',
            hoverBgColor: 'hover:bg-supportive-pastel',
            borderColor: 'border-supportive-faded',
            svgBgColor: '[&>svg]:bg-supportive-faded',
            borderHoverColor: 'hover:border-supportive-pastel',
            svgHoverBgColor: 'hover:[&>svg]:bg-supportive-pastel',
          }
      }
    case THEME.transparent:
      switch (style) {
        case STYLE.dark:
          return {
            color: 'text-gray-300',
            bgColor: 'bg-gray-300',
            hoverColor: 'hover:text-gray-400',
            hoverBgColor: 'hover:bg-gray-400',
            borderColor: 'border-gray-300',
            svgBgColor: '[&>svg]:bg-gray-300',
            borderHoverColor: 'hover:border-gray-400',
            svgHoverBgColor: 'hover:[&>svg]:bg-gray-400',
          }
        case STYLE.light:
          return {
            color: 'text-gray-800',
            bgColor: 'bg-gray-800',
            hoverColor: 'hover:text-gray-black',
            hoverBgColor: 'hover:bg-gray-black',
            borderColor: 'border-gray-800',
            svgBgColor: '[&>svg]:bg-gray-800',
            borderHoverColor: 'hover:border-gray-black',
            svgHoverBgColor: 'hover:[&>svg]:bg-gray-black',
          }
        default:
          return {
            color: 'text-gray-white',
            bgColor: 'bg-gray-white',
            hoverColor: 'hover:text-gray-200',
            hoverBgColor: 'hover:bg-gray-200',
            borderColor: 'border-gray-white',
            svgBgColor: '[&>svg]:bg-gray-white',
            borderHoverColor: 'hover:border-gray-200',
            svgHoverBgColor: 'hover:[&>svg]:bg-gray-200',
          }
      }
    default:
      switch (style) {
        case STYLE.dark:
          return {
            color: 'text-gray-800',
            bgColor: 'bg-gray-800',
            hoverColor: 'hover:text-gray-black',
            hoverBgColor: 'hover:bg-gray-black',
            borderColor: 'border-gray-800',
            svgBgColor: '[&>svg]:bg-gray-800',
            borderHoverColor: 'hover:border-gray-black',
            svgHoverBgColor: 'hover:[&>svg]:bg-gray-black',
          }
        case STYLE.light:
          return {
            color: 'text-gray-800',
            bgColor: 'bg-gray-white',
            hoverColor: 'hover:text-gray-800',
            hoverBgColor: 'hover:bg-gray-200',
            borderColor: 'border-gray-white',
            svgBgColor: '[&>svg]:bg-gray-800',
            borderHoverColor: 'hover:border-gray-200',
            svgHoverBgColor: 'hover:[&>svg]:bg-gray-800',
          }
        default:
          return {
            color: 'text-brand-heavy',
            bgColor: 'bg-brand-heavy',
            hoverColor: 'hover:text-brand-dark',
            hoverBgColor: 'hover:bg-brand-dark',
            borderColor: 'border-brand-heavy',
            svgBgColor: '[&>svg]:bg-brand-heavy',
            borderHoverColor: 'hover:border-brand-dark',
            svgHoverBgColor: 'hover:[&>svg]:bg-brand-dark',
          }
      }
  }
}

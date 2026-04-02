// type
import type { PostStyle } from "../types"
// @twreporter
import { colorGrayscale, colorSupportive, COLOR_PINK_ARTICLE } from "@twreporter/core/lib/constants/color"

export const getParagraphTheme = (style: PostStyle) => {
  if (style === 'photography') {
    return { color: colorGrayscale.gray300 }
  }
  return { color: colorGrayscale.gray800 }
}

export const getLinkTheme = (style: PostStyle) => {
  switch(style) {
    case 'pink':
      return {
        color: COLOR_PINK_ARTICLE.blue,
        borderColor: colorGrayscale.gray300,
        borderColorHover: COLOR_PINK_ARTICLE.blue,
      }
    case 'photography':
      return {
        color: colorSupportive.main,
        borderColor: colorGrayscale.gray400,
        borderColorHover: colorSupportive.main,
      }
    default:
      return {
        color: colorSupportive.heavy,
        borderColor: colorGrayscale.gray300,
        borderColorHover: colorSupportive.heavy,
      }
  }
}
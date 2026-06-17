import {
  colorBrand,
  colorGrayscale,
  colorSupportive,
} from '@twreporter/core/lib/constants/color'

export const basicColors = {
  text: [
    colorGrayscale.white,
    colorGrayscale.gray300,
    colorGrayscale.gray600,
    colorGrayscale.gray800,
    colorSupportive.main,
    colorSupportive.heavy,
    colorBrand.heavy,
  ],
  background: [
    colorGrayscale.gray300,
    colorGrayscale.gray600,
    colorGrayscale.gray800,
    colorSupportive.pastel,
    colorSupportive.main,
    colorSupportive.heavy,
    colorBrand.heavy,
  ],
}

export const resetColors = {
  text: colorGrayscale.gray800,
  background: 'transparent',
}

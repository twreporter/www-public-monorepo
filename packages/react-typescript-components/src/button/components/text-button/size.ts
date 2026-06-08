// constants
import { SIZE, type Size } from '../../constants'

export const getIconSizeStyle = (size: Size) => {
  switch (size) {
    case SIZE.l:
      return '[&_svg]:h-[24px] [&_svg]:w-[24px]'
    default:
      return '[&_svg]:h-[18px] [&_svg]:w-[18px]'
  }
}

export default { getIconSizeStyle }

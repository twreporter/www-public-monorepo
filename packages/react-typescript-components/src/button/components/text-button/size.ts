// constants
import { SIZE, type Size } from '../../constants'

export const getIconSizeStyle = (size: Size) => {
  switch (size) {
    case SIZE.l:
      return '[&>svg]:h-[24px] [&>svg]:w-[24px]'
    default:
      return '[&>svg]:h-[18px] [&>svg]:w-[18px]'
  }
}

export default { getIconSizeStyle }

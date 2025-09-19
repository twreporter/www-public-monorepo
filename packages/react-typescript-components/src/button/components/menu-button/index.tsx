import type React from 'react'
import clsx from 'clsx'
// P1
import { P1 } from '../../../text/paragraph'
import { WEIGHT, type Weight } from '../../../text/enum'

type MenuButtonProps = {
  text: string
  color: string
  fontWeight: Weight
  hoverBgColor: string
  activeBgColor: string
  paddingLeft?: string
  paddingRight?: string
  className?: string
}
const MenuButton: React.FC<MenuButtonProps> & { FontWeight: typeof WEIGHT } = ({
  text,
  color,
  fontWeight,
  hoverBgColor,
  activeBgColor,
  paddingLeft = '',
  paddingRight = '',
  className = '',
}) => {
  return (
    <div className={clsx('cursor-pointer', color, className)}>
      <P1
        text={text}
        weight={fontWeight}
        className={clsx(
          'py-[8px]',
          hoverBgColor,
          activeBgColor,
          paddingLeft,
          paddingRight
        )}
      />
    </div>
  )
}
MenuButton.FontWeight = WEIGHT

export default MenuButton

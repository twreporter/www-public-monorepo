import type React from 'react'
import clsx from 'clsx'
// P1
import { P1 } from '../../../text/paragraph'
import { WEIGHT, type Weight } from '../../../text/constants'

type MenuButtonProps = {
  text: string
  color: string
  fontWeight: Weight
  className?: string
  p1ClassName?: string
}
const MenuButton: React.FC<MenuButtonProps> & { FontWeight: typeof WEIGHT } = ({
  text,
  color,
  fontWeight,
  className = '',
  p1ClassName = '',
}) => {
  return (
    <div className={clsx('cursor-pointer', color, className)}>
      <P1
        text={text}
        weight={fontWeight}
        className={clsx('py-[8px]', p1ClassName)}
      />
    </div>
  )
}
MenuButton.FontWeight = WEIGHT

export default MenuButton

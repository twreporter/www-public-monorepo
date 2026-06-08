import type React from 'react'
import clsx from 'clsx'
// constants
import { THEME, type Theme } from '../../../constants/theme'
import { TYPE, type Type } from '../../constants'
// theme
import { getPrimaryIconButtonTheme, getSecondaryIconButtonTheme } from './theme'

type IconButtonProps = {
  iconComponent: React.ReactElement
  theme?: Theme
  type?: Type
  disabled?: boolean
  active?: boolean
  className?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}
const IconButton: React.FC<IconButtonProps> & {
  Theme: typeof THEME
  Type: typeof TYPE
} = ({
  iconComponent,
  theme = THEME.normal,
  type = TYPE.primary,
  disabled = false,
  active = false,
  className = '',
  onClick = () => {},
}) => {
  const themeClass =
    type === TYPE.primary
      ? getPrimaryIconButtonTheme(theme, active, disabled)
      : getSecondaryIconButtonTheme(theme, active, disabled)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) {
      return
    }
    e.stopPropagation()
    onClick(e)
  }
  return (
    <button
      className={clsx(
        'flex',
        '[&_svg]:w-[24px] [&_svg]:h-[24px]',
        disabled ? 'cursor-default' : 'cursor-pointer',
        themeClass,
        className
      )}
      onClick={handleClick}
      type="button"
    >
      {iconComponent}
    </button>
  )
}

IconButton.Theme = THEME
IconButton.Type = TYPE

export default IconButton

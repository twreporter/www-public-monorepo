import type React from 'react'
import clsx from 'clsx'
// constants
import { THEME, type Theme } from '../../../constants/theme'
// enums
import { TYPE, type Type } from '../../enum'
// theme
import { getPrimaryIconButtonTheme, getSecondaryIconButtonTheme } from './theme'

type IconButtonProps = {
  iconComponent: React.ReactElement
  theme?: Theme
  type?: Type
  disabled?: boolean
  active?: boolean
  className?: string
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
}) => {
  const themeClass =
    type === TYPE.primary
      ? getPrimaryIconButtonTheme(theme, active, disabled)
      : getSecondaryIconButtonTheme(theme, active, disabled)
  return (
    <div
      className={clsx(
        'flex',
        '[&>svg]:w-[24px] [&>svg]:h-[24px]',
        disabled ? 'cursor-default' : 'cursor-pointer',
        themeClass,
        className
      )}
    >
      {iconComponent}
    </div>
  )
}

IconButton.Theme = THEME
IconButton.Type = TYPE

export default IconButton

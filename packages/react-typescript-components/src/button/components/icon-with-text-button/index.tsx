import type { FC } from 'react'
import clsx from 'clsx'
// constants
import { THEME, type Theme } from '../../../constants/theme'
// theme
import { getIconWithTextButtonTheme } from './theme'
// text
import { P4 } from '../../../text/paragraph'

type IconWithTextButtonProps = {
  text?: string
  iconComponent: React.ReactNode
  theme?: Theme
  disabled?: boolean
  active?: boolean
  hideText?: boolean
  className?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}
const IconWithTextButton: FC<IconWithTextButtonProps> & {
  Theme: typeof THEME
} = ({
  text = '',
  iconComponent,
  theme = THEME.normal,
  disabled = false,
  active = false,
  hideText = false,
  className = '',
  onClick = () => {},
}) => {
  const { color, hoverColor, svgBgColor, svgHoverBgColor } =
    getIconWithTextButtonTheme(theme, active, disabled)
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
        'flex flex-col items-center',
        '[&>svg]:w-[24px] [&>svg]:h-[24px]',
        color,
        hoverColor,
        svgBgColor,
        svgHoverBgColor,
        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        className
      )}
      type="button"
      onClick={handleClick}
    >
      {iconComponent}
      <P4
        text={text}
        weight={P4.Weight.normal}
        className={clsx(
          'mt-[2px] transition-opacity duration-[100ms]',
          hideText ? 'opacity-0' : 'opacity-100',
          hideText ? 'max-h-0' : 'max-h-none'
        )}
      />
    </button>
  )
}
IconWithTextButton.Theme = THEME
export default IconWithTextButton

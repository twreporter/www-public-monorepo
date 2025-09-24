import { useMemo, type FC } from 'react'
import clsx from 'clsx'
// text
import { P1, P2 } from '../../../text/paragraph'
// constants
import {
  SIZE,
  type Size,
  STYLE,
  type Style,
  TYPE,
  type Type,
} from '../../constants'
import { THEME, type Theme } from '../../../constants/theme'
// theme
import { getFilledPillButtonTheme, getOutlinePillButtonTheme } from './theme'

type PillButtonProps = {
  text?: string
  leftIconComponent?: React.ReactElement
  rightIconComponent?: React.ReactElement
  size?: Size
  theme?: Theme
  type?: Type
  style?: Style
  disabled?: boolean
  loading?: boolean
  className?: string
}
const PillButton: FC<PillButtonProps> & {
  Theme: typeof THEME
  Type: typeof TYPE
  Size: typeof SIZE
  Style: typeof STYLE
} = ({
  text = '',
  leftIconComponent = null,
  rightIconComponent = null,
  size = SIZE.s,
  theme = THEME.normal,
  type = TYPE.primary,
  style = STYLE.brand,
  disabled = false,
  loading = false,
  className = '',
}) => {
  const themeFunc =
    type === TYPE.primary ? getFilledPillButtonTheme : getOutlinePillButtonTheme
  const {
    color,
    bgColor,
    hoverColor,
    hoverBgColor,
    borderColor,
    svgBgColor,
    borderHoverColor,
    svgHoverBgColor,
  } = themeFunc(theme, disabled, style)

  const padding = size === SIZE.s ? 'py-[4px] px-[12px]' : 'py-[8px] px-[16px]'
  const iconSize =
    size === SIZE.s
      ? '[&>svg]:h-[18px] [&>svg]:w-[18px]'
      : '[&>svg]:h-[24px] [&>svg]:w-[24px]'

  const TextJSX = useMemo(
    () =>
      size === SIZE.s ? (
        <P2 text={text} weight={P2.Weight.bold} />
      ) : (
        <P1 text={text} weight={P1.Weight.bold} />
      ),
    [size, text]
  )

  return (
    <div
      className={clsx(
        'w-fit flex items-center rounded-[40px] border-solid border-[1.5px]',
        borderColor,
        color,
        padding,
        disabled || loading ? 'cursor-not-allowed' : 'cursor-pointer',
        type === TYPE.primary ? bgColor : 'bg-transparent',
        iconSize,
        svgBgColor,
        hoverColor,
        type === TYPE.primary ? hoverBgColor : 'bg-transparent',
        borderHoverColor,
        svgHoverBgColor,
        className
      )}
    >
      <div className="relative flex justify-center items-center">
        <div
          className={clsx('flex justify-center items-center', {
            'opacity-0': loading,
            'opacity-100': !loading,
          })}
        >
          <div className="flex items-center mr-[4px]">{leftIconComponent}</div>
          {TextJSX}
          <div className="flex items-center ml-[4px]">{rightIconComponent}</div>
        </div>
        <span
          className={clsx(
            'inline-block absolute box-border animate-spin',
            'border-2 border-solid border-gray-400 border-t-gray-600 rounded-[50%]',
            {
              'size-[18px]': size === SIZE.s,
              'size-[24px]': size === SIZE.l,
            },
            {
              'opacity-0': !loading,
              'opacity-100': loading,
            }
          )}
        />
      </div>
    </div>
  )
}
PillButton.Theme = THEME
PillButton.Type = TYPE
PillButton.Size = SIZE
PillButton.Style = STYLE

export default PillButton

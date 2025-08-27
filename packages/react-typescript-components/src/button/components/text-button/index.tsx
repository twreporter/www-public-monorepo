import { type FC, type ReactElement, useMemo } from 'react'
import clsx from 'clsx'
// components
import { P1, P2 } from '../../../text/paragraph'
// enums
import { Size, Style } from '../../enum'
// type
import type { Theme } from '../../constant'
// constants
import { THEME } from '../../constant'
// utils
import { getContainerTheme, getActiveContainerTheme, getDisabledContainerTheme } from './theme'

type TextButtonProps = {
  text: string
  leftIconComponent?: ReactElement
  rightIconComponent?: ReactElement
  size?: Size
  style?: Style
  theme?: Theme
  active?: boolean
  disabled?: boolean
  loading?: boolean
  className?: string
}
const TextButton: FC<TextButtonProps> & {
  Size: typeof Size
  Style: typeof Style
  THEME: typeof THEME
} = ({
  text,
  leftIconComponent,
  rightIconComponent,
  size = Size.S,
  theme = THEME.normal,
  style = Style.DARK,
  active = false,
  disabled = false,
  loading = false,
  className = '',
}) => {
  const TextJSX = useMemo(
    () => (size === Size.S ? <P2 text={text} weight={P2.Weight.bold} /> : <P1 text={text} weight={P1.Weight.bold} />),
    [size, text]
  )
  const themeClass = useMemo(() => {
    const themeFunc = disabled ? getDisabledContainerTheme : (active ? getActiveContainerTheme : getContainerTheme)
    return themeFunc(theme, style)
  }, [disabled, active, theme, style])

  return (
    <div
      className={clsx(
        'flex items-center',
        {
          'cursor-default': disabled,
          'cursor-pointer': !disabled,
        },
        themeClass,
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
            'inline-block absolute box-border animation-spin',
            'border-2 border-solid border-gray-400 border-t-gray-600 rounded-[50%]',
            {
              'size-[18px]': size === Size.S,
              'size-[24px]': size === Size.L,
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
TextButton.Size = Size
TextButton.Style = Style
TextButton.THEME = THEME

export default TextButton

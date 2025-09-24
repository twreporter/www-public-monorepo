import { type FC, type ReactElement, useMemo } from 'react'
import clsx from 'clsx'
// components
import { P1, P2 } from '../../../text/paragraph'
// constants
import { SIZE, type Size, STYLE, type Style } from '../../constants'
import { THEME, type Theme } from '../../../constants/theme'
// utils
import {
  getContainerTheme,
  getActiveContainerTheme,
  getDisabledContainerTheme,
} from './theme'

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
  Size: typeof SIZE
  Style: typeof STYLE
  Theme: typeof THEME
} = ({
  text,
  leftIconComponent,
  rightIconComponent,
  size = SIZE.s,
  theme = THEME.normal,
  style = STYLE.dark,
  active = false,
  disabled = false,
  loading = false,
  className = '',
}) => {
  const TextJSX = useMemo(
    () =>
      size === SIZE.s ? (
        <P2 text={text} weight={P2.Weight.bold} />
      ) : (
        <P1 text={text} weight={P1.Weight.bold} />
      ),
    [size, text]
  )
  const themeClass = useMemo(() => {
    const themeFunc = disabled
      ? getDisabledContainerTheme
      : active
        ? getActiveContainerTheme
        : getContainerTheme
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
TextButton.Size = SIZE
TextButton.Style = STYLE
TextButton.Theme = THEME

export default TextButton

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
    () => (size === Size.S ? <P2 text={text} /> : <P1 text={text} />),
    [size, text]
  )

  return (
    <div
      className={clsx(
        'flex items-center',
        {
          'cursor-default': disabled,
          'cursor-pointer': !disabled,
        },
        {
          'text-gray-500 hover:text-gray-500':
            disabled &&
            (theme === THEME.photography || theme === THEME.transparent),
          'text-gray-400 hover:text-gray-400':
            disabled ||
            (theme === THEME.photography &&
              style === Style.LIGHT &&
              !active &&
              !disabled),
          'text-gray-200 hover:text-supportive-pastel':
            theme === THEME.photography && !active && !disabled,
          'text-gray-300 hover:text-gray-400':
            theme === THEME.photography &&
            style === Style.LIGHT &&
            active &&
            !disabled,
          'text-gray-white hover:text-supportive-pastel':
            theme === THEME.photography &&
            style === Style.DARK &&
            active &&
            !disabled,
          'text-supportive-faded hover:text-supportive-pastel':
            theme === THEME.photography &&
            style === Style.BRAND &&
            active &&
            !disabled,
          'text-gray-100 hover:text-gray-200':
            theme === THEME.transparent && !active && !disabled,
          'text-gray-white hover:text-gray-white':
            theme === THEME.transparent && active && !disabled,
          'text-gray-600 hover:text-brand-heavy':
            theme === THEME.normal && !active && !disabled,
          'text-brand-heavy hover:text-brand-heavy':
            theme === THEME.normal && active && !disabled,
        },
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

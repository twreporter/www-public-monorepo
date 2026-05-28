import ColorPicker from './ColorPicker'
import DropDown from '../../../react/components/DropDown'

type Props = {
  disabled?: boolean
  buttonAriaLabel?: string
  buttonClassName: string
  buttonIconClassName?: string
  buttonLabel?: string
  title?: string
  stopCloseOnClickSelf?: boolean
  color: string
  onChange?: (color: string, skipHistoryStack: boolean) => void
  type?: 'text' | 'background'
}

export default function DropdownColorPicker({
  disabled = false,
  stopCloseOnClickSelf = true,
  color,
  onChange,
  type,
  ...rest
}: Props) {
  return (
    <DropDown
      {...rest}
      disabled={disabled}
      stopCloseOnClickSelf={stopCloseOnClickSelf}
    >
      <ColorPicker
        color={color}
        {...(type ? { type } : {})}
        {...(onChange ? { onChange } : {})}
      />
    </DropDown>
  )
}

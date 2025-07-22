/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as React from 'react'

import ColorPicker from './ColorPicker'
import DropDown from './DropDown'

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
      <ColorPicker color={color} type={type} onChange={onChange} />
    </DropDown>
  )
}

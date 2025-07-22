import styled from '@emotion/styled'
import { calculateZoomLevel } from '@lexical/utils'
import type React from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
// components
import TextInput from '../TextInput'
// configs
import { basicColors, resetColors } from './config'
//utils
import { allowedColor, transformColor } from './utils'

let skipAddingToHistoryStack = false

const WIDTH = 215
const HEIGHT = 75

type Position = {
  x: number
  y: number
}

// MoveWrapper Component
type MoveWrapperProps = {
  className?: string
  style?: React.CSSProperties
  onChange: (position: Position) => void
  children: JSX.Element
}

function clamp(value: number, max: number, min: number) {
  return value > max ? max : value < min ? min : value
}

function MoveWrapper({
  className,
  style,
  onChange,
  children,
}: MoveWrapperProps) {
  const divRef = useRef<HTMLDivElement>(null)
  const draggedRef = useRef(false)

  const move = (e: React.MouseEvent | MouseEvent): void => {
    if (divRef.current) {
      const { current: div } = divRef
      const { width, height, left, top } = div.getBoundingClientRect()
      const zoom = calculateZoomLevel(div)
      const x = clamp(e.clientX / zoom - left, width, 0)
      const y = clamp(e.clientY / zoom - top, height, 0)

      onChange({ x, y })
    }
  }

  const onMouseDown = (e: React.MouseEvent): void => {
    if (e.button !== 0) {
      return
    }

    move(e)

    const onMouseMove = (_e: MouseEvent): void => {
      draggedRef.current = true
      skipAddingToHistoryStack = true
      move(_e)
    }

    const onMouseUp = (_e: MouseEvent): void => {
      if (draggedRef.current) {
        skipAddingToHistoryStack = false
      }

      document.removeEventListener('mousemove', onMouseMove, false)
      document.removeEventListener('mouseup', onMouseUp, false)

      move(_e)
      draggedRef.current = false
    }

    document.addEventListener('mousemove', onMouseMove, false)
    document.addEventListener('mouseup', onMouseUp, false)
  }

  return (
    <div
      ref={divRef}
      className={className}
      style={style}
      onMouseDown={onMouseDown}
    >
      {children}
    </div>
  )
}

// ColorPicker component
const ColorPickerWrapper = styled.div`
  width: ${WIDTH}px;
  padding: 20px;

  .color-picker-saturation {
    width: 100%;
    position: relative;
    margin-top: 15px;
    height: ${HEIGHT}px;
    background-image: linear-gradient(transparent, black),
      linear-gradient(to right, white, transparent);
    user-select: none;
  }
  .color-picker-hue {
    width: 100%;
    position: relative;
    margin-top: 15px;
    height: 12px;
    background-image: linear-gradient(
      to right,
      rgb(255, 0, 0),
      rgb(255, 255, 0),
      rgb(0, 255, 0),
      rgb(0, 255, 255),
      rgb(0, 0, 255),
      rgb(255, 0, 255),
      rgb(255, 0, 0)
    );
    user-select: none;
    border-radius: 12px;
  }
`
const BasicColor = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 0;
  padding: 0;
`
const BasicColorButton = styled.button<{ $active: boolean }>`
  border: 1px solid #ccc;
  border-radius: 4px;
  height: 16px;
  width: 16px;
  cursor: pointer;
  list-style-type: none;
  ${(props) =>
    props.$active ? 'box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.3);' : ''}
`
const SaturationCursor = styled.div<{
  $bgColor: string
  $left: number
  $top: number
}>`
  position: absolute;
  width: 20px;
  height: 20px;
  border: 2px solid #ffffff;
  border-radius: 50%;
  box-shadow: 0 0 15px #00000026;
  box-sizing: border-box;
  transform: translate(-10px, -10px);
  background-color: ${(props) => props.$bgColor};
  left: ${(props) => props.$left}px;
  top: ${(props) => props.$top}px;
`
const HueCursor = styled.div<{ $bgColor: string; $left: number }>`
  position: absolute;
  width: 20px;
  height: 20px;
  border: 2px solid #ffffff;
  border-radius: 50%;
  box-shadow: #0003 0 0 0 0.5px;
  box-sizing: border-box;
  transform: translate(-10px, -4px);
  background-color: ${(props) => props.$bgColor};
  left: ${(props) => props.$left}px;
`
const CurrentColor = styled.div<{ $bgColor: string }>`
  border: 1px solid #ccc;
  margin-top: 15px;
  width: 100%;
  height: 20px;
  background-color: ${(props) => props.$bgColor};
`
const Reset = styled.div`
  cursor: pointer;
  text-align: center;
  background-color: #eff3f6;
  border-radius: 5px;
  margin-top: 8px;
  padding: 4px 0;
  color: #6b7280;

  &:hover {
    background-color: #e1e5e9;
    color: #374151;
  }
`

type ColorPickerProps = {
  type?: 'text' | 'background'
  color: string
  onChange?: (value: string, skipHistoryStack: boolean) => void
}

function ColorPicker({
  type = 'text',
  color,
  onChange,
}: Readonly<ColorPickerProps>): JSX.Element {
  const [selfColor, setSelfColor] = useState(transformColor('hex', color))
  const [inputColor, setInputColor] = useState(color)
  const innerDivRef = useRef(null)

  const saturationPosition = useMemo(
    () => ({
      x: (selfColor.hsv.s / 100) * WIDTH,
      y: ((100 - selfColor.hsv.v) / 100) * HEIGHT,
    }),
    [selfColor.hsv.s, selfColor.hsv.v]
  )

  const huePosition = useMemo(
    () => ({
      x: (selfColor.hsv.h / 360) * WIDTH,
    }),
    [selfColor.hsv]
  )

  const onSetHex = (hex: string) => {
    setInputColor(hex)
    if (/^#[0-9A-Fa-f]{6, 8}$/i.test(hex)) {
      const newColor = transformColor('hex', hex)
      setSelfColor(newColor)
    }
  }

  const onMoveSaturation = ({ x, y }: Position) => {
    const newHsv = {
      ...selfColor.hsv,
      s: (x / WIDTH) * 100,
      v: 100 - (y / HEIGHT) * 100,
    }
    const newColor = transformColor('hsv', newHsv)
    setSelfColor(newColor)
    setInputColor(newColor.hex)
  }

  const onMoveHue = ({ x }: Position) => {
    const newHsv = { ...selfColor.hsv, h: (x / WIDTH) * 360 }
    const newColor = transformColor('hsv', newHsv)

    setSelfColor(newColor)
    setInputColor(newColor.hex)
  }

  useEffect(() => {
    // Check if the dropdown is actually active
    if (innerDivRef.current !== null && onChange) {
      onChange(selfColor.hex, skipAddingToHistoryStack)
      setInputColor(selfColor.hex)
    }
  }, [selfColor, onChange])

  useEffect(() => {
    if (color === undefined) {
      return
    }
    const newColor = transformColor('hex', color)
    setSelfColor(newColor)
    setInputColor(newColor.hex)
  }, [color])

  const resetColor = () => {
    setInputColor(resetColors[type])
    setSelfColor(transformColor('hex', resetColors[type]))
  }

  return (
    <ColorPickerWrapper ref={innerDivRef}>
      <TextInput label="Hex" onChange={onSetHex} value={inputColor} />
      <BasicColor>
        {basicColors[type].map((basicColor) => (
          <BasicColorButton
            $active={basicColor === selfColor.hex}
            key={basicColor}
            style={{ backgroundColor: basicColor }}
            onClick={() => {
              setInputColor(basicColor)
              setSelfColor(transformColor('hex', basicColor))
            }}
          />
        ))}
      </BasicColor>
      <MoveWrapper
        className="color-picker-saturation"
        style={{ backgroundColor: `hsl(${selfColor.hsv.h}, 100%, 50%)` }}
        onChange={onMoveSaturation}
      >
        <SaturationCursor
          $bgColor={selfColor.hex}
          $left={saturationPosition.x}
          $top={saturationPosition.y}
        />
      </MoveWrapper>
      <MoveWrapper className="color-picker-hue" onChange={onMoveHue}>
        <HueCursor
          $bgColor={`hsl(${selfColor.hsv.h}, 100%, 50%)`}
          $left={huePosition.x}
        />
      </MoveWrapper>
      <CurrentColor $bgColor={selfColor.hex} />
      <Reset onClick={resetColor}>Reset</Reset>
    </ColorPickerWrapper>
  )
}

export default ColorPicker
export const parseAllowedColor = allowedColor

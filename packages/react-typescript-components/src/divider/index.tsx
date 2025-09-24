import type React from 'react'
import clsx from 'clsx'
// constants
import { DIRECTION, type Direction } from './constants'

type DividerProps = {
  direction?: Direction
  className?: string
}

export const Divider: React.FC<DividerProps> & { Direction: typeof DIRECTION } =
  ({ direction = DIRECTION.horizontal, className = '' }) => {
    if (direction === DIRECTION.vertical) {
      return (
        <div
          className={clsx(
            'h-full w-0 border-l-[1px] border-solid border-gray-300',
            className
          )}
        />
      )
    }

    return (
      <div
        className={clsx(
          'h-0 w-full border-t-[1px] border-solid border-gray-300',
          className
        )}
      />
    )
  }

Divider.Direction = DIRECTION

export default Divider

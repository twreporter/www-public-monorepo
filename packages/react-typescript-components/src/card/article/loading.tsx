import type { FC } from 'react'
import clsx from 'clsx'

type RectangleProps = {
  width: string
  height: string
  className?: string
}

export const Rectangle: FC<RectangleProps> = ({ width, height, className }) => (
  <div
    className={clsx(
      'relative overflow-hidden rounded-[2px] bg-gray-300',
      'after:absolute after:inset-0 after:-translate-x-full after:animate-shimmer',
      'after:bg-linear-to-r after:from-gray-white after:via-opacity-white-05 after:to-gray-white',
      'after:content-[""]',
      className
    )}
    style={{ width, height }}
  />
)

export const LargeSkeleton: FC = () => (
  <div className="flex flex-row w-full gap-[32px]">
    <div className="flex flex-col w-full gap-[16px] justify-center">
      <div className="flex flex-row gap-[8px]">
        <Rectangle width="48px" height="12px" />
        <Rectangle width="48px" height="12px" />
      </div>
      <Rectangle width="100%" height="25px" />
      <div className="flex flex-col w-full gap-[8px]">
        <Rectangle width="100%" height="16px" />
        <Rectangle width="240px" height="16px" />
      </div>
    </div>
    <Rectangle width="216px" height="144px" className="shrink-0" />
  </div>
)

export const SmallSkeleton: FC = () => (
  <div className="flex flex-col gap-[8px]">
    <div className="flex flex-row gap-[8px]">
      <div className="flex flex-col w-full gap-[8px]">
        <div className="flex flex-row gap-[8px]">
          <Rectangle width="48px" height="12px" />
          <Rectangle width="48px" height="12px" />
        </div>
        <Rectangle width="100%" height="16px" />
        <Rectangle width="50%" height="16px" />
      </div>
      <Rectangle width="72px" height="72px" className="shrink-0" />
    </div>
    <div className="flex flex-col w-full gap-[4px]">
      <Rectangle width="100%" height="12px" />
      <Rectangle width="100%" height="12px" />
      <Rectangle width="240px" height="12px" />
    </div>
  </div>
)

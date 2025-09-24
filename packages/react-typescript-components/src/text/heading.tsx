import clsx from 'clsx'
import React from 'react'
import { TYPE, type Type } from './constants'

type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> & {
  text?: string
  type?: Type
  className?: string
}

const baseClass = 'font-bold'

const variantClass = {
  H1: 'text-[28px] leading-[125%] tablet:text-[36px]',
  H2: 'text-[24px] leading-[125%] tablet:text-[32px]',
  H3: 'text-[22px] leading-[150%] tablet:text-[28px]',
  H4: 'text-[18px] leading-[150%] tablet:text-[22px]',
  H5: 'text-[17px] leading-[150%] tablet:text-[18px]',
  H6: 'text-[16px] leading-[150%] tablet:text-[16px]',
}

const HeadingVariant = (variant: keyof typeof variantClass) => {
  const Component: React.FC<HeadingProps> & { Type: typeof TYPE } = ({
    text = '',
    type = TYPE.default,
    className = '',
    ...props
  }) => {
    const htmlTag = variant.toLowerCase() // 產生 'h1', 'h2', ...
    const fontFamily = type === TYPE.article ? 'font-title' : 'font-default'
    return React.createElement(
      htmlTag,
      {
        className: clsx(
          fontFamily,
          baseClass,
          variantClass[variant],
          className
        ),
        ...props,
      },
      text
    )
  }
  Component.displayName = variant
  Component.Type = TYPE
  return Component
}

const H1 = HeadingVariant('H1')
const H2 = HeadingVariant('H2')
const H3 = HeadingVariant('H3')
const H4 = HeadingVariant('H4')
const H5 = HeadingVariant('H5')
const H6 = HeadingVariant('H6')

export { H1, H2, H3, H4, H5, H6 }

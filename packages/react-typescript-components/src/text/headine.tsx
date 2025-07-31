import clsx from 'clsx'
import React from 'react'
import { TYPE, type Type } from './enum'

type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> & {
  level: 1 | 2 | 3 | 4 | 5 | 6
  type?: Type
}

const headingStyles: Record<number, string[]> = {
  1: ['font-bold', 'text-[28px] leading-[125%]', 'tablet:text-[36px]'],
  2: ['font-bold', 'text-[24px] leading-[125%]', 'tablet:text-[32px]'],
  3: ['font-bold', 'text-[22px] leading-[150%]', 'tablet:text-[28px]'],
  4: ['font-bold', 'text-[18px] leading-[150%]', 'tablet:text-[22px]'],
  5: ['font-bold', 'text-[17px] leading-[150%]', 'tablet:text-[18px]'],
  6: ['font-bold', 'text-[16px] leading-[150%]', 'tablet:text-[16px]'],
}

const Heading: React.FC<HeadingProps> = ({
  level,
  children,
  className = '',
  type = TYPE.default,
  ...props
}) => {
  const Tag = `h${level}`
  const fontFamily = type === TYPE.article ? 'font-title' : 'font-default'

  return React.createElement(
    Tag,
    {
      className: clsx(fontFamily, ...headingStyles[level], className),
      ...props,
    },
    children
  )
}

const H1: React.FC<Omit<HeadingProps, 'level'>> = (props) => (
  <Heading level={1} {...props} />
)
const H2: React.FC<Omit<HeadingProps, 'level'>> = (props) => (
  <Heading level={2} {...props} />
)
const H3: React.FC<Omit<HeadingProps, 'level'>> = (props) => (
  <Heading level={3} {...props} />
)
const H4: React.FC<Omit<HeadingProps, 'level'>> = (props) => (
  <Heading level={4} {...props} />
)
const H5: React.FC<Omit<HeadingProps, 'level'>> = (props) => (
  <Heading level={5} {...props} />
)
const H6: React.FC<Omit<HeadingProps, 'level'>> = (props) => (
  <Heading level={6} {...props} />
)

export { H1, H2, H3, H4, H5, H6 }

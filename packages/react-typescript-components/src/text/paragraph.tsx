import clsx from 'clsx'
import type React from 'react'
import { WEIGHT, type Weight } from './constants'

type ParagraphProps = React.HTMLAttributes<HTMLParagraphElement> & {
  text?: string
  weight?: Weight
  className?: string
}

const baseClass = 'font-default leading-[150%] flex items-center m-0'

const variantClass = {
  P1: 'text-[16px]',
  P2: 'text-[14px]',
  P3: 'text-[12px]',
  P4: 'text-[10px]',
}

const ParagraphVariant = (variant: keyof typeof variantClass) => {
  const Component: React.FC<ParagraphProps> & { Weight: typeof WEIGHT } = ({
    text = '',
    weight = WEIGHT.normal,
    className = '',
    ...props
  }) => (
    <p
      className={clsx(
        baseClass,
        variantClass[variant],
        `font-${weight}`,
        className
      )}
      {...props}
    >
      {text}
    </p>
  )
  Component.displayName = variant
  Component.Weight = WEIGHT
  return Component
}

const P1 = ParagraphVariant('P1')
const P2 = ParagraphVariant('P2')
const P3 = ParagraphVariant('P3')
const P4 = ParagraphVariant('P4')

export { P1, P2, P3, P4 }

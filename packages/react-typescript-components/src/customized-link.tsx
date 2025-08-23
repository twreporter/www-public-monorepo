'use client'

import Link from 'next/link'
import type { FC } from 'react'

type LinkTarget = '_blank' | '_self' | '_parent' | '_top'

type CustomizedLinkProps = {
  to: string
  isExternal?: boolean
  target?: LinkTarget
  className?: string
  children?: React.ReactNode
}
const CustomizedLink: FC<CustomizedLinkProps> = ({
  to,
  isExternal = false,
  target = '_self',
  className = '',
  children,
}) => {
  if (isExternal) {
    return (
      <a href={to} target={target} className={className}>
        {children}
      </a>
    )
  }

  return (
    <Link href={to} className={className}>
      {children}
    </Link>
  )
}

export default CustomizedLink
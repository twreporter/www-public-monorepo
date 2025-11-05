'use client'

import Link from 'next/link'
import type { FC } from 'react'
import type { CustomizedLinkProps } from './type'

type InternalLinkProps = CustomizedLinkProps
const InternalLink: FC<InternalLinkProps> = ({
  to,
  target = '_self',
  className = '',
  children,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <Link
      href={to}
      target={target}
      className={className}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </Link>
  )
}

export default InternalLink

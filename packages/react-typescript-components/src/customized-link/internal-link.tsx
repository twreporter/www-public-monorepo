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
}) => {
  return (
    <Link href={to} target={target} className={className}>
      {children}
    </Link>
  )
}

export default InternalLink
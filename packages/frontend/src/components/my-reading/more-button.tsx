'use client'
import Link from 'next/link'
import { useContext } from 'react'
// @twreporters
import { TextButton } from '@twreporter/react-typescript-components/lib/button'
import { Arrow } from '@twreporter/react-typescript-components/lib/icons'
// context
import { BaseContext } from '@/contexts'

type MoreButtonProps = {
  href: string
}

export default function MoreButton({ href }: MoreButtonProps) {
  const { releaseBranch } = useContext(BaseContext)
  return (
    <Link href={href}>
      <TextButton
        className="text-gray-800"
        text="查看更多"
        rightIconComponent={
          <Arrow
            direction={Arrow.Direction.right}
            releaseBranch={releaseBranch}
          />
        }
      />
    </Link>
  )
}

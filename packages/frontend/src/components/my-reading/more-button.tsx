'use client'
import { useContext } from 'react'
import { useRouter } from 'next/navigation'
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
  const router = useRouter()
  return (
    <TextButton
      className="text-gray-800"
      text="查看更多"
      rightIconComponent={
        <Arrow
          direction={Arrow.Direction.right}
          releaseBranch={releaseBranch}
        />
      }
      onClick={() => router.push(href)}
    />
  )
}

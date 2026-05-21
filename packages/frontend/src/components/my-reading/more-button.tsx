'use client'
import { useContext } from 'react'
import { useRouter } from 'next/navigation'
// @twreporters
import { TextButton } from '@twreporter/react-typescript-components/lib/button'
import { Arrow } from '@twreporter/react-typescript-components/lib/icons'
// constants
import type { InternalRoutes } from '@/constants/routes'
// context
import { BaseContext } from '@/contexts'

type MoreButtonProps = {
  href: InternalRoutes
}

export default function MoreButton({ href }: MoreButtonProps) {
  const { releaseBranch } = useContext(BaseContext)
  const router = useRouter()
  return (
    <>
      <TextButton
        className="text-gray-800 tablet:hidden"
        size={TextButton.Size.s}
        text="查看更多"
        rightIconComponent={
          <Arrow
            direction={Arrow.Direction.right}
            releaseBranch={releaseBranch}
          />
        }
        onClick={() => router.push(href)}
      />
      <TextButton
        className="text-gray-800 hidden tablet:inline-flex"
        size={TextButton.Size.l}
        text="查看更多"
        rightIconComponent={
          <Arrow
            direction={Arrow.Direction.right}
            releaseBranch={releaseBranch}
          />
        }
        onClick={() => router.push(href)}
      />
    </>
  )
}

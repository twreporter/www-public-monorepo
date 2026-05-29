'use client'
import type { FC } from 'react'
// react-typescript-components
import { P3 } from '@twreporter/react-typescript-components/lib/text/paragraph'

export const SectionBadge: FC<{ label: string }> = ({ label }) => {
  return (
    <div className="px-[4px] bg-brand-heavy">
      <P3 className="text-gray-white" text={label} />
    </div>
  )
}

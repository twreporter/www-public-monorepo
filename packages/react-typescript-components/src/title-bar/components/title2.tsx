import clsx from 'clsx'
import type React from 'react'
// components
import { H5 } from '../../text/heading'
import { P2 } from '../../text/paragraph'

type Title2Props = {
  title: string
  subtitle?: string
  renderButton?: React.ReactNode
  className?: string
}

const Title2: React.FC<Title2Props> = ({
  title,
  subtitle = '',
  renderButton = null,
  className = '',
}) => {
  return (
    <div className={clsx('flex justify-between flex-col', className)}>
      <div className="flex flex-row justify-between">
        <div className={clsx('flex items-baseline gap-[16px]')}>
          <H5 className="text-gray-800" text={title} />
          {subtitle ? <P2 className="text-gray-600" text={subtitle} /> : null}
        </div>
        {renderButton || null}
      </div>
      <div
        className={clsx(
          'w-full h-[1px] bg-gray-800 mt-[8px]',
          'desktop:mt-[16px]'
        )}
      />
    </div>
  )
}

export default Title2

import clsx from 'clsx'
import type { FC } from 'react'
// components
import { H2 } from '../../text/heading'
import { P1 } from '../../text/paragraph'

type Title1Props = {
  title: string
  subtitle?: string
  className?: string
}

const Title1: FC<Title1Props> = ({ title, subtitle = '', className = '' }) => {
  return (
    <div className={clsx('flex justify-between flex-col', className)}>
      <div className={clsx('flex items-baseline gap-[16px]')}>
        <H2 className="text-gray-800" text={title} />
        {subtitle ? <P1 className="text-gray-600" text={subtitle} /> : null}
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

export default Title1

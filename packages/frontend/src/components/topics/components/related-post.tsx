import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import type React from 'react'
// react-typescript-components
import { H6 } from '@twreporter/react-typescript-components/lib/text/heading'
// constants
import { INTERNAL_ROUTES } from '@/constants/routes'

// TODO: handle image loading or no image
type RelatedPostProps = {
  title: string
  slug: string
  imageUrl?: string
  className?: string
}
const RelatedPost: React.FC<RelatedPostProps> = ({
  title,
  slug,
  imageUrl,
  className = '',
}) => {
  return (
    <Link
      href={`${INTERNAL_ROUTES.article}/${slug}`}
      className={clsx(
        'flex flex-row gap-[12px]',
        'hover:opacity-70 transition-opacity duration-200 ease-linear',
        'tablet:border-[0.5px] tablet:border-gray-300 tablet:flex-col! tablet:justify-between',
        className
      )}
    >
      <H6
        className={clsx(
          'text-gray-900 order-2',
          'tablet:p-[12px] tablet:order-1 tablet:w-[220px]',
          'desktop:w-[278px]'
        )}
        text={title}
        type={H6.Type.article}
      />
      <div
        className={clsx(
          'relative w-[122px] h-[92px] order-1 flex-none',
          'tablet:h-[125px] tablet:order-2 tablet:w-[220px]',
          'desktop:w-[278px]'
        )}
      >
        {imageUrl && (
          <Image
            className="object-cover"
            fill={true}
            src={imageUrl}
            alt={title}
          />
        )}
      </div>
    </Link>
  )
}

export default RelatedPost

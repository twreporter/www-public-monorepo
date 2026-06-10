'use client'
import type { FC } from 'react'
import clsx from 'clsx'
import Link from 'next/link'
// react-typescript-components
import { P3 } from '@twreporter/react-typescript-components/lib/text/paragraph'
import { H5 } from '@twreporter/react-typescript-components/lib/text/heading'
// constants
import { INTERNAL_ROUTES } from '@/constants/routes'
// types
import type { HomePagePhotographySectionArticle } from '@/types/home'

type PhotographySectionCardProps = HomePagePhotographySectionArticle & {
  isActive?: boolean
}

export const PhotographySectionCard: FC<PhotographySectionCardProps> = ({
  slug,
  title,
  imageUrl,
  isActive = false,
}) => {
  return (
    <Link
      href={`${INTERNAL_ROUTES.article}/${slug}`}
      className={clsx(
        'group w-full aspect-[3/2] flex flex-col justify-center items-center bg-cover bg-no-repeat'
      )}
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div
        className={clsx(
          'w-full h-full flex flex-col justify-center items-center transition-all duration-300',
          'group-hover:bg-photo-dark/70',
          isActive && 'bg-photo-dark/70'
        )}
      >
        <div
          className={clsx(
            'flex flex-col w-[240px] tablet:w-[320px] transition-opacity duration-300',
            'opacity-0 group-hover:opacity-100',
            isActive && 'opacity-100'
          )}
        >
          <P3 className="text-supportive-main" text="影像" />
          <H5 className="text-gray-white" type={H5.Type.article} text={title} />
        </div>
      </div>
    </Link>
  )
}

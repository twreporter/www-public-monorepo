'use client'
import type { FC } from 'react'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
// react-typescript-components
import { P3 } from '@twreporter/react-typescript-components/lib/text/paragraph'
import { H5 } from '@twreporter/react-typescript-components/lib/text/heading'
// constants
import { INTERNAL_ROUTES } from '@/constants/routes'
// types
import type { HomePageInfographicSectionArticle } from '@/types/home'

type InfographicSectionCardProps = HomePageInfographicSectionArticle & {
  isPortrait?: boolean
}

export const InfographicSectionCard: FC<InfographicSectionCardProps> = ({
  slug,
  title,
  categoryLabel,
  image,
  isPortrait = false,
}) => {
  return (
    <Link
      href={`${INTERNAL_ROUTES.article}/${slug}`}
      className="flex flex-col w-full transition-opacity duration-300 hover:opacity-70"
    >
      <div
        className={clsx(
          'w-full relative',
          isPortrait ? 'aspect-[3/4]' : 'aspect-[3/2]'
        )}
      >
        {image ? (
          <Image
            fill={true}
            src={image.src}
            alt={image.alt}
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-800" />
        )}
      </div>
      <div className="w-full p-[12px] bg-gray-white">
        <P3 className="text-supportive-heavy" text={categoryLabel} />
        <H5
          className="text-gray-800 line-clamp-3 min-h-[4.5em]"
          type={H5.Type.article}
          text={title}
        />
      </div>
    </Link>
  )
}

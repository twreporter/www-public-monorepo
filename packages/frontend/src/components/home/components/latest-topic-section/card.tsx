'use client'
import type { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
// react-typescript-components
import {
  P1,
  P3,
} from '@twreporter/react-typescript-components/lib/text/paragraph'
import { H5 } from '@twreporter/react-typescript-components/lib/text/heading'
// constants
import { INTERNAL_ROUTES } from '@/constants/routes'
// types
import type { HomePageArticle } from '@/types/home'

export const LatestTopicCard: FC<HomePageArticle> = ({
  slug,
  categoryLabel,
  title,
  ogDescription,
  image,
}) => {
  return (
    <Link
      href={`${INTERNAL_ROUTES.article}/${slug}`}
      className="flex flex-col gap-[12px] w-full transition-opacity duration-300 hover:opacity-70"
    >
      <div className="w-full aspect-[3/2] relative">
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
      <div className="flex flex-col text-center">
        <P3 className="text-supportive-heavy" text={categoryLabel} />
        <H5 className="text-gray-800" type={H5.Type.article} text={title} />
      </div>
      <P1 className="text-gray-800 line-clamp-4" text={ogDescription} />
    </Link>
  )
}

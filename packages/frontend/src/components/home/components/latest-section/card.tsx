'use client'
import type { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
// react-typescript-components
import { P3 } from '@twreporter/react-typescript-components/lib/text/paragraph'
import { H6 } from '@twreporter/react-typescript-components/lib/text/heading'
import ImgPlaceholder from '@twreporter/react-typescript-components/lib/card/img-placeholder'
// constants
import { INTERNAL_ROUTES } from '@/constants/routes'
// types
import type { HomePageLatestSectionArticle } from '@/types/home'

export const LatestSectionCard: FC<HomePageLatestSectionArticle> = ({
  slug,
  categoryLabel,
  title,
  image,
}) => {
  return (
    <Link
      className="flex flex-col gap-[12px] w-full transition-opacity duration-300 hover:opacity-70"
      href={`${INTERNAL_ROUTES.article}/${slug}`}
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
          <div className="w-full h-full flex justify-center items-center bg-gray-100">
            <ImgPlaceholder />
          </div>
        )}
      </div>
      <div className="flex flex-col w-full">
        {categoryLabel ? (
          <P3 className="text-supportive-heavy" text={categoryLabel} />
        ) : null}
        <H6 className="text-gray-800" type={H6.Type.article} text={title} />
      </div>
    </Link>
  )
}

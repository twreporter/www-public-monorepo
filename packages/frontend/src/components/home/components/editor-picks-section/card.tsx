'use client'
import type { FC } from 'react'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
// react-typescrip-components
import {
  P1,
  P3,
} from '@twreporter/react-typescript-components/lib/text/paragraph'
import { H2 } from '@twreporter/react-typescript-components/lib/text/heading'
// constants
import { INTERNAL_ROUTES } from '@/constants/routes'
// types
import type { HomePageArticle } from '@/types/home'

export const EditorPickCard: FC<HomePageArticle> = ({
  slug,
  categoryLabel,
  title,
  ogDescription,
  image,
}) => {
  return (
    <Link
      className={clsx(
        'w-full flex flex-col gap-[16px]',
        'justify-center items-center text-center',
        'transition-opacity duration-300',
        'hover:opacity-70'
      )}
      href={`${INTERNAL_ROUTES.article}/${slug}`}
    >
      <div className="w-full flex flex-col gap-[12px]">
        <div>
          <P3 className="text-supportive-heavy" text={categoryLabel} />
          <H2
            className="text-gray-800 line-clamp-3 tablet:line-clamp-2"
            type={H2.Type.article}
            text={title}
          />
        </div>
        <P1
          className="text-gray-800 line-clamp-3 tablet:line-clamp-2"
          text={ogDescription}
        />
      </div>
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
    </Link>
  )
}

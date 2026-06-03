'use client'
import type { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
// react-typescript-components
import { P1 } from '@twreporter/react-typescript-components/lib/text/paragraph'
import { H2 } from '@twreporter/react-typescript-components/lib/text/heading'
// constants
import { INTERNAL_ROUTES } from '@/constants/routes'
// types
import type { HomePageTopicSectionMeta } from '@/types/home'

export const TopicSectionCard: FC<HomePageTopicSectionMeta> = ({
  slug,
  title,
  ogDescription,
  image,
}) => {
  return (
    <Link
      href={`${INTERNAL_ROUTES.topics}/${slug}`}
      className="flex flex-col gap-[12px] w-full transition-opacity duration-300 hover:opacity-70"
    >
      <div className="flex justify-center items-center text-center h-[60px] desktop:h-[80px]">
        <H2
          className="text-gray-800 line-clamp-2"
          type={H2.Type.article}
          text={title}
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
      <P1 className="text-gray-800 line-clamp-6" text={ogDescription} />
    </Link>
  )
}

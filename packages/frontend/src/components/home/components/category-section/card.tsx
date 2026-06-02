'use client'
import { useContext, type FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
// react-typescript-components
import { H5 } from '@twreporter/react-typescript-components/lib/text/heading'
import { TextButton } from '@twreporter/react-typescript-components/lib/button'
import { Arrow } from '@twreporter/react-typescript-components/lib/icons'
// constants
import { INTERNAL_ROUTES } from '@/constants/routes'
// context
import { BaseContext } from '@/contexts'
// types
import type { HomePageCategorySectionMeta } from '@/types/home'

export const CategorySectionCard: FC<HomePageCategorySectionMeta> = ({
  slug,
  title,
  image,
  category,
}) => {
  const router = useRouter()
  const { releaseBranch } = useContext(BaseContext)
  return (
    <div className="w-full flex flex-col gap-[12px]">
      <H5 text={category.label} className="text-gray-800 text-center" />
      <Link
        href={`${INTERNAL_ROUTES.article}/${slug}`}
        className="flex flex-col w-full transition-opacity duration-300 hover:opacity-70"
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
        <div className="w-full p-[12px] bg-gray-white">
          <H5 className="text-gray-800" type={H5.Type.article} text={title} />
        </div>
      </Link>
      <div className="w-full flex justify-center">
        <TextButton
          text={`更多${category.label}`}
          style={TextButton.Style.light}
          rightIconComponent={
            <Arrow
              direction={Arrow.Direction.right}
              releaseBranch={releaseBranch}
            />
          }
          onClick={() => router.push(category.to)}
        />
      </div>
    </div>
  )
}

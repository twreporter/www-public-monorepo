import type { FC } from 'react'
import clsx from 'clsx'
import Link from 'next/link'
// constants
import { INTERNAL_ROUTES } from '@/constants/routes'
// components
import ImageWithSkeleton from '@/components/image-with-skeleton'
// type
import type { Tag } from '@/type/article'
import type { Image } from '@/type/image'
// enum
import { Style } from '@/enums/article'
// utils
import { formatDate } from '@/utils/date-formatters'
// @twreporter
import { H3 } from '@twreporter/react-typescript-components/lib/text/heading'
import {
  P1,
  P3,
} from '@twreporter/react-typescript-components/lib/text/paragraph'

// style
const containerClass = clsx(
  'hd:w-[555px] desktop:w-[451px] tablet:w-[339px] w-full',
  'pb-[40px]'
)

const imageClass = clsx('w-full', 'object-cover')

const textContainClass = clsx(
  'flex flex-col justify-center items-start',
  'my-[12px] hd:m-[12px] desktop:m-[12px] tablet:m-[12px]'
)

const tagContainerClass = clsx(
  'flex flex-row flex-wrap justify-start items-center',
  'gap-x-[8px] gap-y-[10px]',
  'hd:ml-[12px] desktop:ml-[12px] tablet:ml-[12px]'
)

const getTagClass = (selected = false) => {
  return clsx(
    'border-1 border-solid border-brand-heavy',
    'rounded-[68px]',
    'px-[10px] py-[2px]',
    'mr-[8px] mb-[10px]',
    {
      'text-gray-white': selected,
      'text-brand-heavy': !selected,
    },
    {
      'bg-brand-heavy': selected,
      'bg-gray-100': !selected,
    }
  )
}

type ArticleCardProps = {
  title: string
  subtitle?: string
  slug: string
  style?: Style
  category: string
  publishedDate?: string
  image?: Image
  tags?: Tag[]
}
const ArticleCard: FC<ArticleCardProps> = ({
  title,
  subtitle,
  slug,
  style,
  category,
  publishedDate,
  image,
  tags,
}) => {
  const path =
    style === Style.INTERACTIVE
      ? INTERNAL_ROUTES.interactiveArticle
      : INTERNAL_ROUTES.article
  const link = `${path}/${encodeURIComponent(slug)}`

  return (
    <div className={containerClass}>
      <Link
        href={link}
        className="hover:opacity-70 transition-opacity duration-200 ease-linear"
      >
        {image ? (
          <ImageWithSkeleton
            className={imageClass}
            src={image.src}
            alt={image.alt || `hero image of ${slug}`}
          />
        ) : null}
        <div className={textContainClass}>
          {category ? (
            <P3 className="text-brand-heavy pb-[10px]" text={category} />
          ) : null}
          <H3
            className="text-gray-800 pb-[10px]"
            text={title}
            type={H3.Type.article}
          />
          <P1 className="text-gray-800" text={subtitle} />
          {publishedDate ? (
            <P3
              className="text-gray-800 self-end pt-[16px]"
              text={formatDate(publishedDate, 'YYYY.MM.DD')}
            />
          ) : null}
        </div>
      </Link>
      {tags && tags.length > 0 ? (
        <div className={tagContainerClass}>
          {tags.map(({ slug, name, selected }) => (
            <Link
              href={`${INTERNAL_ROUTES.tag}/${encodeURIComponent(slug)}`}
              key={`tag-${slug}`}
            >
              <P3
                className={getTagClass(selected)}
                text={name}
                weight={P3.Weight.bold}
              />
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default ArticleCard

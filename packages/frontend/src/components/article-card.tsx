import type { FC } from 'react'
import clsx from 'clsx'
import Link from 'next/link'
// constants
import { INTERNAL_ROUTES } from '@/constants/routes'
// components
import ImageWithSkeleton from '@/components/image-with-skeleton'
// type
import type { Tag } from '@/types/article'
import type { Image } from '@/types/image'
// enum
import { Style } from '@/enums/article'
// utils
import { formatDate } from '@/utils/date-formatters'
// @twreporter
import { H4 } from '@twreporter/react-typescript-components/lib/text/heading'
import {
  P1,
  P3,
} from '@twreporter/react-typescript-components/lib/text/paragraph'
import { TextButton } from '@twreporter/react-typescript-components/lib/button'
import { Bookmark } from '@twreporter/react-typescript-components/lib/icons'
import {
  RELEASE_BRANCH,
  type ReleaseBranch,
} from '@twreporter/react-typescript-components/lib/constants/release-branch'

// style
const containerClass = 'w-full'

const imageClass = clsx('w-full', 'object-cover')

const textContainClass = clsx(
  'flex flex-col justify-center items-start mt-[8px] gap-[10px]'
)

const tagContainerClass = clsx(
  'flex flex-row flex-wrap justify-start items-center mt-[20px] gap-[10px]'
)

const getTagClass = (selected = false) => {
  return clsx(
    'border-1 border-solid border-brand-heavy',
    'rounded-[68px]',
    'px-[10px] py-[2px]',
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

type BookmarkButtonProps = {
  isBookmark?: boolean
  onBookmarkClick?: () => void
  releaseBranch?: ReleaseBranch
}

const BookmarkButton: FC<BookmarkButtonProps> = ({
  isBookmark = false,
  onBookmarkClick,
  releaseBranch = RELEASE_BRANCH.master,
}) => (
  <div className="flex justify-end">
    <TextButton
      theme={TextButton.Theme.normal}
      style={TextButton.Style.light}
      leftIconComponent={
        <Bookmark
          type={isBookmark ? Bookmark.Type.SAVED : Bookmark.Type.ADD}
          releaseBranch={releaseBranch}
        />
      }
      onClick={(e) => {
        e.stopPropagation()
        e.preventDefault()
        onBookmarkClick?.()
      }}
      text={isBookmark ? '已收藏' : '收藏'}
    />
  </div>
)

// TODO: bookmark action
type ArticleCardProps = {
  title: string
  subtitle?: string
  slug: string
  style?: Style
  publishedDate?: string
  image?: Image
  tags?: Tag[]
}
const ArticleCard: FC<ArticleCardProps> = ({
  title,
  subtitle,
  slug,
  style,
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
          <div className="flex flex-row w-full justify-between">
            {publishedDate ? (
              <P3
                className="text-gray-800"
                text={formatDate(publishedDate, 'YYYY/MM/DD')}
              />
            ) : null}
            <BookmarkButton />
          </div>
          <H4
            className="text-gray-800 pb-[10px]"
            text={title}
            type={H4.Type.article}
          />
          <P1 className="text-gray-800" text={subtitle} />
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

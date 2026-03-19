import type { FC } from 'react'
import clsx from 'clsx'
// text
import { P1, P2, P3 } from '../../text/paragraph'
import { H4 } from '../../text/heading'
// constants
import { SIZE, type Size } from './constants'
// skeleton
import { LargeSkeleton, SmallSkeleton } from './loading'

type CardListBaseProps = {
  category?: string
  publishedDate?: string
  title: string
  description: string
  image?: {
    src: string
    alt?: string
  }
  size: Size
  // TODO: add isBookmark when bookmark feature is ready
  // isBookmark?: boolean
  // onBookmarkClick?: () => void
}

type CardListLoadingProps = {
  isLoading: true
  size: Size
}

type CardListDetailProps = CardListBaseProps & {
  isLoading?: false
}

type CardListProps = CardListLoadingProps | CardListDetailProps

const CardList: FC<CardListProps> & { Size: typeof SIZE } = (props) => {
  const { size, isLoading = false } = props

  if (size === SIZE.s) {
    if (isLoading) {
      return <SmallSkeleton />
    }
    const { category, publishedDate, title, description, image } =
      props as CardListDetailProps
    return (
      <div
        className={clsx(
          'flex flex-col w-full gap-[8px]',
          'hover:opacity-70',
          'hover:cursor-pointer'
        )}
      >
        <div className="flex flex-row gap-[8px]">
          <div className="flex flex-col w-full gap-[4px]">
            <div className="flex flex-row gap-[8px]">
              {category ? (
                <P3 className="text-gray-600" text={category} />
              ) : null}
              {publishedDate ? (
                <P3 className="text-gray-600" text={publishedDate} />
              ) : null}
            </div>
            <H4 className="text-gray-800" text={title} />
          </div>
          <div className="flex justify-center items-center">
            {/* biome-ignore lint/performance/noImgElement: use next image later */}
            <img
              src={image?.src}
              alt={image?.alt}
              className="w-[72px] h-[72px]"
            />
          </div>
        </div>
        <P2 className="text-gray-800 line-clamp-3" text={description} />
      </div>
    )
  }

  if (isLoading) {
    return <LargeSkeleton />
  }

  const { category, publishedDate, title, description, image } =
    props as CardListDetailProps
  return (
    <div
      className={clsx(
        'flex flex-row w-full gap-[32px]',
        'hover:opacity-70',
        'hover:cursor-pointer'
      )}
    >
      <div className="flex flex-col w-full gap-[8px]">
        <div className="flex flex-row gap-[8px]">
          {category ? <P3 className="text-gray-600" text={category} /> : null}
          {publishedDate ? (
            <P3 className="text-gray-600" text={publishedDate} />
          ) : null}
        </div>
        <H4 className="text-gray-800" text={title} />
        <P1 className="text-gray-800 line-clamp-3" text={description} />
      </div>
      <div className="flex justify-center items-center">
        {/* biome-ignore lint/performance/noImgElement: use next image later */}
        <img
          src={image?.src}
          alt={image?.alt}
          className="w-[216px] h-[144px]"
        />
      </div>
    </div>
  )
}

CardList.Size = SIZE
export default CardList

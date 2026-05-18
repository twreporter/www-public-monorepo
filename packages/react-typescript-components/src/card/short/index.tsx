import { type FC, useState } from 'react'
import clsx from 'clsx'
// text
import { P3 } from '../../text/paragraph'
import { H6 } from '../../text/heading'
// constants
import { SIZE, type Size } from './constants'
// placeholder
import ImgPlaceholder from '../img-placeholder'

type ShortCardProps = {
  title: string
  publishedDate?: string
  categoryLabel?: string
  image?: {
    src: string
    alt?: string
  }
  size: Size
}

const ShortCard: FC<ShortCardProps> & { Size: typeof SIZE } = ({
  title,
  publishedDate = '',
  categoryLabel = '',
  image,
  size = SIZE.l,
}) => {
  const [failedImageKey, setFailedImageKey] = useState<string | null>(null)
  const imageSrc = image?.src ?? undefined
  const imageKey = `${size}:${imageSrc ?? ''}`
  const isImageFailed = failedImageKey === imageKey

  return (
    <div
      className={clsx(
        'flex flex-row w-full',
        'hover:opacity-80',
        size === SIZE.s ? 'gap-[8px]' : 'gap-[16px]'
      )}
    >
      <div
        className={clsx(
          'flex flex-col w-full gap-[4px]',
          size === SIZE.s ? 'gap-[4px]' : 'gap-[8px]'
        )}
      >
        <div className="flex flex-row gap-[8px]">
          {categoryLabel ? (
            <P3 className="text-gray-600" text={categoryLabel}></P3>
          ) : null}
          {publishedDate ? (
            <P3 className="text-gray-800" text={publishedDate}></P3>
          ) : null}
        </div>
        <H6 className="text-gray-800" text={title} type={H6.Type.article} />
      </div>
      <div className="flex justify-center items-center">
        {image?.src && !isImageFailed ? (
          // biome-ignore lint/performance/noImgElement: use next image later
          <img
            src={image.src}
            alt={image.alt ?? ''}
            className={clsx(
              'object-cover shrink-0',
              size === SIZE.s ? 'w-[40px] h-[40px]' : 'w-[80px] h-[80px]'
            )}
            onError={() => setFailedImageKey(imageKey)}
          />
        ) : (
          <div
            className={clsx(
              'shrink-0 flex items-center justify-center bg-gray-100',
              size === SIZE.s ? 'w-[40px] h-[40px]' : 'w-[80px] h-[80px]'
            )}
          >
            <ImgPlaceholder />
          </div>
        )}
      </div>
    </div>
  )
}

ShortCard.Size = SIZE
export default ShortCard

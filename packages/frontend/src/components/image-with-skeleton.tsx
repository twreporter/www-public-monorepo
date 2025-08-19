'use client'

import { type SyntheticEvent, type FC, useState } from 'react'
import Image, { type ImageProps } from 'next/image'

const gray200Base64 =
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN89B8AAskB44g04okAAAAASUVORK5CYII='
const fallbackUrl = `data:image/png;base64, ${gray200Base64}`

export const ImageWithSkeleton: FC<ImageProps> = ({
  src,
  alt = '',
  width = 500,
  height  = 400,
  ...props
}) => {
  const [hasError, setHasError] = useState(false)
  const handleError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.preventDefault()
    e.stopPropagation()
    setHasError(true)
  }

  return (
    <Image
      {...props}
      alt={alt}
      src={hasError ? fallbackUrl : src}
      width={width}
      height={height}
      placeholder="blur"
      blurDataURL={fallbackUrl}
      unoptimized={false}
      onError={handleError}
    />
  )
}

export default ImageWithSkeleton

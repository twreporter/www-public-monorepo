import type { FC } from 'react'
import { useImageConfig } from '../../../context/ImageConfigContext'
// type
import type { ImageLayout, ImageSource } from '../constant'

/* todo: fullscreen image & sensitive image */
type ImageDisplayModeProps = {
  imageUrl: string
  layout: ImageLayout
  caption: string
  imageSource?: ImageSource
}
const ImageDisplayMode: FC<ImageDisplayModeProps> = ({
  imageUrl,
  layout,
  caption,
  imageSource = 'link',
}) => {
  const imageConfig = useImageConfig()
  const isCmsBackedImage =
    imageSource === 'db' || imageSource === 'drag-drop'
  const rawSrcSet =
    isCmsBackedImage ? imageConfig?.getDbImageSrcSet?.(imageUrl) : undefined
  const srcSet = rawSrcSet?.trim() ? rawSrcSet : undefined

  return (
    <div className={`Image__container ${layout}`}>
      <div className={`Image__image_block ${layout}`}>
        <figure itemScope itemType="http://schema.org/ImageObject">
          <img
            src={imageUrl}
            srcSet={srcSet}
            alt={caption}
            aria-label={caption}
            className="Image__image"
          />
          {caption && (
            <figcaption className="Image__caption">{caption}</figcaption>
          )}
        </figure>
      </div>
    </div>
  )
}

export default ImageDisplayMode

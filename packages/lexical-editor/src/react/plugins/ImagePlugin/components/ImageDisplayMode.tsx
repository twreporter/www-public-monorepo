import type { FC } from 'react'
// type
import type { ImageLayout } from '../types'

/* todo: fullscreen image & sensitive image */
type ImageDisplayModeProps = {
  imageUrl: string
  layout: ImageLayout
  caption: string
}
const ImageDisplayMode: FC<ImageDisplayModeProps> = ({
  imageUrl,
  layout,
  caption,
}) => {
  return (
    <div className={`Image__container ${layout}`}>
      <div className={`Image__image_block ${layout}`}>
        <figure itemScope itemType="http://schema.org/ImageObject">
          <img src={imageUrl} alt={caption} aria-label={caption} className="Image__image" />
          {caption &&
            <figcaption className="Image__caption">
              {caption}
            </figcaption>
          }
        </figure>
      </div>
    </div>
  )
}

export default ImageDisplayMode
import type { FC } from 'react'

import type { ImageLayout } from '../types'

type ImageSkeletonProps = {
  layout: ImageLayout
}

const ImageSkeleton: FC<ImageSkeletonProps> = ({ layout }) => {
  return (
    <div className={`Image__container ${layout}`}>
      <div
        className={`Image__image_block ${layout} Image__skeleton`}
        aria-busy="true"
      >
        <div className="Image__skeleton_media" />
        <div className="Image__skeleton_caption">
          <div className="Image__skeleton_line Image__skeleton_line--long" />
          <div className="Image__skeleton_line Image__skeleton_line--short" />
        </div>
      </div>
    </div>
  )
}

export default ImageSkeleton

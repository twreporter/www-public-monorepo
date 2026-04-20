import { type FC, useState, type MouseEvent } from 'react'
// components
import ImageEditDialog from './ImageEditDialog'
// types
import type { ImageLayout } from '../types'


type ImageEditModeProps = {
  imageUrl: string
  layout: ImageLayout
  caption: string
  onConfirm: (url: string, layout: ImageLayout, caption: string) => void
  onDelete: () => void
  onUpdateLayout: (layout: ImageLayout) => void
}
const ImageEditMode: FC<ImageEditModeProps> = ({
  imageUrl,
  layout,
  caption,
  onConfirm,
  onDelete,
  onUpdateLayout,
}) => {
  const [isOpenEdit, setIsOpenEdit] = useState(false)

  const openEditDialog = () => setIsOpenEdit(true)
  const closeEditDialog = () => setIsOpenEdit(false)

  const updateLayout = (e: MouseEvent<HTMLButtonElement>, layout: ImageLayout) => {
    e.preventDefault()
    e.stopPropagation()

    if (typeof onUpdateLayout === 'function') {
      onUpdateLayout(layout)
    }
  }

  const confirmEdit = (url: string, layout: ImageLayout, caption: string) => {
    if (typeof onConfirm === 'function') {
      onConfirm(url, layout, caption)
    }

    closeEditDialog()
  }

  return (
    <div className={`Image__container ${layout}`}>
      <div className={`Image__image_block ${layout}`} onClick={openEditDialog}>
        <figure itemScope itemType="http://schema.org/ImageObject">
          <img src={imageUrl} alt={caption} aria-label={caption} className="Image__image" />
          {caption &&
            <figcaption className="Image__caption">
              {caption}
            </figcaption>
          }
        </figure>
        <div className="Image__edit_layout">
          <button type="button" className={`layout-option ${layout === 'default' ? 'is-active' : ''}`} onClick={(e) => updateLayout(e, 'default')}>
            <i className="image-layout-default" />
          </button>
          <button type="button" className={`layout-option ${layout === 'small' ? 'is-active' : ''}`} onClick={(e) => updateLayout(e, 'small')}>
            <i className="image-layout-small" />
          </button>
          <button type="button" className={`layout-option ${layout === 'right' ? 'is-active' : ''}`} onClick={(e) => updateLayout(e, 'right')}>
            <i className="image-layout-right" />
          </button>
        </div>
        <div className="Image__edit_image">
          <button type="button">
            <i className="image-edit" />
          </button>
        </div>
      </div>

      {isOpenEdit ? (
        <ImageEditDialog
          imageUrl={imageUrl}
          imageLayout={layout}
          imageCaption={caption}
          onConfirm={confirmEdit}
          onClose={closeEditDialog}
          onDelete={onDelete}
        />
      ) : null}
    </div>
  )
}

export default ImageEditMode
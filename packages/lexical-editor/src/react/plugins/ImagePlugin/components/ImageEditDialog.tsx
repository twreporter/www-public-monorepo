import { type FC, useState, type KeyboardEvent, type MouseEvent } from 'react'
import type { ImageLayout, ImageSource } from '../types'

type EditDialogProps = {
  imageCaption?: string
  imageUrl: string
  imageLayout: ImageLayout
  imageTitle?: string
  imageSource?: ImageSource
  onConfirm: (url: string, layout: ImageLayout, caption: string, title?: string) => void
  onClose: () => void
  onDelete?: () => void
}
const EditDialog: FC<EditDialogProps> = ({
  imageUrl,
  imageLayout,
  imageCaption = '',
  imageTitle = '',
  imageSource = 'link',
  onConfirm,
  onClose,
  onDelete
}) => {
  const [url, setUrl] = useState(imageUrl)
  const [layout, setLayout] = useState(imageLayout)
  const [caption, setCaption] = useState(imageCaption)
  const [title, setTitle] = useState(imageTitle)
  const isUploadedImage = imageSource === 'drag-drop'

  const cancel = () => {
    onClose()
  }

  const confirm = () => {
    // For uploaded images, URL is not editable
    if (isUploadedImage) {
      onConfirm(imageUrl, layout, caption, title)
      onClose()
      return
    }

    const trimmedUrl = url.trim()

    if (!trimmedUrl) {
      alert('此編輯欄位不可空白，請輸入內容。')
      return
    }

    try {
      new URL(trimmedUrl)
    } catch {
      alert('請輸入有效的圖片網址')
      return
    }

    onConfirm(trimmedUrl, layout, caption, title || undefined)
    onClose()
    return
  }

  const deleteNode = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (typeof onDelete === 'function') {
      onDelete()
    }
  }

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'a') {
      e.stopPropagation()
    }
  }

  return (
    <div className="Image__edit_dialog" role="dialog" aria-modal="true">
      <div className="dialog-header">
        <p className="title">編輯圖片</p>
        <div className="button-set">
          {onDelete && <button type="button" className="button-delete" onClick={deleteNode}>Delete</button>}
          <button type="button" className="button-cancel" onClick={cancel}>Cancel</button>
          <button type="button" className="button-confirm" onClick={confirm}>Confirm</button>
        </div>
      </div>
      <div className="dialog-content">
        {!isUploadedImage && (
          <div className="edit-item">
            <p className="item-title">圖片 url</p>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={handleInputKeyDown}
            />
          </div>
        )}
        {isUploadedImage && imageTitle && (
          <div className="edit-item">
            <p className="item-title">圖片標題</p>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={handleInputKeyDown}
              readOnly={isUploadedImage}
            />
          </div>
        )}
        <div className="edit-item">
          <p className="item-title">圖說</p>
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            onKeyDown={handleInputKeyDown}
          />
        </div>
        <div className="edit-item">
          <p className="item-title">圖片版式</p>
          <div className="layout-option">
            <button type="button" className={`button-layout ${layout === 'default' ? 'is-active' : ''}`} onClick={() => setLayout('default')}>
              <i className="image-layout-default" />
              <p>default</p>
            </button>
            <button type="button" className={`button-layout ${layout === 'small' ? 'is-active' : ''}`} onClick={() => setLayout('small')}>
              <i className="image-layout-small" />
              <p>small</p>
            </button>
            <button type="button" className={`button-layout ${layout === 'right' ? 'is-active' : ''}`} onClick={() => setLayout('right')}>
              <i className="image-layout-right" />
              <p>right</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditDialog

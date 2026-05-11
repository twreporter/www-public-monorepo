import { type FC, useState, type KeyboardEvent, type MouseEvent } from 'react'
import type { ImageLayout, ImageSource } from '../types'
import { useImageConfig } from '../../../context/ImageConfigContext'
import {
  PluginButton,
  PluginDialog,
  PluginField,
  PluginTextInput,
} from '../../../components/PluginUI'
import ImageLayoutOptions from './ImageLayoutOptions'

type EditDialogProps = {
  imageCaption?: string
  imageUrl: string
  imageLayout: ImageLayout
  imageTitle?: string
  imageSource?: ImageSource
  onConfirm: (
    url: string,
    layout: ImageLayout,
    caption: string,
    title?: string
  ) => void
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
  onDelete,
}) => {
  const [url, setUrl] = useState(imageUrl)
  const [layout, setLayout] = useState(imageLayout)
  const [caption, setCaption] = useState(imageCaption)
  const imageConfig = useImageConfig()
  const isUploadedImage = imageSource === 'drag-drop'
  const relatedPhotosHref = imageTitle
    ? imageConfig?.relatedPhotosHref?.(imageTitle)
    : undefined

  const cancel = () => {
    onClose()
  }

  const confirm = () => {
    // For uploaded images, URL is not editable
    if (isUploadedImage) {
      onConfirm(imageUrl, layout, caption, imageTitle)
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

    onConfirm(trimmedUrl, layout, caption, imageTitle || undefined)
    onClose()
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
    <PluginDialog
      title="編輯圖片"
      className="Image__edit_dialog"
      actions={
        <>
          {onDelete && (
            <PluginButton variant="danger" onClick={deleteNode}>
              Delete
            </PluginButton>
          )}
          <PluginButton onClick={cancel}>Cancel</PluginButton>
          <PluginButton variant="primary" onClick={confirm}>
            Confirm
          </PluginButton>
        </>
      }
    >
      {!isUploadedImage && (
        <PluginField label="圖片 url">
          <PluginTextInput
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={handleInputKeyDown}
          />
        </PluginField>
      )}
      {isUploadedImage && imageTitle && (
        <PluginField label="圖片標題">
          <p className="item-description">{imageTitle}</p>
          {relatedPhotosHref && (
            <a
              href={relatedPhotosHref}
              target="_blank"
              rel="noopener noreferrer"
              className="item-link"
            >
              View related Photos
            </a>
          )}
        </PluginField>
      )}
      <PluginField label="圖說">
        <PluginTextInput
          type="text"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          onKeyDown={handleInputKeyDown}
        />
      </PluginField>
      <PluginField label="圖片版式">
        <ImageLayoutOptions layout={layout} onChange={setLayout} />
      </PluginField>
    </PluginDialog>
  )
}

export default EditDialog

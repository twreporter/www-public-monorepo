import {
  type LexicalNode,
  DecoratorNode,
  type NodeKey,
  $getNodeByKey,
} from 'lexical'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import {
  type ReactNode,
  type FC,
  useState,
  type MouseEvent,
} from 'react'
import { $isImageNode, ImageNode } from './ImageNode'
import ImageEditDialog from '../components/ImageEditDialog'
// type
import type { ImageLayout } from '../types'
// global var
const imageLinkContentType = 'imageLink-content'

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

type ImageContentProps = {
  nodeKey: string
  imageCaption?: string
  imageUrl: string
  imageLayout?: ImageLayout
}
const ImageContent: FC<ImageContentProps> = ({
  nodeKey,
  imageCaption = '',
  imageUrl,
  imageLayout = 'default'
}) => {
  const [editor] = useLexicalComposerContext()
  const editable = editor.isEditable()

  const updateLayout = (layout: ImageLayout) => {
    editor.update(() => {
      const node = $getNodeByKey(nodeKey) as ImageContentNode
      if (node) {
        node.getWritable().__imageLayout = layout
      }
    })
  }

  const confirm = (url: string, layout: ImageLayout, caption: string) => {
    editor.update(() => {
      const node = $getNodeByKey(nodeKey) as ImageContentNode
      if (node) {
        node.getWritable().__caption = caption
        node.getWritable().__imageUrl = url
        node.getWritable().__imageLayout = layout
      }
    })

    return
  }

  const deleteImage = () => {
    editor.update(() => {
      const node = $getNodeByKey(nodeKey) as ImageContentNode
      const parent = node.getParent()
      if (parent instanceof ImageNode) {
        parent.remove()
      }
    })
  }

  return (
    <>
      { editable ?
        <ImageEditMode
          imageUrl={imageUrl}
          layout={imageLayout}
          caption={imageCaption}
          onConfirm={confirm}
          onDelete={deleteImage}
          onUpdateLayout={updateLayout}
        /> :
        <ImageDisplayMode
          imageUrl={imageUrl}
          layout={imageLayout}
          caption={imageCaption}
        />
      }
    </>
  )
}

type SerializedImageContentNode = {
  type: typeof imageLinkContentType
  version: 1
  imageLayout: ImageLayout
  imageUrl: string
  caption: string
}

export class ImageContentNode extends DecoratorNode<ReactNode> {
  __imageUrl: string
  __imageLayout: ImageLayout
  __caption: string

  static override getType(): string {
    return imageLinkContentType
  }

  static override clone(node: ImageContentNode): ImageContentNode {
    return new ImageContentNode(node.__imageUrl, node.__imageLayout, node.__caption, node.__key)
  }

  constructor(url: string, layout: ImageLayout, caption: string, key?: NodeKey) {
    super(key)
    this.__imageUrl = url
    this.__imageLayout = layout
    this.__caption = caption
  }

  override createDOM(): HTMLElement {
    const parentNode = this.getLatest().getParentOrThrow()
    if (!$isImageNode(parentNode)) {
      throw new Error('Expected parent node to be an ImageNode')
    }

    const div = document.createElement('div')
    div.classList.add('Image__content')
  
    return div
  }

  override updateDOM() {
    return false
  }

  override decorate(): ReactNode {
    return <ImageContent nodeKey={this.getKey()} imageUrl={this.__imageUrl} imageLayout={this.__imageLayout} imageCaption={this.__caption} />
  }

  static override importJSON(serializedNode: SerializedImageContentNode) {
    return new ImageContentNode(serializedNode.imageUrl, serializedNode.imageLayout, serializedNode.caption)
  }

  override exportJSON(): SerializedImageContentNode {
    return {
      type: imageLinkContentType,
      version: 1,
      imageUrl: this.__imageUrl,
      imageLayout: this.__imageLayout,
      caption: this.__caption,
    }
  }

  getUrl(): string {
    const self = this.getLatest()
    return self.__imageUrl
  }

  setUrl(url: string) {
    const write = this.getWritable()
    write.__imageUrl = url
  }
}

export function $createImageContentNode(url: string, layout: ImageLayout, caption: string): ImageContentNode {
  return new ImageContentNode(url, layout, caption)
}

export function $isImageContentNode(
  node: LexicalNode | null | undefined
): node is ImageContentNode {
  return node instanceof ImageContentNode
}

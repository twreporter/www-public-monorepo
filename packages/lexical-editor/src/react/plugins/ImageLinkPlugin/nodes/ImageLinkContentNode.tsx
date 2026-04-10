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
import { $isImageLinkNode, ImageLinkNode } from './ImageLinkNode'
import ImageLinkEditDialog from '../components/ImageLinkEditDialog'
// type
import type { ImageLayout } from '../types'
// global var
const imageLinkContentType = 'imageLink-content'

type ImageLinkContentProps = {
  nodeKey: string
  imageCaption?: string
  imageUrl: string
  imageLayout?: ImageLayout
}
const ImageLinkContent: FC<ImageLinkContentProps> = ({
  nodeKey,
  imageCaption = '',
  imageUrl,
  imageLayout = 'default'
}) => {
  const [editor] = useLexicalComposerContext()
  const editable = editor.isEditable()

  const [isOpenEdit, setIsOpenEdit] = useState(false)

  const openEditDialog = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsOpenEdit(true)
  }

  const updateLayout = (e: MouseEvent<HTMLButtonElement>, layout: ImageLayout) => {
    e.preventDefault()
    e.stopPropagation()
  
    editor.update(() => {
      const node = $getNodeByKey(nodeKey) as ImageLinkContentNode
      if (node) {
        node.getWritable().__imageLayout = layout
      }
    })
  }

  const confirm = (url: string, layout: ImageLayout, caption: string) => {
    editor.update(() => {
      const node = $getNodeByKey(nodeKey) as ImageLinkContentNode
      if (node) {
        node.getWritable().__caption = caption
        node.getWritable().__imageUrl = url
        node.getWritable().__imageLayout = layout
      }
    })

    setIsOpenEdit(false)
    return
  }

  const deleteImageLink = () => {
    editor.update(() => {
      const node = $getNodeByKey(nodeKey) as ImageLinkContentNode
      const parent = node.getParent()
      if (parent instanceof ImageLinkNode) {
        parent.remove()
      }
    })
  }

  return (
    <>
      <div className={`ImageLink__image_block ${imageLayout}`} onClick={openEditDialog}>
        <figure itemScope itemType="http://schema.org/ImageObject">
          <img src={imageUrl} alt={imageCaption} aria-label={imageCaption} className="ImageLink__image" />
          {imageCaption &&
            <figcaption className="ImageLink__caption">
              {imageCaption}
            </figcaption>
          }
        </figure>
        {editable ? (
          <>
            <div className="ImageLink__edit_layout">
              <button type="button" className={`layout-option ${imageLayout === 'default' ? 'is-active' : ''}`} onClick={(e) => updateLayout(e, 'default')}>
                <i className="image-layout-default" />
              </button>
              <button type="button" className={`layout-option ${imageLayout === 'small' ? 'is-active' : ''}`} onClick={(e) => updateLayout(e, 'small')}>
                <i className="image-layout-small" />
              </button>
              <button type="button" className={`layout-option ${imageLayout === 'right' ? 'is-active' : ''}`} onClick={(e) => updateLayout(e, 'right')}>
                <i className="image-layout-right" />
              </button>
            </div>
            <div className="ImageLink__edit_image">
              <button type="button">
                <i className="image-edit" />
              </button>
            </div>
          </>
        ) : null}
      </div>

      {isOpenEdit ? (
        <ImageLinkEditDialog
          imageUrl={imageUrl}
          imageLayout={imageLayout}
          imageCaption={imageCaption}
          onConfirm={confirm}
          onClose={() => setIsOpenEdit(false)}
          onDelete={deleteImageLink}
        />
      ) : null}
    </>
  )
}

type SerializedImageLinkContentNode = {
  type: typeof imageLinkContentType
  version: 1
  imageLayout: ImageLayout
  imageUrl: string
  caption: string
}

export class ImageLinkContentNode extends DecoratorNode<ReactNode> {
  __imageUrl: string
  __imageLayout: ImageLayout
  __caption: string

  static override getType(): string {
    return imageLinkContentType
  }

  static override clone(node: ImageLinkContentNode): ImageLinkContentNode {
    return new ImageLinkContentNode(node.__imageUrl, node.__imageLayout, node.__caption, node.__key)
  }

  constructor(url: string, layout: ImageLayout, caption: string, key?: NodeKey) {
    super(key)
    this.__imageUrl = url
    this.__imageLayout = layout
    this.__caption = caption
  }

  override createDOM(): HTMLElement {
    const parentNode = this.getLatest().getParentOrThrow()
    if (!$isImageLinkNode(parentNode)) {
      throw new Error('Expected parent node to be a ImageLinkNode')
    }

    const div = document.createElement('div')
    div.classList.add('ImageLink__content')
  
    return div
  }

  override updateDOM() {
    return false
  }

  override decorate(): ReactNode {
    return <ImageLinkContent nodeKey={this.getKey()} imageUrl={this.__imageUrl} imageLayout={this.__imageLayout} imageCaption={this.__caption} />
  }

  static override importJSON(serializedNode: SerializedImageLinkContentNode) {
    return new ImageLinkContentNode(serializedNode.imageUrl, serializedNode.imageLayout, serializedNode.caption)
  }

  override exportJSON(): SerializedImageLinkContentNode {
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

export function $createImageLinkContentNode(url: string, layout: ImageLayout, caption: string): ImageLinkContentNode {
  return new ImageLinkContentNode(url, layout, caption)
}

export function $isImageLinkContentNode(
  node: LexicalNode | null | undefined
): node is ImageLinkContentNode {
  return node instanceof ImageLinkContentNode
}

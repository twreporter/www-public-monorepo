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
  useEffect,
  useState
} from 'react'
// node
import { $isImageNode, ImageNode } from './ImageNode'
// components
import ImageEditMode from '../components/ImageEditMode'
import ImageDisplayMode from '../components/ImageDisplayMode'
// type
import type { ImageLayout } from '../types'
// global var
const imageLinkContentType = 'imageLink-content'

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
  const [editable, setEditable] = useState(() => editor.isEditable())

  useEffect(() => {
    return editor.registerEditableListener((currentEditable) => {
      setEditable(currentEditable)
    })
  }, [editor])

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

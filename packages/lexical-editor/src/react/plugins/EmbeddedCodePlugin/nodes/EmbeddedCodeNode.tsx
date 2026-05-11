import {
  $applyNodeReplacement,
  $getNodeByKey,
  DecoratorNode,
  type EditorConfig,
  type LexicalNode,
  type NodeKey,
} from 'lexical'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { type FC, type ReactNode, useEffect, useState } from 'react'

import EmbeddedCodeDisplayMode from '../components/EmbeddedCodeDisplayMode'
import EmbeddedCodeEditMode from '../components/EmbeddedCodeEditMode'
import type { EmbeddedCodeLayout } from '../types'

const embeddedCodeNodeType = 'embedded-code'

type EmbeddedCodeProps = {
  nodeKey: string
  embeddedCode: string
  caption?: string
  layout?: EmbeddedCodeLayout
}

const EmbeddedCode: FC<EmbeddedCodeProps> = ({
  nodeKey,
  embeddedCode,
  caption = '',
  layout = 'default',
}) => {
  const [editor] = useLexicalComposerContext()
  const [editable, setEditable] = useState(() => editor.isEditable())

  useEffect(() => {
    return editor.registerEditableListener((currentEditable) => {
      setEditable(currentEditable)
    })
  }, [editor])

  const confirm = (
    nextEmbeddedCode: string,
    nextLayout: EmbeddedCodeLayout,
    nextCaption: string
  ) => {
    editor.update(() => {
      const node = $getNodeByKey(nodeKey)
      if ($isEmbeddedCodeNode(node)) {
        node.updateContent({
          embeddedCode: nextEmbeddedCode,
          layout: nextLayout,
          caption: nextCaption,
        })
      }
    })
  }

  const deleteEmbeddedCode = () => {
    editor.update(() => {
      const node = $getNodeByKey(nodeKey)
      if ($isEmbeddedCodeNode(node)) {
        node.remove()
      }
    })
  }

  return editable ? (
    <EmbeddedCodeEditMode
      embeddedCode={embeddedCode}
      layout={layout}
      caption={caption}
      onConfirm={confirm}
      onDelete={deleteEmbeddedCode}
    />
  ) : (
    <EmbeddedCodeDisplayMode
      embeddedCode={embeddedCode}
      layout={layout}
      caption={caption}
    />
  )
}

type SerializedEmbeddedCodeNode = {
  type: typeof embeddedCodeNodeType
  version: 1
  embeddedCode: string
  caption: string
  layout: EmbeddedCodeLayout
}

export class EmbeddedCodeNode extends DecoratorNode<ReactNode> {
  __embeddedCode: string
  __caption: string
  __layout: EmbeddedCodeLayout

  static override getType(): string {
    return embeddedCodeNodeType
  }

  static override clone(node: EmbeddedCodeNode): EmbeddedCodeNode {
    return new EmbeddedCodeNode(
      node.__embeddedCode,
      node.__layout,
      node.__caption,
      node.__key
    )
  }

  constructor(
    embeddedCode: string,
    layout: EmbeddedCodeLayout,
    caption: string = '',
    key?: NodeKey
  ) {
    super(key)
    this.__embeddedCode = embeddedCode
    this.__layout = layout
    this.__caption = caption
  }

  override isInline(): false {
    return false
  }

  override createDOM(_config: EditorConfig): HTMLElement {
    const div = document.createElement('div')
    div.classList.add('EmbeddedCode__content', this.__layout)

    return div
  }

  override updateDOM(
    prevNode: EmbeddedCodeNode,
    dom: HTMLElement
  ): boolean {
    if (prevNode.__layout !== this.__layout) {
      dom.classList.remove(prevNode.__layout)
      dom.classList.add(this.__layout)
    }

    return false
  }

  override decorate(): ReactNode {
    return (
      <EmbeddedCode
        nodeKey={this.getKey()}
        embeddedCode={this.__embeddedCode}
        layout={this.__layout}
        caption={this.__caption}
      />
    )
  }

  static override importJSON(serializedNode: SerializedEmbeddedCodeNode) {
    return $createEmbeddedCodeNode(
      serializedNode.embeddedCode,
      serializedNode.layout,
      serializedNode.caption
    )
  }

  override exportJSON(): SerializedEmbeddedCodeNode {
    return {
      type: embeddedCodeNodeType,
      version: 1,
      embeddedCode: this.__embeddedCode,
      caption: this.__caption,
      layout: this.__layout,
    }
  }

  updateContent({
    embeddedCode,
    caption,
    layout,
  }: {
    embeddedCode: string
    caption: string
    layout: EmbeddedCodeLayout
  }): void {
    const writable = this.getWritable()
    writable.__embeddedCode = embeddedCode
    writable.__caption = caption
    writable.__layout = layout
  }
}

export function $createEmbeddedCodeNode(
  embeddedCode: string,
  layout: EmbeddedCodeLayout,
  caption: string = ''
): EmbeddedCodeNode {
  return $applyNodeReplacement(
    new EmbeddedCodeNode(embeddedCode, layout, caption)
  )
}

export function $isEmbeddedCodeNode(
  node: LexicalNode | null | undefined
): node is EmbeddedCodeNode {
  return node instanceof EmbeddedCodeNode
}

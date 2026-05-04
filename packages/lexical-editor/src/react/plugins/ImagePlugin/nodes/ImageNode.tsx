import {
  ElementNode,
  type LexicalNode,
  type EditorConfig,
  type DOMConversionMap,
  type DOMConversionOutput,
  type SerializedElementNode,
  type DOMExportOutput,
} from 'lexical'
// global var
const imageLinkNodeType = 'image-link'
const imageNodeClassname = 'Image__container'

type SerializedImageNode = SerializedElementNode

export function $convertDivElement(): DOMConversionOutput | null {
  const node = $createImageNode()
  return {
    node,
  }
}

export class ImageNode extends ElementNode {
  static override getType() {
    return imageLinkNodeType
  }

  static override clone(node: ImageNode): ImageNode {
    return new ImageNode(node.__key)
  }

  override isInline(): false {
    return false
  }

  override createDOM(config: EditorConfig): HTMLElement {
    const imageLinkClass = config.theme.imageLink ?? 'TwreporterTheme__imageLink'
    const divDom = document.createElement('div')
    divDom.classList.add(imageLinkClass, imageNodeClassname)

    return divDom
  }

  override updateDOM(): boolean {
    return false
  }

  static override importDOM(): DOMConversionMap<HTMLDivElement> | null {
    return {
      div: () => {
        return {
          conversion: $convertDivElement,
          priority: 1,
        }
      },
    }
  }

  override exportDOM(): DOMExportOutput {
    const element = document.createElement('div')
    element.classList.add(imageNodeClassname)
    return { element }
  }

  static override importJSON(serializedNode: SerializedImageNode): ImageNode {
    return $createImageNode().updateFromJSON(
      serializedNode
    )
  }
}

export function $createImageNode(): ImageNode {
  return new ImageNode()
}

export function $isImageNode(
  node: LexicalNode | null | undefined
): node is ImageNode {
  return node instanceof ImageNode
}

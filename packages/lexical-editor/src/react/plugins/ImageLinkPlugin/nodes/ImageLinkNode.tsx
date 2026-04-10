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
const imageLinkNodeClassname = 'ImageLink__container'

type SerializedImageLinkNode = SerializedElementNode

export function $convertDivElement(): DOMConversionOutput | null {
  const node = $createImageLinkNode()
  return {
    node,
  }
}

export class ImageLinkNode extends ElementNode {
  static override getType() {
    return imageLinkNodeType
  }

  static override clone(node: ImageLinkNode): ImageLinkNode {
    return new ImageLinkNode(node.__key)
  }

  override isInline(): true {
    return true
  }

  override createDOM(config: EditorConfig): HTMLElement {
    const imageLinkClass = config.theme.imageLink ?? 'TwreporterTheme__imageLink'
    const divDom = document.createElement('div')
    divDom.classList.add(imageLinkClass, imageLinkNodeClassname)

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
    element.classList.add(imageLinkNodeClassname)
    return { element }
  }

  static override importJSON(serializedNode: SerializedImageLinkNode): ImageLinkNode {
    return $createImageLinkNode().updateFromJSON(
      serializedNode
    )
  }
}

export function $createImageLinkNode(): ImageLinkNode {
  return new ImageLinkNode()
}

export function $isImageLinkNode(
  node: LexicalNode | null | undefined
): node is ImageLinkNode {
  return node instanceof ImageLinkNode
}

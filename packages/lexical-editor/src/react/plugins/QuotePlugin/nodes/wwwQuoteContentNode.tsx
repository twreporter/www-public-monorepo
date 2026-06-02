import {
  ElementNode,
  type DOMConversionMap,
  type DOMConversionOutput,
  type DOMExportOutput,
  type LexicalNode,
  type SerializedElementNode,
} from 'lexical'

const wwwQuoteContentNodeType = 'www-quote-content'
const wwwQuoteContentAttribute = 'data-lexical-www-quote-content'

export type SerializedwwwQuoteContentNode = SerializedElementNode

export function $convertwwwQuoteContentElement(
  _domNode: HTMLElement
): DOMConversionOutput | null {
  return {
    node: $createwwwQuoteContentNode(),
  }
}

export class wwwQuoteContentNode extends ElementNode {
  static override getType(): string {
    return wwwQuoteContentNodeType
  }

  static override clone(node: wwwQuoteContentNode): wwwQuoteContentNode {
    return new wwwQuoteContentNode(node.__key)
  }

  override createDOM(): HTMLElement {
    const blockquote = document.createElement('blockquote')
    blockquote.classList.add('wwwQuote__content')
    blockquote.setAttribute(wwwQuoteContentAttribute, 'true')
    return blockquote
  }

  override updateDOM(): boolean {
    return false
  }

  static override importDOM(): DOMConversionMap<HTMLElement> | null {
    return {
      blockquote: (domNode: HTMLElement) => {
        if (!domNode.hasAttribute(wwwQuoteContentAttribute)) {
          return null
        }
        return {
          conversion: $convertwwwQuoteContentElement,
          priority: 2,
        }
      },
      div: (domNode: HTMLElement) => {
        if (!domNode.hasAttribute(wwwQuoteContentAttribute)) {
          return null
        }
        return {
          conversion: $convertwwwQuoteContentElement,
          priority: 2,
        }
      },
    }
  }

  override exportDOM(): DOMExportOutput {
    const blockquote = document.createElement('blockquote')
    blockquote.classList.add('wwwQuote__content')
    blockquote.setAttribute(wwwQuoteContentAttribute, 'true')
    return { element: blockquote }
  }

  static override importJSON(
    serializedNode: SerializedwwwQuoteContentNode
  ): wwwQuoteContentNode {
    return $createwwwQuoteContentNode().updateFromJSON(serializedNode)
  }
}

export function $createwwwQuoteContentNode(): wwwQuoteContentNode {
  return new wwwQuoteContentNode()
}

export function $iswwwQuoteContentNode(
  node: LexicalNode | null | undefined
): node is wwwQuoteContentNode {
  return node instanceof wwwQuoteContentNode
}

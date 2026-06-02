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

export type SerializedWwwQuoteContentNode = SerializedElementNode

export function $convertWwwQuoteContentElement(
  _domNode: HTMLElement
): DOMConversionOutput | null {
  return {
    node: $createWwwQuoteContentNode(),
  }
}

export class WwwQuoteContentNode extends ElementNode {
  static override getType(): string {
    return wwwQuoteContentNodeType
  }

  static override clone(node: WwwQuoteContentNode): WwwQuoteContentNode {
    return new WwwQuoteContentNode(node.__key)
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
          conversion: $convertWwwQuoteContentElement,
          priority: 2,
        }
      },
      div: (domNode: HTMLElement) => {
        if (!domNode.hasAttribute(wwwQuoteContentAttribute)) {
          return null
        }
        return {
          conversion: $convertWwwQuoteContentElement,
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
    serializedNode: SerializedWwwQuoteContentNode
  ): WwwQuoteContentNode {
    return $createWwwQuoteContentNode().updateFromJSON(serializedNode)
  }
}

export function $createWwwQuoteContentNode(): WwwQuoteContentNode {
  return new WwwQuoteContentNode()
}

export function $isWwwQuoteContentNode(
  node: LexicalNode | null | undefined
): node is WwwQuoteContentNode {
  return node instanceof WwwQuoteContentNode
}

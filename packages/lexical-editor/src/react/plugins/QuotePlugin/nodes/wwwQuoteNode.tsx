import {
  $applyNodeReplacement,
  ElementNode,
  type DOMConversionMap,
  type DOMConversionOutput,
  type DOMExportOutput,
  type EditorConfig,
  type LexicalNode,
  type NodeKey,
  type SerializedElementNode,
  type Spread,
} from 'lexical'

import {
  iswwwQuoteLayout,
  type wwwQuoteLayout,
} from '../constant'

const wwwQuoteNodeType = 'www-quote'
const wwwQuoteAttribute = 'data-lexical-www-quote'

export type SerializedwwwQuoteNode = Spread<
  {
    layout: wwwQuoteLayout
  },
  SerializedElementNode
>

function getLayoutFromElement(element: HTMLElement): wwwQuoteLayout {
  const layout = element.getAttribute('data-layout')
  return iswwwQuoteLayout(layout) ? layout : 'default'
}

export function $convertwwwQuoteElement(
  domNode: HTMLElement
): DOMConversionOutput | null {
  return {
    node: $createwwwQuoteNode(getLayoutFromElement(domNode)),
  }
}

export class wwwQuoteNode extends ElementNode {
  __layout: wwwQuoteLayout

  static override getType(): string {
    return wwwQuoteNodeType
  }

  static override clone(node: wwwQuoteNode): wwwQuoteNode {
    return new wwwQuoteNode(node.__layout, node.__key)
  }

  constructor(layout: wwwQuoteLayout = 'default', key?: NodeKey) {
    super(key)
    this.__layout = layout
  }

  override isInline(): false {
    return false
  }

  override createDOM(config: EditorConfig): HTMLElement {
    const themeClass = config.theme.wwwQuote ?? 'TwreporterTheme__wwwQuote'
    const figure = document.createElement('figure')
    figure.classList.add(themeClass, 'wwwQuote__container', this.__layout)
    figure.setAttribute(wwwQuoteAttribute, 'true')
    figure.setAttribute('data-layout', this.__layout)
    return figure
  }

  override updateDOM(prevNode: wwwQuoteNode, dom: HTMLElement): boolean {
    if (prevNode.__layout !== this.__layout) {
      dom.classList.remove(prevNode.__layout)
      dom.classList.add(this.__layout)
      dom.setAttribute('data-layout', this.__layout)
    }

    return false
  }

  static override importDOM(): DOMConversionMap<HTMLElement> | null {
    return {
      div: (domNode: HTMLElement) => {
        if (!domNode.hasAttribute(wwwQuoteAttribute)) {
          return null
        }
        return {
          conversion: $convertwwwQuoteElement,
          priority: 2,
        }
      },
      figure: (domNode: HTMLElement) => {
        if (!domNode.hasAttribute(wwwQuoteAttribute)) {
          return null
        }
        return {
          conversion: $convertwwwQuoteElement,
          priority: 2,
        }
      },
    }
  }

  override exportDOM(): DOMExportOutput {
    const figure = document.createElement('figure')
    figure.classList.add('wwwQuote__container', this.__layout)
    figure.setAttribute(wwwQuoteAttribute, 'true')
    figure.setAttribute('data-layout', this.__layout)
    return { element: figure }
  }

  static override importJSON(
    serializedNode: SerializedwwwQuoteNode
  ): wwwQuoteNode {
    return $createwwwQuoteNode(serializedNode.layout).updateFromJSON(
      serializedNode
    )
  }

  override exportJSON(): SerializedwwwQuoteNode {
    return {
      ...super.exportJSON(),
      layout: this.__layout,
    }
  }

  getLayout(): wwwQuoteLayout {
    return this.getLatest().__layout
  }

  setLayout(layout: wwwQuoteLayout): void {
    const writable = this.getWritable()
    writable.__layout = layout
  }
}

export function $createwwwQuoteNode(
  layout: wwwQuoteLayout = 'default'
): wwwQuoteNode {
  return $applyNodeReplacement(new wwwQuoteNode(layout))
}

export function $iswwwQuoteNode(
  node: LexicalNode | null | undefined
): node is wwwQuoteNode {
  return node instanceof wwwQuoteNode
}

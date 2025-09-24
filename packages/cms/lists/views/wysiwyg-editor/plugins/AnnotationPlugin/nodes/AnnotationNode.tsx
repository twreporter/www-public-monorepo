import {
  ElementNode,
  type LexicalNode,
  type NodeKey,
  type EditorConfig,
  type LexicalEditor,
  type DOMConversionMap,
  type DOMConversionOutput,
  type SerializedElementNode,
  type Spread,
  type DOMExportOutput,
} from 'lexical'

// type

type SerializedAnnotationNode = Spread<
  {
    open: boolean
  },
  SerializedElementNode
>

export function $convertDetailsElement(
  domNode: HTMLDetailsElement
): DOMConversionOutput | null {
  const isOpen = domNode.open !== undefined ? domNode.open : true
  const node = $createAnnotationNode(isOpen)
  return {
    node,
  }
}

export class AnnotationNode extends ElementNode {
  __open: boolean

  constructor(open: boolean, key?: NodeKey) {
    super(key)
    this.__open = open
  }

  static getType() {
    return 'annotation'
  }

  static clone(node: AnnotationNode): AnnotationNode {
    return new AnnotationNode(node.__open, node.__key)
  }

  isInline(): true {
    return true
  }

  createDOM(_config: EditorConfig, editor: LexicalEditor): HTMLElement {
    const detailsDom = document.createElement('details')
    detailsDom.open = this.__open
    detailsDom.addEventListener('toggle', () => {
      const open = editor.getEditorState().read(() => this.getOpen())
      if (open !== detailsDom.open) {
        editor.update(() => this.toggleOpen())
      }

      if (open) {
        detailsDom.classList.add('open')
      } else {
        detailsDom.classList.remove('open')
      }
    })
    detailsDom.classList.add('Annotation__container')

    return detailsDom
  }

  updateDOM(prevNode: this, dom: HTMLDetailsElement): boolean {
    const currentOpen = this.__open
    const prevOpen = prevNode.__open
    if (prevOpen !== currentOpen) {
      dom.open = currentOpen
      return true
    }

    return false
  }

  static importDOM(): DOMConversionMap<HTMLDetailsElement> | null {
    return {
      details: (_domNode: HTMLDetailsElement) => {
        return {
          conversion: $convertDetailsElement,
          priority: 1,
        }
      },
    }
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement('details')
    element.classList.add('Annotation__container')
    element.setAttribute('open', this.__open.toString())
    return { element }
  }

  static importJSON(serializedNode: SerializedAnnotationNode): AnnotationNode {
    return $createAnnotationNode(serializedNode.open).updateFromJSON(
      serializedNode
    )
  }

  exportJSON(): SerializedAnnotationNode {
    return {
      ...super.exportJSON(),
      open: this.__open,
    }
  }

  getOpen(): boolean {
    return this.getLatest().__open
  }

  setOpen(open: boolean): void {
    const writable = this.getWritable()
    writable.__open = open
  }

  toggleOpen(): void {
    this.setOpen(!this.getOpen())
  }
}

export function $createAnnotationNode(isOpen: boolean): AnnotationNode {
  return new AnnotationNode(isOpen)
}

export function $isAnnotationNode(
  node: LexicalNode | null | undefined
): node is AnnotationNode {
  return node instanceof AnnotationNode
}

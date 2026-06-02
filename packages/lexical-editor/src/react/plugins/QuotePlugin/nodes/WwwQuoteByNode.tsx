import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import {
  $getNodeByKey,
  DecoratorNode,
  type DOMConversionMap,
  type DOMConversionOutput,
  type DOMExportOutput,
  type LexicalNode,
  type NodeKey,
} from 'lexical'
import {
  type ChangeEvent,
  type FC,
  type MouseEvent,
  type ReactNode,
  useEffect,
  useState,
} from 'react'

import WwwQuoteLayoutOptions from '../components/WwwQuoteLayoutOptions'
import { type WwwQuoteLayout } from '../constant'
import { $isWwwQuoteNode } from './WwwQuoteNode'

const wwwQuoteByNodeType = 'www-quote-by'
const wwwQuoteByAttribute = 'data-lexical-www-quote-by'

type WwwQuoteByProps = {
  nodeKey: string
  quoteBy?: string
}

const WwwQuoteBy: FC<WwwQuoteByProps> = ({ nodeKey, quoteBy }) => {
  const [editor] = useLexicalComposerContext()
  const [editable, setEditable] = useState(() => editor.isEditable())
  const [isEditingQuoteBy, setIsEditingQuoteBy] = useState(false)
  const [isEditingLayout, setIsEditingLayout] = useState(false)
  const [quoteByValue, setQuoteByValue] = useState(quoteBy ?? '')
  const [layoutValue, setLayoutValue] = useState<WwwQuoteLayout>('default')

  useEffect(() => {
    return editor.registerEditableListener((currentEditable) => {
      setEditable(currentEditable)
    })
  }, [editor])

  useEffect(() => {
    setQuoteByValue(quoteBy ?? '')
  }, [quoteBy])

  const getParentLayout = (): WwwQuoteLayout => {
    let layout: WwwQuoteLayout = 'default'
    editor.getEditorState().read(() => {
      const node = $getNodeByKey(nodeKey)
      const parent = node?.getParent()
      if ($isWwwQuoteNode(parent)) {
        layout = parent.getLayout()
      }
    })
    return layout
  }

  const openQuoteByEditor = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setQuoteByValue(quoteBy ?? '')
    setIsEditingLayout(false)
    setIsEditingQuoteBy(true)
  }

  const openLayoutEditor = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setLayoutValue(getParentLayout())
    setIsEditingQuoteBy(false)
    setIsEditingLayout(true)
  }

  const cancelQuoteByEdit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setQuoteByValue(quoteBy ?? '')
    setIsEditingQuoteBy(false)
  }

  const confirmQuoteByEdit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()

    editor.update(() => {
      const node = $getNodeByKey(nodeKey)
      if ($isWwwQuoteByNode(node)) {
        node.setQuoteBy(quoteByValue.trim() || undefined)
      }
    })

    setIsEditingQuoteBy(false)
  }

  const cancelLayoutEdit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setLayoutValue(getParentLayout())
    setIsEditingLayout(false)
  }

  const confirmLayoutEdit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()

    editor.update(() => {
      const node = $getNodeByKey(nodeKey)
      const parent = node?.getParent()
      if ($isWwwQuoteNode(parent)) {
        parent.setLayout(layoutValue)
      }
    })

    setIsEditingLayout(false)
  }

  const updateQuoteByValue = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setQuoteByValue(e.target.value)
  }

  const deleteQuote = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()

    editor.update(() => {
      const node = $getNodeByKey(nodeKey)
      const parent = node?.getParent()
      if ($isWwwQuoteNode(parent)) {
        parent.remove()
      }
    })
  }

  return (
    <>
      {quoteBy ? <span className="wwwQuote__quote_by">{quoteBy}</span> : null}
      {editable ? (
        <div className="wwwQuote__controls">
          <button
            type="button"
            className="wwwQuote__button"
            aria-label="Edit quote by"
            onClick={openQuoteByEditor}
          >
            <i className="annotation-edit" />
          </button>
          <button
            type="button"
            className="wwwQuote__button"
            aria-label="Edit quote layout"
            onClick={openLayoutEditor}
          >
            <i className="www-quote-brush" />
          </button>
          <button
            type="button"
            className="wwwQuote__button"
            aria-label="Delete quote"
            onClick={deleteQuote}
          >
            <i className="annotation-delete" />
          </button>
          {isEditingQuoteBy ? (
            <div className="wwwQuote__dialog">
              <input
                className="wwwQuote__input"
                type="text"
                value={quoteByValue}
                placeholder="QuoteBy"
                onChange={updateQuoteByValue}
              />
              <button
                className="wwwQuote__dialog_button"
                type="button"
                onClick={cancelQuoteByEdit}
              >
                <i className="icon annotation-cancel" />
              </button>
              <button
                className="wwwQuote__dialog_button"
                type="button"
                onClick={confirmQuoteByEdit}
              >
                <i className="icon annotation-confirm" />
              </button>
            </div>
          ) : null}
          {isEditingLayout ? (
            <div className="wwwQuote__dialog wwwQuote__layout_dialog">
              <WwwQuoteLayoutOptions
                layout={layoutValue}
                onChange={setLayoutValue}
              />
              <button
                className="wwwQuote__dialog_button"
                type="button"
                onClick={cancelLayoutEdit}
              >
                <i className="icon annotation-cancel" />
              </button>
              <button
                className="wwwQuote__dialog_button"
                type="button"
                onClick={confirmLayoutEdit}
              >
                <i className="icon annotation-confirm" />
              </button>
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  )
}

export type SerializedWwwQuoteByNode = {
  type: typeof wwwQuoteByNodeType
  version: 1
  quoteBy?: string
}

export function $convertWwwQuoteByElement(
  domNode: HTMLElement
): DOMConversionOutput | null {
  const quoteBy = domNode.textContent?.trim() || undefined
  return {
    node: $createWwwQuoteByNode(quoteBy),
  }
}

export class WwwQuoteByNode extends DecoratorNode<ReactNode> {
  __quoteBy: string | undefined

  static override getType(): string {
    return wwwQuoteByNodeType
  }

  static override clone(node: WwwQuoteByNode): WwwQuoteByNode {
    return new WwwQuoteByNode(node.__quoteBy, node.__key)
  }

  constructor(quoteBy: string | undefined, key?: NodeKey) {
    super(key)
    this.__quoteBy = quoteBy
  }

  override createDOM(): HTMLElement {
    const figcaption = document.createElement('figcaption')
    figcaption.classList.add('wwwQuote__by')
    figcaption.setAttribute(wwwQuoteByAttribute, 'true')
    return figcaption
  }

  override updateDOM(): boolean {
    return false
  }

  override isInline(): false {
    return false
  }

  override isIsolated(): true {
    return true
  }

  override isKeyboardSelectable(): false {
    return false
  }

  static override importDOM(): DOMConversionMap<HTMLElement> | null {
    return {
      figcaption: (domNode: HTMLElement) => {
        if (!domNode.hasAttribute(wwwQuoteByAttribute)) {
          return null
        }
        return {
          conversion: $convertWwwQuoteByElement,
          priority: 2,
        }
      },
      div: (domNode: HTMLElement) => {
        if (!domNode.hasAttribute(wwwQuoteByAttribute)) {
          return null
        }
        return {
          conversion: $convertWwwQuoteByElement,
          priority: 2,
        }
      },
    }
  }

  override exportDOM(): DOMExportOutput {
    const figcaption = document.createElement('figcaption')
    figcaption.classList.add('wwwQuote__by')
    figcaption.setAttribute(wwwQuoteByAttribute, 'true')
    figcaption.textContent = this.__quoteBy ?? ''
    return { element: figcaption }
  }

  override decorate(): ReactNode {
    return (
      <WwwQuoteBy
        nodeKey={this.getKey()}
        {...(this.__quoteBy ? { quoteBy: this.__quoteBy } : {})}
      />
    )
  }

  static override importJSON(
    serializedNode: SerializedWwwQuoteByNode
  ): WwwQuoteByNode {
    return $createWwwQuoteByNode(serializedNode.quoteBy)
  }

  override exportJSON(): SerializedWwwQuoteByNode {
    return {
      type: wwwQuoteByNodeType,
      version: 1,
      ...(this.__quoteBy ? { quoteBy: this.__quoteBy } : {}),
    }
  }

  override getTextContent(): string {
    return this.getQuoteBy() ?? ''
  }

  getQuoteBy(): string | undefined {
    return this.getLatest().__quoteBy
  }

  setQuoteBy(quoteBy: string | undefined): void {
    const writable = this.getWritable()
    writable.__quoteBy = quoteBy
  }
}

export function $createWwwQuoteByNode(quoteBy?: string): WwwQuoteByNode {
  return new WwwQuoteByNode(quoteBy)
}

export function $isWwwQuoteByNode(
  node: LexicalNode | null | undefined
): node is WwwQuoteByNode {
  return node instanceof WwwQuoteByNode
}

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

import WwwQuoteLayoutOptions from '../components/wwwQuoteLayoutOptions'
import { type wwwQuoteLayout } from '../constant'
import { $iswwwQuoteNode } from './wwwQuoteNode'

const wwwQuoteByNodeType = 'www-quote-by'
const wwwQuoteByAttribute = 'data-lexical-www-quote-by'

type wwwQuoteByProps = {
  nodeKey: string
  quoteBy?: string
}

const WwwQuoteBy: FC<wwwQuoteByProps> = ({ nodeKey, quoteBy }) => {
  const [editor] = useLexicalComposerContext()
  const [editable, setEditable] = useState(() => editor.isEditable())
  const [isEditingQuoteBy, setIsEditingQuoteBy] = useState(false)
  const [isEditingLayout, setIsEditingLayout] = useState(false)
  const [quoteByValue, setQuoteByValue] = useState(quoteBy ?? '')
  const [layoutValue, setLayoutValue] = useState<wwwQuoteLayout>('default')

  useEffect(() => {
    return editor.registerEditableListener((currentEditable) => {
      setEditable(currentEditable)
    })
  }, [editor])

  useEffect(() => {
    setQuoteByValue(quoteBy ?? '')
  }, [quoteBy])

  const getParentLayout = (): wwwQuoteLayout => {
    let layout: wwwQuoteLayout = 'default'
    editor.getEditorState().read(() => {
      const node = $getNodeByKey(nodeKey)
      const parent = node?.getParent()
      if ($iswwwQuoteNode(parent)) {
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
      if ($iswwwQuoteByNode(node)) {
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
      if ($iswwwQuoteNode(parent)) {
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
      if ($iswwwQuoteNode(parent)) {
        parent.remove()
      }
    })
  }

  return (
    <>
      {quoteBy ? <figcaption className="wwwQuote__quote_by">{quoteBy}</figcaption> : null}
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

export type SerializedwwwQuoteByNode = {
  type: typeof wwwQuoteByNodeType
  version: 1
  quoteBy?: string
}

export function $convertwwwQuoteByElement(
  domNode: HTMLElement
): DOMConversionOutput | null {
  const quoteBy = domNode.textContent?.trim() || undefined
  return {
    node: $createwwwQuoteByNode(quoteBy),
  }
}

export class wwwQuoteByNode extends DecoratorNode<ReactNode> {
  __quoteBy: string | undefined

  static override getType(): string {
    return wwwQuoteByNodeType
  }

  static override clone(node: wwwQuoteByNode): wwwQuoteByNode {
    return new wwwQuoteByNode(node.__quoteBy, node.__key)
  }

  constructor(quoteBy: string | undefined, key?: NodeKey) {
    super(key)
    this.__quoteBy = quoteBy
  }

  override createDOM(): HTMLElement {
    const parentNode = this.getLatest().getParentOrThrow()
    if (!$iswwwQuoteNode(parentNode)) {
      throw new Error('Expected parent node to be a wwwQuoteNode')
    }

    const div = document.createElement('div')
    div.classList.add('wwwQuote__by')
    div.setAttribute(wwwQuoteByAttribute, 'true')
    return div
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
      cite: (domNode: HTMLElement) => {
        if (!domNode.hasAttribute(wwwQuoteByAttribute)) {
          return null
        }
        return {
          conversion: $convertwwwQuoteByElement,
          priority: 2,
        }
      },
      div: (domNode: HTMLElement) => {
        if (!domNode.hasAttribute(wwwQuoteByAttribute)) {
          return null
        }
        return {
          conversion: $convertwwwQuoteByElement,
          priority: 2,
        }
      },
    }
  }

  override exportDOM(): DOMExportOutput {
    const cite = document.createElement('cite')
    cite.classList.add('wwwQuote__quote_by')
    cite.setAttribute(wwwQuoteByAttribute, 'true')
    cite.textContent = this.__quoteBy ?? ''
    return { element: cite }
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
    serializedNode: SerializedwwwQuoteByNode
  ): wwwQuoteByNode {
    return $createwwwQuoteByNode(serializedNode.quoteBy)
  }

  override exportJSON(): SerializedwwwQuoteByNode {
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

export function $createwwwQuoteByNode(quoteBy?: string): wwwQuoteByNode {
  return new wwwQuoteByNode(quoteBy)
}

export function $iswwwQuoteByNode(
  node: LexicalNode | null | undefined
): node is wwwQuoteByNode {
  return node instanceof wwwQuoteByNode
}

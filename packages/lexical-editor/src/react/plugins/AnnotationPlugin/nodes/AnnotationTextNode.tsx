import {
  type LexicalNode,
  DecoratorNode,
  type NodeKey,
  $getNodeByKey,
  type DOMConversionMap,
  type DOMConversionOutput,
  type DOMExportOutput,
} from 'lexical'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import {
  type ReactNode,
  type FC,
  useEffect,
  useState,
  type MouseEvent,
  type ChangeEvent,
} from 'react'
import { $isAnnotationNode } from './AnnotationNode'

// global var
const annotationTextType = 'annotated-text'

type AnnotationTextProps = {
  nodeKey: string
  text?: string
}
const AnnotationText: FC<AnnotationTextProps> = ({ nodeKey, text }) => {
  const [editor] = useLexicalComposerContext()
  const [editable, setEditable] = useState(() => editor.isEditable())

  useEffect(() => {
    return editor.registerEditableListener((currentEditable) => {
      setEditable(currentEditable)
    })
  }, [editor])

  const [isOpenEdit, setIsOpenEditText] = useState(false)
  const [value, setValue] = useState(text)

  const openEditDialog = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsOpenEditText(true)
  }

  const confirm = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()

    if (!value) {
      alert('此編輯欄位不可空白，請輸入內容。')
      return
    }

    editor.update(() => {
      const node = $getNodeByKey(nodeKey)
      if ($isAnnotationTextNode(node)) {
        node.setText(value)
      }
    })

    setIsOpenEditText(false)
    return
  }

  const cancel = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsOpenEditText(false)
  }

  const updateValue = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setValue(e.target.value)
  }

  const deleteAnnotation = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    editor.update(() => {
      const node = $getNodeByKey(nodeKey)
      if (!$isAnnotationTextNode(node)) {
        return
      }
      const parent = node.getParent()
      if ($isAnnotationNode(parent)) {
        parent.remove()
      }
    })
  }

  return (
    <>
      {text}
      <span className="Annotation__indicator" />
      {editable ? (
        <>
          <span className="Annotation__button_box" onClick={openEditDialog}>
            <i className="annotation-edit" />
            {isOpenEdit ? (
              <div className="Annotation__dialog">
                <input className="Annotation__input" type="text" value={value} onChange={updateValue} />
                <button className="Annotation__dialog_button" type="button" onClick={cancel}>
                  <i className="icon annotation-cancel" />
                </button>
                <button className="Annotation__dialog_button" type="button" onClick={confirm}>
                  <i className="icon annotation-confirm" />
                </button>
              </div>
            ) : null}
          </span>
          <span className="Annotation__button_box" onClick={deleteAnnotation}>
            <i className="annotation-delete" />
          </span>
        </>
      ) : null}
    </>
  )
}

export type SerializedAnnotatedTextNode = {
  type: typeof annotationTextType
  version: 1
  text: string
}

export function $convertSummaryElement(
  domNode: HTMLElement
): DOMConversionOutput | null {
  if (domNode.parentElement?.tagName !== 'DETAILS') {
    return null
  }

  const node = $createAnnotationTextNode(domNode.textContent ?? '')
  return {
    after: () => [],
    node,
  }
}

export class AnnotatedTextNode extends DecoratorNode<ReactNode> {
  __text: string
  __handleKeyDown?: (e: KeyboardEvent) => void

  static override getType(): string {
    return annotationTextType
  }

  static override clone(node: AnnotatedTextNode): AnnotatedTextNode {
    return new AnnotatedTextNode(node.__text, node.__key)
  }

  constructor(text: string, key?: NodeKey) {
    super(key)
    this.__text = text
    this.__handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.key === ' ') {
        e.preventDefault()
      }
    }
  }

  override createDOM(): HTMLElement {
    const parentNode = this.getLatest().getParentOrThrow()
    if (!$isAnnotationNode(parentNode)) {
      throw new Error('Expected parent node to be a AnnotationNode')
    }

    const summary = document.createElement('summary')
    summary.classList.add('Annotation__text')
    if (this.__handleKeyDown) {
      summary.addEventListener('keydown', this.__handleKeyDown)
    }
    return summary
  }

  willDestroyDOM(dom: HTMLElement) {
    if (this.__handleKeyDown) {
      dom.removeEventListener('keydown', this.__handleKeyDown)
    }
  }

  override updateDOM() {
    return false
  }

  static override importDOM(): DOMConversionMap<HTMLElement> | null {
    return {
      summary: () => {
        return {
          conversion: $convertSummaryElement,
          priority: 2,
        }
      },
    }
  }

  override exportDOM(): DOMExportOutput {
    const element = document.createElement('summary')
    element.classList.add('Annotation__text')
    element.textContent = this.__text
    return { element }
  }

  override decorate(): ReactNode {
    return <AnnotationText nodeKey={this.getKey()} text={this.__text} />
  }

  static override importJSON(serializedNode: SerializedAnnotatedTextNode) {
    return new AnnotatedTextNode(serializedNode.text)
  }

  override exportJSON(): SerializedAnnotatedTextNode {
    return {
      type: annotationTextType,
      version: 1,
      text: this.__text,
    }
  }

  getText(): string {
    const self = this.getLatest()
    return self.__text
  }

  override getTextContent(): string {
    return this.getText()
  }

  setText(text: string) {
    const write = this.getWritable()
    write.__text = text
  }
}

export function $createAnnotationTextNode(text: string): AnnotatedTextNode {
  return new AnnotatedTextNode(text)
}

export function $isAnnotationTextNode(
  node: LexicalNode | null | undefined
): node is AnnotatedTextNode {
  return node instanceof AnnotatedTextNode
}

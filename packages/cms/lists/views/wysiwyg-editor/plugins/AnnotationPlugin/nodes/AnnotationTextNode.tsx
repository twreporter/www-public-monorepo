import { type LexicalNode, DecoratorNode, type NodeKey, $getNodeByKey } from 'lexical'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import React, { type ReactNode, type FC, useState, type MouseEvent, ChangeEvent } from 'react'
import styled from '@emotion/styled'
import { $isAnnotationNode } from './AnnotationNode'

// global var
const annotationTextType = 'annotated-text'

// styles
const Indicator = styled.span`
  margin-left: 3px;
  display: inline-block;
  vertical-align: middle;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 1px solid #9f7544;
  position: relative;
  top: -1px;

  &::before {
    content: "";
    width: 2px;
    height: 6.5px;
    top: 5px;
    right: 5px;
    transform: rotate(45deg);
    display: block;
    position: absolute;
    transition: transform 200ms;
    background-color: rgb(192, 150, 98);
  }

  &::after {
    content: "";
    width: 2px;
    height: 6.5px;
    top: 5px;
    left: 5px;
    transform: rotate(-45deg);
    display: block;
    position: absolute;
    transition: transform 200ms;
    background-color: rgb(192, 150, 98);
  }
`
const iconColor = '#6b7280'
const iconColorHover = '#9f7544'
const EditText = styled.span`
  margin-left: 4px;
  cursor: pointer;
  display: inline-flex;
  width: 18px;
  height: 18px;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border-width: 1px;
  border-style: solid;
  border-color: ${iconColor};
  vertical-align: middle;

  .annotation-edit {
    width: 18px;
    height: 18px;
    mask-size: auto;
    mask-position: center !important;
    mask-repeat: no-repeat !important;
    background-color: ${iconColor};
  }

  &:hover {
    border-color: ${iconColorHover};
    .annotation-edit {  
      background-color: ${iconColorHover};
    }
  }
`
const Dialog = styled.div`
  position: absolute;
  left: 0;
  top: 30px;
  background-color: white;
  border: 1px solid #cdcdcd;
  padding: 10px 8px;
  display: flex;
  gap: 4px;
  align-items: center;
  border-radius: 8px;
`
const Input = styled.input`
  min-width: 200px;
`
const Button = styled.button`
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  border-radius: 50%;
  border-width: 1px;
  border-style: solid;
  border-color: ${iconColor};
  cursor: pointer;
  padding: 0;
  background-color: white;

  .annotation-confirm, .annotation-cancel {
    width: 18px;
    height: 18px;
    mask-size: auto;
    mask-position: center !important;
    mask-repeat: no-repeat !important;
    background-color: ${iconColor};
  }

  &:hover {
    border-color: ${iconColorHover};
    .annotation-confirm, .annotation-cancel {  
      background-color: ${iconColorHover};
    }
  }
`

type AnnotationTextProps = {
  nodeKey: string
  text?: string
}
const AnnotationText: FC<AnnotationTextProps> = ({ nodeKey, text }) => {
  const [editor] = useLexicalComposerContext()
  const editable = editor.isEditable()

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
      alert('此欄位不可為空白')
      return
    }

    editor.update(() => {
      const node = $getNodeByKey(nodeKey) as any;
      if (node) {
        node.getWritable().__text = value;
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

  return (
    <>
      {text}
      <Indicator className="Annotation__indicator" />
      {editable ? (
        <EditText onClick={openEditDialog}>
          <i className="annotation-edit" />
          {isOpenEdit ? (
            <Dialog>
              <Input type="text" value={value} onChange={updateValue} />
              <Button type="button" onClick={cancel}>
                <i className="annotation-cancel" />
              </Button>
              <Button type="button" onClick={confirm}>
                <i className="annotation-confirm" />
              </Button>
            </Dialog>
          ) : null}
        </EditText>
      ) : null}
    </>
  )
}

export type SerializedAnnotatedTextNode = {
  type: typeof annotationTextType
  version: 1
  text: string
}

export class AnnotatedTextNode extends DecoratorNode<ReactNode> {
  __text: string
  __handleKeyDown?: (e: KeyboardEvent) => void

  static getType(): string {
    return annotationTextType
  }

  static clone(node: AnnotatedTextNode): AnnotatedTextNode {
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

  createDOM(): HTMLElement {
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
    const summary = dom.querySelector('summary');
    if (summary && this.__handleKeyDown) {
      summary.removeEventListener('keydown', this.__handleKeyDown);
    }
  }

  updateDOM() {
    return false
  }

  decorate(): ReactNode {
    return <AnnotationText nodeKey={this.getKey()} text={this.__text} />
  }

  static importJSON(serializedNode: SerializedAnnotatedTextNode) {
    return new AnnotatedTextNode(serializedNode.text)
  }

  exportJSON(): SerializedAnnotatedTextNode {
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

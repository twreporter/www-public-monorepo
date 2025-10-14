import { type LexicalNode, DecoratorNode, type NodeKey, $getNodeByKey } from 'lexical'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import React, { type ReactNode, type FC, useState, type MouseEvent } from 'react'
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
const EditText = styled.span`
  margin-left: 4px;
  cursor: pointer;
  color: #9c9c9c;
  &::after {
    content: "+";
    display: inline-flex;
    width: 18px;
    height: 18px;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    border: 1px solid #9c9c9c;
  }
`
const Dialog = styled.div`
  position: absolute;
  background-color: white;
  border: 1px solid #cdcdcd;
  padding: 8px;
`
const Input = styled.input`
  width: 200px;
`
const ButtonGroup = styled.div`
  display: flex;
  gap: 4px;
  justify-content: flex-end;
`
const Button = styled.button`
  border-radius: 4px;
  border: 1px solid #cdcdcd;
  padding: 4px;
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

  return (
    <>
      {text}
      <Indicator className="Annotation__indicator" />
      {editable ? (
        <EditText onClick={openEditDialog}>
          {isOpenEdit ? (
            <Dialog>
              <Input type="text" value={value} onChange={(e) => { setValue(e.target.value)}} />
              <ButtonGroup>
                <Button type="button" onClick={cancel}>Cancel</Button>
                <Button type="button" onClick={confirm}>Confirm</Button>
              </ButtonGroup>
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

  static getType(): string {
    return annotationTextType
  }

  static clone(node: AnnotatedTextNode): AnnotatedTextNode {
    return new AnnotatedTextNode(node.__text, node.__key)
  }

  constructor(text: string, key?: NodeKey) {
    super(key)
    this.__text = text
  }

  createDOM(): HTMLElement {
    const parentNode = this.getLatest().getParentOrThrow()
    if (!$isAnnotationNode(parentNode)) {
      throw new Error('Expected parent node to be a AnnotationNode')
    }

    const dom = document.createElement('summary')
    dom.classList.add('Annotation__text')
    return dom
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

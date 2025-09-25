import { type LexicalNode, DecoratorNode, type NodeKey } from 'lexical'
import React, { type ReactNode, type FC } from 'react'
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
  border-width: 1px;
  border-style: solid;
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

type AnnotationTextProps = {
  text?: string
}
const AnnotationText: FC<AnnotationTextProps> = ({ text }) => {
  return (
    <>
      {text}
      <Indicator className="Annotation__indicator" />
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
    return <AnnotationText text={this.__text} />
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
}

export function $createAnnotationTextNode(text: string): AnnotatedTextNode {
  return new AnnotatedTextNode(text)
}

export function $isAnnotationTextNode(
  node: LexicalNode | null | undefined
): node is AnnotatedTextNode {
  return node instanceof AnnotatedTextNode
}

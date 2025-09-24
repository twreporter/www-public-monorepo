import {
  ElementNode,
  type DOMConversionMap,
  type DOMConversionOutput,
  type SerializedElementNode,
  type DOMExportOutput,
  type LexicalNode,
} from 'lexical'
import { $isAnnotationNode } from './AnnotationNode'

// type

type SerializedAnnotationContentNode = SerializedElementNode

// global var
const annotationAttribute = 'data-lexical-annotation-content'

export function $convertAnnotationContentElement(
  _domNode: HTMLElement
): DOMConversionOutput | null {
  const node = $createAnnotationContentNode()
  return {
    node,
  }
}

export class AnnotationContentNode extends ElementNode {
  static getType() {
    return 'annotation-content'
  }

  static clone(node: AnnotationContentNode): AnnotationContentNode {
    return new AnnotationContentNode(node.__key)
  }

  createDOM(): HTMLElement {
    const parentNode = this.getLatest().getParentOrThrow()
    if (!$isAnnotationNode(parentNode)) {
      throw new Error('Expected parent node to be a AnnotationNode')
    }

    const dom = document.createElement('div')
    dom.classList.add('Annotation__content')
    return dom
  }

  updateDOM() {
    return false
  }

  static importDOM(): DOMConversionMap | null {
    return {
      div: (domNode: HTMLElement) => {
        if (!domNode.hasAttribute(annotationAttribute)) {
          return null
        }
        return {
          conversion: $convertAnnotationContentElement,
          priority: 2,
        }
      },
    }
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement('div')
    element.classList.add('Collapsible__content')
    element.setAttribute(annotationAttribute, 'true')
    return { element }
  }

  static importJSON(
    serializedNode: SerializedAnnotationContentNode
  ): AnnotationContentNode {
    return $createAnnotationContentNode().updateFromJSON(serializedNode)
  }
}

export function $createAnnotationContentNode(): AnnotationContentNode {
  return new AnnotationContentNode()
}

export function $isAnnotationContentNode(
  node: LexicalNode | null | undefined
): node is AnnotationContentNode {
  return node instanceof AnnotationContentNode
}

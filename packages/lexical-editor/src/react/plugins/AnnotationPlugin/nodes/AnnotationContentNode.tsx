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
  static override getType() {
    return 'annotation-content'
  }

  static override clone(node: AnnotationContentNode): AnnotationContentNode {
    return new AnnotationContentNode(node.__key)
  }

  override createDOM(): HTMLElement {
    const parentNode = this.getLatest().getParentOrThrow()
    if (!$isAnnotationNode(parentNode)) {
      throw new Error('Expected parent node to be a AnnotationNode')
    }

    const dom = document.createElement('div')
    dom.classList.add('Annotation__content') // todo: read theme name from config
    return dom
  }

  override updateDOM() {
    return false
  }

  static override importDOM(): DOMConversionMap | null {
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

  override exportDOM(): DOMExportOutput {
    const element = document.createElement('div')
    element.classList.add('Annotation__content')
    element.setAttribute(annotationAttribute, 'true')
    return { element }
  }

  static override importJSON(
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

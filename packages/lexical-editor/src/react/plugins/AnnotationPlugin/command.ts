import { createCommand } from 'lexical'
import {
  $getSelection,
  $isRangeSelection,
  $isNodeSelection,
  COMMAND_PRIORITY_EDITOR,
  type LexicalEditor,
} from 'lexical'
import { AnnotationNode } from './nodes/AnnotationNode'
import { AnnotatedTextNode } from './nodes/AnnotationTextNode'
import { AnnotationContentNode } from './nodes/AnnotationContentNode'

export const ANNOTATION_ADD_COMMAND = createCommand('ADD_ANNOTATION')
export const ANNOTATION_REMOVE_COMMAND = createCommand('REMOVE_ANNOTATION')

export function registerAnnotationPlugin(editor: LexicalEditor) {
  const unregisterAdd = editor.registerCommand(
    ANNOTATION_ADD_COMMAND,
    () => {
      const selection = $getSelection()
      if ($isRangeSelection(selection)) {
        const selectedText = selection.getTextContent()
        const annotatedTextNode = new AnnotatedTextNode(selectedText)
        const annotationContentNode = new AnnotationContentNode()

        const annotationNode = new AnnotationNode(false)
        annotationNode.append(annotatedTextNode)
        annotationNode.append(annotationContentNode)

        selection.insertNodes([annotationNode])
      }
      return true
    },
    COMMAND_PRIORITY_EDITOR
  )

  const unregisterRemove = editor.registerCommand(
    ANNOTATION_REMOVE_COMMAND,
    () => {
      const selection = $getSelection()
      if ($isRangeSelection(selection)) {
        const nodes = selection.getNodes()
        nodes.forEach((node) => {
          const parent = node.getParent()
          if (parent instanceof AnnotationNode) {
            parent.remove()
          }
        })
      } else if ($isNodeSelection(selection)) {
        const nodes = selection.getNodes()
        nodes.forEach((node) => {
          if (node instanceof AnnotationNode) {
            node.remove()
          }
        })
      }
      return true
    },
    COMMAND_PRIORITY_EDITOR
  )

  return () => {
    unregisterAdd()
    unregisterRemove()
  }
}

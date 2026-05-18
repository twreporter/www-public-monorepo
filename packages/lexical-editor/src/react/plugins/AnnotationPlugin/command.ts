import { createCommand } from 'lexical'
import {
  $getSelection,
  $isRangeSelection,
  $isNodeSelection,
  COMMAND_PRIORITY_EDITOR,
  type LexicalEditor,
} from 'lexical'
import {
  $createAnnotationNode,
  $isAnnotationNode,
} from './nodes/AnnotationNode'
import { $createAnnotationTextNode } from './nodes/AnnotationTextNode'
import { $createAnnotationContentNode } from './nodes/AnnotationContentNode'

export const ANNOTATION_ADD_COMMAND = createCommand<void>('ADD_ANNOTATION')
export const ANNOTATION_REMOVE_COMMAND =
  createCommand<void>('REMOVE_ANNOTATION')

export function registerAnnotationPlugin(editor: LexicalEditor) {
  const unregisterAdd = editor.registerCommand(
    ANNOTATION_ADD_COMMAND,
    () => {
      const selection = $getSelection()
      if ($isRangeSelection(selection)) {
        const selectedText = selection.getTextContent()
        if (selection.isCollapsed() || selectedText.trim() === '') {
          return true
        }
        const annotatedTextNode = $createAnnotationTextNode(selectedText)
        const annotationContentNode = $createAnnotationContentNode()

        const annotationNode = $createAnnotationNode(false)
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
          if ($isAnnotationNode(parent)) {
            parent.remove()
          }
        })
      } else if ($isNodeSelection(selection)) {
        const nodes = selection.getNodes()
        nodes.forEach((node) => {
          if ($isAnnotationNode(node)) {
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

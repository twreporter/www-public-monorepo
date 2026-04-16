import { createCommand } from 'lexical'
import {
  $getSelection,
  $isRangeSelection,
  $isNodeSelection,
  COMMAND_PRIORITY_EDITOR,
  type LexicalEditor,
  type LexicalCommand
} from 'lexical'
// nodes
import { ImageNode } from './nodes/ImageNode'
import { ImageContentNode } from './nodes/ImageContentNode'
import type { ImageLayout } from './types'

export const IMAGE_ADD_COMMAND: LexicalCommand<{
  url: string
  layout: ImageLayout
  caption: string
}> = createCommand('ADD_IMAGE_LINK')
export const IMAGE_REMOVE_COMMAND = createCommand('REMOVE_IMAGE_LINK')

export function registerImagePlugin(editor: LexicalEditor) {
  const unregisterAdd = editor.registerCommand(
    IMAGE_ADD_COMMAND,
    ({ url, layout, caption }) => {
      const selection = $getSelection()
      if (!selection) {
        return false
      }
      const imageNode = new ImageNode()
      const imageContentNode = new ImageContentNode(url, layout, caption)
      imageNode.append(imageContentNode)
      selection.insertNodes([imageNode])
      return true
    },
    COMMAND_PRIORITY_EDITOR
  )

  const unregisterRemove = editor.registerCommand(
    IMAGE_REMOVE_COMMAND,
    () => {
      const selection = $getSelection()
      if ($isRangeSelection(selection)) {
        const nodes = selection.getNodes()
        nodes.forEach((node) => {
          const parent = node.getParent()
          if (parent instanceof ImageNode) {
            parent.remove()
          }
        })
      } else if ($isNodeSelection(selection)) {
        const nodes = selection.getNodes()
        nodes.forEach((node) => {
          if (node instanceof ImageNode) {
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

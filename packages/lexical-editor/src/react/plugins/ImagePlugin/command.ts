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
import { $createImageNode, ImageNode } from './nodes/ImageNode'
import { $createImageContentNode } from './nodes/ImageContentNode'
import { $insertImageNodes } from './utils'
import type { ImageAddCommandPayload } from './types'

export const IMAGE_ADD_COMMAND: LexicalCommand<ImageAddCommandPayload> = createCommand('ADD_IMAGE_LINK')
export const IMAGE_REMOVE_COMMAND = createCommand('REMOVE_IMAGE_LINK')

export function registerImagePlugin(editor: LexicalEditor) {
  const unregisterAdd = editor.registerCommand(
    IMAGE_ADD_COMMAND,
    (payload) => {
      const { url, layout, caption = '', title = '', source = 'link' } = payload
      const selection = $getSelection()
      if (!selection) {
        return false
      }
      const imageNode = $createImageNode()
      const imageContentNode = $createImageContentNode(
        url,
        layout,
        caption,
        title,
        source
      )
      imageNode.append(imageContentNode)
      $insertImageNodes([imageNode])
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

import {
  $getSelection,
  $isRangeSelection,
  $isNodeSelection,
  createCommand,
  COMMAND_PRIORITY_EDITOR,
  type LexicalEditor,
  type LexicalCommand
} from 'lexical'
// nodes
import {
  $createImageNode,
  $isImageNode,
} from './nodes/ImageNode'
import { $insertImageNodes } from './utils'
import { isImageLayout, isImageSource } from './constant'
import type { ImageAddCommandPayload } from './types'

export const IMAGE_ADD_COMMAND: LexicalCommand<ImageAddCommandPayload> = createCommand('ADD_IMAGE_LINK')
export const IMAGE_REMOVE_COMMAND = createCommand('REMOVE_IMAGE_LINK')

export function registerImagePlugin(editor: LexicalEditor) {
  const unregisterAdd = editor.registerCommand(
    IMAGE_ADD_COMMAND,
    (payload) => {
      const { url, layout, caption = '', title = '', source = 'link' } = payload
      const imageUrl = url.trim()
      const selection = $getSelection()

      if (!selection || !imageUrl || !isImageLayout(layout) || !isImageSource(source)) {
        return false
      }

      const imageNode = $createImageNode(
        imageUrl,
        layout,
        caption,
        title,
        source
      )
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
          if ($isImageNode(node)) {
            node.remove()
          }
        })
      } else if ($isNodeSelection(selection)) {
        const nodes = selection.getNodes()
        nodes.forEach((node) => {
          if ($isImageNode(node)) {
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

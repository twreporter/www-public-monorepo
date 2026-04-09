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
import { ImageLinkNode } from './nodes/ImageLinkNode'
import { ImageLinkContentNode } from './nodes/ImageLinkContentNode'
import type { ImageLayout } from './types'

export const IMAGE_LINK_ADD_COMMAND: LexicalCommand<{
  url: string
  layout: ImageLayout
  caption: string
}> = createCommand('ADD_IMAGE_LINK')
export const IMAGE_LINK_REMOVE_COMMAND = createCommand('REMOVE_IMAGE_LINK')

export function registerImageLinkPlugin(editor: LexicalEditor) {
  const unregisterAdd = editor.registerCommand(
    IMAGE_LINK_ADD_COMMAND,
    ({ url, layout, caption }) => {
      console.log('add image link', url, layout, caption)
      const selection = $getSelection()
      if (!selection) {
        console.log('invalid add image link', $isRangeSelection(selection), selection)
        return false
      }
      const imageLinkNode = new ImageLinkNode()
      const imageLinkContentNode = new ImageLinkContentNode(url, layout, caption)
      imageLinkNode.append(imageLinkContentNode)
      selection.insertNodes([imageLinkNode])
      return true
    },
    COMMAND_PRIORITY_EDITOR
  )

  const unregisterRemove = editor.registerCommand(
    IMAGE_LINK_REMOVE_COMMAND,
    () => {
      const selection = $getSelection()
      if ($isRangeSelection(selection)) {
        const nodes = selection.getNodes()
        nodes.forEach((node) => {
          const parent = node.getParent()
          if (parent instanceof ImageLinkNode) {
            parent.remove()
          }
        })
      } else if ($isNodeSelection(selection)) {
        const nodes = selection.getNodes()
        nodes.forEach((node) => {
          if (node instanceof ImageLinkNode) {
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

import { createCommand } from 'lexical'
import {
  $getSelection,
  $isNodeSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_EDITOR,
  type LexicalCommand,
  type LexicalEditor,
} from 'lexical'

import {
  $createEmbeddedCodeNode,
  $isEmbeddedCodeNode,
} from './nodes/EmbeddedCodeNode'
import { $insertEmbeddedCodeNodes } from './utils'
import type { EmbeddedCodeAddCommandPayload } from './types'

export const EMBEDDED_CODE_ADD_COMMAND: LexicalCommand<EmbeddedCodeAddCommandPayload> =
  createCommand('ADD_EMBEDDED_CODE')
export const EMBEDDED_CODE_REMOVE_COMMAND = createCommand('REMOVE_EMBEDDED_CODE')

export function registerEmbeddedCodePlugin(editor: LexicalEditor) {
  const unregisterAdd = editor.registerCommand(
    EMBEDDED_CODE_ADD_COMMAND,
    (payload) => {
      const { embeddedCode, caption = '', layout } = payload
      const selection = $getSelection()
      if (!selection) {
        return false
      }

      const embeddedCodeNode = $createEmbeddedCodeNode(
        embeddedCode,
        layout,
        caption
      )
      $insertEmbeddedCodeNodes([embeddedCodeNode])
      return true
    },
    COMMAND_PRIORITY_EDITOR
  )

  const unregisterRemove = editor.registerCommand(
    EMBEDDED_CODE_REMOVE_COMMAND,
    () => {
      const selection = $getSelection()
      if ($isRangeSelection(selection) || $isNodeSelection(selection)) {
        const nodes = selection.getNodes()
        nodes.forEach((node) => {
          if ($isEmbeddedCodeNode(node)) {
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

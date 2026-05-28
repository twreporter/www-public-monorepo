import {
  $createParagraphNode,
  $createTextNode,
  $getSelection,
  $isNodeSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_EDITOR,
  COMMAND_PRIORITY_HIGH,
  createCommand,
  KEY_BACKSPACE_COMMAND,
  KEY_DELETE_COMMAND,
  type LexicalCommand,
  type LexicalEditor,
  type LexicalNode,
} from 'lexical'

import {
  DEFAULT_QUOTE_CONTENT,
  iswwwQuoteLayout,
  type wwwQuoteLayout,
} from './constant'
import {
  $createwwwQuoteByNode,
  $iswwwQuoteByNode,
} from './nodes/wwwQuoteByNode'
import {
  $createwwwQuoteContentNode,
  $iswwwQuoteContentNode,
} from './nodes/wwwQuoteContentNode'
import {
  $createwwwQuoteNode,
  $iswwwQuoteNode,
} from './nodes/wwwQuoteNode'
import { $insertwwwQuoteNodes } from './utils'

export type wwwQuoteAddCommandPayload = {
  layout?: wwwQuoteLayout
  quoteBy?: string
  content?: string
}

export const WWW_QUOTE_ADD_COMMAND: LexicalCommand<
  wwwQuoteAddCommandPayload | undefined
> = createCommand('ADD_WWW_QUOTE')
export const WWW_QUOTE_REMOVE_COMMAND: LexicalCommand<void> =
  createCommand('REMOVE_WWW_QUOTE')

function $isProtectedQuoteStructureNode(node: LexicalNode): boolean {
  return (
    $iswwwQuoteNode(node) ||
    $iswwwQuoteContentNode(node) ||
    $iswwwQuoteByNode(node)
  )
}

function $shouldPreventKeyboardQuoteDeletion(): boolean {
  const selection = $getSelection()

  if ($isNodeSelection(selection)) {
    return selection.getNodes().some($isProtectedQuoteStructureNode)
  }

  if ($isRangeSelection(selection) && !selection.isCollapsed()) {
    return selection.getNodes().some($isProtectedQuoteStructureNode)
  }

  return false
}

export function registerQuotePlugin(editor: LexicalEditor) {
  const unregisterAdd = editor.registerCommand(
    WWW_QUOTE_ADD_COMMAND,
    (payload) => {
      const selection = $getSelection()
      if (!$isRangeSelection(selection) && !$isNodeSelection(selection)) {
        return false
      }

      const layout = iswwwQuoteLayout(payload?.layout)
        ? payload.layout
        : 'default'
      const content = payload?.content ?? DEFAULT_QUOTE_CONTENT
      const quoteBy = payload?.quoteBy?.trim() || undefined

      const quoteNode = $createwwwQuoteNode(layout)
      const contentNode = $createwwwQuoteContentNode()
      const paragraphNode = $createParagraphNode()
      const textNode = $createTextNode(content)
      const quoteByNode = $createwwwQuoteByNode(quoteBy)

      paragraphNode.append(textNode)
      contentNode.append(paragraphNode)
      quoteNode.append(contentNode, quoteByNode)
      $insertwwwQuoteNodes([quoteNode])
      textNode.select(0, content.length)
      return true
    },
    COMMAND_PRIORITY_EDITOR
  )

  const unregisterRemove = editor.registerCommand(
    WWW_QUOTE_REMOVE_COMMAND,
    () => {
      const selection = $getSelection()
      if ($isRangeSelection(selection) || $isNodeSelection(selection)) {
        selection.getNodes().forEach((node) => {
          if ($iswwwQuoteNode(node)) {
            node.remove()
            return
          }

          if ($iswwwQuoteByNode(node)) {
            const parent = node.getParent()
            if ($iswwwQuoteNode(parent)) {
              parent.remove()
            }
          }
        })
      }
      return true
    },
    COMMAND_PRIORITY_EDITOR
  )

  const unregisterBackspaceGuard = editor.registerCommand(
    KEY_BACKSPACE_COMMAND,
    (event) => {
      if (!$shouldPreventKeyboardQuoteDeletion()) {
        return false
      }

      event.preventDefault()
      return true
    },
    COMMAND_PRIORITY_HIGH
  )

  const unregisterDeleteGuard = editor.registerCommand(
    KEY_DELETE_COMMAND,
    (event) => {
      if (!$shouldPreventKeyboardQuoteDeletion()) {
        return false
      }

      event.preventDefault()
      return true
    },
    COMMAND_PRIORITY_HIGH
  )

  return () => {
    unregisterAdd()
    unregisterRemove()
    unregisterBackspaceGuard()
    unregisterDeleteGuard()
  }
}

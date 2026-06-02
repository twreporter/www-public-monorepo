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
  isWwwQuoteLayout,
  type WwwQuoteLayout,
} from './constant'
import {
  $createWwwQuoteByNode,
  $isWwwQuoteByNode,
} from './nodes/WwwQuoteByNode'
import {
  $createWwwQuoteContentNode,
  $isWwwQuoteContentNode,
} from './nodes/WwwQuoteContentNode'
import {
  $createWwwQuoteNode,
  $isWwwQuoteNode,
  type WwwQuoteNode,
} from './nodes/WwwQuoteNode'
import { $insertWwwQuoteNodes } from './utils'

export type WwwQuoteAddCommandPayload = {
  layout?: WwwQuoteLayout
  quoteBy?: string
  content?: string
}

export const WWW_QUOTE_ADD_COMMAND: LexicalCommand<
  WwwQuoteAddCommandPayload | undefined
> = createCommand('ADD_WWW_QUOTE')
export const WWW_QUOTE_REMOVE_COMMAND: LexicalCommand<void> =
  createCommand('REMOVE_WWW_QUOTE')

function $isProtectedQuoteStructureNode(node: LexicalNode): boolean {
  return (
    $isWwwQuoteNode(node) ||
    $isWwwQuoteContentNode(node) ||
    $isWwwQuoteByNode(node)
  )
}

function $findAncestorWwwQuoteNode(
  node: LexicalNode
): WwwQuoteNode | null {
  let currentNode: LexicalNode | null = node

  while (currentNode) {
    if ($isWwwQuoteNode(currentNode)) {
      return currentNode
    }

    currentNode = currentNode.getParent()
  }

  return null
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

      const layout = isWwwQuoteLayout(payload?.layout)
        ? payload.layout
        : 'default'
      const content = payload?.content ?? DEFAULT_QUOTE_CONTENT
      const quoteBy = payload?.quoteBy?.trim() || undefined

      const quoteNode = $createWwwQuoteNode(layout)
      const contentNode = $createWwwQuoteContentNode()
      const paragraphNode = $createParagraphNode()
      const textNode = $createTextNode(content)
      const quoteByNode = $createWwwQuoteByNode(quoteBy)

      paragraphNode.append(textNode)
      contentNode.append(paragraphNode)
      quoteNode.append(contentNode, quoteByNode)
      $insertWwwQuoteNodes([quoteNode])
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
        const quoteNodes = new Set<WwwQuoteNode>()

        selection.getNodes().forEach((node) => {
          const quoteNode = $findAncestorWwwQuoteNode(node)
          if (quoteNode) {
            quoteNodes.add(quoteNode)
          }
        })

        quoteNodes.forEach((quoteNode) => {
          quoteNode.remove()
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

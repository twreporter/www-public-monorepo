import {
  $createParagraphNode,
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

import { $createInfoboxNode, $isInfoboxNode, type InfoboxNode } from './nodes'
import { $insertInfoboxNodes } from './utils'

export const INFOBOX_ADD_COMMAND: LexicalCommand<void> =
  createCommand('ADD_INFOBOX')
export const INFOBOX_REMOVE_COMMAND: LexicalCommand<void> =
  createCommand('REMOVE_INFOBOX')

function $findAncestorInfoboxNode(node: LexicalNode): InfoboxNode | null {
  let currentNode: LexicalNode | null = node

  while (currentNode) {
    if ($isInfoboxNode(currentNode)) {
      return currentNode
    }

    currentNode = currentNode.getParent()
  }

  return null
}

function $isProtectedInfoboxStructureNode(node: LexicalNode): boolean {
  return $isInfoboxNode(node)
}

function $collectSelectedInfoboxNodes(): Set<InfoboxNode> {
  const selection = $getSelection()
  const infoboxNodes = new Set<InfoboxNode>()

  if ($isRangeSelection(selection) || $isNodeSelection(selection)) {
    selection.getNodes().forEach((node) => {
      const infoboxNode = $isInfoboxNode(node)
        ? node
        : $findAncestorInfoboxNode(node)

      if (infoboxNode) {
        infoboxNodes.add(infoboxNode)
      }
    })
  }

  return infoboxNodes
}

function $removeSelectedInfoboxNodes(): boolean {
  const infoboxNodes = $collectSelectedInfoboxNodes()

  if (infoboxNodes.size === 0) {
    return false
  }

  infoboxNodes.forEach((infoboxNode) => {
    infoboxNode.remove()
  })

  return true
}

function $shouldPreventKeyboardInfoboxDeletion(): boolean {
  const selection = $getSelection()

  if ($isNodeSelection(selection)) {
    return selection.getNodes().some($isProtectedInfoboxStructureNode)
  }

  if ($isRangeSelection(selection) && !selection.isCollapsed()) {
    return selection.getNodes().some($isProtectedInfoboxStructureNode)
  }

  return false
}

export function registerInfoboxPlugin(editor: LexicalEditor) {
  const unregisterAdd = editor.registerCommand(
    INFOBOX_ADD_COMMAND,
    () => {
      const selection = $getSelection()
      if (!$isRangeSelection(selection) && !$isNodeSelection(selection)) {
        return false
      }

      const infoboxNode = $createInfoboxNode()
      const paragraphNode = $createParagraphNode()

      infoboxNode.append(paragraphNode)
      $insertInfoboxNodes([infoboxNode])
      paragraphNode.select(0, 0)
      return true
    },
    COMMAND_PRIORITY_EDITOR
  )

  const unregisterRemove = editor.registerCommand(
    INFOBOX_REMOVE_COMMAND,
    () => {
      $removeSelectedInfoboxNodes()
      return true
    },
    COMMAND_PRIORITY_EDITOR
  )

  const unregisterBackspace = editor.registerCommand(
    KEY_BACKSPACE_COMMAND,
    (event) => {
      if (!$shouldPreventKeyboardInfoboxDeletion()) {
        return false
      }

      event.preventDefault()
      return true
    },
    COMMAND_PRIORITY_HIGH
  )

  const unregisterDelete = editor.registerCommand(
    KEY_DELETE_COMMAND,
    (event) => {
      if (!$shouldPreventKeyboardInfoboxDeletion()) {
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
    unregisterBackspace()
    unregisterDelete()
  }
}

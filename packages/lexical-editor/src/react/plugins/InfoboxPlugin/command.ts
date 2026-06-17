import {
  $createParagraphNode,
  $getSelection,
  $isElementNode,
  $isNodeSelection,
  $isRangeSelection,
  $isTextNode,
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

type InfoboxKeyboardAction = 'backspace' | 'delete'
const deleteInfoboxConfirmMessage = '確定要刪除整個 Infobox 嗎？'

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

function $isAtStartOfNodePath(
  node: LexicalNode,
  offset: number,
  topLevelNode: LexicalNode
): boolean {
  if ($isTextNode(node)) {
    if (offset !== 0) {
      return false
    }
  } else if ($isElementNode(node)) {
    if (offset !== 0) {
      return false
    }
  } else {
    return false
  }

  let currentNode: LexicalNode | null = node
  while (currentNode && currentNode !== topLevelNode) {
    if (currentNode.getPreviousSibling() !== null) {
      return false
    }
    currentNode = currentNode.getParent()
  }

  return currentNode === topLevelNode
}

function $isAtEndOfNodePath(
  node: LexicalNode,
  offset: number,
  topLevelNode: LexicalNode
): boolean {
  if ($isTextNode(node)) {
    if (offset !== node.getTextContentSize()) {
      return false
    }
  } else if ($isElementNode(node)) {
    if (offset !== node.getChildrenSize()) {
      return false
    }
  } else {
    return false
  }

  let currentNode: LexicalNode | null = node
  while (currentNode && currentNode !== topLevelNode) {
    if (currentNode.getNextSibling() !== null) {
      return false
    }
    currentNode = currentNode.getParent()
  }

  return currentNode === topLevelNode
}

function $getAdjacentInfoboxFromKeyboardAction(
  action: InfoboxKeyboardAction
): InfoboxNode | null {
  const selection = $getSelection()
  if (!$isRangeSelection(selection) || !selection.isCollapsed()) {
    return null
  }

  const anchorNode = selection.anchor.getNode()
  if ($findAncestorInfoboxNode(anchorNode)) {
    return null
  }

  const topLevelNode = anchorNode.getTopLevelElement()
  if (!topLevelNode) {
    return null
  }

  if (
    action === 'backspace' &&
    $isAtStartOfNodePath(anchorNode, selection.anchor.offset, topLevelNode)
  ) {
    const previousSibling = topLevelNode.getPreviousSibling()
    return $isInfoboxNode(previousSibling) ? previousSibling : null
  }

  if (
    action === 'delete' &&
    $isAtEndOfNodePath(anchorNode, selection.anchor.offset, topLevelNode)
  ) {
    const nextSibling = topLevelNode.getNextSibling()
    return $isInfoboxNode(nextSibling) ? nextSibling : null
  }

  return null
}

function $getBoundaryInfoboxFromKeyboardAction(
  action: InfoboxKeyboardAction
): InfoboxNode | null {
  const selection = $getSelection()
  if (!$isRangeSelection(selection) || !selection.isCollapsed()) {
    return null
  }

  const anchorNode = selection.anchor.getNode()
  const infoboxNode = $findAncestorInfoboxNode(anchorNode)
  if (!infoboxNode) {
    return null
  }

  if (
    action === 'backspace' &&
    $isAtStartOfNodePath(anchorNode, selection.anchor.offset, infoboxNode)
  ) {
    return infoboxNode
  }

  if (
    action === 'delete' &&
    $isAtEndOfNodePath(anchorNode, selection.anchor.offset, infoboxNode)
  ) {
    return infoboxNode
  }

  return null
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
    $moveSelectionAwayFromInfoboxNode(infoboxNode)
    infoboxNode.remove()
  })

  return true
}

function $moveSelectionAwayFromInfoboxNode(infoboxNode: InfoboxNode): void {
  const nextSibling = infoboxNode.getNextSibling()
  if (nextSibling) {
    nextSibling.selectStart()
    return
  }

  const previousSibling = infoboxNode.getPreviousSibling()
  if (previousSibling) {
    previousSibling.selectEnd()
    return
  }

  const paragraphNode = $createParagraphNode()
  infoboxNode.insertAfter(paragraphNode)
  paragraphNode.select()
}

function $confirmAndRemoveInfoboxNode(infoboxNode: InfoboxNode): void {
  if (confirm(deleteInfoboxConfirmMessage)) {
    $moveSelectionAwayFromInfoboxNode(infoboxNode)
    infoboxNode.remove()
  }
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
      const boundaryInfoboxNode =
        $getBoundaryInfoboxFromKeyboardAction('backspace')
      if (boundaryInfoboxNode) {
        $confirmAndRemoveInfoboxNode(boundaryInfoboxNode)
        event.preventDefault()
        return true
      }

      const infoboxNode = $getAdjacentInfoboxFromKeyboardAction('backspace')
      if (!infoboxNode) {
        return false
      }

      $confirmAndRemoveInfoboxNode(infoboxNode)
      event.preventDefault()
      return true
    },
    COMMAND_PRIORITY_HIGH
  )

  const unregisterDelete = editor.registerCommand(
    KEY_DELETE_COMMAND,
    (event) => {
      const boundaryInfoboxNode =
        $getBoundaryInfoboxFromKeyboardAction('delete')
      if (boundaryInfoboxNode) {
        $confirmAndRemoveInfoboxNode(boundaryInfoboxNode)
        event.preventDefault()
        return true
      }

      const infoboxNode = $getAdjacentInfoboxFromKeyboardAction('delete')
      if (!infoboxNode) {
        return false
      }

      $confirmAndRemoveInfoboxNode(infoboxNode)
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

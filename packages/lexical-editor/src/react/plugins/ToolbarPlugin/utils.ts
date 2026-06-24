import {
  INSERT_CHECK_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
} from '@lexical/list'
import { $isDecoratorBlockNode } from '@lexical/react/LexicalDecoratorBlockNode'
import {
  $createHeadingNode,
  $isHeadingNode,
  $isQuoteNode,
  type HeadingTagType,
} from '@lexical/rich-text'
import { $setBlocksType } from '@lexical/selection'
import { $isTableSelection } from '@lexical/table'
import { $getNearestBlockElementAncestorOrThrow } from '@lexical/utils'
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  $isTextNode,
  type RangeSelection,
  type LexicalEditor,
  type BaseSelection,
  type LexicalNode,
} from 'lexical'
import { getSelectedNode } from '../../utils/getSelectedNode'
import { $isAnnotationContentNode } from '../AnnotationPlugin/nodes/AnnotationContentNode'
import { $isInfoboxNode } from '../InfoboxPlugin/nodes'
import { $isWwwQuoteContentNode } from '../QuotePlugin/nodes/WwwQuoteContentNode'

function $hasSelfOrAncestor(
  node: LexicalNode,
  predicate: (node: LexicalNode) => boolean
): boolean {
  let currentNode: LexicalNode | null = node

  while (currentNode) {
    if (predicate(currentNode)) {
      return true
    }

    currentNode = currentNode.getParent()
  }

  return false
}

const canIUse = (selection: BaseSelection | null): boolean => {
  if (!selection || !$isRangeSelection(selection)) {
    return true
  }

  const node = getSelectedNode(selection as RangeSelection)

  if ($hasSelfOrAncestor(node, $isAnnotationContentNode)) {
    alert('註解內不支援此功能')
    return false
  }

  if ($hasSelfOrAncestor(node, $isWwwQuoteContentNode)) {
    alert('Quote 內不支援此功能')
    return false
  }

  return true
}

const isNonCollapsedSelectionInInfobox = (
  selection: BaseSelection | null
): boolean => {
  if (!selection || !$isRangeSelection(selection) || selection.isCollapsed()) {
    return false
  }

  const node = getSelectedNode(selection as RangeSelection)
  return $hasSelfOrAncestor(node, $isInfoboxNode)
}

export const formatParagraph = (editor: LexicalEditor) => {
  editor.update(() => {
    const selection = $getSelection()
    if (!canIUse(selection)) {
      return
    }
    if ($isRangeSelection(selection)) {
      $setBlocksType(selection, () => $createParagraphNode())
    }
  })
}

export const formatHeading = (
  editor: LexicalEditor,
  blockType: string,
  headingSize: HeadingTagType
) => {
  if (blockType === headingSize) {
    return
  }

  editor.update(() => {
    const selection = $getSelection()
    if (!canIUse(selection)) {
      return
    }
    $setBlocksType(selection, () => $createHeadingNode(headingSize))
  })
}

export const formatBulletList = (editor: LexicalEditor, blockType: string) => {
  editor.update(() => {
    const selection = $getSelection()
    if (!canIUse(selection)) {
      return
    }
    if (isNonCollapsedSelectionInInfobox(selection)) {
      alert('請在未選取文字的情況下進行此操作')
      return
    }

    if (blockType !== 'bullet') {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)
    } else {
      formatParagraph(editor)
    }
  })
}

export const formatCheckList = (editor: LexicalEditor, blockType: string) => {
  editor.update(() => {
    const selection = $getSelection()
    if (!canIUse(selection)) {
      return
    }
    if (isNonCollapsedSelectionInInfobox(selection)) {
      alert('請在未選取文字的情況下進行此操作')
      return
    }

    if (blockType !== 'check') {
      editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined)
    } else {
      formatParagraph(editor)
    }
  })
}

export const formatNumberedList = (
  editor: LexicalEditor,
  blockType: string
) => {
  editor.update(() => {
    const selection = $getSelection()
    if (!canIUse(selection)) {
      return
    }
    if (isNonCollapsedSelectionInInfobox(selection)) {
      alert('請在未選取文字的情況下進行此操作')
      return
    }

    if (blockType !== 'number') {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)
    } else {
      formatParagraph(editor)
    }
  })
}

export const clearFormatting = (editor: LexicalEditor) => {
  editor.update(() => {
    const selection = $getSelection()
    if ($isRangeSelection(selection) || $isTableSelection(selection)) {
      const anchor = selection.anchor
      const focus = selection.focus
      const nodes = selection.getNodes()
      const extractedNodes = selection.extract()

      if (anchor.key === focus.key && anchor.offset === focus.offset) {
        return
      }

      nodes.forEach((node, idx) => {
        // We split the first and last node by the selection
        // So that we don't format unselected text inside those nodes
        if ($isTextNode(node)) {
          // Use a separate variable to ensure TS does not lose the refinement
          let textNode = node
          if (idx === 0 && anchor.offset !== 0) {
            textNode = textNode.splitText(anchor.offset)[1] || textNode
          }
          if (idx === nodes.length - 1) {
            textNode = textNode.splitText(focus.offset)[0] || textNode
          }
          /**
           * If the selected text has one format applied
           * selecting a portion of the text, could
           * clear the format to the wrong portion of the text.
           *
           * The cleared text is based on the length of the selected text.
           */
          // We need this in case the selected text only has one format
          const extractedTextNode = extractedNodes[0]
          if (nodes.length === 1 && $isTextNode(extractedTextNode)) {
            textNode = extractedTextNode
          }

          if (textNode.__style !== '') {
            textNode.setStyle('')
          }
          if (textNode.__format !== 0) {
            textNode.setFormat(0)
            $getNearestBlockElementAncestorOrThrow(textNode).setFormat('')
          }
          node = textNode
        } else if ($isHeadingNode(node) || $isQuoteNode(node)) {
          node.replace($createParagraphNode(), true)
        } else if ($isDecoratorBlockNode(node)) {
          node.setFormat('')
        }
      })
    }
  })
}

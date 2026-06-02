import { $insertNodeToNearestRoot } from '@lexical/utils'
import { $getSelection, $isRangeSelection } from 'lexical'

import type { WwwQuoteNode } from './nodes/WwwQuoteNode'

export function $insertWwwQuoteNodes(nodes: WwwQuoteNode[]): void {
  const selection = $getSelection()

  if ($isRangeSelection(selection) && !selection.isCollapsed()) {
    selection.removeText()
  }

  nodes.forEach((node) => {
    $insertNodeToNearestRoot(node)
  })
}

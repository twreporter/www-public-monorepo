import { $insertNodeToNearestRoot } from '@lexical/utils'
import { $getSelection, $isRangeSelection } from 'lexical'

import type { wwwQuoteNode } from './nodes/wwwQuoteNode'

export function $insertwwwQuoteNodes(nodes: wwwQuoteNode[]): void {
  const selection = $getSelection()

  if ($isRangeSelection(selection) && !selection.isCollapsed()) {
    selection.removeText()
  }

  nodes.forEach((node) => {
    $insertNodeToNearestRoot(node)
  })
}

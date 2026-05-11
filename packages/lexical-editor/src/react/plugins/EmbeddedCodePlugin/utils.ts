import { $getSelection, $isRangeSelection } from 'lexical'
import { $insertNodeToNearestRoot } from '@lexical/utils'

import type { EmbeddedCodeNode } from './nodes/EmbeddedCodeNode'

export function $insertEmbeddedCodeNodes(nodes: EmbeddedCodeNode[]): void {
  const selection = $getSelection()

  if ($isRangeSelection(selection) && !selection.isCollapsed()) {
    selection.removeText()
  }

  nodes.forEach((node) => {
    $insertNodeToNearestRoot(node)
  })
}

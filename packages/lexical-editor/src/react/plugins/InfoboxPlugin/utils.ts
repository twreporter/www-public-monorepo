import { $insertNodeToNearestRoot } from '@lexical/utils'
import { $getSelection, $isRangeSelection } from 'lexical'

import type { InfoboxNode } from './nodes'

export function $insertInfoboxNodes(nodes: InfoboxNode[]): void {
  const selection = $getSelection()

  if ($isRangeSelection(selection) && !selection.isCollapsed()) {
    selection.removeText()
  }

  nodes.forEach((node) => {
    $insertNodeToNearestRoot(node)
  })
}

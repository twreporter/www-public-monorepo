import { $getSelection, $isRangeSelection } from 'lexical'
import { $insertNodeToNearestRoot } from '@lexical/utils'

import type { ImageNode } from './nodes/ImageNode'

export function $insertImageNodes(nodes: ImageNode[]): void {
  const selection = $getSelection()

  if ($isRangeSelection(selection) && !selection.isCollapsed()) {
    selection.removeText()
  }

  nodes.forEach((node) => {
    $insertNodeToNearestRoot(node)
  })
}

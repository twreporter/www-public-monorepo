import { $insertNodeToNearestRoot } from '@lexical/utils'
import { $getSelection, $isRangeSelection } from 'lexical'

import type { SlideShowNode } from './nodes/SlideShowNode'
import type { SlideShowSlide } from './types'

export function normalizeSlideShowSlides(
  slides: SlideShowSlide[]
): SlideShowSlide[] {
  if (!Array.isArray(slides)) {
    return []
  }

  return slides
    .map((slide) => ({
      url: slide.url?.trim(),
      caption: slide.caption,
    }))
    .filter((slide) => slide.url.length > 0)
}

export function $insertSlideShowNode(node: SlideShowNode): void {
  const selection = $getSelection()

  if ($isRangeSelection(selection) && !selection.isCollapsed()) {
    selection.removeText()
  }

  $insertNodeToNearestRoot(node)
}

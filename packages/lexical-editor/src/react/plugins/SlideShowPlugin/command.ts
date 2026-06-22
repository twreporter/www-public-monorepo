import {
  COMMAND_PRIORITY_EDITOR,
  createCommand,
  type LexicalCommand,
  type LexicalEditor,
} from 'lexical'

import {
  $createSlideShowNode,
} from './nodes/SlideShowNode'
import type { SlideShowAddCommandPayload } from './types'
import { $insertSlideShowNode, normalizeSlideShowSlides } from './utils'

export const SLIDE_SHOW_ADD_COMMAND: LexicalCommand<SlideShowAddCommandPayload> =
  createCommand('SLIDE_SHOW_ADD_COMMAND')

export function registerSlideShowPlugin(editor: LexicalEditor) {
  return editor.registerCommand(
    SLIDE_SHOW_ADD_COMMAND,
    (payload) => {
      const slides = normalizeSlideShowSlides(payload.slides)

      if (slides.length === 0) {
        return false
      }

      $insertSlideShowNode($createSlideShowNode(slides))
      return true
    },
    COMMAND_PRIORITY_EDITOR
  )
}

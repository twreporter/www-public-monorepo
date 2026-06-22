import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { useEffect, type FC } from 'react'

import { registerSlideShowPlugin } from './command'
import { SlideShowNode } from './nodes'

import './SlideShow.scss'

const SlideShowPlugin: FC = () => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    if (!editor.hasNodes([SlideShowNode])) {
      throw new Error(
        'SlideShowPlugin: SlideShowNode not registered on editor'
      )
    }

    return registerSlideShowPlugin(editor)
  }, [editor])

  return null
}

export default SlideShowPlugin

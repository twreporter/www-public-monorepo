import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { useEffect, type FC } from 'react'

import { registerInfoboxPlugin } from './command'
import { InfoboxNode } from './nodes'

import './Infobox.scss'

const InfoboxPlugin: FC = () => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    if (!editor.hasNodes([InfoboxNode])) {
      throw new Error('InfoboxPlugin: InfoboxNode not registered on editor')
    }

    const unregister = registerInfoboxPlugin(editor)

    return () => {
      unregister()
    }
  }, [editor])

  return null
}

export default InfoboxPlugin

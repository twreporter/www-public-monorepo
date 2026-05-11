import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { useEffect, type FC } from 'react'

import { registerEmbeddedCodePlugin } from './command'
import { EmbeddedCodeNode } from './nodes'

import './EmbeddedCode.scss'

const EmbeddedCodePlugin: FC = () => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    if (!editor.hasNodes([EmbeddedCodeNode])) {
      throw new Error(
        'EmbeddedCodePlugin: EmbeddedCodeNode not registered on editor'
      )
    }

    const unregister = registerEmbeddedCodePlugin(editor)

    return () => {
      unregister()
    }
  }, [editor])

  return null
}

export default EmbeddedCodePlugin

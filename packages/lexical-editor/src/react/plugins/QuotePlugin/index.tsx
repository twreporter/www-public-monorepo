import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { useEffect, type FC } from 'react'

import { registerQuotePlugin } from './command'
import {
  wwwQuoteByNode,
  wwwQuoteContentNode,
  wwwQuoteNode,
} from './nodes'

import './Quote.scss'

const QuotePlugin: FC = () => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    if (!editor.hasNodes([wwwQuoteNode, wwwQuoteContentNode, wwwQuoteByNode])) {
      throw new Error(
        'QuotePlugin: wwwQuoteNode, wwwQuoteContentNode, wwwQuoteByNode not registered on editor'
      )
    }

    const unregister = registerQuotePlugin(editor)

    return () => {
      unregister()
    }
  }, [editor])

  return null
}

export default QuotePlugin

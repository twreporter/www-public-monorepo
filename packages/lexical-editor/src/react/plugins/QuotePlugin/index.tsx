import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { useEffect, type FC } from 'react'

import { registerQuotePlugin } from './command'
import {
  WwwQuoteByNode,
  WwwQuoteContentNode,
  WwwQuoteNode,
} from './nodes'

import './Quote.scss'

const QuotePlugin: FC = () => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    if (!editor.hasNodes([WwwQuoteNode, WwwQuoteContentNode, WwwQuoteByNode])) {
      throw new Error(
        'QuotePlugin: WwwQuoteNode, WwwQuoteContentNode, WwwQuoteByNode not registered on editor'
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

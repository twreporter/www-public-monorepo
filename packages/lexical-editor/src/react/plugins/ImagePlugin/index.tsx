import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { useEffect, type FC } from 'react'
import { registerImagePlugin } from './command'
import {
  ImageNode,
  ImageContentNode,
} from './nodes'

import './Image.scss'

const ImagePlugin: FC = () => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    if (
      !editor.hasNodes([
        ImageNode,
        ImageContentNode,
      ])
    ) {
      throw new Error(
        'ImagePlugin: ImageNode, ImageContentNode not registered on editor'
      )
    }

    const unregister = registerImagePlugin(editor)

    return () => {
      unregister()
    }
  }, [editor])

  return null // no visible UI; it's a functional plugin
}

export default ImagePlugin

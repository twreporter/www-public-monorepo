import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { useEffect, type FC } from 'react'
import { registerImageLinkPlugin } from './command'
import {
  ImageLinkNode,
  ImageLinkContentNode
} from './nodes'

import './ImageLink.scss'

const ImageLinkPlugin: FC = () => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    if (
      !editor.hasNodes([
        ImageLinkNode,
        ImageLinkContentNode,
      ])
    ) {
      throw new Error(
        'ImageLinkPlugin: ImageLinkNode, ImageLinkContentNode not registered on editor'
      )
    }

    const unregister = registerImageLinkPlugin(editor)

    return () => {
      unregister()
    }
  }, [editor])

  return null // no visible UI; it's a functional plugin
}

export default ImageLinkPlugin

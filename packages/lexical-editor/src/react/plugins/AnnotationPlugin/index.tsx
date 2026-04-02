import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { useEffect, type FC } from 'react'
import { registerAnnotationPlugin } from './command'
import {
  AnnotationNode,
  AnnotationContentNode,
  AnnotatedTextNode,
} from './nodes'

import './Annotation.css'

const AnnotationPlugin: FC = () => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    if (
      !editor.hasNodes([
        AnnotationNode,
        AnnotatedTextNode,
        AnnotationContentNode,
      ])
    ) {
      throw new Error(
        'AnnotationPlugin: AnnotationNode, AnnotatedTextNode, AnnotationContentNode not registered on editor'
      )
    }

    const unregister = registerAnnotationPlugin(editor)

    return () => {
      unregister()
    }
  }, [editor])

  return null // no visible UI; it's a functional plugin
}

export default AnnotationPlugin

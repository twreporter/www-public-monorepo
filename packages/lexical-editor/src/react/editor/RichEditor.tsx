import { useState, type JSX } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
// official plugins
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
// local plugins
import ShortcutsPlugin from '../plugins/ShortcutsPlugin'
import ToolbarPlugin from '../plugins/ToolbarPlugin'
import LinkPlugin from '../plugins/LinkPlugin'
import FloatingLinkEditorPlugin from '../plugins/FloatingLinkEditorPlugin'
import AnnotationPlugin from '../plugins/AnnotationPlugin'
// components
import ContentEditable from './ContentEditable'
// types
import type { LexicalEditorProps } from '../../core'


type EditorInnerProps = {
  config: LexicalEditorProps['config']
  placeholder: string
}

export default function Editor({
  config,
  placeholder,
}: EditorInnerProps): JSX.Element {
  const [editor] = useLexicalComposerContext()
  const [activeEditor, setActiveEditor] = useState(editor)
  const [isLinkEditMode, setIsLinkEditMode] = useState<boolean>(false)
  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null)

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem)
    }
  }

  const showToolbar = config?.ui?.toolbar ?? false
  const listStrictIndent = false

  return (
    <div className="editor-shell">
      {showToolbar ? (
        <ToolbarPlugin
          editor={editor}
          activeEditor={activeEditor}
          config={config.theme}
          setActiveEditor={setActiveEditor}
          setIsLinkEditMode={setIsLinkEditMode}
        />
      ) : null}
      <ShortcutsPlugin
        editor={activeEditor}
        setIsLinkEditMode={setIsLinkEditMode}
      />
      <div className={`editor-container`}>
        <RichTextPlugin
          contentEditable={
            <div className="editor-scroller">
              <div className="editor" ref={onRef}>
                <ContentEditable placeholder={placeholder} />
              </div>
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <LinkPlugin />
        <ListPlugin hasStrictIndent={listStrictIndent} />
        {floatingAnchorElem && (
          <FloatingLinkEditorPlugin
            anchorElem={floatingAnchorElem}
            isLinkEditMode={isLinkEditMode}
            setIsLinkEditMode={setIsLinkEditMode}
          />
        )}
        <AnnotationPlugin />
      </div>
    </div>
  )
}

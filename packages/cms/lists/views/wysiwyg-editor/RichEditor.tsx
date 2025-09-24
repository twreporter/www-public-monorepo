import React, { useState } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
// official plugins
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
// local plugins
import ShortcutsPlugin from './plugins/ShortcutsPlugin'
import ToolbarPlugin from './plugins/ToolbarPlugin'
import LinkPlugin from './plugins/LinkPlugin'
import FloatingLinkEditorPlugin from './plugins/FloatingLinkEditorPlugin'
import AnnotationPlugin from './plugins/AnnotationPlugin'
// components
import ContentEditable from './ui/ContentEditable'

export default function Editor(): JSX.Element {
  const placeholder = 'Enter some rich text...'
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

  const listStrictIndent = false

  return (
    <>
      <ToolbarPlugin
        editor={editor}
        activeEditor={activeEditor}
        setActiveEditor={setActiveEditor}
        setIsLinkEditMode={setIsLinkEditMode}
      />
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
    </>
  )
}

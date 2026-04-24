import React, { useMemo, useRef, type JSX } from 'react'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import type { EditorState } from 'lexical'
// context
import { ImageConfigContext } from '../context/ImageConfigContext'
import { ToolbarContext } from '../context/ToolbarContext'
// plugin
import { OnChangePlugin } from '../plugins/OnChangePlugin'
// utils
import buildImportMap from '../utils/buildImportMap'
// components
import RichEditor from './RichEditor'
// types
import type { LexicalEditorProps } from '../../core'

import '../style/Editor.scss'
import '../style/icon.scss'

const defaultOnError = (error: Error) => {
  throw error
}

export const LexicalEditor = ({
  config,
  value,
  onChange,
  onError = defaultOnError,
}: LexicalEditorProps): JSX.Element => {
  const initialValue = useRef(value)

  const initialEditorState = useMemo(
    () => (initialValue.current ? JSON.stringify(initialValue.current) : ''),
    []
  )

  const placeholder = config?.placeholder ?? 'Enter some rich text...'

  const initialConfig = {
    namespace: config.namespace ?? 'LexicalEditor',
    html: { import: buildImportMap() },
    theme: config.theme.classes,
    editable: !config.readOnly,
    onError,
    nodes: config.nodes,
    editorState: initialEditorState,
  }

  const onEditorStateChange = (editorState: EditorState) => {
    onChange?.(JSON.stringify(editorState.toJSON()))
  }

  return (
    <div id="lexical-editor">
      <LexicalComposer initialConfig={initialConfig}>
        <ImageConfigContext value={config.image}>
          <ToolbarContext>
            <RichEditor
              config={config}
              placeholder={placeholder}
            />
          </ToolbarContext>
        </ImageConfigContext>
        <OnChangePlugin
          onChange={onEditorStateChange}
        />
      </LexicalComposer>
    </div>
  )
}

export default LexicalEditor

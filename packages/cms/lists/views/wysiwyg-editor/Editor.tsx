import './style/Editor.css'
import './style/icon.css'
// lexical
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import type { EditorState } from 'lexical'
import { $isTextNode, type DOMConversionMap, TextNode } from 'lexical'
import React, { useMemo, useRef } from 'react'
// nodes
import TwreporterNodes from './nodes/TwreporterNodes'
// configs
import TwreporterTheme from './themes/TwreporterTheme'
// contexts
import { ToolbarContext } from './context/ToolbarContext'
// plugins
import { OnChangePlugin } from './plugins/OnChangePlugin'
// components
import Editor from './RichEditor'
// utils
import { parseAllowedColor } from './ui/ColorPicker'
// styles
import { StyleWrapper } from './style/style'

function getExtraStyles(element: HTMLElement): string {
  // Parse styles from pasted input, but only if they match exactly the
  // sort of styles that would be produced by exportDOM
  let extraStyles = ''
  const backgroundColor = parseAllowedColor(element.style.backgroundColor)
  const color = parseAllowedColor(element.style.color)
  if (backgroundColor !== '' && backgroundColor !== '#00ffffff') {
    extraStyles += `background-color: ${backgroundColor};`
  }
  if (color !== '' && color !== '#404040') {
    extraStyles += `color: ${color};`
  }
  return extraStyles
}

function buildImportMap(): DOMConversionMap {
  const importMap: DOMConversionMap = {}

  // Wrap all TextNode importers with a function that also imports
  // the custom styles implemented by the playground
  for (const [tag, fn] of Object.entries(TextNode.importDOM() || {})) {
    importMap[tag] = (importNode) => {
      const importer = fn(importNode)
      if (!importer) {
        return null
      }
      return {
        ...importer,
        conversion: (element) => {
          const output = importer.conversion(element)
          if (
            output === null ||
            output.forChild === undefined ||
            output.after !== undefined ||
            output.node !== null
          ) {
            return output
          }
          const extraStyles = getExtraStyles(element)
          if (extraStyles) {
            const { forChild } = output
            return {
              ...output,
              forChild: (child, parent) => {
                const textNode = forChild(child, parent)
                if ($isTextNode(textNode)) {
                  textNode.setStyle(textNode.getStyle() + extraStyles)
                }
                return textNode
              },
            }
          }
          return output
        },
      }
    }
  }

  return importMap
}

type AppProps = {
  value?: object
  onChange?: (value: any) => void
}

export default function App({
  value,
  onChange,
}: Readonly<AppProps>): JSX.Element {
  const initialConfig = {
    editorState: undefined,
    html: { import: buildImportMap() },
    namespace: 'editor',
    nodes: [...TwreporterNodes],
    onError: (error: Error) => {
      throw error
    },
    theme: TwreporterTheme,
  }
  const onEditorStateChange = (editorState: EditorState) => {
    onChange?.(JSON.stringify(editorState.toJSON()))
  }
  const initialValue = useRef(value)
  const initialEditorState = useMemo(
    () => (initialValue.current ? JSON.stringify(initialValue.current) : ''),
    []
  )

  return (
    <StyleWrapper>
      <LexicalComposer initialConfig={initialConfig}>
        <ToolbarContext>
          <div className="editor-shell">
            <Editor />
          </div>
        </ToolbarContext>
        <OnChangePlugin
          onChange={onEditorStateChange}
          initialEditorState={initialEditorState}
        />
      </LexicalComposer>
    </StyleWrapper>
  )
}

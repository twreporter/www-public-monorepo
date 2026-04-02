import type { InitialConfigType } from '@lexical/react/LexicalComposer'
import type { EditorTheme } from './theme'

export type EditorNodes = NonNullable<InitialConfigType['nodes']>

export type EditorUiConfig = {
  toolbar?: boolean
}

export type EditorPluginFlags = {
  history?: boolean
  richText?: boolean
}

export type EditorConfig = {
  theme: EditorTheme
  plugins?: EditorPluginFlags
  ui?: EditorUiConfig
  readOnly?: boolean
  placeholder?: string
  namespace?: string
  nodes: EditorNodes
}

export type LexicalEditorValue = object

export type LexicalEditorProps = {
  config: EditorConfig
  value?: LexicalEditorValue
  autoFocus?: boolean
  onChange?: (value: string) => void
  onError?: InitialConfigType['onError']
}

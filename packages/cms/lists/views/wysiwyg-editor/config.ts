import { createEmotionEditorTheme } from '@twreporter/lexical-editor/theme-emotion'
import { cmsEditorNodes, type EditorConfig } from '@twreporter/lexical-editor/core'


const createCmsEditorConfig = (): EditorConfig => ({
  theme: createEmotionEditorTheme(),
  nodes: cmsEditorNodes,
  ui: { toolbar: true }
})

export default createCmsEditorConfig
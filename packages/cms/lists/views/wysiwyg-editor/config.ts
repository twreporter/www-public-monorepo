import { createEmotionEditorTheme } from '@twreporter/lexical-editor/theme-emotion'
import { cmsEditorNodes, type EditorConfig } from '@twreporter/lexical-editor/core'
import { uploadImageHandler } from './uploadImageHandler'


const createCmsEditorConfig = (): EditorConfig => ({
  theme: createEmotionEditorTheme(),
  nodes: cmsEditorNodes,
  ui: { toolbar: true },
  uploadImage: {
    handler: uploadImageHandler,
    maxFileSize: 10 * 1024 * 1024, // 10MB
    allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
    onError: (error) => {
      console.error('Image upload error:', error)
      // TODO: Show toast notification to user
    }
  }
})

export default createCmsEditorConfig
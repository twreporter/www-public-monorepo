import { createEmotionEditorTheme } from '@twreporter/lexical-editor/theme-emotion'
import {
  cmsEditorNodes,
  type EditorConfig,
} from '@twreporter/lexical-editor/core'
import { uploadImageHandler } from './uploadImageHandler'
import { getDbImageSrcSet, searchPhotoHandler } from './searchPhotoHandler'

const createCmsEditorConfig = (): EditorConfig => ({
  theme: createEmotionEditorTheme(),
  nodes: cmsEditorNodes,
  ui: { toolbar: true },
  image: {
    relatedPhotosHref: (imageTitle) =>
      `/photos?!name_is_i=${encodeURIComponent(`"${imageTitle}"`)}`,
    imageFromDb: {
      search: searchPhotoHandler,
      pageSize: 6,
      onError: (error) => {
        console.error('Photo search failed:', error)
      },
    },
    getDbImageSrcSet,
  },
  uploadImage: {
    handler: uploadImageHandler,
    maxFileSize: 10 * 1024 * 1024, // 10MB
    allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
    onError: (error) => {
      console.error('Image upload failed:', error)
      alert('照片上傳失敗，請再試一次，若持續失敗請回報產品經理')
    },
  },
})

export default createCmsEditorConfig

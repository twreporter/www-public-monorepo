import { createEmotionEditorTheme } from '@twreporter/lexical-editor/theme-emotion'
import { colorGrayscale, colorSupportive } from '@twreporter/core/lib/constants/color'
import {
  cmsEditorNodes,
  type EditorConfig,
  type EditorFeatureConfig,
} from '@twreporter/lexical-editor/core'
import { uploadImageHandler } from './uploadImageHandler'
import { getDbImageSrcSet, searchPhotoHandler } from './searchPhotoHandler'

type CreateCmsEditorConfigOptions = {
  features?: EditorFeatureConfig
}

export const fieldFeatureOverrides = {
  'Author.bio': {
    image: false,
    embeddedCode: false,
    quote: false,
    infobox: false,
    slideShow: false,
    h4: false,
    annotation: false,
  },
  'Post.brief': {
    image: false,
    embeddedCode: false,
    quote: false,
    infobox: false,
    slideShow: false,
    h4: false,
    annotation: true,
  },
  'Post.content': {
    image: true,
    embeddedCode: true,
    quote: true,
    infobox: true,
    slideShow: true,
    h4: false,
    annotation: true,
  },
  'PostFollowup.content': {
    image: true,
    embeddedCode: false,
    quote: true,
    infobox: false,
    slideShow: false,
    h4: false,
    annotation: true,
  },
  'Topic.teamDescription': {
    image: true,
    embeddedCode: false,
    quote: false,
    infobox: false,
    slideShow: false,
    h4: false,
    annotation: true,
  },
  'Topic.description': {
    image: true,
    embeddedCode: true,
    quote: false,
    infobox: true,
    slideShow: true,
    h4: false,
    annotation: true,
  },
} satisfies Record<string, EditorFeatureConfig>

export const getFieldFeatureOverride = (
  listKey: string,
  fieldPath: string
): EditorFeatureConfig | undefined => {
  const overrideKey = `${listKey}.${fieldPath}`

  return overrideKey in fieldFeatureOverrides
    ? fieldFeatureOverrides[overrideKey as keyof typeof fieldFeatureOverrides]
    : undefined
}

const createCmsEditorConfig = ({
  features,
}: CreateCmsEditorConfigOptions = {}): EditorConfig => ({
  theme: createCmsEditorTheme(),
  nodes: cmsEditorNodes,
  ...(features ? { features } : {}),
  ui: { toolbar: true },
  image: {
    relatedPhotosHref: (imageTitle: string) =>
      `/photos?!name_is_i=${encodeURIComponent(`"${imageTitle}"`)}`,
    imageFromDb: {
      search: searchPhotoHandler,
      pageSize: 6,
      onError: (error: Error) => {
        console.error('Photo search failed:', error)
      },
    },
    getDbImageSrcSet,
  },
  uploadImage: {
    handler: uploadImageHandler,
    maxFileSize: 10 * 1024 * 1024, // 10MB
    allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
    onError: (error: Error) => {
      console.error('Image upload failed:', error)
      alert('照片上傳失敗，請再試一次，若持續失敗請回報產品經理')
    },
  },
})

export default createCmsEditorConfig

const createCmsEditorTheme = () => {
  const theme = createEmotionEditorTheme()

  return {
    ...theme,
    tokens: {
      ...theme.tokens,
      colorBgCanvas: colorGrayscale.gray100,
      colorBgToolbar: colorGrayscale.white,
      colorText: colorGrayscale.gray800,
      colorLinkHover: colorSupportive.heavy,
      colorLinkBottom: 'rgba(102, 102, 102, 0.50)',
    },
  }
}

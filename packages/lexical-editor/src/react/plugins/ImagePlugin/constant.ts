export const IMAGE_LAYOUTS = ['default', 'small', 'right'] as const
export type ImageLayout = (typeof IMAGE_LAYOUTS)[number]

export const IMAGE_SOURCES = ['link', 'drag-drop', 'db'] as const
export type ImageSource = (typeof IMAGE_SOURCES)[number]

export function isImageLayout(value: unknown): value is ImageLayout {
  return IMAGE_LAYOUTS.includes(value as ImageLayout)
}

export function isImageSource(value: unknown): value is ImageSource {
  return IMAGE_SOURCES.includes(value as ImageSource)
}

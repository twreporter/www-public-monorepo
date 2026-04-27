export type ImageLayout = 'default' | 'small' | 'right'

export type ImageSource = 'link' | 'drag-drop'

export type ImageAddCommandPayload = {
  url: string
  layout: ImageLayout
  caption?: string
  title?: string
  source?: ImageSource
}
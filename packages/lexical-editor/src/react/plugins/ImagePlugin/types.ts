export type { ImageLayout, ImageSource } from './constant'

import type { ImageLayout, ImageSource } from './constant'

export type ImageAddCommandPayload = {
  url: string
  layout: ImageLayout
  caption?: string
  title?: string
  source?: ImageSource
}

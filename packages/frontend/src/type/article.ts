import type { Image } from '@/type/image'
import type { Style } from '@/enums/article'

export type Tag = {
  slug: string
  name: string
  selected?: boolean
}

export type ArticleMeta = {
  title: string
  subtitle?: string
  slug: string
  style?: Style
  category: string
  publishedDate?: string
  image?: Image
  tags?: Tag[]
}

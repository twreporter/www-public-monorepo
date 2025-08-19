import type { Tag } from '@/type/article'
import type { Style } from '@/enums/article'

export type FetchBySlugParams = {
  slug: string
  skip: number
  take: number
}

export type PostMetaFromRes = {
  slug: string
  title: string
  subtitle: string
  style: Style
  publishedDate: string
  ogImage?: {
    imageFile: {
      url: string
    }
    name?: string
  }
  tags: Tag[]
  subcategories?: {
    category: {
      name: string
    }
  }
}
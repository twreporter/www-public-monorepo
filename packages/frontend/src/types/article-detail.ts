import type { Tag } from './article'

export type ArticlePhoto = {
  name?: string
  imageFile?: { url: string }
}

export type ArticleCredit = {
  id?: string
  name: string
  role: string
  type?: 'link' | 'string'
}

export type RelatedArticle = {
  id: string
  slug: string
  title: string
  style?: string
  publishedDate?: string
  ogImage?: ArticlePhoto
}

export type ArticleDetail = RelatedArticle & {
  subtitle?: string
  createdAt?: string
  updatedDate?: string
  ogTitle?: string
  ogDescription?: string
  heroImage?: ArticlePhoto
  heroCaption?: string
  heroSize?: 'small' | 'medium' | 'large' | 'full'
  heroEmbedded?: unknown
  brief?: unknown
  content?: unknown
  copyright?: 'copyrighted' | 'cc'
  authorsJSON?: ArticleCredit[]
  authors: { id: string; slug: string; name: string }[]
  tags: Tag[]
  subcategories: {
    slug: string
    name: string
    category?: { slug: string; name: string }
  }[]
  relatedTopics: { slug: string; title: string }[]
  relatedPosts: RelatedArticle[]
}

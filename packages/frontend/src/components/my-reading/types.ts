export type TrackingArticle = {
  slug: string
  publishDate: string
  trackingTitle: string
  trackingContent: string
  trackingArticleTitle: string
  trackingArticleSlug: string
}

export type ReadingListItem = {
  slug: string
  title: string
  category: string
  description: string
  publishedDate: string
  image: string
  isBookmark?: boolean
}

export type ReviewingArticle = {
  slug: string
  reviewWord?: string
  title: string
  ogDescription: string
  bgImage: string
}

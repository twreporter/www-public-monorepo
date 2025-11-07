export type TopicData = {
  slug: string
  title: string
  updatedAt: Date
  ogDescription?: string
  heroImage?: {
    imageFile: {
      url: string
    }
  }
  posts: {
    slug: string
    title: string
    heroImage: {
      imageFile: {
        url: string
      }
    }
  }[]
}

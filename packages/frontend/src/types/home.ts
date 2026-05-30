export type HomePageArticle = {
  slug: string
  title: string
  categoryLabel: string
  ogDescription: string
  image?: {
    src: string
    alt: string
  }
}

export type HomePageLatestSectionArticle = Omit<
  HomePageArticle,
  'ogDescription'
>

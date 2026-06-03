// react-typescript-components
import type { INTERNAL_LINKS } from '@twreporter/react-typescript-components/lib/constants/internal-links'

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

export type HomePageLatestTopicSectionArticle = Omit<
  HomePageArticle,
  'categoryLabel'
>

export type HomePageCategorySectionArticle = {
  slug: string
  title: string
  image?: {
    src: string
    alt: string
  }
}

export type HomePageCategorySectionMeta = {
  category: {
    label: string
    to:
      | typeof INTERNAL_LINKS.categories.world
      | typeof INTERNAL_LINKS.categories.humanRights
      | typeof INTERNAL_LINKS.categories.politicsAndSociety
      | typeof INTERNAL_LINKS.categories.health
      | typeof INTERNAL_LINKS.categories.environment
      | typeof INTERNAL_LINKS.categories.econ
      | typeof INTERNAL_LINKS.categories.culture
      | typeof INTERNAL_LINKS.categories.education
  }
} & HomePageCategorySectionArticle

export type HomePageTopicSectionMeta = {
  slug: string
  title: string
  ogDescription: string
  image?: {
    src: string
    alt: string
  }
}

export type HomePagePhotographySectionArticle = {
  slug: string
  title: string
  imageUrl: string
}

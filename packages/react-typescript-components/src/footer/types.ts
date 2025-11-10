import type { MediaType } from '../icons/constants'

export type LinkType = {
  text: string
  link: string
  id?: string
}

export type SocialMediaLink = {
  icon: MediaType
  link: string
}

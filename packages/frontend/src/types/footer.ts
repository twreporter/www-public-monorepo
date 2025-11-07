import type {
  SocialMediaLink,
  LinkType,
} from '@twreporter/react-typescript-components/lib/footer/types'

export type FooterLinksColumn = LinkType[]

export type FooterData = {
  fundraisingID: string
  fundraisingDateString: string
  socialMediaLinks?: SocialMediaLink[]
  footerLinks?: FooterLinksColumn[]
}

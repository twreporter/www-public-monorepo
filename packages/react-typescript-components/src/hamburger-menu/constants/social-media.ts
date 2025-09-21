import { MEDIA_TYPE, type MediaType } from '../../icons/enum'
import { EXTERNAL_LINKS } from '../../constants/external-links'
import type { LinkTarget } from '../../customized-link/type'

type SocialMediaType = {
  icon: MediaType
  link: string
  target: LinkTarget
}
export const SocialMedias: SocialMediaType[] = [
  {
    icon: MEDIA_TYPE.facebook,
    link: EXTERNAL_LINKS.facebook,
    target: '_blank',
  },
  {
    icon: MEDIA_TYPE.instagram,
    link: EXTERNAL_LINKS.instagram,
    target: '_blank',
  },
  {
    icon: MEDIA_TYPE.twitter,
    link: EXTERNAL_LINKS.twitter,
    target: '_blank',
  },
  {
    icon: MEDIA_TYPE.youtube,
    link: EXTERNAL_LINKS.youtube,
    target: '_blank',
  },
]

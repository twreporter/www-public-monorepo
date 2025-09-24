import { INTERNAL_LINKS } from '../../../../constants/internal-links'
import type { LinkTarget } from '../../../../customized-link/type'

type ChannelType = {
  label: string
  to: string
  target: LinkTarget
}
export const CHANNELS: ChannelType[] = [
  {
    label: '最新',
    to: INTERNAL_LINKS.latest,
    target: '_self',
  },
  {
    label: '深度專題',
    to: INTERNAL_LINKS.topics,
    target: '_self',
  },
  {
    label: '國際兩岸',
    to: INTERNAL_LINKS.categories.world,
    target: '_self',
  },
  {
    label: '人權司法',
    to: INTERNAL_LINKS.categories.humanRights,
    target: '_self',
  },
  {
    label: '政治社會',
    to: INTERNAL_LINKS.categories.politicsAndSociety,
    target: '_self',
  },
  {
    label: '醫療健康',
    to: INTERNAL_LINKS.categories.health,
    target: '_self',
  },
  {
    label: '環境永續',
    to: INTERNAL_LINKS.categories.environment,
    target: '_self',
  },
  {
    label: '經濟產業',
    to: INTERNAL_LINKS.categories.econ,
    target: '_self',
  },
  {
    label: '文化生活',
    to: INTERNAL_LINKS.categories.culture,
    target: '_self',
  },
  {
    label: '教育校園',
    to: INTERNAL_LINKS.categories.education,
    target: '_self',
  },
]

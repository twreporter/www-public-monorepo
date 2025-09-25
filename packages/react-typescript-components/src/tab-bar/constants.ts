import type { ReactElement } from 'react'
import { INTERNAL_LINKS } from '../constants/internal-links'
import type { LinkTarget } from '../customized-link/type'
// icons
import { Home, Clock, Topic, KidStar } from '../icons'
// release branch
import type { ReleaseBranch } from '../constants/release-branch'

type TabBarItem = {
  text: string
  link: string
  target: LinkTarget
  icon: ReactElement
}
export const TabBarItems: (releaseBranch: ReleaseBranch) => TabBarItem[] = (
  releaseBranch
) => [
  {
    text: '首頁',
    link: INTERNAL_LINKS.home,
    target: '_self',
    icon: Home(releaseBranch),
  },
  {
    text: '最新',
    link: INTERNAL_LINKS.latest,
    target: '_self',
    icon: Clock(releaseBranch),
  },
  {
    text: '深度專題',
    link: INTERNAL_LINKS.topics,
    target: '_self',
    icon: Topic(releaseBranch),
  },
  {
    text: '我的閱讀',
    link: INTERNAL_LINKS.myReading.index,
    target: '_self',
    icon: KidStar(releaseBranch),
  },
]

import { INTERNAL_LINKS } from '../../constants/internal-links'
import { EXTERNAL_LINKS } from '../../constants/external-links'
import type { LinkTarget } from '../../customized-link/type'
import { TYPE, type Type } from '../../button/constants'

type ActionLink = {
  label: string
  to: string
  target: LinkTarget
  type: Type
}

export const HEADER_ACTION_LINKS: ActionLink[] = [
  {
    label: '電子報',
    to: INTERNAL_LINKS.account.emailSubscription,
    target: '_self' as LinkTarget,
    type: TYPE.secondary,
  },
  {
    label: '贊助',
    to: EXTERNAL_LINKS.monthlyDonation,
    target: '_blank',
    type: TYPE.primary,
  },
]

export const HAMBURGER_MENU_ACION_LINKS: ActionLink[] = [
  {
    label: '訂閱電子報',
    to: INTERNAL_LINKS.account.emailSubscription,
    target: '_self',
    type: TYPE.secondary,
  },
  {
    label: '贊助我們',
    to: EXTERNAL_LINKS.monthlyDonation,
    target: '_blank',
    type: TYPE.primary,
  },
]

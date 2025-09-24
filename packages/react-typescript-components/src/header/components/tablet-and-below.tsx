import { useContext, type FC } from 'react'
import clsx from 'clsx'
// context
import { HeaderContext } from '../context'
// constants
import { ZIndex } from '../constants/z-index'
import { INTERNAL_LINKS } from '../../constants/internal-links'
import { EXTERNAL_LINKS } from '../../constants/external-links'
// logo
import { LogoHeader } from '../../logo'
import type { LogoType } from '../../logo/constants'
// link
import { ExternalLink, InternalLink } from '../../customized-link'
// button
import { PillButton, TextButton } from '../../button'

type TabletAndBelowProps = {
  topRowBgColor: string
  logoType: LogoType
}
const TabletAndBelow: FC<TabletAndBelowProps> = ({
  topRowBgColor,
  logoType,
}) => {
  const { isLinkExternal } = useContext(HeaderContext)
  const LinkComponent = isLinkExternal ? ExternalLink : InternalLink
  return (
    <div
      className={clsx(
        `flex items-center justify-between ${ZIndex.topRow} py-[16px] ${topRowBgColor}`,
        'desktop:hidden'
      )}
    >
      {/* logo */}
      <LinkComponent to={INTERNAL_LINKS.home} className="flex items-center">
        <LogoHeader type={logoType} className="h-[21px]" />
      </LinkComponent>
      {/* actions */}
      <div className="flex flex-row items-center gap-[24px]">
        <LinkComponent to={EXTERNAL_LINKS.monthlyDonation}>
          <PillButton
            text="贊助"
            theme={PillButton.Theme.normal}
            type={PillButton.Type.primary}
            style={PillButton.Style.brand}
          />
        </LinkComponent>
        <LinkComponent to={INTERNAL_LINKS.account.index}>
          <TextButton
            text="登入"
            theme={TextButton.Theme.normal}
            style={TextButton.Style.dark}
            size={TextButton.Size.s}
          />
        </LinkComponent>
      </div>
    </div>
  )
}

export default TabletAndBelow

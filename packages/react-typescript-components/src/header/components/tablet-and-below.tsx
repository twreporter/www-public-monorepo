import { useContext, type FC } from 'react'
import clsx from 'clsx'
// context
import { HeaderContext } from '../context'
// constants
import { ZIndex } from '../constants/z-index'
import { INTERNAL_LINKS } from '../../constants/internal-links'
// logo
import { LogoHeader } from '../../logo'
import type { LogoType } from '../../logo/enum'
// link
import { ExternalLink, InternalLink } from '../../customized-link'

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
        <div>贊助</div>
        <div>登入</div>
      </div>
    </div>
  )
}

export default TabletAndBelow

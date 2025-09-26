import { useContext, useState, useEffect, type FC } from 'react'
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
import { PillButton, TextButton, IconButton } from '../../button'
// icon
import { Arrow } from '../../icons'
// utils
import { checkReferrer } from '../utils/links'
// lodash
import some from 'lodash/some'
import includes from 'lodash/includes'
import throttle from 'lodash/throttle'
const _ = {
  some,
  includes,
  throttle,
}

type TabletAndBelowProps = {
  topRowBgColor: string
  logoType: LogoType
}
const TabletAndBelow: FC<TabletAndBelowProps> = ({
  topRowBgColor,
  logoType,
}) => {
  const { isLinkExternal, releaseBranch, theme, pathname, referrerPath } =
    useContext(HeaderContext)
  const LinkComponent = isLinkExternal ? ExternalLink : InternalLink

  const [currentClientWidth, setCurrentClientWidth] = useState(0)
  useEffect(() => {
    const handleResize = _.throttle(() => {
      setCurrentClientWidth(document.body.clientWidth)
    })

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const isOnArticlePage = _.includes(pathname, `${INTERNAL_LINKS.article}/`)
  const needPrevIconRoute = [
    INTERNAL_LINKS.account.donationHistoryPage,
    INTERNAL_LINKS.account.emailSubscription,
    INTERNAL_LINKS.myReading.savedBookmarks,
    INTERNAL_LINKS.myReading.browsingHistory,
  ]
  const isOnNeedPrevIconPage = _.some(needPrevIconRoute, (el) =>
    _.includes(pathname, el)
  )

  const showPrevIcon =
    isOnArticlePage || (isOnNeedPrevIconPage && currentClientWidth < 768) // only show it on mobile

  const gotoPrev = () => {
    if (referrerPath || checkReferrer(document.referrer, releaseBranch)) {
      // go to previous page when referer is twreporter site
      window.history.back()
    } else {
      // go to home page when referer is not twreporter site
      window.location.href = '/'
    }
  }

  return (
    <div
      className={clsx(
        `flex items-center justify-between ${ZIndex.topRow} py-[16px] ${topRowBgColor}`,
        'desktop:hidden'
      )}
    >
      <div className="flex flex-row gap-[8px]">
        {/* pre button */}
        {showPrevIcon ? (
          <div className="p-[4px] -translate-x-[8px]">
            <IconButton
              iconComponent={
                <Arrow
                  direction={Arrow.Direction.left}
                  releaseBranch={releaseBranch}
                />
              }
              theme={theme}
              onClick={gotoPrev}
            />
          </div>
        ) : null}
        {/* logo */}
        <LinkComponent to={INTERNAL_LINKS.home} className="flex items-center">
          <LogoHeader type={logoType} className="h-[21px]" />
        </LinkComponent>
      </div>
      {/* actions */}
      <div className="flex flex-row items-center gap-[16px]">
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

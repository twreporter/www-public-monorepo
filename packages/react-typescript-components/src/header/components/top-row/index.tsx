import { useContext, type FC } from 'react'
import clsx from 'clsx'
// context
import { HeaderContext, HamburgerContext } from '../../context'
// constants
import { ZIndex } from '../../constants/z-index'
import { ANIMATION } from '../../constants/animation'
import { HEADER_ACTION_LINKS } from '../../constants/action-links'
import { INTERNAL_LINKS } from '../../../constants/internal-links'
// logo
import { LogoHeader } from '../../../logo'
import type { LogoType } from '../../../logo/constants'
// buton
import { IconButton, PillButton } from '../../../button'
// components
import { Icons } from './icons'
import { Hamburger } from '../../../icons'
// utils
import { selectSloganTheme } from '../../utils/theme'
// link
import { ExternalLink, InternalLink } from '../../../customized-link'

type TopRowProps = {
  topRowBgColor: string
  logoType: LogoType
}
const TopRow: FC<TopRowProps> = ({ topRowBgColor, logoType }) => {
  const { toUseNarrow, releaseBranch, theme, isLinkExternal } =
    useContext(HeaderContext)
  const { toggleHamburger } = useContext(HamburgerContext)
  const LinkComponent = isLinkExternal ? ExternalLink : InternalLink
  return (
    <div
      className={clsx(
        `flex items-center justify-between ${ZIndex.topRow} px-[16px] ${topRowBgColor}`,
        toUseNarrow ? 'py-[16px]' : 'py-[24px]'
      )}
    >
      {/* left group */}
      <div className="flex items-center">
        <div
          className={clsx(
            toUseNarrow ? 'opacity-100' : 'opacity-0',
            `transition-opacity ${ANIMATION.step3Duration}`,
            toUseNarrow ? 'delay-[350ms]' : 'delay-0'
          )}
        >
          <IconButton
            iconComponent={Hamburger(releaseBranch)}
            theme={theme}
            onClick={toggleHamburger}
          />
        </div>
        {/* Logo */}
        <div
          className={clsx(
            `flex items-center mr-[16px] transition-all ${ANIMATION.step3Duration}`,
            toUseNarrow ? 'ml-[24px]' : 'ml-0',
            toUseNarrow ? 'translate-x-0' : '-translate-x-[24px]',
            toUseNarrow ? `${ANIMATION.step3Delay}` : 'delay-0'
          )}
        >
          <LinkComponent to={INTERNAL_LINKS.home}>
            <LogoHeader
              type={logoType}
              releaseBranch={releaseBranch}
              className={clsx(
                `transition-height ${ANIMATION.step3Duration}`,
                toUseNarrow ? `${ANIMATION.step3Delay}` : 'delay-0',
                toUseNarrow ? 'h-[24px]' : 'h-[32px]'
              )}
            />
          </LinkComponent>
        </div>
        <div
          className={clsx(
            `transition-opacity ${ANIMATION.step3Duration}`,
            'flex items-center font-serif font-normal text-[14px]',
            toUseNarrow ? `${ANIMATION.step3Delay}` : 'delay-0',
            toUseNarrow ? 'pointer-events-none' : 'pointer-events-auto',
            toUseNarrow ? 'opacity-0' : 'opacity-100',
            selectSloganTheme(theme)
          )}
        >
          深度 × 開放 × 非營利
        </div>
      </div>
      {/* right group */}
      <div className="flex items-center">
        <div
          className={clsx(
            'flex items-center gap-[16px]',
            `transition-opacity ${ANIMATION.step3Duration}`,
            toUseNarrow ? `${ANIMATION.step3Delay}` : 'delay-0',
            toUseNarrow ? 'pointer-events-none' : 'pointer-events-auto',
            toUseNarrow ? 'opacity-0' : 'opacity-100'
          )}
        >
          {HEADER_ACTION_LINKS.map((link) => (
            <LinkComponent to={link.to} target={link.target} key={link.label}>
              <PillButton text={link.label} theme={theme} type={link.type} />
            </LinkComponent>
          ))}
        </div>
        {/* icons */}
        <Icons releaseBranch={releaseBranch} theme={theme} />
      </div>
    </div>
  )
}

export default TopRow

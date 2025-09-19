import { useContext, type FC } from 'react'
import clsx from 'clsx'
// context
import { HeaderContext, HamburgerContext } from '../../context'
// constants
import { ZIndex } from '../../constants/z-index'
import { ANIMATION } from '../../constants/animation'
// logo
import { LogoHeader } from '../../../logo'
import type { LogoType } from '../../../logo/enum'
// buton
import { IconButton } from '../../../button'
// components
import { Icons } from './icons'
import { Hamburger } from '../../../icons'
// utils
import { selectSloganTheme } from '../../utils/theme'

type TopRowProps = {
  topRowBgColor: string
  logoType: LogoType
}
const TopRow: FC<TopRowProps> = ({ topRowBgColor, logoType }) => {
  const { toUseNarrow, releaseBranch, theme } = useContext(HeaderContext)
  const { toggleHamburger } = useContext(HamburgerContext)
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
            `transition-opacity duration-${ANIMATION.step3Duration}`,
            toUseNarrow ? 'transition-delay-350' : 'transition-delay-0'
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
            `flex items-center mr-[16px] transition-all duration-${ANIMATION.step3Duration}`,
            toUseNarrow ? 'ml-[24px]' : 'ml-0',
            toUseNarrow ? 'translate-x-0' : '-translate-x-[24px]',
            toUseNarrow
              ? `transition-delay-${ANIMATION.step3Delay}`
              : 'transition-delay-0'
          )}
        >
          <a
            href="/"
            className={clsx(
              `transition-height duration-${ANIMATION.step3Duration}`,
              toUseNarrow
                ? `transition-delay-${ANIMATION.step3Delay}`
                : 'transition-delay-0'
            )}
          >
            <LogoHeader
              type={logoType}
              releaseBranch={releaseBranch}
              className={clsx(toUseNarrow ? 'h-[24px]' : 'h-[32px]')}
            />
          </a>
        </div>
        <div
          className={clsx(
            `transition-opacity duration-${ANIMATION.step3Duration}`,
            'flex items-center font-serif font-normal text-[14px]',
            toUseNarrow
              ? `transition-delay-${ANIMATION.step3Delay}`
              : 'transition-delay-0',
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
            `transition-opacity duration-${ANIMATION.step3Duration}`,
            toUseNarrow
              ? `transition-delay-${ANIMATION.step3Delay}`
              : 'transition-delay-0',
            toUseNarrow ? 'pointer-events-none' : 'pointer-events-auto',
            toUseNarrow ? 'opacity-0' : 'opacity-100'
          )}
        >
          actions
        </div>
        {/* icons */}
        <Icons releaseBranch={releaseBranch} theme={theme} />
      </div>
    </div>
  )
}

export default TopRow

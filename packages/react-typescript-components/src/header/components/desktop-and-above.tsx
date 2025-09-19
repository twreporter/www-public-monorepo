import { useContext, useRef, type FC } from 'react'
import clsx from 'clsx'
import { CSSTransition } from 'react-transition-group'
// context
import { HeaderContext } from '../context'
// constants
import { ZIndex } from '../constants/z-index'
import { ANIMATION } from '../constants/animation'
// compontents
import TopRow from './top-row'
import Channel from './channels'
import Divider from '../../divider'
// type
import type { LogoType } from '../../logo/enum'
type DesktopAndAboveProps = {
  topRowBgColor: string
  logoType: LogoType
}
const DesktopAndAbove: FC<DesktopAndAboveProps> = ({
  topRowBgColor,
  logoType,
}) => {
  const { toUseNarrow } = useContext(HeaderContext)
  const channelRef = useRef<HTMLDivElement>(null)
  return (
    <div className="hidden desktop:flex desktop:flex-col">
      <TopRow topRowBgColor={topRowBgColor} logoType={logoType} />
      {/* divider */}
      <div
        className={clsx(
          `transition-opacity duration-[${ANIMATION.step2Duration}]`,
          toUseNarrow ? 'opacity-0' : 'opacity-100',
          toUseNarrow
            ? 'transition-delay-0'
            : `transition-delay-${ANIMATION.step2Delay}`
        )}
      >
        <Divider direction={Divider.Direction.horizontal} />
      </div>
      {/* channels */}
      <div className={`${ZIndex.channel}`}>
        <CSSTransition
          in={!toUseNarrow}
          nodeRef={channelRef}
          classNames={{
            enter: `opacity-0 -translate-y-full`,
            enterActive: `transition-all ease-linear duration-${ANIMATION.step1Duration} delay-${ANIMATION.step2Delay} opacity-100 translate-y-0`,
            exit: `opacity-100 translate-y-0`,
            exitActive: `transition-all ease-linear duration-${ANIMATION.step1Duration} -translate-y-full`,
          }}
          timeout={{ appear: 0, enter: 350, exit: 200 }}
          unmountOnExit
        >
          <div ref={channelRef}>
            <Channel />
          </div>
        </CSSTransition>
      </div>
    </div>
  )
}

export default DesktopAndAbove

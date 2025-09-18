import type React from 'react'
import clsx from 'clsx'

// constants
import { ZIndex } from '../constants/z-index'
// logo
import { LogoHeader } from '../../logo'
import type { LogoType } from '../../logo/enum'

type TabletAndBelowProps = {
  topRowBgColor: string
  logoType: LogoType
}
const TabletAndBelow: React.FC<TabletAndBelowProps> = ({
  topRowBgColor,
  logoType,
}) => {
  return (
    <div
      className={clsx(
        `flex items-center justify-between z-[${ZIndex.topRow}] py-[16px] ${topRowBgColor}`,
        'desktop:hidden'
      )}
    >
      {/* logo */}
      <a href="/" className="flex items-center">
        <LogoHeader type={logoType} className="h-[21px]" />
      </a>
      {/* actions */}
      <div className="flex flex-row items-center gap-[24px]">
        <div>贊助</div>
        <div>登入</div>
      </div>
    </div>
  )
}

export default TabletAndBelow

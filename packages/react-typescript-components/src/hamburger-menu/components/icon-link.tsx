import { useContext, type FC } from 'react'
import clsx from 'clsx'
// context
import { HeaderContext } from '../../header/context'
// theme
import { THEME } from '../../constants/theme'
// utils
import { selectHamburgerFooterTheme } from '../utils/theme'
// icon
import { Icon } from '../../icons'
// text
import { P2 } from '../../text/paragraph'

type IconLinkProps = {
  label: string
  icon: string
  to: string
  target: string
}
const IconLink: FC<IconLinkProps> = ({ label, icon, to, target }) => {
  const { theme, releaseBranch } = useContext(HeaderContext)
  const footerTheme = theme === THEME.transparent ? THEME.normal : theme
  const {
    color,
    hoverColor,
    hoverBgColor,
    svgHoverBgColor,
    svgBgColor,
    activeColor,
    activeBgColor,
    svgActiveBgColor,
  } = selectHamburgerFooterTheme(footerTheme)
  return (
    <a href={to} target={target} rel="noreferrer noopener">
      <div
        className={clsx(
          'py-[8px] px-[32px] flex items-center',
          '[&>svg]:h-[18px] [&>svg]:w-[18px] [&>svg]:mr-[4px]',
          color,
          hoverColor,
          hoverBgColor,
          svgHoverBgColor,
          svgBgColor,
          activeColor,
          activeBgColor,
          svgActiveBgColor
        )}
      >
        <Icon filename={icon} releaseBranch={releaseBranch} />
        <P2 text={label} />
      </div>
    </a>
  )
}

export default IconLink

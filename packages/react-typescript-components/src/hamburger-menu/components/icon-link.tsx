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
// link
import { ExternalLink, InternalLink } from '../../customized-link'
import type { LinkTarget } from '../../customized-link/type'

type IconLinkProps = {
  label: string
  icon: string
  to: string
  target: LinkTarget
}
const IconLink: FC<IconLinkProps> = ({ label, icon, to, target }) => {
  const { theme, releaseBranch, isLinkExternal } = useContext(HeaderContext)
  const footerTheme = theme === THEME.transparent ? THEME.normal : theme
  const LinkComponent = isLinkExternal ? ExternalLink : InternalLink
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
    <LinkComponent to={to} target={target}>
      <div
        className={clsx(
          'py-[8px] px-[32px] flex items-center',
          '[&_svg]:h-[18px] [&_svg]:w-[18px] [&_svg]:mr-[4px]',
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
    </LinkComponent>
  )
}

export default IconLink

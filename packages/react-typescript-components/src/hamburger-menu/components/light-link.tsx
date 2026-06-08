import { useContext, type FC } from 'react'
import clsx from 'clsx'
// context
import { HeaderContext } from '../../header/context'
// theme
import { THEME } from '../../constants/theme'
// utils
import { selectHamburgerFooterTheme } from '../utils/theme'
// text
import { P2 } from '../../text/paragraph'
// link
import { ExternalLink, InternalLink } from '../../customized-link'
import type { LinkTarget } from '../../customized-link/type'

type IconLinkProps = {
  label: string
  to: string
  target: LinkTarget
}
const IconLink: FC<IconLinkProps> = ({ label, to, target }) => {
  const { theme, isLinkExternal } = useContext(HeaderContext)
  const footerTheme = theme === THEME.transparent ? THEME.normal : theme
  const { color, hoverColor, hoverBgColor, activeColor, activeBgColor } =
    selectHamburgerFooterTheme(footerTheme)
  const LinkComponent = isLinkExternal ? ExternalLink : InternalLink
  return (
    <LinkComponent to={to} target={target}>
      <div
        className={clsx(
          'py-[8px] px-[32px] flex items-center',
          '[&_svg]:h-[18px] [&_svg]:w-[18px] [&_svg]:mr-[4px]',
          color,
          hoverColor,
          hoverBgColor,
          activeColor,
          activeBgColor
        )}
      >
        <P2 text={label} />
      </div>
    </LinkComponent>
  )
}

export default IconLink

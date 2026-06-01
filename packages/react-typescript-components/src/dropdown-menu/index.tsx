import { useContext, type FC } from 'react'
import clsx from 'clsx'
// context
import { HeaderContext } from '../header/context'
// text
import { P1 } from '../text/paragraph'
// icons
import { Arrow } from '../icons'
// theme
import { selectHamburgerItemTheme } from '../hamburger-menu/utils/theme'
// components
import DropdownMenuItem from './dropdown-menu-item'
// link
import { ExternalLink, InternalLink } from '../customized-link'
import type { LinkTarget } from '../customized-link/type'

type DropdownMenuProps = {
  text?: string
  isActive?: boolean
  dropdownItems: { label: string; to: string; target: LinkTarget }[]
}
const DropdownMenu: FC<DropdownMenuProps> = ({
  text = '',
  isActive = false,
  dropdownItems = [],
}) => {
  const { theme, releaseBranch, isLinkExternal } = useContext(HeaderContext)
  const { color, svgBgColor, hoverBgColor, activeBgColor } =
    selectHamburgerItemTheme(theme, isActive)
  const LinkComponent = isLinkExternal ? ExternalLink : InternalLink
  return (
    <>
      <div
        className={clsx(
          'flex items-center justify-between cursor-pointer py-[8px] px-[32px]',
          '[&_svg]:transition-all [&_svg]:duration-300',
          svgBgColor,
          color,
          hoverBgColor,
          isActive ? `[&_svg]:-rotate-[180deg]` : '[&_svg]:rotate-[0deg]',
          isActive ? activeBgColor : ''
        )}
      >
        <P1 text={text} weight={P1.Weight.bold} />
        <Arrow direction="down" releaseBranch={releaseBranch} />
      </div>
      <div
        className={clsx(
          'overflow-hidden transition-all duration-300 ease-in-out',
          isActive ? 'max-h-[300px]' : 'max-h-0'
        )}
      >
        {dropdownItems.map((itme) => {
          return (
            <LinkComponent to={itme.to} target={itme.target} key={itme.label}>
              <DropdownMenuItem label={itme.label} />
            </LinkComponent>
          )
        })}
      </div>
    </>
  )
}

export { DropdownMenu }

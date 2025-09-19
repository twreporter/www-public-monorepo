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

type DropdownMenuProps = {
  text?: string
  isActive?: boolean
  dropdownItems: { label: string; to: string; target: string }[]
}
const DropdownMenu: FC<DropdownMenuProps> = ({
  text = '',
  isActive = false,
  dropdownItems = [],
}) => {
  const { theme, releaseBranch } = useContext(HeaderContext)
  const { color, svgBgColor, hoverBgColor, activeBgColor } =
    selectHamburgerItemTheme(theme, isActive)
  return (
    <>
      <div
        className={clsx(
          'flex items-center justify-between cursor-pointer py-[8px] px-[32px]',
          '[&>svg]:transition-all [&>svg]:duration-300',
          svgBgColor,
          color,
          hoverBgColor,
          isActive ? `[&>svg]:-rotate-[180deg]` : '[&>svg]:rotate-[0deg]',
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
            <a
              href={itme.to}
              target={itme.target}
              key={itme.label}
              rel={
                itme.target === '_blank' ? 'noopener noreferrer' : 'noreferrer'
              }
            >
              <DropdownMenuItem label={itme.label} />
            </a>
          )
        })}
      </div>
    </>
  )
}

export { DropdownMenu }

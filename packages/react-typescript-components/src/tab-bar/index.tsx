import { useContext, type FC } from 'react'
import clsx from 'clsx'
// context
import { HamburgerContext, HeaderContext } from '../header/context'
// z-index
import { ZIndex } from '../header/constants/z-index'
// button
import { IconWithTextButton } from '../button'
// icons
import { Hamburger } from '../icons'
// theme
import { THEME } from '../constants/theme'
import { selectTabBarTheme } from './theme'
// constants
import { TabBarItems } from './constants'
// links
import { InternalLink, ExternalLink } from '../customized-link'
// lodash
import map from 'lodash/map'
const _ = {
  map,
}

type TabBarProps = {
  className?: string
}
const TabBar: FC<TabBarProps> = ({ className = '' }) => {
  const { theme, releaseBranch, isLinkExternal, pathname } =
    useContext(HeaderContext)
  const { toggleHamburger, isHamburgerMenuOpen } = useContext(HamburgerContext)
  const { bgColor } = selectTabBarTheme(theme)
  const iconTheme = theme === THEME.photography ? theme : THEME.normal
  const LinkComponent = isLinkExternal ? ExternalLink : InternalLink
  return (
    <div
      className={clsx(
        'w-screen fixed left-0 bottom-0 flex justify-between px-[16px] pt-[8px] pb-[calc(8px+env(safe-area-inset-bottom,0))] shadow-[0_0_2px_rgba(0,0,0,0.15)]',
        'desktop:hidden',
        bgColor,
        ZIndex.tabBarMobile,
        ZIndex.tabBarTablet,
        className
      )}
    >
      {_.map(TabBarItems(releaseBranch), (item) => {
        const isActive = pathname === item.link
        return (
          <LinkComponent
            key={item.text}
            to={item.link}
            target={item.target}
            className="flex justify-center flex-1"
          >
            <IconWithTextButton
              text={item.text}
              iconComponent={item.icon}
              theme={iconTheme}
              active={isActive}
            />
          </LinkComponent>
        )
      })}
      <IconWithTextButton
        text="選單"
        iconComponent={Hamburger(releaseBranch)}
        className="flex justify-center flex-1"
        onClick={toggleHamburger}
        active={isHamburgerMenuOpen}
        theme={iconTheme}
      />
    </div>
  )
}
export default TabBar

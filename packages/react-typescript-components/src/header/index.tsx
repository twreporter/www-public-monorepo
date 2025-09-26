import { useRef, useState, useCallback, useEffect, type FC } from 'react'
import clsx from 'clsx'

// constants
import { THEME, type Theme } from '../constants/theme'
import type { ReleaseBranch } from '../constants/release-branch'
import { ZIndex } from './constants/z-index'
// components
import DesktopAndAbove from './components/desktop-and-above'
import TabletAndBelow from './components/tablet-and-below'
// context
import {
  HeaderContext,
  HamburgerContext,
  type HamburgerContextType,
} from './context'
// utils
import { selectHeaderTheme, selectLogoType } from './utils/theme'
// hamburger menu
import HamburgerMenu from '../hamburger-menu'
// tab bar
import TabBar from '../tab-bar'

const HIDE_HEADER_THRESHOLD = 8
const TRANSFORM_HEADER_THRESHOLD = 40
const TRANSFORM_TIMEOUT = 800

type HeaderProps = {
  releaseBranch: ReleaseBranch
  isLinkExternal: boolean
  theme: Theme
  pathname: string
  referrerPath: string
  hamburgerContext: HamburgerContextType
}
const Header: FC<HeaderProps> = ({
  releaseBranch,
  isLinkExternal,
  theme,
  pathname,
  referrerPath,
  hamburgerContext,
}) => {
  const isAuthed = false

  const { bgColor, topRowBgColor } = selectHeaderTheme(theme)
  const logoType = selectLogoType(theme)

  const { isHamburgerMenuOpen } = hamburgerContext

  const [toUseNarrow, setToUseNarrow] = useState(false)
  const [hideHeader, setHideHeader] = useState(false)

  // TODO: get isAuthed from redux
  // const isAuthed = useSelector(state => _.get(state, 'auth.isAuthed', false))

  const lastKnownPageYOffset = useRef(0)
  const ticking = useRef(false)
  const currentY = useRef(0)
  const readyY = useRef(0)
  const isTransforming = useRef(false)
  const transformTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const getScrollState = useCallback(
    (scrollTop: number, scrollDirection: 'up' | 'down') => {
      const isCurrentNarrow = toUseNarrow
      const nextToUseNarrow = scrollTop > TRANSFORM_HEADER_THRESHOLD
      const scrollState = { toUseNarrow, hideHeader }

      if (isTransforming.current) {
        return scrollState
      }

      if (scrollDirection === 'up') {
        readyY.current = scrollTop
        scrollState.hideHeader = false
      }

      if (scrollDirection === 'down') {
        if (
          isCurrentNarrow &&
          scrollTop - readyY.current > HIDE_HEADER_THRESHOLD
        ) {
          scrollState.hideHeader = true
        }
      }

      if (isCurrentNarrow) {
        scrollState.toUseNarrow =
          scrollDirection === 'down' ? true : nextToUseNarrow
      } else {
        scrollState.toUseNarrow =
          scrollDirection === 'up' ? false : nextToUseNarrow
      }

      if (isCurrentNarrow !== scrollState.toUseNarrow) {
        if (!transformTimer.current) {
          isTransforming.current = true
          transformTimer.current = setTimeout(() => {
            isTransforming.current = false
            readyY.current = currentY.current
            transformTimer.current = null
          }, TRANSFORM_TIMEOUT)
        }
      }

      return scrollState
    },
    [toUseNarrow, hideHeader]
  )

  const updateScrollState = useCallback(
    (currentScrollTop: number) => {
      const scrollDirection =
        currentScrollTop > currentY.current ? 'down' : 'up'
      currentY.current = currentScrollTop
      const updateState = getScrollState(currentScrollTop, scrollDirection)
      setToUseNarrow(() => updateState.toUseNarrow)
      setHideHeader(() => updateState.hideHeader)
    },
    [getScrollState]
  )

  const handleScroll = useCallback(() => {
    lastKnownPageYOffset.current = window.pageYOffset
    if (!ticking.current) {
      window.requestAnimationFrame(() => {
        updateScrollState(lastKnownPageYOffset.current)
        ticking.current = false
      })
      ticking.current = true
    }
  }, [updateScrollState])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  return (
    <HeaderContext
      value={{
        releaseBranch,
        isLinkExternal,
        isAuthed,
        theme,
        pathname,
        referrerPath,
        toUseNarrow,
        hideHeader,
      }}
    >
      <HamburgerContext value={hamburgerContext}>
        <header
          className={clsx(
            `w-full top-0 transition-transform duration-300 ${bgColor} z-10`,
            theme === THEME.transparent ? 'fixed' : 'sticky',
            hideHeader ? 'ease-in' : 'ease-out',
            hideHeader ? '-translate-y-full' : 'translate-y-0'
          )}
        >
          <div
            className={clsx(
              `flex flex-col mx-auto px-[24px] ${ZIndex.header}`,
              'tablet:px-[32px]',
              'desktop:px-[48px]',
              'hd:w-[1280px] hd:px-0'
            )}
          >
            <DesktopAndAbove
              topRowBgColor={topRowBgColor}
              logoType={logoType}
            />
            <TabletAndBelow topRowBgColor={topRowBgColor} logoType={logoType} />
          </div>
        </header>
        <div
          className={clsx(
            `fixed top-0 left-0 ${ZIndex.hamburger} transition-transform duration-300 ease-in-out`,
            isHamburgerMenuOpen
              ? 'translate-x-0 opacity-100'
              : '-translate-x-full opacity-100',
            'tablet:-left-[320px]',
            isHamburgerMenuOpen
              ? 'tablet:translate-x-[320px] tablet:opacity-100'
              : 'tablet:-translate-x-[320px] tablet:opacity-100',
            'desktop:-left-[280px]',
            isHamburgerMenuOpen
              ? 'desktop:translate-x-[280px] desktop:opacity-100'
              : 'desktop:-translate-x-[280px] desktop:opacity-100'
          )}
        >
          <HamburgerMenu />
        </div>
        <TabBar />
      </HamburgerContext>
    </HeaderContext>
  )
}

export default Header

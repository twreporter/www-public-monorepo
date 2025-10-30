'use client'
import { useState, useContext } from 'react'
import { usePathname } from 'next/navigation'
// @twreporter
import Header from '@twreporter/react-typescript-components/lib/header'
// hooks
import { usePrevious } from '@/hooks'
// contexts
import { BaseContext } from '@/contexts'

const UniversalHeader = () => {
  const { releaseBranch } = useContext(BaseContext)
  const pathname = usePathname()
  const prevLocation = usePrevious(pathname)
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false)
  const toggleHamburger = () => {
    setIsHamburgerMenuOpen((v) => !v)
  }
  const closeHamburgerMenu = () => {
    setIsHamburgerMenuOpen(false)
  }
  const hamburgerContext = {
    isHamburgerMenuOpen,
    toggleHamburger,
    closeHamburgerMenu,
  }
  return (
    <Header
      hamburgerContext={hamburgerContext}
      releaseBranch={releaseBranch}
      theme="normal"
      isLinkExternal={false}
      pathname={pathname}
      referrerPath={prevLocation || ''}
    />
  )
}
export default UniversalHeader

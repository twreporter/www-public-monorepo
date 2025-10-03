'use client'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Header from '@twreporter/react-typescript-components/lib/header'
// hooks
import { usePrevious } from '@/hooks'

const UniversalHeader = () => {
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
      releaseBranch="master"
      theme="normal"
      isLinkExternal={false}
      pathname={pathname}
      referrerPath={prevLocation || ''}
    />
  )
}
export default UniversalHeader

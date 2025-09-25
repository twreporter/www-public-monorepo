'use client'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Header from '@twreporter/react-typescript-components/lib/header'

const UniversalHeader = () => {
  const pathname = usePathname()
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false)
  const toggleHamburger = () => {
    setIsHamburgerMenuOpen(!isHamburgerMenuOpen)
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
      referrerPath=""
    />
  )
}
export default UniversalHeader

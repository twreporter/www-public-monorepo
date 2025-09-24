'use client'
import { useState } from 'react'
import Header from '@twreporter/react-typescript-components/lib/header'

const UniversalHeader = () => {
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
      pathname=""
      referrerPath=""
    />
  )
}
export default UniversalHeader

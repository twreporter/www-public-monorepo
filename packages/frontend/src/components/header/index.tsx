'use client'
import { useState } from 'react'
import Header from '@twreporter/react-typescript-components/lib/header'

const UniversalHeader = () => {
  const [isHamburgerMenuOpen, setIsHamurgerMenuOpen] = useState(false)
  const toggleHamburger = () => {
    setIsHamurgerMenuOpen(!isHamburgerMenuOpen)
  }
  const closeHamburgerMenu = () => {
    setIsHamurgerMenuOpen(false)
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

'use client'
import { useState, useContext, useEffect } from 'react'
import { usePathname } from 'next/navigation'
// @twreporter
import Header from '@twreporter/react-typescript-components/lib/header'
// contexts
import { BaseContext } from '@/contexts'

const UniversalHeader = () => {
  const { releaseBranch } = useContext(BaseContext)
  const pathname = usePathname()
  const [referrer, setReferrer] = useState('')
  useEffect(() => {
    setReferrer(document.referrer)
  }, [])
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
      referrerPath={referrer}
    />
  )
}
export default UniversalHeader

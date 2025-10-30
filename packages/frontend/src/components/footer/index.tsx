'use client'
import { useContext } from 'react'
// @twreporter
import Footer from '@twreporter/react-typescript-components/lib/footer'
// contexts
import { BaseContext } from '@/contexts'

const UniversalFooter = () => {
  const { releaseBranch } = useContext(BaseContext)
  return <Footer releaseBranch={releaseBranch} />
}
export default UniversalFooter

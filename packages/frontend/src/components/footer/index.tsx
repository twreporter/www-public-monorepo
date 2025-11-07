'use client'
import { useContext } from 'react'
// @twreporter
import Footer from '@twreporter/react-typescript-components/lib/footer'
// contexts
import { BaseContext } from '@/contexts'
// fetchers
import { useFooter } from '@/fetchers/footer'

const UniversalFooter = () => {
  const { releaseBranch } = useContext(BaseContext)
  const { footer, isLoading, isError } = useFooter()

  if (isLoading) {
    return null
  }

  if (isError || !footer) {
    return null
  }

  return (
    <Footer
      releaseBranch={releaseBranch}
      fundrasingId={footer.fundraisingID}
      fundrasingDateString={footer.fundraisingDateString}
      socialMediaLinks={footer.socialMediaLinks || []}
      buttonLinks={footer.footerLinks || [[], [], []]}
    />
  )
}
export default UniversalFooter

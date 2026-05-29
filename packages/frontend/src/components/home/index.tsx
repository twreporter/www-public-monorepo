'use client'
import clsx from 'clsx'
// styles
import { rwdGridOuterClass, rwdGridContainerClass } from '@/styles/layout'
// components
import { LatestSection } from '@/components/home/components/latest-section'
import { EditorPicksSection } from '@/components/home/components/editor-picks-section'

export const Home = () => {
  return (
    <div className={clsx(rwdGridOuterClass)}>
      <div className={clsx(rwdGridContainerClass)}>
        <LatestSection />
        <EditorPicksSection />
      </div>
    </div>
  )
}

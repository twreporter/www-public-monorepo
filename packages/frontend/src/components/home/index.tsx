'use client'
import clsx from 'clsx'
// styles
import { rwdGridOuterClass, rwdGridContainerClass } from '@/styles/layout'
// components
import { LatestSection } from '@/components/home/components/latest-section'
import { EditorPicksSection } from '@/components/home/components/editor-picks-section'
import { LatestTopicSection } from '@/components/home/components/latest-topic-section'
// fake data
import { fakeLatestTopicSectionData } from '@/components/home/fake-data'

export const Home = () => {
  return (
    <div className={clsx(rwdGridOuterClass)}>
      <div className={clsx(rwdGridContainerClass)}>
        <LatestSection />
        <EditorPicksSection />
        <LatestTopicSection {...fakeLatestTopicSectionData} />
      </div>
    </div>
  )
}

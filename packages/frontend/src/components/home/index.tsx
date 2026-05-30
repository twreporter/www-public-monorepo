'use client'
import clsx from 'clsx'
// styles
import { rwdGridOuterClass, rwdGridContainerClass } from '@/styles/layout'
// components
import { LatestSection } from '@/components/home/components/latest-section'
import { EditorPicksSection } from '@/components/home/components/editor-picks-section'
import { LatestTopicSection } from '@/components/home/components/latest-topic-section'
// fake data
import {
  fakeLatestSectionData,
  fakeEditorPickSectionData,
  fakeLatestTopicSectionData,
} from '@/components/home/fake-data'

// TODO: replace with real data and remove fake data after API is ready
export const Home = () => {
  return (
    <div className={clsx(rwdGridOuterClass)}>
      <div className={clsx(rwdGridContainerClass)}>
        <LatestSection articles={fakeLatestSectionData} />
        <EditorPicksSection articles={fakeEditorPickSectionData} />
        <LatestTopicSection {...fakeLatestTopicSectionData} />
      </div>
    </div>
  )
}

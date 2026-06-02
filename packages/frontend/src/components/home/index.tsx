'use client'
import clsx from 'clsx'
import { useContext } from 'react'
// styles
import { rwdGridOuterClass, rwdGridContainerClass } from '@/styles/layout'
// components
import { LatestSection } from '@/components/home/components/latest-section'
import { EditorPicksSection } from '@/components/home/components/editor-picks-section'
import { LatestTopicSection } from '@/components/home/components/latest-topic-section'
import { HomePageBanner } from '@/components/home/components/banner'
import { ReviewSection } from '@/components/home/components/review-section'
// context
import { BaseContext } from '@/contexts'
// banner config
import {
  getBannerConfigs,
  BannerConfigTypes,
} from '@/components/home/components/banner/config'
// fake data
import {
  fakeLatestSectionData,
  fakeEditorPickSectionData,
  fakeLatestTopicSectionData,
  fakeReviewSectionData,
} from '@/components/home/fake-data'

// TODO: replace with real data and remove fake data after API is ready
export const Home = () => {
  const { releaseBranch } = useContext(BaseContext)
  const configs = getBannerConfigs(releaseBranch)
  return (
    <div className={clsx(rwdGridOuterClass)}>
      <div className={clsx(rwdGridContainerClass)}>
        <LatestSection articles={fakeLatestSectionData} />
        <EditorPicksSection articles={fakeEditorPickSectionData} />
        <LatestTopicSection {...fakeLatestTopicSectionData} />
        <HomePageBanner {...configs[BannerConfigTypes.DONATION]} />
        <ReviewSection articles={fakeReviewSectionData} />
        <HomePageBanner {...configs[BannerConfigTypes.KIDS_REPORTER]} />
        <HomePageBanner {...configs[BannerConfigTypes.PODCAST]} />
      </div>
    </div>
  )
}

'use client'
import clsx from 'clsx'
import { useContext, useRef, useState, useEffect, useCallback } from 'react'
// styles
import { rwdGridContainerClass } from '@/styles/layout'
// components
import { LatestSection } from '@/components/home/components/latest-section'
import { EditorPicksSection } from '@/components/home/components/editor-picks-section'
import { LatestTopicSection } from '@/components/home/components/latest-topic-section'
import { HomePageBanner } from '@/components/home/components/banner'
import { ReviewSection } from '@/components/home/components/review-section'
import { CategorySection } from '@/components/home/components/category-section'
import { TopicSection } from '@/components/home/components/topic-section'
import { PhotographySection } from '@/components/home/components/photography-section'
import { InfographicSection } from '@/components/home/components/infographic-section'
// context
import { BaseContext } from '@/contexts'
// react-typescript-components
import { P2 } from '@twreporter/react-typescript-components/lib/text/paragraph'
// constants
import { SECTION_NAME } from '@/components/home/constants'
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
  fakeCategorySectionData,
  fakeTopicSectionData,
  fakePhotographySectionData,
  fakeInfographicSectionData,
} from '@/components/home/fake-data'

type SectionKey = keyof typeof SECTION_NAME

// TODO: replace with real data and remove fake data after API is ready
export const Home = () => {
  const { releaseBranch } = useContext(BaseContext)
  const configs = getBannerConfigs(releaseBranch)

  const [activeSection, setActiveSection] = useState<SectionKey | null>(null)
  const sectionRefs = useRef<
    Partial<Record<SectionKey, HTMLDivElement | null>>
  >({})

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(
              entry.target.getAttribute('data-section') as SectionKey
            )
          }
        })
      },
      // Narrow the intersection zone to a band at the vertical center of the viewport
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    )

    const refs = sectionRefs.current
    Object.values(refs).forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = useCallback((key: SectionKey) => {
    sectionRefs.current[key]?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }, [])

  const isSectionActive = (key: SectionKey) => activeSection === key

  return (
    <div className="relative">
      <div className="absolute top-0 right-0 bottom-0 w-fit hidden tablet:block pointer-events-none desktop:right-[12px]">
        <div className="sticky top-1/2 -translate-y-1/2 z-10 pointer-events-auto">
          <div className="flex items-center [writing-mode:vertical-lr] [text-orientation:upright] gap-[20px]">
            {(Object.keys(SECTION_NAME) as SectionKey[]).map((key) => (
              <P2
                key={key}
                text={SECTION_NAME[key]}
                onClick={() => scrollToSection(key)}
                className={clsx(
                  'pt-[4px] pb-[4px]',
                  isSectionActive(key)
                    ? 'text-gray-white bg-brand-heavy'
                    : 'text-brand-heavy bg-transparent',
                  'transition-all duration-300 cursor-pointer'
                )}
              />
            ))}
          </div>
        </div>
      </div>
      <div className={clsx(rwdGridContainerClass, '!pb-0')}>
        <LatestSection articles={fakeLatestSectionData} />
        <div
          ref={(el) => {
            sectionRefs.current.editorPicks = el
          }}
          data-section="editorPicks"
          className="col-span-full tablet:grid tablet:grid-cols-subgrid"
        >
          <EditorPicksSection articles={fakeEditorPickSectionData} />
        </div>
        <div
          ref={(el) => {
            sectionRefs.current.latestTopic = el
          }}
          data-section="latestTopic"
          className="col-span-full tablet:grid tablet:grid-cols-subgrid"
        >
          <LatestTopicSection {...fakeLatestTopicSectionData} />
        </div>
        <HomePageBanner {...configs[BannerConfigTypes.DONATION]} />
        <div
          ref={(el) => {
            sectionRefs.current.review = el
          }}
          data-section="review"
          className="col-span-full tablet:grid tablet:grid-cols-subgrid"
        >
          <ReviewSection articles={fakeReviewSectionData} />
        </div>
        <HomePageBanner {...configs[BannerConfigTypes.KIDS_REPORTER]} />
        <div
          ref={(el) => {
            sectionRefs.current.category = el
          }}
          data-section="category"
          className="col-span-full tablet:grid tablet:grid-cols-subgrid"
        >
          <CategorySection meta={fakeCategorySectionData} />
        </div>
        <div
          ref={(el) => {
            sectionRefs.current.topic = el
          }}
          data-section="topic"
          className="col-span-full tablet:grid tablet:grid-cols-subgrid"
        >
          <TopicSection topics={fakeTopicSectionData} />
        </div>
        <HomePageBanner {...configs[BannerConfigTypes.PODCAST]} />
        <div
          ref={(el) => {
            sectionRefs.current.photography = el
          }}
          data-section="photography"
          className="col-span-full tablet:grid tablet:grid-cols-subgrid"
        >
          <PhotographySection articles={fakePhotographySectionData} />
        </div>
        <div
          ref={(el) => {
            sectionRefs.current.infographic = el
          }}
          data-section="infographic"
          className="col-span-full tablet:grid tablet:grid-cols-subgrid"
        >
          <InfographicSection articles={fakeInfographicSectionData} />
        </div>
      </div>
    </div>
  )
}

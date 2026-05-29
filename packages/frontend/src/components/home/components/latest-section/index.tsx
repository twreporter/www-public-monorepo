'use client'
import type { FC } from 'react'
import clsx from 'clsx'
// components
import { LatestSectionCard } from '@/components/home/components/latest-section/card'
// styles
import { rwdGridChildFullClass, rwdGridColGapClass } from '@/styles/layout'
// fake data
import { fakeLatestSectionData } from '@/components/home/fake-data'

const MobileCardCount = 2
const TabletCardCount = 4
const DesktopCardCount = 6

// TODO: replace with real data and remove fake data after API is ready
export const LatestSection: FC = () => {
  return (
    <div
      className={clsx(
        rwdGridChildFullClass,
        'pt-[16px] pb-[32px]',
        'grid grid-cols-2 gap-[24px]',
        'tablet:grid tablet:grid-cols-subgrid',
        ...rwdGridColGapClass
      )}
    >
      {fakeLatestSectionData.map((data, index) => (
        <div
          key={data.slug}
          className={clsx(
            index < MobileCardCount ? 'block' : 'hidden',
            index < TabletCardCount ? 'tablet:block' : 'tablet:hidden',
            index < DesktopCardCount ? 'desktop:block' : 'desktop:hidden',
            'tablet:col-span-3',
            'desktop:col-span-2'
          )}
        >
          <LatestSectionCard
            slug={data.slug}
            categoryLabel={data.categoryLabel}
            title={data.title}
            image={data.image}
          />
        </div>
      ))}
    </div>
  )
}

import type { ClassArray } from 'clsx'

export const rwdContainerClass: ClassArray = [
  'min-h-screen w-full tablet:max-w-[698px] desktop:max-w-[922px] hd:max-w-[1130px]',
  'pt-[24px] tablet:pt-[32px] desktop:pt-[64px]',
  'pb-[120px]',
]

/**
 * <div className={rwdGridOuterClass}>
      <div className={rwdGridContainerClass}>
        <div className={rwdGridInnerClass}>
          <div className={rwdGridChildFullClass}>
            ...
          </div>
        </div>
      </div>
    </div>
 */
/** Outermost shell — clips overflow for the 12-col grid pages */
export const rwdGridOuterClass: ClassArray = ['w-full overflow-hidden']

/** 12-col grid container with responsive gutters and max-width at hd */
export const rwdGridContainerClass: ClassArray = [
  'w-full px-[24px] pb-[120px]',
  'tablet:grid tablet:grid-cols-12 tablet:gap-x-[24px] tablet:px-[32px]',
  'desktop:gap-x-[32px] desktop:px-[48px]',
  'hd:w-[1280px] hd:mx-auto hd:px-0',
]

/** Inner content column spanning cols 2–11 on tablet+ */
export const rwdGridInnerClass: ClassArray = [
  'w-full flex flex-col',
  'tablet:grid tablet:grid-cols-subgrid tablet:col-start-2 tablet:col-end-12',
]

/** Full-width child inside rwdGridInnerClass — spans all 10 inherited columns */
export const rwdGridChildFullClass: ClassArray = ['tablet:col-span-full']

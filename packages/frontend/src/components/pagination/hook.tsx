import { useMemo, type JSX } from 'react'
import clsx from 'clsx'

// style
const pageButtonBase = [
  'mx-[5px] size-[28px] tablet:size-[28px]',
  'inline-flex items-center justify-center',
  'rounded-full border border-solid',
  'text-[14px] user-select-none relative cursor-pointer'
]
const pageButtonDefault =
  clsx(pageButtonBase, 'border-supportive-heavy text-supportive-heavy')
const pageButtonCurrent = clsx(
  pageButtonBase,
  'border-supportive-heavy bg-supportive-heavy text-gray-white'
)

const ellipsisClass = clsx(
  'mx-[5px]',
  'py-[10px] px-[6px]',
  'cursor-default select-none text-supportive-heavy',
  // hide on mobile
  'hidden tablet:inline-flex'
)

/*
Pages Array:

           left-range
          |-----------|
                 right-range
                |-----------|
        < 1  2  3 4[5]6  7  8  >
        < 1  2  3 4[5]6 ... 9  >
        < 1 ... 4[5]6 7  8  9  >
        < 1 ... 24[25]26 27 ... 30 >
        < 1 ... 25[26]27 28 29  30 >
        < 1 ... 4[5]6 7 ... 30 >
         |-|               |-|
     left-margin          right-margin
                |-----|
                 center
            |-|         |-|
      left-ellipsis  right-ellipsis

  let margin = x, center = y
  pages array length = 2x + y + 2
*/

export const buildRangeButtons = (
  start: number,
  length: number,
  currentPage: number,
  onClick: (p: number) => void
) => {
  const end = start + length - 1
  const btns: JSX.Element[] = []
  for (let p = start; p <= end; p += 1) {
    const isCurrent = p === currentPage
    btns.push(
      <button
        key={`page-${p}`}
        type="button"
        className={isCurrent ? pageButtonCurrent : pageButtonDefault}
        aria-current={isCurrent ? 'page' : undefined}
        aria-label={isCurrent ? `Page ${p}, current page` : `Go to page ${p}`}
        onClick={() => onClick(p)}
      >
        <span className="leading-none">{p}</span>
      </button>
    )
  }
  return btns
}

/**
 * Desktop/Tablet pagination:
 * Matches the original logic:
 * - show all if total <= (nCenter + (nMargin + 1) * 2)
 * - otherwise show left/right margins, center window, and left/right ellipses as needed
 */
export const useDesktopPages = (
  currentPage: number,
  totalPages: number,
  nOfMarginPages: number,
  nOfCenterPages: number,
  ellipsis: string,
  onPage: (p: number) => void
) =>
  useMemo(() => {
    const pagesArrayMaxLength = nOfCenterPages + (nOfMarginPages + 1) * 2

    if (totalPages <= pagesArrayMaxLength) {
      return buildRangeButtons(1, totalPages, currentPage, onPage)
    }

    const inLeftRange = currentPage <= nOfMarginPages + nOfCenterPages
    const inRightRange = currentPage > totalPages - nOfMarginPages - nOfCenterPages

    const leftMargin = buildRangeButtons(1, nOfMarginPages, currentPage, onPage)
    const rightMarginStart = totalPages - nOfMarginPages + 1
    const rightMargin = buildRangeButtons(
      rightMarginStart,
      nOfMarginPages,
      currentPage,
      onPage
    )

    const leftEllipsis = (
      <span key="left-ellipsis" className={ellipsisClass}>
        {ellipsis}
      </span>
    )
    const rightEllipsis = (
      <span key="right-ellipsis" className={ellipsisClass}>
        {ellipsis}
      </span>
    )

    if (inLeftRange) {
      const startAt = nOfMarginPages + 1
      const length = nOfCenterPages + 1
      return [
        ...leftMargin,
        ...buildRangeButtons(startAt, length, currentPage, onPage),
        rightEllipsis,
        ...rightMargin,
      ]
    }

    if (inRightRange) {
      const startAt = totalPages - nOfMarginPages - nOfCenterPages
      const length = nOfCenterPages + 1
      return [
        ...leftMargin,
        leftEllipsis,
        ...buildRangeButtons(startAt, length, currentPage, onPage),
        ...rightMargin,
      ]
    }

    const startAt = currentPage - Math.floor(nOfCenterPages / 2) + 1
    const length = nOfCenterPages
    return [
      ...leftMargin,
      leftEllipsis,
      ...buildRangeButtons(startAt, length, currentPage, onPage),
      rightEllipsis,
      ...rightMargin,
    ]
  }, [currentPage, totalPages, nOfMarginPages, nOfCenterPages, ellipsis, onPage])

/** Mobile pagination: always a 5-slot window centered on current when possible */
export const useMobilePages = (
  currentPage: number,
  totalPages: number,
  onPage: (p: number) => void
) =>
  useMemo(() => {
    const windowSize = 5
    if (totalPages <= windowSize) {
      return buildRangeButtons(1, totalPages, currentPage, onPage)
    }
    let start: number
    if (currentPage <= 2) start = 1
    else if (currentPage >= totalPages - 1) start = totalPages - windowSize + 1
    else start = currentPage - 2

    return buildRangeButtons(start, windowSize, currentPage, onPage)
  }, [currentPage, totalPages, onPage])
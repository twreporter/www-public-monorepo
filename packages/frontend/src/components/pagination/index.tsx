import { type FC, useCallback } from 'react'
import clsx from 'clsx'
// component
import { PageUpIcon, PageDownIcon } from '@/components/pagination/icon'
// hook
import { useDesktopPages, useMobilePages } from './hook'

type PaginationProps = {
  currentPage: number
  totalPage: number
  /** number of pages shown near the ends (left/right margins) on tablet+ */
  nOfMarginPages?: number
  /** number of pages in the middle window (not counting the current page’s extra in 2-1 / 2-2 cases) on tablet+ */
  nOfCenterPages?: number
  /** ellipsis text, default "…" */
  ellipsis?: string
  handleClickPage: (page: number) => void
  handleClickPrev: () => void
  handleClickNext: () => void
  className?: string
}

const containerClass = (className?: string) =>
  clsx(
    'h-[36px] tablet:h-[28px]',
    'mx-auto text-center',
    'mt-[32px] mb-[64px] tablet:mt-[64px] tablet:mb-[120px]',
    'flex items-center justify-center',
    'font-default',
    className
  )

const boxesRowClass = 'flex justify-center items-center'

const iconButtonClass = (hidden: boolean) =>
  clsx(
    'size-[36px] tablet:size-[28px]',
    'mx-[20px]',
    'cursor-pointer select-none inline-flex items-center justify-center',
    hidden ? 'invisible' : 'visible'
  )

const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPage,
  handleClickPrev,
  handleClickNext,
  handleClickPage,
  nOfCenterPages = 4,
  nOfMarginPages = 1,
  ellipsis = '…',
  className = '',
}) => {
  const belowFirst = currentPage <= 1
  const aboveLast = currentPage >= totalPage

  const onPage = useCallback(
    (p: number) => handleClickPage(p),
    [handleClickPage]
  )

  const desktopPages = useDesktopPages(
    currentPage,
    totalPage,
    nOfMarginPages,
    nOfCenterPages,
    ellipsis,
    onPage
  )
  const mobilePages = useMobilePages(currentPage, totalPage, onPage)

  if (!currentPage || !totalPage) {
    return <div className={containerClass(className)} />
  }

  return (
    <nav className={containerClass(className)} aria-label="Pagination">
      <div className={boxesRowClass}>
        {/* Prev */}
        <button
          type="button"
          key="prev-btn"
          className={iconButtonClass(belowFirst)}
          onClick={handleClickPrev}
          aria-label="Go to previous page"
          disabled={belowFirst}
        >
          <PageUpIcon className="size-[36px] tablet:size-[28px]" />
        </button>

        {/* Desktop/Tablet pages with ellipses */}
        <div className="hidden tablet:flex">{desktopPages}</div>

        {/* Mobile 5-slot window */}
        <div className="flex tablet:hidden!">{mobilePages}</div>

        {/* Next */}
        <button
          type="button"
          key="next-btn"
          className={iconButtonClass(aboveLast)}
          onClick={handleClickNext}
          aria-label="Go to next page"
          disabled={aboveLast}
        >
          <PageDownIcon className="size-[36px] tablet:size-[28px]" />
        </button>
      </div>
    </nav>
  )
}

export default Pagination

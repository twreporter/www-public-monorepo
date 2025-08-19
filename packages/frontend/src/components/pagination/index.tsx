import type { FC } from 'react'
import clsx from 'clsx'
// component
import { PageUpIcon, PageDownIcon } from '@/components/pagination/icon'

// style
const getContainerClass = (className: string) => clsx(
  `h-[36px] tablet:h-[28px]`,
  `mt-[32px] md-[64px] tablet:mt-[64px] tablet:md-[120px]`,
  'flex flex-row justify-center items-center',
  'text-center',
  className,
)

const getBtnClass = (isHidden: boolean) => {
  return clsx(
    'size-[36px] tablet:size-[28px]',
    'mx-[20px]',
    'cursor-pointer',
    {
      visible: !isHidden,
      invisible: isHidden,
    }
  )
}

const pageNumberClass = clsx(
  'bg-supportive-heavy text-gray-white',
  'rounded-[50%]',
  'border border-supportive-heavy border-solid',
  'size-[36px] tablet:size-[28px]',
  'flex justify-center items-center',
  'mx-[4px]'
)

const iconClass = "size-[36px] tablet:size-[28px]"

type PaginationProps = {
  currentPage: number
  totalPage: number
  handleClickPrev: () => void
  handleClickNext: () => void
  className?: string
}
const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPage,
  handleClickPrev,
  handleClickNext,
  className = '',
}) => {
  if (!currentPage || !totalPage) {
    return null
  }

  return (
    <div className={getContainerClass(className)}>
      <button className={getBtnClass(currentPage <= 1)} onClick={handleClickPrev} key="prev-btn" type="button">
        <PageUpIcon className={iconClass} />
      </button>
      <div className={pageNumberClass}>{currentPage}</div>
      <button className={getBtnClass(currentPage >= totalPage)} onClick={handleClickNext} key="next-btn" type="button">
        <PageDownIcon className={iconClass} />
      </button>
    </div>
  )
}

export default Pagination
'use client'

import { type FC, useState, useMemo } from 'react'
import clsx from 'clsx'
// fetcher
import usePostsOfATag from '@/fetchers/tag'
// components
import ArticleCard from '@/components/article-card'
import Pagination from '@/components/pagination'
import Loading from '@/components/loading'
// @twreporter
import { Title1 } from '@twreporter/react-typescript-components/lib/title-bar'
// lodash
import { ceil } from 'lodash'
const _ = {
  ceil,
}

// style
const containerClass = clsx(
  'min-h-screen w-full',
  'px-[24px] mobile:pt-[24px] tablet:pt-[32px] desktop:pt-[64px]',
  'pb-[120px]'
)

const listClass = clsx(
  'mt-[45px]',
  `grid grid-cols-1 tablet:grid-cols-2 gap-x-[20px] gap-y-[40px]`,
)

type TagPageProps = {
  slug: string
  name: string
  totalPosts: number
}
const TagPage: FC<TagPageProps> = ({
  slug,
  name,
  totalPosts,
}) => {
  const [page, setPage] = useState(1)

  const totalPage = useMemo(() => _.ceil(totalPosts/1), [totalPosts])
  const { posts, isLoading } = usePostsOfATag(
    {
      slug,
      take: 1,
      skip: (page - 1)*1
    },
  ) // todo: error

  const handleClickPrev = () => {
    setPage(() => page - 1)
  }

  const handleClickNext = () => {
    setPage(() => page + 1)
  }
  console.log('current page', page, totalPage)

  return (
    <div className={containerClass}>
      <Title1 title={`# ${name}`} />
      { posts.length === 0 && isLoading ? <Loading /> : (
        <div className={listClass}>
          { posts.map(({ slug, ...rest}) => <ArticleCard key={`meta-a-${slug}`} slug={slug} {...rest} />) }
        </div>
      )}
      <Pagination
        className="w-full flex justify-center items-center"
        currentPage={page}
        totalPage={totalPage}
        handleClickPrev={handleClickPrev}
        handleClickNext={handleClickNext}
      />
    </div>
  )
}

export default TagPage
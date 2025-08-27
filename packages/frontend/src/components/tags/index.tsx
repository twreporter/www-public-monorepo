'use client'

import { type FC, useState, useMemo } from 'react'
import clsx from 'clsx'
// fetcher
import usePostsOfATag from '@/fetchers/tag'
// components
import ArticleCard from '@/components/article-card'
import Pagination from '@/components/pagination'
import Loading from '@/components/loading'
// style
import { rwdContainerClass } from '@/styles/layout' 
// @twreporter
import { Title1 } from '@twreporter/react-typescript-components/lib/title-bar'
// constants
import { POSTS_PER_PAGE } from '@/constants'
// lodash
import { ceil } from 'lodash'
const _ = {
  ceil,
}

// style
const listClass = clsx(
  'mt-[45px]',
  `grid grid-cols-1 tablet:grid-cols-2 gap-x-[20px] gap-y-[40px]`
)

type TagPageProps = {
  slug: string
  name: string
  totalPosts: number
}
const TagPage: FC<TagPageProps> = ({ slug, name, totalPosts }) => {
  const [page, setPage] = useState(1)

  const totalPage = useMemo(
    () => _.ceil(totalPosts / POSTS_PER_PAGE),
    [totalPosts]
  )
  const { posts, isLoading } = usePostsOfATag({
    slug,
    take: POSTS_PER_PAGE,
    skip: (page - 1) * POSTS_PER_PAGE,
  }) // todo: error

  const handleClickPrev = () => {
    setPage(() => page - 1)
  }

  const handleClickNext = () => {
    setPage(() => page + 1)
  }

  return (
    <div className={clsx(rwdContainerClass)}>
      <Title1 title={`# ${name}`} />
      {posts.length === 0 && isLoading ? (
        <Loading />
      ) : (
        <div className={listClass}>
          {posts.map(({ slug, ...rest }) => (
            <ArticleCard key={`meta-a-${slug}`} slug={slug} {...rest} />
          ))}
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

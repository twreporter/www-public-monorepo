'use client'

import { type FC, useState, useMemo } from 'react'
import clsx from 'clsx'
// fetcher
import usePostsOfACategorySet from '@/fetchers/category'
// components
import ArticleCard from '@/components/article-card'
import Pagination from '@/components/pagination'
import Loading from '@/components/loading'
// type
import type { Category } from '@/type/category'
// constants
import { INTERNAL_ROUTES } from '@/constants/routes'
import { POSTS_PER_PAGE } from '@/constants'
// @twreporter
import { TitleTab } from '@twreporter/react-typescript-components/lib/title-bar'
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

type CategoryPageProps = Category & {
  subcategorySlug?: string
  totalPosts: number
}
const CategoryPage: FC<CategoryPageProps> = ({
  slug,
  subcategorySlug,
  name,
  subcategories = [],
  totalPosts,
}) => {
  const [page, setPage] = useState(1)

  const totalPage = useMemo(() => _.ceil(totalPosts/POSTS_PER_PAGE), [totalPosts])
  const { posts, isLoading } = usePostsOfACategorySet(
    {
      slug,
      subcategorySlug,
      take: POSTS_PER_PAGE,
      skip: (page - 1)*POSTS_PER_PAGE
    },
  ) // todo: error

  const handleClickPrev = () => {
    setPage(() => page - 1)
  }

  const handleClickNext = () => {
    setPage(() => page + 1)
  }
  
  const tabs = useMemo(() => subcategories.map((subcategory) => ({
    text: subcategory.name,
    link: `${INTERNAL_ROUTES.category}/${slug}/${subcategory.slug}`,
    isExternal: false,
  })), [subcategories, slug])
  const activeTabIndex = useMemo(() => subcategories.findIndex((subcategory) => subcategory.slug === subcategorySlug), [subcategorySlug, subcategories])

  return (
    <div className={containerClass}>
      <TitleTab title={name} tabs={tabs} activeTabIndex={activeTabIndex}/>
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

export default CategoryPage
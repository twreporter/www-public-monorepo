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
import type { Category } from '@/types/category'
// constants
import { INTERNAL_ROUTES } from '@/constants/routes'
import { POSTS_PER_PAGE } from '@/constants'
// style
import {
  rwdGridOuterClass,
  rwdGridContainerClass,
  rwdGridInnerClass,
} from '@/styles/layout'
// @twreporter
import { TitleTab } from '@twreporter/react-typescript-components/lib/title-bar'
// lodash
import { ceil } from 'lodash'
const _ = {
  ceil,
}

// style
const listClass = clsx(
  `mt-[24px] flex flex-col gap-y-[40px]`,
  'tablet:grid tablet:grid-cols-subgrid tablet:col-span-full'
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

  const totalPage = useMemo(
    () => _.ceil(totalPosts / POSTS_PER_PAGE),
    [totalPosts]
  )
  const { posts, isLoading } = usePostsOfACategorySet({
    slug,
    subcategorySlug,
    take: POSTS_PER_PAGE,
    skip: (page - 1) * POSTS_PER_PAGE,
  }) // todo: error

  const handleClickPage = (selectedPage: number) => {
    setPage(selectedPage)
  }

  const handleClickPrev = () => {
    setPage(() => page - 1)
  }

  const handleClickNext = () => {
    setPage(() => page + 1)
  }

  const firstTab = useMemo(
    () => ({
      text: '全部',
      link: `${INTERNAL_ROUTES.category}/${slug}`,
      isExternal: false,
    }),
    [slug]
  )
  const tabs = useMemo(
    () =>
      [firstTab].concat(
        subcategories.map((subcategory) => ({
          text: subcategory.name,
          link: `${INTERNAL_ROUTES.category}/${slug}/${subcategory.slug}`,
          isExternal: false,
        }))
      ),
    [subcategories, slug, firstTab]
  )
  const activeTabIndex = useMemo(
    () =>
      subcategorySlug
        ? subcategories.findIndex(
            (subcategory) => subcategory.slug === subcategorySlug
          ) + 1
        : 0,
    [subcategorySlug, subcategories]
  )

  return (
    <div className={clsx(rwdGridOuterClass)}>
      <div className={clsx(rwdGridContainerClass)}>
        <div className={clsx(rwdGridInnerClass)}>
          <div className="col-span-full">
            <TitleTab
              title={name}
              tabs={tabs}
              activeTabIndex={activeTabIndex}
            />
          </div>
          {posts.length === 0 && isLoading ? (
            <div className="col-span-full">
              <Loading />
            </div>
          ) : (
            <div className={listClass}>
              {posts.map(({ slug, category: _category, ...rest }) => (
                <div key={`meta-a-${slug}`} className="col-span-5">
                  <ArticleCard slug={slug} {...rest} />
                </div>
              ))}
            </div>
          )}
          <Pagination
            className={clsx(
              'col-span-full',
              'w-full flex justify-center items-center'
            )}
            currentPage={page}
            totalPage={totalPage}
            handleClickPage={handleClickPage}
            handleClickPrev={handleClickPrev}
            handleClickNext={handleClickNext}
          />
        </div>
      </div>
    </div>
  )
}

export default CategoryPage

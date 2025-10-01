export const dynamicParams = true
import { SWRConfig, unstable_serialize } from 'swr'
// fetcher
import { fetchCategoryWithFirstPagePost } from '@/fetchers/server/category'
// components
import CategoryPage from '@/components/categories'
// constants
import { POSTS_PER_PAGE } from '@/constants'
// utils
import { categoryPostsKey } from '@/fetchers/key'
import logger from "@/utils/logger"

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string; subcategorySlug: string }>
}) {
  const { slug, subcategorySlug } = await params
  try {
    const category = await fetchCategoryWithFirstPagePost({
      slug,
      subcategorySlug,
    })
    // for swr caching
    const swrKey = categoryPostsKey({
      slug,
      subcategorySlug,
      take: POSTS_PER_PAGE,
      skip: 0,
    })

    return (
      <SWRConfig
        value={{
          fallback: {
            [unstable_serialize(swrKey)]: category.posts,
          },
        }}
      >
        <div className="px-[24px]">
          <CategoryPage
            slug={category.slug}
            name={category.name}
            subcategorySlug={subcategorySlug}
            totalPosts={category.postsCount}
            subcategories={category.subcategories}
          />
        </div>
      </SWRConfig>
    )
  } catch (error) {
    logger.error(error, 'Error fetching category data')
    return <div>Failed to load subcategory page data. Please try again later.</div>
  }
}

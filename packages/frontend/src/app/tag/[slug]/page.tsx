export const dynamicParams = true
import { SWRConfig, unstable_serialize } from 'swr'
// fetcher
import { fetchTagWithFirstPagePost } from '@/fetchers/server/tag'
// components
import TagPage from '@/components/tags'
// constants
import { POSTS_PER_PAGE } from '@/constants'
// utils
import { tagPostsKey } from '@/fetchers/key'
import logger from "@/utils/logger"

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  try {
    const tag = await fetchTagWithFirstPagePost({ slug })
    // for swr caching
    const swrKey = tagPostsKey({ slug, take: POSTS_PER_PAGE, skip: 0 })

    return (
      <SWRConfig
        value={{
          fallback: {
            [unstable_serialize(swrKey)]: tag.posts,
          },
        }}
      >
        <div className="px-[24px] w-fill">
          <TagPage
            slug={tag.slug}
            name={tag.name}
            totalPosts={tag.postsCount}
          />
        </div>
      </SWRConfig>
    )
  } catch (error) {
    logger.error(error, 'Error fetching tag data')
    return <div>Failed to load tag data. Please try again later.</div>
  }
}

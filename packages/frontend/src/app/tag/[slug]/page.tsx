export const dynamicParams = true
import { SWRConfig, unstable_serialize } from 'swr'
// fetcher
import { fetchTagWithFirstPagePost } from '@/fetchers/server/tag'
// components
import TagPage from '@/components/tags'
// utils
import { tagPostsKey } from '@/fetchers/key'
//import logger from "@/utils/logger"

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  try {
    const tag = await fetchTagWithFirstPagePost({ slug })
    // for swr caching
    const swrKey = tagPostsKey({ slug, take: 1, skip: 0 })

    return (
      <SWRConfig
        value={{
          fallback: {
            [unstable_serialize(swrKey)]: tag.posts,
          },
        }}
      >
        <div>
          <TagPage
            slug={tag.slug}
            name={tag.name}
            totalPosts={tag.postsCount}
          />
        </div>
      </SWRConfig>
    )
  } catch (error) {
    console.error(error, 'Error fetching tag data')
    return <div>Failed to load tag data. Please try again later.</div>
  }
}

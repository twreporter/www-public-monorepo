import { cache } from 'react'
import { keystoneFetch } from '@/app/api/graphql/keystone'
import type { ArticleDetail } from '@/types/article-detail'

type ArticleResponse = Omit<ArticleDetail, 'relatedTopics'> & {
  relatedPostsOrderJson?: { id: string }[]
  relatedTopics: (ArticleDetail['relatedTopics'][number] & { state?: string })[]
}

// Filter at the query boundary: the frontend service account can read drafts.
export const fetchArticle = cache(async (slug: string): Promise<ArticleDetail | null> => {
  const query = `
    query Article($where: PostWhereInput!) {
      posts(where: $where, take: 1) {
        id slug title subtitle style publishedDate updatedDate createdAt
        ogTitle ogDescription copyright heroSize heroCaption
        heroEmbedded brief content authorsJSON relatedPostsOrderJson
        heroImage { name imageFile { url } }
        ogImage { name imageFile { url } }
        authors { id name slug }
        tags: tagsOrdered { name slug }
        subcategories: subcategoriesOrdered {
          name slug category { name slug }
        }
        relatedTopics: relatedTopicsOrdered { title slug state }
        relatedPosts(where: { state: { equals: "published" } }) {
          id slug title style publishedDate
          ogImage { name imageFile { url } }
        }
      }
    }
  `
  const response = await keystoneFetch<{ posts: ArticleResponse[] }>(
    JSON.stringify({
      query,
      variables: { where: { slug: { equals: slug }, state: { equals: 'published' } } },
    }),
    false
  )
  if (response.errors?.length || !response.data) {
    throw new Error(`Failed to fetch article: ${response.errors?.map(({ message }) => message).join('; ') || 'missing data'}`)
  }
  const post = response.data.posts[0]
  if (!post) return null
  const { relatedPostsOrderJson, relatedTopics, ...article } = post
  const order = new Map((relatedPostsOrderJson ?? []).map(({ id }, index) => [String(id), index]))
  article.relatedPosts.sort((a, b) => (order.get(a.id) ?? Infinity) - (order.get(b.id) ?? Infinity))
  return {
    ...article,
    relatedTopics: relatedTopics
      .filter((topic) => topic.state === 'published')
      .map(({ title, slug }) => ({ title, slug })),
  }
})

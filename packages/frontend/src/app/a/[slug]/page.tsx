import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { fetchArticle } from '@/fetchers/server/article'
import ArticlePage from '@/components/article'
import { articleImageUrl } from '@/components/article/data'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = await fetchArticle(slug)
  if (!article) return { title: '找不到文章 - 報導者' }
  const title = `${article.ogTitle || article.title} - 報導者 The Reporter`
  const image = articleImageUrl(article.ogImage || article.heroImage)
  const url = `https://www.twreporter.org/a/${encodeURIComponent(slug)}`
  return {
    title, description: article.ogDescription,
    alternates: { canonical: url },
    openGraph: {
      title, description: article.ogDescription, type: 'article', url,
      publishedTime: article.publishedDate, modifiedTime: article.updatedDate,
      images: image ? [image] : [], locale: 'zh_TW', siteName: '報導者 The Reporter',
    },
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const article = await fetchArticle(slug)
  if (!article) notFound()
  return <ArticlePage article={article} />
}

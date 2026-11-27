import Link from 'next/link'

// todo: use global not found page
export default function ArticleNotFound() {
  return <div className="px-6 py-16 text-center text-gray-800"><h1>找不到這篇文章</h1><Link href="/latest" className="mt-6 inline-block underline">閱讀最新文章</Link></div>
}

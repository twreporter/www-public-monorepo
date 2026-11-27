'use client'

// todo: use global error page
export default function ArticleError({ reset }: { reset: () => void }) {
  return <div className="px-6 py-16 text-center text-gray-800"><h1>文章暫時無法載入</h1><button type="button" onClick={reset} className="mt-6 rounded-full border px-6 py-2">重新載入</button></div>
}

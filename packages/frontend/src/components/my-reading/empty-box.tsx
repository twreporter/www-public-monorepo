'use client'
import clsx from 'clsx'
// @twreporters
import { P1 } from '@twreporter/react-typescript-components/lib/text/paragraph'

type EmptyBoxType =
  | 'bookmark'
  | 'browsing-history'
  | 'show-more-bookmark'
  | 'reviewing-article'

type EmptyBoxProps = {
  type: EmptyBoxType
}

const emptyCopyMap: Record<
  EmptyBoxType,
  { title: string; description: string }
> = {
  bookmark: {
    title: '你還沒有收藏任何報導',
    description: '開始收藏你喜歡的文章，之後可以在這裡快速找到。',
  },
  'browsing-history': {
    title: '你還沒有造訪過任何報導',
    description: '探索更多內容後，閱讀紀錄會出現在這裡。',
  },
  'show-more-bookmark': {
    title: '你已取消收藏最近顯示的文章',
    description: '點擊查看更多，查看其他已收藏內容。',
  },
  'reviewing-article': {
    title: '深度報導不受時空限制，讓我們持續與議題對話',
    description: '《報導者》編輯台將不定期回顧重要報導，別忘了回來看看。',
  },
}

export default function EmptyBox({ type }: EmptyBoxProps) {
  const copy = emptyCopyMap[type]

  return (
    <div className="w-full mt-[24px] py-[64px] flex flex-col items-center justify-center text-center">
      <P1 text={copy.title} className="text-gray-800" weight={P1.Weight.bold} />
      <P1 text={copy.description} className="text-gray-600 mt-[4px]" />
    </div>
  )
}

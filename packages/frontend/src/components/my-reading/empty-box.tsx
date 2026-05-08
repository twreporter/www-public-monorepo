'use client'
import { useContext } from 'react'
import Link from 'next/link'
// @twreporters
import { P1 } from '@twreporter/react-typescript-components/lib/text/paragraph'
import { Bookmark } from '@twreporter/react-typescript-components/lib/icons'
// context
import { BaseContext } from '@/contexts'

export type EmptyBoxType =
  | 'bookmark'
  | 'browsing-history'
  | 'show-more-bookmark'
  | 'reviewing-article'

type EmptyBoxProps = {
  type: EmptyBoxType
  isMobile?: boolean
}

const containerClass =
  'w-full mt-[24px] py-[64px] flex flex-col items-center justify-center text-center'

const EmptyBookmark = () => {
  const { releaseBranch } = useContext(BaseContext)
  return (
    <div className={containerClass}>
      <P1
        text="你還沒有收藏任何報導"
        weight={P1.Weight.bold}
        className="text-gray-600"
      />
      <div className="flex flex-row items-center justify-center mt-[4px]">
        <P1 text="點擊" className="text-gray-600" />
        <Bookmark
          type={Bookmark.Type.ADD}
          releaseBranch={releaseBranch}
          className="!bg-gray-600"
        />
        <P1 text="收藏你喜愛的報導" className="text-gray-600" />
      </div>
    </div>
  )
}

const EmptyBrowsingHistory = () => (
  <div className={containerClass}>
    <P1
      text="你還沒有造訪過任何報導"
      weight={P1.Weight.bold}
      className="text-gray-600"
    />
    <div className="flex flex-row items-center justify-center mt-[4px]">
      <Link href="/" className="underline text-gray-600">
        <P1 text="前往首頁" className="text-gray-600" />
      </Link>
      <P1 text="探索更多內容" className="text-gray-600" />
    </div>
  </div>
)

const ShowMoreBookmark = ({ isMobile = false }: { isMobile?: boolean }) => (
  <div className={containerClass}>
    <P1
      text={`你已取消收藏最近的${isMobile ? '四' : '六'}篇文章`}
      weight={P1.Weight.bold}
      className="text-gray-600"
    />
    <P1
      text="點擊查看更多，看你的其他已收藏文章吧！"
      className="text-gray-600 mt-[4px]"
    />
  </div>
)

const EmptyReviewingArticle = () => (
  <div className={containerClass}>
    <P1
      text="深度報導不受時空限制，讓我們持續與議題對話"
      weight={P1.Weight.bold}
      className="text-gray-600"
    />
    <div className="flex flex-col items-center mt-[4px]">
      <P1
        text="《報導者》編輯台將不定期回顧重要報導"
        className="text-gray-600"
      />
      <P1 text="別忘了回來這裡看看！" className="text-gray-600" />
    </div>
  </div>
)

const Type = {
  Bookmark: 'bookmark',
  BrowsingHistory: 'browsing-history',
  ShowMoreBookmark: 'show-more-bookmark',
  ReviewingArticle: 'reviewing-article',
} as const satisfies Record<string, EmptyBoxType>

function EmptyBox({ type, isMobile = false }: EmptyBoxProps) {
  if (type === 'bookmark') return <EmptyBookmark />
  if (type === 'browsing-history') return <EmptyBrowsingHistory />
  if (type === 'show-more-bookmark')
    return <ShowMoreBookmark isMobile={isMobile} />
  if (type === 'reviewing-article') return <EmptyReviewingArticle />
  return null
}

EmptyBox.Type = Type
export default EmptyBox

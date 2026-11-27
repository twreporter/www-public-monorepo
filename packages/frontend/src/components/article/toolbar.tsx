'use client'

import { useContext, useState } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import {
  Bookmark,
  SocialMedia,
  Topic,
} from '@twreporter/react-typescript-components/lib/icons'
import { BaseContext } from '@/contexts'

const socialServices = ['facebook', 'twitter', 'line'] as const
type SocialService = (typeof socialServices)[number]
type ArticleIconName =
  | SocialService
  | 'bookmark'
  | 'topic'
  | 'text'
  | 'printer'
  | 'share'
  | 'related'

function Icon({ name }: { name: ArticleIconName }) {
  const { releaseBranch } = useContext(BaseContext)
  const isSocial = name === 'facebook' || name === 'twitter' || name === 'line'
  const icon = isSocial ? (
    <SocialMedia mediaType={name} releaseBranch={releaseBranch} />
  ) : name === 'bookmark' ? (
    <Bookmark type={Bookmark.Type.BASIC} releaseBranch={releaseBranch} />
  ) : name === 'topic' ? (
    Topic(releaseBranch)
  ) : (
    // No matching named icon is currently exported by the shared library.
    // biome-ignore lint/performance/noImgElement: Local SVG fallback retains its intrinsic dimensions.
    <img
      src={`/images/article/${name}.svg`}
      alt=""
      className="[filter:var(--article-icon-filter)]"
    />
  )

  return (
    <span
      aria-hidden="true"
      className={clsx(
        'flex size-6 items-center justify-center [&_svg]:bg-[var(--article-toolbar-icon)]!',
        isSocial && '[&_svg]:size-[18px]!'
      )}
    >
      {icon}
    </span>
  )
}

export default function ArticleToolbar({
  title,
  topic,
  mobile = false,
}: {
  title: string
  topic?: string
  mobile?: boolean
}) {
  const [large, setLarge] = useState(false)
  const [message, setMessage] = useState('')
  function changeSize() {
    const article = document.getElementById('article')
    const next = article?.dataset.largeText !== 'true'
    if (article) article.dataset.largeText = String(next)
    setLarge(next)
  }
  async function share() {
    try {
      if (navigator.share)
        await navigator.share({ title, url: window.location.href })
      else {
        await navigator.clipboard.writeText(window.location.href)
        setMessage('已複製文章連結')
      }
    } catch (error) {
      if (!(error instanceof DOMException && error.name === 'AbortError'))
        setMessage('無法分享，請複製瀏覽器中的文章網址。')
    }
  }
  function shareTo(service: SocialService) {
    const url = encodeURIComponent(window.location.href)
    const endpoints: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${encodeURIComponent(title)}`,
      line: `https://social-plugins.line.me/lineit/share?url=${url}`,
    }
    window.open(endpoints[service], '_blank', 'noopener,noreferrer')
  }
  return (
    <nav
      className={clsx(
        'print:hidden [&_button:focus-visible]:outline-2 [&_button:focus-visible]:outline-offset-2 [&_button:focus-visible]:outline-[var(--article-link)] [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-2 [&_a:focus-visible]:outline-[var(--article-link)]',
        mobile
          ? 'article-mobile-tools fixed inset-x-0 bottom-0 z-2 flex min-h-12 items-center gap-2 border-t border-[var(--article-divider)] bg-[var(--article-page)] px-4 pt-1 pb-[calc(4px+env(safe-area-inset-bottom))] font-default text-[10px] leading-normal text-[var(--article-control)] desktop:hidden [&>button]:flex [&>button]:flex-1 [&>button]:flex-col [&>button]:items-center [&>button]:min-w-0 [&>button]:cursor-pointer [&>a]:flex [&>a]:flex-1 [&>a]:flex-col [&>a]:items-center [&>a]:min-w-0 [&>a]:cursor-pointer [&>button:disabled]:cursor-default [&>button:disabled]:opacity-50'
          : 'article-tools flex flex-col items-start gap-4 [&_button]:flex [&_button]:size-[30px] [&_button]:items-center [&_button]:justify-center [&_button]:cursor-pointer'
      )}
      aria-label="文章工具"
    >
      <button
        type="button"
        aria-label="文字大小"
        aria-pressed={large}
        onClick={changeSize}
      >
        <Icon name="text" />
        {mobile && <span>文字大小</span>}
      </button>
      {mobile ? (
        <>
          <button type="button" onClick={share}>
            <Icon name="share" />
            <span>分享</span>
          </button>
          {/* Member bookmark integration is intentionally deferred. */}
          <button type="button" disabled title="收藏功能尚未開放">
            <Icon name="bookmark" />
            <span>收藏</span>
          </button>
          <a href="#related-articles">
            <Icon name="related" />
            <span>相關文章</span>
          </a>
          {topic && (
            <Link href={topic}>
              <Icon name="topic" />
              <span>前往專題</span>
            </Link>
          )}
        </>
      ) : (
        <>
          <button
            type="button"
            aria-label="列印文章"
            onClick={() => window.print()}
          >
            <Icon name="printer" />
          </button>
          {socialServices.map((service) => (
            <button
              className="rounded-full bg-[var(--article-social-surface)]"
              type="button"
              key={service}
              aria-label={`分享到 ${service}`}
              onClick={() => shareTo(service)}
            >
              <Icon name={service} />
            </button>
          ))}
        </>
      )}
      {message && (
        <output className="absolute bottom-[calc(100%+8px)] inset-x-4 bg-gray-white p-3 text-sm text-gray-800">
          {message}
        </output>
      )}
    </nav>
  )
}

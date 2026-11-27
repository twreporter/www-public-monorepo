'use client'

import { useLayoutEffect } from 'react'
import { usePathname } from 'next/navigation'
import { create } from 'zustand'
import type { ArticleTheme } from '@/components/article/theme'

// The header is outside the article tree. Bind its theme to the current route
// so navigating away cannot leave the site's header in photography mode.
const useThemeStore = create<{
  pathname: string | null
  theme: ArticleTheme
}>(() => ({ pathname: null, theme: 'normal' }))

export function useSiteArticleTheme(): ArticleTheme {
  const pathname = usePathname()
  return useThemeStore((state) =>
    state.pathname === pathname ? state.theme : 'normal'
  )
}

export function SiteArticleTheme({ theme }: { theme: ArticleTheme }) {
  const pathname = usePathname()
  useLayoutEffect(() => {
    useThemeStore.setState({ pathname, theme })
    return () => {
      useThemeStore.setState({ pathname: null, theme: 'normal' })
    }
  }, [pathname, theme])
  return null
}

'use client'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'

export default function MainContent({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isHome = pathname === '/'

  return (
    <main
      className={clsx(
        'w-full h-full justify-center',
        !isHome && 'pt-[24px] tablet:pt-[32px] desktop:pt-[64px]',
        'bg-gray-100'
      )}
    >
      {children}
    </main>
  )
}

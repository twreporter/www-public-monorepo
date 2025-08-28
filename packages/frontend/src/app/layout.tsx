import clsx from 'clsx'
import type { Metadata } from 'next'

// These styles apply to every route in the application
import './globals.css'

export const metadata: Metadata = {
  title: '報導者',
  description: '報導者',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <header className="w-full flex items-center justify-center text-3xl py-2 bg-amber-600">
          報導者
        </header>
        <main
          className={clsx(
            'w-full',
            'flex justify-center',
            'px-[24px] pt-[24px] tablet:pt-[32px] desktop:pt-[64px]',
            'bg-gray-100'
          )}
        >
          {children}
        </main>
        <footer className="w-full flex items-center justify-center text-sm py-2 bg-gray-600">
          This is footer
        </footer>
      </body>
    </html>
  )
}

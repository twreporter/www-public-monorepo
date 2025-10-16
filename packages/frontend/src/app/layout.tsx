import clsx from 'clsx'
import type { Metadata } from 'next'
import Header from '@/components/header'

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
        <Header />
        <main
          className={clsx(
            'w-full h-full',
            'flex justify-center',
            'pt-[24px] tablet:pt-[32px] desktop:pt-[64px]',
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

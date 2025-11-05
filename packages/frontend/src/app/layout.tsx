import clsx from 'clsx'
import type { Metadata } from 'next'
// components
import Header from '@/components/header'
import Footer from '@/components/footer'

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
      <body className="tracking-[0.4px] leading-[1.4]">
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
        <Footer />
      </body>
    </html>
  )
}

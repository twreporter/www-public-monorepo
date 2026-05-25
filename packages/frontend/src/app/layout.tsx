import clsx from 'clsx'
import type { Metadata } from 'next'
import DOMPurify from 'isomorphic-dompurify'
// components
import Header from '@/components/header'
import Footer from '@/components/footer'

// These styles apply to every route in the application
import './globals.css'
import 'swiper/css'

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
      <script
        // biome-ignore lint/security/noDangerouslySetInnerHtml: add adobe fonts
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(`(function(d) {
            var config = {
              kitId: 'vlk1qbe',
              scriptTimeout: 3000,
              async: true
            },
            h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
          })(document);
        `),
        }}
      />
      <body className="tracking-[0.4px] leading-[1.4] antialiased">
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

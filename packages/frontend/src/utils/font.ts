import { Roboto_Slab, Merriweather } from 'next/font/google'

export const robotoSlab = Roboto_Slab({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-roboto-slab',
})

export const merriweather = Merriweather({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-merriweather',
})

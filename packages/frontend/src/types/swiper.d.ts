declare module 'swiper/react' {
  import type { FC, ReactNode } from 'react'

  export const Swiper: FC<Record<string, unknown> & { children?: ReactNode }>
  export const SwiperSlide: FC<
    Record<string, unknown> & { children?: ReactNode }
  >
}

declare module 'swiper/modules' {
  export const FreeMode: unknown
}

declare module 'swiper' {
  export type Swiper = {
    isBeginning: boolean
    isEnd: boolean
    slidePrev: () => void
    slideNext: () => void
    update: () => void
  }
}

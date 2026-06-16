'use client'
import type { FC } from 'react'
import clsx from 'clsx'
// react-typescript-components
import { H2 } from '@twreporter/react-typescript-components/lib/text/heading'
import { P2 } from '@twreporter/react-typescript-components/lib/text/paragraph'
// styles
import { rwdGridColGapClass } from '@/styles/layout'

type BgImageSrcs = {
  mobile?: string
  tablet?: string
  desktop?: string
  hd?: string
}

type HomePageBannerProps = {
  title: string
  description: string
  buttonComponent?: React.ReactNode
  textColor?: string
} & (
  | { bgImageSrcs: BgImageSrcs; bgColor?: never }
  | { bgColor: string; bgImageSrcs?: never }
  | { bgImageSrcs?: never; bgColor?: never }
)

export const HomePageBanner: FC<HomePageBannerProps> = ({
  title,
  description,
  buttonComponent,
  bgImageSrcs,
  bgColor,
  textColor = 'text-gray-white',
}) => {
  return (
    <div className="tablet:col-span-full">
      {/* Mobile Banner */}
      <div
        className={clsx(
          'tablet:hidden',
          'w-screen flex flex-col pt-[32px] pb-[48px] gap-[20px] justify-center items-center -mx-[24px]',
          bgColor ? bgColor : '',
          bgImageSrcs?.mobile ? 'bg-contain' : ''
        )}
        style={{
          backgroundImage: bgImageSrcs?.mobile
            ? `url(${bgImageSrcs.mobile})`
            : undefined,
        }}
      >
        <div className={clsx('w-[calc(100vw-96px)] flex flex-col gap-[12px]')}>
          <H2
            className={clsx('w-full text-center', textColor)}
            text={title}
            type={H2.Type.article}
          />
          <P2 className={clsx('w-full', textColor)} text={description} />
        </div>
        <div className="w-[calc(100vw-96px)] flex justify-center">
          {buttonComponent}
        </div>
      </div>

      {/* Tablet Banner */}
      <div
        className={clsx(
          'hidden desktop:hidden',
          'w-screen tablet:grid tablet:-mx-[32px]',
          bgColor ? bgColor : '',
          bgImageSrcs?.tablet ? 'bg-contain' : ''
        )}
        style={{
          backgroundImage: bgImageSrcs?.tablet
            ? `url(${bgImageSrcs.tablet})`
            : undefined,
        }}
      >
        <div
          className={clsx(
            'p-[32px] grid grid-cols-12 gap-y-[12px]',
            rwdGridColGapClass
          )}
        >
          <div className="col-start-2 col-end-12 flex justify-between">
            <H2
              className={clsx('w-fit', textColor)}
              text={title}
              type={H2.Type.article}
            />
            <div className="w-fit">{buttonComponent}</div>
          </div>
          <div className="col-start-2 col-end-12">
            <P2 className={clsx('w-full', textColor)} text={description} />
          </div>
        </div>
      </div>

      {/* Desktop Banner */}
      <div
        className={clsx(
          'hidden tablet:hidden desktop:grid hd:hidden',
          'w-screen desktop:-mx-[48px]',
          bgColor ? bgColor : '',
          bgImageSrcs?.desktop ? 'bg-contain' : ''
        )}
        style={{
          backgroundImage: bgImageSrcs?.desktop
            ? `url(${bgImageSrcs.desktop})`
            : undefined,
        }}
      >
        <div
          className={clsx(
            'px-[48px] py-[32px] grid grid-cols-12 gap-y-[12px]',
            rwdGridColGapClass
          )}
        >
          <div className="col-start-2 col-end-12 flex flex-row gap-[32px] justify-between">
            <div className="flex flex-col gap-[12px]">
              <H2 className={textColor} text={title} type={H2.Type.article} />
              <P2 className={textColor} text={description} />
            </div>
            <div className="shrink-0 flex justify-center items-center">
              {buttonComponent}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop HD Banner */}
      <div
        className={clsx(
          'hidden desktop:hidden hd:grid',
          'w-screen hd:-mx-[calc((100vw-1280px)/2)]',
          bgColor ? bgColor : '',
          bgImageSrcs?.hd ? 'bg-contain' : ''
        )}
        style={{
          backgroundImage: bgImageSrcs?.hd
            ? `url(${bgImageSrcs.hd})`
            : undefined,
        }}
      >
        <div
          className={clsx(
            'px-[48px] py-[32px] grid grid-cols-12 gap-y-[12px]',
            'hd:w-[1280px] hd:mx-auto hd:px-0',
            rwdGridColGapClass
          )}
        >
          <div className="col-start-2 col-end-12 flex flex-row gap-[32px] justify-between">
            <div className="flex flex-col gap-[12px]">
              <H2 className={textColor} text={title} type={H2.Type.article} />
              <P2 className={textColor} text={description} />
            </div>
            <div className="shrink-0 flex justify-center items-center">
              {buttonComponent}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

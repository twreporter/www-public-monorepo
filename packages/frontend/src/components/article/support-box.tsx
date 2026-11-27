'use client'

import clsx from 'clsx'
import { PillButton } from '@twreporter/react-typescript-components/lib/button'
import { EXTERNAL_LINKS } from '@twreporter/react-typescript-components/lib/constants/external-links'
import { H4 } from '@twreporter/react-typescript-components/lib/text/heading'
import { P1 } from '@twreporter/react-typescript-components/lib/text/paragraph'

export default function SupportBox({ className }: { className?: string }) {
  return (
    <div className={clsx('flex w-full flex-col items-center py-5', className)}>
      <div className="flex w-full max-w-[480px] flex-col items-end gap-8 border-l border-supportive-heavy bg-gray-white p-10 text-gray-900">
        <div className="flex w-full flex-col gap-4">
          <div className="relative isolate w-fit">
            <span
              aria-hidden="true"
              className="absolute bottom-[2.22px] left-1 -z-10 h-[15px] w-[181px] bg-supportive-pastel"
            />
            <H4 text="深度求真 眾聲同行" className="text-[22px]!" />
          </div>
          <div className="flex flex-col gap-2 break-words">
            <P1 text="獨立的精神，是自由思想的條件。獨立的媒體，才能守護公共領域，讓自由的討論和真相浮現。" />
            <P1 text="在艱困的媒體環境，《報導者》堅持以非營利組織的模式投入公共領域的調查與深度報導。我們透過讀者的贊助支持來營運，不仰賴商業廣告置入，在獨立自主的前提下，穿梭在各項重要公共議題中。" />
            <p className="font-default text-base leading-normal">
              今年是
              <span className="leading-[2.1] tracking-[0.096px] underline decoration-gray-900/50 decoration-[0.02em]">
                《報導者》成立十週年
              </span>
              ，請支持我們持續追蹤國內外新聞事件的真相，度過下一個十年的挑戰。
            </p>
          </div>
        </div>
        <PillButton
          text="贊助支持"
          size={PillButton.Size.l}
          type={PillButton.Type.primary}
          style={PillButton.Style.dark}
          className="w-[120px]! justify-center border-0!"
          onClick={() => window.location.assign(EXTERNAL_LINKS.monthlyDonation)}
        />
      </div>
    </div>
  )
}

// react-typescript-components
import { PillButton } from '@twreporter/react-typescript-components/lib/button'
import { Arrow } from '@twreporter/react-typescript-components/lib/icons'
import type { ReleaseBranch } from '@twreporter/react-typescript-components/lib/constants/release-branch'
import { EXTERNAL_LINKS } from '@twreporter/react-typescript-components/lib/constants/external-links'
// constants
import { INTERNAL_ROUTES } from '@/constants/routes'

export const BannerConfigTypes = {
  DONATION: 'donation',
  KIDS_REPORTER: 'kids_reporter',
  PODCAST: 'podcast',
} as const

export const getBannerConfigs = (releaseBranch: ReleaseBranch) => ({
  [BannerConfigTypes.DONATION]: {
    title: '用行動支持報導者',
    description:
      '深度調查報導必須投入優秀記者、足夠時間與大量資源。歡迎您成為「《報導者》贊助夥伴」，一起為打造更好的社會及媒體環境努力。',
    buttonComponent: (
      <>
        <PillButton
          text="贊助我們"
          rightIconComponent={
            <Arrow
              direction={Arrow.Direction.right}
              releaseBranch={releaseBranch}
            />
          }
          className="desktop:hidden"
          onClick={() => window.open(EXTERNAL_LINKS.monthlyDonation, '_blank')}
        />
        <PillButton
          text="贊助我們"
          size={PillButton.Size.l}
          rightIconComponent={
            <Arrow
              direction={Arrow.Direction.right}
              releaseBranch={releaseBranch}
            />
          }
          className="hidden desktop:block"
          onClick={() => window.open(EXTERNAL_LINKS.monthlyDonation, '_blank')}
        />
      </>
    ),
    bgColor: 'bg-gray-black',
  },
  [BannerConfigTypes.KIDS_REPORTER]: {
    title: '看兒少新聞，與孩子對話',
    description:
      '向孩子解釋重要的事件、嚴肅的議題，是民主社會很重要的事，也是《報導者》身為非營利媒體的重要責任，讓我們和你一起尋找對話的契機。',
    buttonComponent: (
      <>
        <PillButton
          text="前往閱讀"
          rightIconComponent={
            <Arrow
              direction={Arrow.Direction.right}
              releaseBranch={releaseBranch}
            />
          }
          className="desktop:hidden"
          onClick={() => window.open(EXTERNAL_LINKS.kidsReporter, '_blank')}
        />
        <PillButton
          text="前往閱讀"
          size={PillButton.Size.l}
          rightIconComponent={
            <Arrow
              direction={Arrow.Direction.right}
              releaseBranch={releaseBranch}
            />
          }
          className="hidden desktop:block"
          onClick={() => window.open(EXTERNAL_LINKS.kidsReporter, '_blank')}
        />
      </>
    ),
    bgImageSrcs: {
      mobile: `https://www.twreporter.org/assets/banner/${releaseBranch}/KidsReporter_Mobile.jpg`,
      tablet: `https://www.twreporter.org/assets/banner/${releaseBranch}/KidsReporter_Tablet.jpg`,
      desktop: `https://www.twreporter.org/assets/banner/${releaseBranch}/KidsReporter_Desktop.jpg`,
      hd: `https://www.twreporter.org/assets/banner/${releaseBranch}/KidsReporter_DesktopHD.jpg`,
    },
    textColor: 'text-gray-900',
  },
  [BannerConfigTypes.PODCAST]: {
    title: '聽Podcast，感受真實',
    description:
      '報導者Podcast節目，透過記者、事件當事人的第一手告白，和來自現場的收音紀錄，帶你走進新聞幕後、故事現場，感受更完整的真實。',
    buttonComponent: (
      <>
        <PillButton
          text="立即收聽"
          rightIconComponent={
            <Arrow
              direction={Arrow.Direction.right}
              releaseBranch={releaseBranch}
            />
          }
          className="desktop:hidden"
          onClick={() => window.open(INTERNAL_ROUTES.podcast, '_blank')}
        />
        <PillButton
          text="立即收聽"
          size={PillButton.Size.l}
          rightIconComponent={
            <Arrow
              direction={Arrow.Direction.right}
              releaseBranch={releaseBranch}
            />
          }
          className="hidden desktop:block"
          onClick={() => window.open(INTERNAL_ROUTES.podcast, '_blank')}
        />
      </>
    ),
    bgImageSrcs: {
      mobile: `https://www.twreporter.org/assets/banner/${releaseBranch}/PodcastBox_Mobile.jpg`,
      tablet: `https://www.twreporter.org/assets/banner/${releaseBranch}/PodcastBox_Tablet.jpg`,
      desktop: `https://www.twreporter.org/assets/banner/${releaseBranch}/PodcastBox_Desktop.jpg`,
      hd: `https://www.twreporter.org/assets/banner/${releaseBranch}/PodcastBox_DesktopHD.jpg`,
    },
    textColor: 'text-gray-900',
  },
})

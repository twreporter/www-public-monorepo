import type { FC } from 'react'
import clsx from 'clsx'
// text
import { P2, P3 } from '../text/paragraph'
// divider
import Divider from '../divider'
// constants
import type { ReleaseBranch } from '../constants/release-branch'
import { EXTERNAL_LINKS } from '../constants/external-links'
// components
import Logo from './logo'
import { SocialLinks, StaticLinks, LinkButtonGroups } from './links'
// button
import { PillButton } from '../button'
// link
import { ExternalLink } from '../customized-link'
// types
import type { LinkType, SocialMediaLink } from './types'

type FooterProps = {
  releaseBranch: ReleaseBranch
  fundraisingId: string
  fundraisingDateString: string
  socialMediaLinks: SocialMediaLink[]
  buttonLinks: LinkType[][]
}
const Footer: FC<FooterProps> = ({
  releaseBranch,
  fundraisingId,
  fundraisingDateString,
  socialMediaLinks,
  buttonLinks,
}) => {
  return (
    <footer className={clsx('w-full bg-gray-white')}>
      <div
        className={clsx(
          'flex flex-col mx-auto justify-center max-w-[400px] px-[24px] pt-[48px] pb-[96px]',
          'desktop:max-w-[1200px] desktop:px-[48px] desktop:py-[48px]'
        )}
      >
        {/* upper content */}
        <div
          className={clsx(
            'w-full flex flex-col justify-center',
            'desktop:flex-row desktop:justify-between'
          )}
        >
          {/* information content */}
          <div
            className={clsx(
              'flex flex-col w-full gap-[32px] mb-[48px] items-center text-center',
              'desktop:max-w-[320px] desktop:mb-0 desktop:text-start desktop:items-start'
            )}
          >
            {/* logo */}
            <div
              className={clsx(
                'w-full flex flex-col gap-[16px] items-center',
                'desktop:gap-[24px] desktop:items-start'
              )}
            >
              <Logo releaseBranch={releaseBranch} />
              <P2
                className="text-gray-600"
                text="台灣第一個由公益基金會成立的網路媒體，致力於公共領域調查報導，打造多元進步的媒體環境。"
              />
            </div>
            {/* donation button */}
            <ExternalLink to={EXTERNAL_LINKS.monthlyDonation} target="_blank">
              <PillButton
                className="w-[280px]! justify-center!"
                type={PillButton.Type.secondary}
                size={PillButton.Size.l}
                text={'贊助我們'}
              />
            </ExternalLink>
          </div>
          {/* links content */}
          <div
            className={clsx('flex mb-[16px] gap-[16px]', 'desktop:gap-[24px]')}
          >
            <LinkButtonGroups
              releaseBranch={releaseBranch}
              linksGroups={buttonLinks}
            />
          </div>
        </div>
        <Divider className="w-full my-[24px]" />
        {/* lower content */}
        <div
          className={clsx(
            'flex flex-col-reverse gap-[24px] items-center text-center',
            'desktop:flex-row desktop:justify-between desktop:gap-0'
          )}
        >
          {/* info */}
          <div
            className={clsx('flex flex-col items-center', 'desktop:flex-row')}
          >
            <P3
              className="text-gray-600"
              text={`衛部救字第${fundraisingId}號｜勸募期間 ${fundraisingDateString}`}
            />
            <div className="hidden desktop:flex">
              <P3 className="text-gray-600" text="｜" />
              <StaticLinks releaseBranch={releaseBranch} />
              <P3 className="text-gray-600" text="｜" />
            </div>
            <div className="flex desktop:hidden">
              <StaticLinks releaseBranch={releaseBranch} />
            </div>
            <P3
              className="text-gray-600"
              text={`Copyright © ${new Date().getFullYear()} The Reporter.`}
            />
          </div>
          {/* social links */}
          <SocialLinks releaseBranch={releaseBranch} links={socialMediaLinks} />
        </div>
      </div>
    </footer>
  )
}

export default Footer

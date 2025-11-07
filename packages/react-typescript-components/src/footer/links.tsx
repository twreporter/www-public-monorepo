import clsx from 'clsx'
// text
import { P2, P3 } from '../text/paragraph'
// constants
import type { ReleaseBranch } from '../constants/release-branch'
import { forClientSideRendering } from '../constants/request-origins'
// button
import { IconButton } from '../button'
// link
import { ExternalLink } from '../customized-link'
// icon
import { SocialMedia } from '../icons'
// types
import type { LinkType, SocialMediaLink } from './types'
// lodash
import map from 'lodash/map'
const _ = {
  map,
}

export const SocialLinks = ({
  releaseBranch,
  links,
}: {
  releaseBranch: ReleaseBranch
  links: SocialMediaLink[]
}) => {
  return (
    <div className="flex gap-[16px]">
      {_.map(links, (link) => {
        const iconComponent = (
          <SocialMedia mediaType={link.icon} releaseBranch={releaseBranch} />
        )
        return (
          <ExternalLink key={link.icon} to={link.link} target="_blank">
            <IconButton iconComponent={iconComponent} />
          </ExternalLink>
        )
      })}
    </div>
  )
}

export const StaticLinks = ({
  releaseBranch,
}: {
  releaseBranch: ReleaseBranch
}) => {
  const mainOrigin = forClientSideRendering[releaseBranch].main
  return (
    <>
      <ExternalLink to={`${mainOrigin}/a/license-footer`} target="_blank">
        <P3
          className="text-gray-600 underline underline-offset-[4px]"
          text="許可協議"
        />
      </ExternalLink>
      <P3 className="text-gray-600" text="｜" />
      <ExternalLink to={`${mainOrigin}/a/privacy-footer`} target="_blank">
        <P3
          className="text-gray-600 underline underline-offset-[4px]"
          text="隱私政策"
        />
      </ExternalLink>
      <P3 className="text-gray-600" text="｜" />
      <ExternalLink
        to={'https://twreporter.gitbook.io/the-reporter-brand-guidelines'}
        target="_blank"
      >
        <P3
          className="text-gray-600 underline underline-offset-[4px]"
          text="品牌規範"
        />
      </ExternalLink>
    </>
  )
}

export const LinkButtonGroups = ({
  linksGroups,
}: {
  releaseBranch: ReleaseBranch
  linksGroups: LinkType[][]
}) => {
  return _.map(linksGroups, (links, indexofGroup) => {
    return (
      <div
        key={indexofGroup}
        className={clsx(
          'flex flex-col gap-[8px] basis-1/3',
          'desktop:w-[120px] desktop:gap-[16px] desktop:basis-auto'
        )}
      >
        {_.map(links, (link, indexofLink) => {
          return (
            <ExternalLink
              key={indexofLink}
              to={link.link}
              target="_blank"
              id={link.gtmID}
            >
              <P2
                className="text-gray-600 hover:text-gray-800"
                text={link.text}
              />
            </ExternalLink>
          )
        })}
      </div>
    )
  })
}

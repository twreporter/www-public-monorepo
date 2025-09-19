import type React from 'react'
import clsx from 'clsx'

import { RELEASE_BRANCH, type ReleaseBranch } from '../constants/release-branch'
import {
  ICON_TYPE,
  type IconType,
  ARROW_DIRECTION,
  type ArrowDirection,
  MEDIA_TYPE,
  type MediaType,
} from './enum'

const baseGCSDir = 'https://www.twreporter.org/assets/icon/'

type IconProps = {
  type?: IconType
  filename: string
  releaseBranch?: ReleaseBranch
  className?: string
}
export const Icon: React.FC<IconProps> & {
  Type: typeof ICON_TYPE
  ReleaseBranch: typeof RELEASE_BRANCH
} = ({
  type = ICON_TYPE.mask,
  filename,
  releaseBranch = RELEASE_BRANCH.master,
  className = '',
}) => {
  const src = `${baseGCSDir}${releaseBranch}/${filename}.svg`

  if (type === ICON_TYPE.raw) {
    return (
      // biome-ignore lint/performance/noImgElement: use next image later
      <img
        src={src}
        alt={filename}
        className={clsx('h-[24px] w-[24px]', className)}
      />
    )
  }

  return (
    <svg
      className={clsx('h-[24px] w-[24px] bg-gray-black mask-cover', className)}
      // tailwindcss seems not support dynamic values in mask-image
      style={{ maskImage: `url(${src})`, WebkitMaskImage: `url(${src})` }}
    />
  )
}

Icon.Type = ICON_TYPE
Icon.ReleaseBranch = RELEASE_BRANCH

const getIcon = (gcsFileName: string, releaseBranch: ReleaseBranch) => {
  return (
    <Icon
      filename={gcsFileName}
      releaseBranch={releaseBranch}
      type={ICON_TYPE.mask}
    />
  )
}

export const Hamburger = (releaseBranch: ReleaseBranch) =>
  getIcon('hamburger', releaseBranch)
export const Search = (releaseBranch: ReleaseBranch) =>
  getIcon('search', releaseBranch)
export const KidStar = (releaseBranch: ReleaseBranch) =>
  getIcon('kid_star', releaseBranch)
export const Member = (releaseBranch: ReleaseBranch) =>
  getIcon('member', releaseBranch)
export const Cross = (releaseBranch: ReleaseBranch) =>
  getIcon('cross', releaseBranch)

export const Arrow: React.FC<{
  direction?: ArrowDirection
  releaseBranch: ReleaseBranch
}> & {
  Direction: typeof ARROW_DIRECTION
} = ({ direction = ARROW_DIRECTION.right, releaseBranch }) => {
  const filename = `arrow_${direction}`
  return <Icon filename={filename} releaseBranch={releaseBranch} />
}
Arrow.Direction = ARROW_DIRECTION

type SocialMediaProps = {
  type?: IconType
  mediaType: MediaType
  releaseBranch: ReleaseBranch
}
export const SocialMedia: React.FC<SocialMediaProps> & {
  Type: typeof ICON_TYPE
  MediaType: typeof MEDIA_TYPE
} = ({
  type = Icon.Type.mask,
  mediaType = MEDIA_TYPE.google,
  releaseBranch = Icon.ReleaseBranch.master,
}) => {
  return <Icon filename={mediaType} type={type} releaseBranch={releaseBranch} />
}
SocialMedia.Type = ICON_TYPE
SocialMedia.MediaType = MEDIA_TYPE

import type React from 'react'
// utils
import pathUtil from '../utils/path'
// constants
import {
  RELEASE_BRANCH,
  type ReleaseBranch,
} from '../../constants/release-branch'
import { LOGO, LOGO_TYPE, type LogoType } from '../constants'

type LogoHeaderProps = {
  type: LogoType
  releaseBranch?: ReleaseBranch
} & React.ImgHTMLAttributes<HTMLImageElement>

const LogoHeader: React.FC<LogoHeaderProps> & { Type: typeof LOGO_TYPE } = ({
  type = LOGO_TYPE.default,
  releaseBranch = RELEASE_BRANCH.master,
  ...props
}) => {
  const logoSrc = pathUtil.selectLogoPath(LOGO.header, releaseBranch, type)

  return (
    // biome-ignore lint/performance/noImgElement: use next image later
    <img alt="The Reporter Logo" src={logoSrc} {...props} />
  )
}

LogoHeader.Type = LOGO_TYPE

export default LogoHeader

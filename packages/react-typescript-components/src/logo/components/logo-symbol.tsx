import type React from 'react'
// utils
import pathUtil from '../utils/path'
// constants
import {
  RELEASE_BRANCH,
  type ReleaseBranch,
} from '../../constants/release-branch'
import { LOGO, LOGO_SYMBOL_TYPE, type LogoSymbolType } from '../constants'

type LogoSymbolProps = {
  type: LogoSymbolType
  releaseBranch?: ReleaseBranch
} & React.ImgHTMLAttributes<HTMLImageElement>

const LogoSymbol: React.FC<LogoSymbolProps> & {
  Type: typeof LOGO_SYMBOL_TYPE
} = ({
  type = LOGO_SYMBOL_TYPE.default,
  releaseBranch = RELEASE_BRANCH.master,
  ...props
}) => {
  const logoSrc = pathUtil.selectLogoPath(LOGO.symbol, releaseBranch, type)

  return (
    // biome-ignore lint/performance/noImgElement: use next image later
    <img alt="The Reporter Logo" src={logoSrc} {...props} />
  )
}

LogoSymbol.Type = LOGO_SYMBOL_TYPE

export default LogoSymbol

import { useState, type FC } from 'react'
// components
import { LogoFooter } from '../logo'
import { InternalLink } from '../customized-link'
// constants
import { RELEASE_BRANCH, type ReleaseBranch } from '../constants/release-branch'

type LogoProps = {
  releaseBranch?: ReleaseBranch
}
const Logo: FC<LogoProps> = ({ releaseBranch = RELEASE_BRANCH.master }) => {
  const [isHover, setIsHover] = useState(false)
  return (
    <InternalLink
      to="/"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <LogoFooter
        releaseBranch={releaseBranch}
        type={isHover ? LogoFooter.Type.default : LogoFooter.Type.white}
      />
    </InternalLink>
  )
}

export default Logo

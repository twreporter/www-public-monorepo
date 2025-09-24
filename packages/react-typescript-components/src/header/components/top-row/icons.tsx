import { useContext, type FC } from 'react'
// context
import { HeaderContext } from '../../context'
// constants
import { THEME, type Theme } from '../../../constants/theme'
import {
  RELEASE_BRANCH,
  type ReleaseBranch,
} from '../../../constants/release-branch'
import { INTERNAL_LINKS } from '../../../constants/internal-links'
// icons
import { Search, KidStar, Member } from '../../../icons'
// button
import { IconButton } from '../../../button'
// link
import { ExternalLink, InternalLink } from '../../../customized-link'

export const Icons: FC<{
  releaseBranch?: ReleaseBranch
  theme?: Theme
}> = ({ releaseBranch = RELEASE_BRANCH.master, theme = THEME.normal }) => {
  const { isLinkExternal } = useContext(HeaderContext)
  const LinkComponent = isLinkExternal ? ExternalLink : InternalLink
  return (
    <div className="ml-[24px] flex flex-row gap-[16px]">
      <IconButton iconComponent={Search(releaseBranch)} theme={theme} />
      <LinkComponent to={INTERNAL_LINKS.myReading.index}>
        <IconButton iconComponent={KidStar(releaseBranch)} theme={theme} />
      </LinkComponent>
      <LinkComponent to={INTERNAL_LINKS.account.index}>
        <IconButton iconComponent={Member(releaseBranch)} theme={theme} />
      </LinkComponent>
    </div>
  )
}

import type React from 'react'
// constants
import { THEME, type Theme } from '../../../constants/theme'
import {
  RELEASE_BRANCH,
  type ReleaseBranch,
} from '../../../constants/release-branch'
// icons
import { Search, KidStar, Member } from '../../../icons'
// button
import { IconButton } from '../../../button'

export const Icons: React.FC<{
  releaseBranch?: ReleaseBranch
  theme?: Theme
}> = ({ releaseBranch = RELEASE_BRANCH.master, theme = THEME.normal }) => {
  return (
    <div className="ml-[24px] flex flex-row gap-[16px]">
      <IconButton iconComponent={Search(releaseBranch)} theme={theme} />
      <IconButton iconComponent={KidStar(releaseBranch)} theme={theme} />
      <IconButton iconComponent={Member(releaseBranch)} theme={theme} />
    </div>
  )
}

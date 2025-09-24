import { createContext } from 'react'

import { THEME, type Theme } from '../../constants/theme'
import {
  RELEASE_BRANCH,
  type ReleaseBranch,
} from '../../constants/release-branch'

export type HeaderContextType = {
  theme: Theme
  releaseBranch: ReleaseBranch
  isLinkExternal: boolean
  isAuthed: boolean
  pathname: string
  referrerPath: string
  toUseNarrow: boolean
  hideHeader: boolean
}
export const HeaderContext = createContext<HeaderContextType>({
  theme: THEME.normal,
  releaseBranch: RELEASE_BRANCH.master,
  isLinkExternal: false,
  isAuthed: false,
  pathname: '',
  referrerPath: '',
  toUseNarrow: false,
  hideHeader: false,
})

export type HamburgerContextType = {
  toggleHamburger: () => void
  closeHamburgerMenu: () => void
  isHamburgerMenuOpen: boolean
}
export const HamburgerContext = createContext<HamburgerContextType>({
  toggleHamburger: () => {},
  closeHamburgerMenu: () => {},
  isHamburgerMenuOpen: false,
})

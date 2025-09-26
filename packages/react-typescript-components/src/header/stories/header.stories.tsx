import type { Meta, StoryObj } from '@storybook/react-vite'
import Header from '..'
import {
  RELEASE_BRANCH,
  type ReleaseBranch,
} from '../../constants/release-branch'
import { THEME, type Theme } from '../../constants/theme'
import { HamburgerContext, type HamburgerContextType } from '../context'
import { useState } from 'react'

type HeaderStoryArgs = {
  releaseBranch: ReleaseBranch
  isLinkExternal: boolean
  theme: Theme
  pathname: string
  referrerPath: string
  hamburgerContext: HamburgerContextType
}

const meta = {
  title: 'Navigation/Header',
  component: Header,
  argTypes: {
    theme: { control: 'radio', options: Object.values(THEME) },
    releaseBranch: { control: 'radio', options: Object.values(RELEASE_BRANCH) },
  },
  render: (args: HeaderStoryArgs) => {
    const [isOpen, setIsOpen] = useState(false)
    const hamburgerContext: HamburgerContextType = {
      isHamburgerMenuOpen: isOpen,
      toggleHamburger: () => setIsOpen((o) => !o),
      closeHamburgerMenu: () => setIsOpen(false),
    }
    const { hamburgerContext: _ignored, ...rest } = args
    return (
      <HamburgerContext value={hamburgerContext}>
        <Header {...rest} hamburgerContext={hamburgerContext} />
        <div className="h-[3000px]"></div>
      </HamburgerContext>
    )
  },
} satisfies Meta<HeaderStoryArgs>

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    releaseBranch: RELEASE_BRANCH.master,
    theme: THEME.normal,
    isLinkExternal: false,
    pathname: '/',
    referrerPath: '/',
    hamburgerContext: {
      isHamburgerMenuOpen: false,
      toggleHamburger: () => {},
      closeHamburgerMenu: () => {},
    },
  },
  parameters: {
    controls: {
      exclude: [
        'isLinkExternal',
        'pathname',
        'referrerPath',
        'hamburgerContext',
      ],
    },
  },
}

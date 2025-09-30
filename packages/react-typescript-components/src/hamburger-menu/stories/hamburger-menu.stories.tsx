import type { Meta, StoryObj } from '@storybook/react-vite'
import type { StoryContext } from '@storybook/react'
// utils
import { getRadioArgFromObject } from '../../storybook/utils/get-enum-arg'
// constants
import {
  RELEASE_BRANCH,
  type ReleaseBranch,
} from '../../constants/release-branch'
import { THEME, type Theme } from '../../constants/theme'
import HamburgerMenu from '..'
import {
  HeaderContext,
  HamburgerContext,
  type HamburgerContextType,
} from '../../header/context'

interface StoryExtraArgs {
  theme: Theme
  releaseBranch: ReleaseBranch
}

const mockHamburgerContext: HamburgerContextType = {
  isHamburgerMenuOpen: true,
  toggleHamburger: () => {},
  closeHamburgerMenu: () => {},
}

const meta = {
  title: 'Navigation/HamburgerMenu',
  component: HamburgerMenu,
  argTypes: {
    theme: getRadioArgFromObject(THEME, THEME.normal),
    releaseBranch: getRadioArgFromObject(RELEASE_BRANCH, RELEASE_BRANCH.master),
  },
  args: {
    theme: THEME.normal,
    releaseBranch: RELEASE_BRANCH.master,
  },
  decorators: [
    (Story, ctx: StoryContext & { args: Partial<StoryExtraArgs> }) => {
      const { theme = THEME.normal, releaseBranch = RELEASE_BRANCH.master } =
        ctx.args || {}
      return (
        <HeaderContext
          value={{
            releaseBranch,
            isLinkExternal: false,
            isAuthed: false,
            theme,
            pathname: '/',
            referrerPath: '/',
            toUseNarrow: false,
            hideHeader: false,
          }}
        >
          <HamburgerContext value={mockHamburgerContext}>
            <div className="h-screen w-[360px]">
              <Story {...ctx} />
            </div>
          </HamburgerContext>
        </HeaderContext>
      )
    },
  ],
} satisfies Meta<typeof HamburgerMenu>

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {}

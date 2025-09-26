import type { Meta, StoryObj } from '@storybook/react-vite'
import type { StoryContext } from '@storybook/react'
import HamburgerMenu from '..'
import {
  HeaderContext,
  HamburgerContext,
  type HamburgerContextType,
} from '../../header/context'
import { RELEASE_BRANCH } from '../../constants/release-branch'
import { THEME } from '../../constants/theme'

// Derive union types from THEME and RELEASE_BRANCH objects
type Theme = (typeof THEME)[keyof typeof THEME]
type ReleaseBranch = (typeof RELEASE_BRANCH)[keyof typeof RELEASE_BRANCH]

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
    theme: { control: 'radio', options: Object.values(THEME) },
    releaseBranch: { control: 'radio', options: Object.values(RELEASE_BRANCH) },
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

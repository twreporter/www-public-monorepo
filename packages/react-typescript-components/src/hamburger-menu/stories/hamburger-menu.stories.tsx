import type { Meta, StoryObj } from '@storybook/react-vite'
import HamburgerMenu from '..'
import {
  HeaderContext,
  HamburgerContext,
  type HamburgerContextType,
} from '../../header/context'
import { RELEASE_BRANCH } from '../../constants/release-branch'
import { THEME } from '../../constants/theme'

const mockHamburgerContext: HamburgerContextType = {
  isHamburgerMenuOpen: true,
  toggleHamburger: () => {},
  closeHamburgerMenu: () => {},
}

const meta = {
  title: 'Navigation/HamburgerMenu',
  component: HamburgerMenu,
  decorators: [
    (Story, ctx) => (
      <HeaderContext
        value={{
          releaseBranch: RELEASE_BRANCH.master,
          isLinkExternal: false,
          isAuthed: false,
          theme: THEME.normal,
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
    ),
  ],
} satisfies Meta<typeof HamburgerMenu>

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {}

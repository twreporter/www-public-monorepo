import type { Meta, StoryObj } from '@storybook/react-vite'
import { DropdownMenu } from '..'
import { RELEASE_BRANCH } from '../../constants/release-branch'
import { THEME } from '../../constants/theme'
import { HeaderContext } from '../../header/context'

const meta = {
  title: 'Navigation/DropdownMenu',
  component: DropdownMenu,
  decorators: [
    (Story, ctx) => {
      // Provide minimal HeaderContext so DropdownMenu can read theme / releaseBranch / link mode
      return (
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
          <div className="w-[300px] bg-white">
            <Story {...ctx} />
          </div>
        </HeaderContext>
      )
    },
  ],
  argTypes: {
    isActive: { control: 'boolean' },
  },
} satisfies Meta<typeof DropdownMenu>

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    text: '更多',
    isActive: true,
    dropdownItems: [
      { label: '條目一', to: '/a', target: '_self' },
      { label: '條目二', to: '/b', target: '_self' },
      { label: '條目三', to: '/c', target: '_self' },
    ],
  },
  parameters: { controls: { exclude: [] } },
}

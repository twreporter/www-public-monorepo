import type { Meta, StoryObj } from '@storybook/react-vite'
import { LogoHeader, LogoSymbol } from '..'
import { RELEASE_BRANCH } from '../../constants/release-branch'
import { LOGO_SYMBOL_TYPE, LOGO_TYPE } from '../constants'

const meta = {
  title: 'Brand/Logo',
  component: LogoHeader,
  argTypes: {
    type: { control: 'radio', options: Object.values(LOGO_TYPE) },
    releaseBranch: { control: 'radio', options: Object.values(RELEASE_BRANCH) },
  },
  decorators: [
    (Story) => (
      <div className="h-screen bg-gray-300 p-[20px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LogoHeader>

export default meta

type Story = StoryObj<typeof meta>

export const Header: Story = {
  args: {
    type: LOGO_TYPE.default,
    releaseBranch: RELEASE_BRANCH.master,
  },
}

export const SymbolLogo: Story = {
  args: {
    type: LOGO_SYMBOL_TYPE.default,
    releaseBranch: RELEASE_BRANCH.master,
  },
  render: (args) => (
    <LogoSymbol type={args.type} releaseBranch={args.releaseBranch} />
  ),
}

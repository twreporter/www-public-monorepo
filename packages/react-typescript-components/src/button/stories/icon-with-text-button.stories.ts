import type { Meta, StoryObj } from '@storybook/react-vite'
// utils
import { getRadioArgFromObject } from '../../storybook/utils/get-enum-arg'
// components
import IconWithTextButton from '../components/icon-with-text-button'
// constants
import { RELEASE_BRANCH } from '../../constants/release-branch'
// icons
import { Cross } from '../../icons'

const meta = {
  title: 'Button/IconWithTextButton',
  component: IconWithTextButton,
  argTypes: {
    theme: getRadioArgFromObject(
      IconWithTextButton.Theme,
      IconWithTextButton.Theme.normal
    ),
  },
} satisfies Meta<typeof IconWithTextButton>

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    text: '關閉',
    iconComponent: Cross(RELEASE_BRANCH.master),
    theme: IconWithTextButton.Theme.normal,
    disabled: false,
    active: false,
    hideText: false,
  },
  parameters: {
    controls: { exclude: ['className', 'onClick', 'iconComponent'] },
  },
}

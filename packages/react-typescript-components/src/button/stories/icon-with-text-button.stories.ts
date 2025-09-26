import type { Meta, StoryObj } from '@storybook/react-vite'
// utils
import { getRadioArgFromObject } from '../../storybook/utils/get-enum-arg'
// components
import IconWithTextButton from '../components/icon-with-text-button'
// icons
import { Cross } from '../../icons'
import { THEME } from '../../constants/theme'

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
    iconComponent: Cross('master'),
    theme: THEME.normal,
    disabled: false,
    active: false,
    hideText: false,
  },
  parameters: {
    controls: { exclude: ['className', 'onClick', 'iconComponent'] },
  },
}

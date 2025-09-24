import type { Meta, StoryObj } from '@storybook/react-vite'
// utils
import { getRadioArgFromObject } from '../../storybook/utils/get-enum-arg'
// components
import PillButton from '../components/pill-button'

const meta = {
  title: 'Button/PillButton',
  component: PillButton,
  argTypes: {
    type: getRadioArgFromObject(PillButton.Type, PillButton.Type.primary),
    size: getRadioArgFromObject(PillButton.Size, PillButton.Size.s),
    theme: getRadioArgFromObject(PillButton.Theme, PillButton.Theme.normal),
    style: getRadioArgFromObject(PillButton.Style, PillButton.Style.dark),
  },
} satisfies Meta<typeof PillButton>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    text: '文字',
    type: PillButton.Type.primary,
    size: PillButton.Size.s,
    theme: PillButton.Theme.normal,
    style: PillButton.Style.dark,
    disabled: false,
    loading: false,
  },
  parameters: { controls: { exclude: ['className'] } },
}

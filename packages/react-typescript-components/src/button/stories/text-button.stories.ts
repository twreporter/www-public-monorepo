import type { Meta, StoryObj } from '@storybook/react-vite'
// utils
import {
  getRadioArgFromObject,
  getRadioArgFromEnum,
} from '../../storybook/utils/get-enum-arg'
// components
import TextButton from '../components/text-button'

const meta = {
  title: 'Button/TextButton',
  component: TextButton,
  argTypes: {
    size: getRadioArgFromEnum(TextButton.Size, TextButton.Size.s),
    theme: getRadioArgFromObject(TextButton.Theme, TextButton.Theme.normal),
    style: getRadioArgFromEnum(TextButton.Style, TextButton.Style.dark),
  },
} satisfies Meta<typeof TextButton>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    text: '文字',
    size: TextButton.Size.s,
    theme: TextButton.Theme.normal,
    style: TextButton.Style.dark,
    active: false,
    disabled: false,
    loading: false,
  },
  parameters: { controls: { exclude: ['className'] } },
}

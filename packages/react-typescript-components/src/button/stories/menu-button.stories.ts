import type { Meta, StoryObj } from '@storybook/react-vite'
// utils
import { getRadioArgFromObject } from '../../storybook/utils/get-enum-arg'
// components
import MenuButton from '../components/menu-button'

const meta = {
  title: 'Button/MenuButton',
  component: MenuButton,
  argTypes: {
    fontWeight: getRadioArgFromObject(
      MenuButton.FontWeight,
      MenuButton.FontWeight.normal
    ),
  },
} satisfies Meta<typeof MenuButton>

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    text: '選單項目',
    color: 'text-gray-900',
    fontWeight: MenuButton.FontWeight.normal,
  },
  parameters: { controls: { exclude: ['className', 'p1ClassName'] } },
}

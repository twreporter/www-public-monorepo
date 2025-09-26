import type { Meta, StoryObj } from '@storybook/react-vite'
// components
import MenuButton from '../components/menu-button'
import { WEIGHT } from '../../text/constants'

const meta = {
  title: 'Button/MenuButton',
  component: MenuButton,
  argTypes: {
    fontWeight: {
      control: 'radio',
      options: Object.values(MenuButton.FontWeight),
    },
  },
} satisfies Meta<typeof MenuButton>

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    text: '選單項目',
    color: 'text-gray-900',
    fontWeight: WEIGHT.bold,
  },
  parameters: { controls: { exclude: ['className', 'p1ClassName'] } },
}

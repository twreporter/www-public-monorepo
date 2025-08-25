import type { Meta, StoryObj } from '@storybook/react-vite'
// components
import Title2 from '../components/title2'
import { TextButton } from '../../button'

const meta = {
  title: 'Title Bar/Title2',
  component: Title2,
} satisfies Meta<typeof Title2>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    title: 'RWD 標題',
    subtitle: '副標',
  },
  parameters: { controls: { exclude: ['className'] }},
}

export const WithButton: Story = {
  render: (args) => {
    const buttonJSX = (
      <TextButton
        text="NOT RWD 按鈕"
      />
    )
    return <Title2 {...args} renderButton={buttonJSX} />
  },
  args: {
    title: 'RWD 標題',
    subtitle: '副標',
  },
  parameters: { controls: { exclude: ['className', 'renderButton'] }},
}
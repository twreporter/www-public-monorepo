import type { Meta, StoryObj } from '@storybook/react-vite'
// components
import Title1 from '../components/title1'

const meta = {
  title: 'Title Bar/Title1',
  component: Title1,
} satisfies Meta<typeof Title1>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    title: '標題',
    subtitle: '副標',
  },
  parameters: { controls: { exclude: ['className'] } },
}

export const TagBar: Story = {
  args: {
    title: '#報導者',
  },
  parameters: { controls: { exclude: ['subtitle', 'className'] } },
}

export const BookmarkBar: Story = {
  args: {
    title: '我的書籤',
    subtitle: '全部 55',
  },
  parameters: { controls: { exclude: ['className'] } },
}

import type { Meta, StoryObj } from '@storybook/react-vite'
// components
import TitleTab from '../components/title-tab'

const meta = {
  title: 'Title Bar/Title Tab',
  component: TitleTab,
} satisfies Meta<typeof TitleTab>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    title: '主分類',
    tabs: [
      { text: '子分類1', isExternal: true, link: 'https://www.google.com' },
      { text: '子分類2', isExternal: true, link: 'https://www.google.com' },
      { text: '子分類3', isExternal: true, link: 'https://www.google.com' },
      { text: '子分類4', isExternal: true, link: 'https://www.google.com' },
      { text: '子分類5', isExternal: true, link: 'https://www.google.com' },
      { text: '子分類6', isExternal: true, link: 'https://www.google.com' },
    ]
  },
  parameters: { controls: { exclude: ['className'] }},
}

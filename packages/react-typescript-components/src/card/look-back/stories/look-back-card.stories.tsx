import type { Meta, StoryObj } from '@storybook/react-vite'
// component
import LookBackCard from '../index'

const meta = {
  title: 'Card/Look Back',
  component: LookBackCard,
} satisfies Meta<typeof LookBackCard>

export default meta
export const Basic: StoryObj<typeof meta> = {
  args: {
    reviewWord: '科技',
    title: '測試文章標題',
    ogDescription:
      '這是一篇測試文章描述。這是一篇測試文章描述。這是一篇測試文章描述。這是一篇測試文章描述。這是一篇測試文章描述。這是一篇測試文章描述。',
    bgImage: 'https://picsum.photos/id/237/200/300',
  },
  parameters: { controls: { exclude: ['className'] } },
}

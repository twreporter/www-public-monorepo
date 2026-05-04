import type { Meta, StoryObj } from '@storybook/react-vite'
// utils
import { getRadioArgFromObject } from '../../storybook/utils/get-enum-arg'
// component
import ArticleCard from '../article'

const meta = {
  title: 'Card/Article',
  component: ArticleCard,
  argTypes: {
    size: getRadioArgFromObject(ArticleCard.Size, ArticleCard.Size.l),
    isLoading: { control: 'boolean' },
  },
} satisfies Meta<typeof ArticleCard>

export default meta
export const Basic: StoryObj<typeof meta> = {
  args: {
    size: ArticleCard.Size.l,
    categoryLabel: '科技',
    title: '測試文章標題',
    description: '這是一篇測試文章描述。',
    publishedDate: '2024-01-01',
    image: {
      src: 'https://picsum.photos/id/237/200/300',
      alt: 'placeholder',
    },
    isLoading: false,
  },
  parameters: { controls: { exclude: ['className'] } },
}

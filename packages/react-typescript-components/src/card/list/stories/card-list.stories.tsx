import type { Meta, StoryObj } from '@storybook/react-vite'
// utils
import { getRadioArgFromObject } from '../../../storybook/utils/get-enum-arg'
// component
import CardList from '../index'

const meta = {
  title: 'Card/Card List',
  component: CardList,
  argTypes: {
    size: getRadioArgFromObject(CardList.Size, CardList.Size.l),
    isLoading: { control: 'boolean' },
  },
} satisfies Meta<typeof CardList>

export default meta
export const Basic: StoryObj<typeof meta> = {
  args: {
    size: CardList.Size.l,
    category: '科技',
    title: '測試文章標題',
    description: '這是一篇沒有分類的測試文章描述。',
    publishedDate: '2024-01-01',
    image: {
      src: 'https://picsum.photos/id/237/200/300',
      alt: 'placeholder',
    },
    isLoading: false,
  },
  parameters: { controls: { exclude: ['className'] } },
}

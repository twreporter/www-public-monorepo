import type { Meta, StoryObj } from '@storybook/react-vite'
// utils
import { getRadioArgFromObject } from '../../../storybook/utils/get-enum-arg'
// component
import ShortCard from '../index'

const meta = {
  title: 'Card/Short',
  component: ShortCard,
  argTypes: {
    size: getRadioArgFromObject(ShortCard.Size, ShortCard.Size.l),
  },
} satisfies Meta<typeof ShortCard>

export default meta
export const Basic: StoryObj<typeof meta> = {
  args: {
    size: ShortCard.Size.l,
    categoryLabel: '科技',
    title: '測試文章標題',
    publishedDate: '2024-01-01',
    image: {
      src: 'https://picsum.photos/id/237/200/300',
      alt: 'placeholder',
    },
  },
  parameters: { controls: { exclude: ['className'] } },
}

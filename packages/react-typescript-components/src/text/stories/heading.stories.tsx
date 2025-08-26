import type { Meta, StoryObj } from '@storybook/react-vite'
// utils
import { getRadioArgFromEnum } from '../../storybook/utils/get-enum-arg'
// components
import { H1, H2, H3, H4, H5, H6 } from '../heading'

const meta = {
  title: 'Text/Headline',
  component: H1,
  argTypes: {
    type: getRadioArgFromEnum(H1.Type, H1.Type.default),
  },
} satisfies Meta<typeof H1>

export default meta
type Story = StoryObj<typeof meta>

const defaultArg = {
  text: '標題「標題」：標題，《標題》標題English標題123標題？',
  type: H1.Type.default,
}

export const h1: Story = {
  args: defaultArg,
  parameters: { controls: { exclude: ['className'] } },
}

export const h2: Story = {
  render: (args) => <H2 {...args} />,
  args: defaultArg,
  parameters: { controls: { exclude: ['className'] } },
}

export const h3: Story = {
  render: (args) => <H3 {...args} />,
  args: defaultArg,
  parameters: { controls: { exclude: ['className'] } },
}

export const h4: Story = {
  render: (args) => <H4 {...args} />,
  args: defaultArg,
  parameters: { controls: { exclude: ['className'] } },
}

export const h5: Story = {
  render: (args) => <H5 {...args} />,
  args: defaultArg,
  parameters: { controls: { exclude: ['className'] } },
}

export const h6: Story = {
  render: (args) => <H6 {...args} />,
  args: defaultArg,
  parameters: { controls: { exclude: ['className'] } },
}

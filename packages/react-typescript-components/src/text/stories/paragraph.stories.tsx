import type { Meta, StoryObj } from '@storybook/react-vite'
// utils
import { getRadioArgFromEnum } from '../../storybook/utils/get-enum-arg'
// components
import { P1, P2, P3, P4 } from '../paragraph'

const meta = {
  title: 'Text/Paragraph',
  component: P1,
  argTypes: {
    weight: getRadioArgFromEnum(P1.Weight, P1.Weight.normal),
  }
} satisfies Meta<typeof P1>

export default meta
type Story = StoryObj<typeof meta>

const defaultArg = {
  text: '內文「內文」：內文，《內文》內文English內文123內文？',
  weight: P1.Weight.normal
}

export const p1: Story = {
  args: defaultArg,
  parameters: { controls: { exclude: ['className'] }},
}

export const p2: Story = {
  render: args => <P2 {...args} />,
  args: defaultArg,
  parameters: { controls: { exclude: ['className'] }},
}

export const p3: Story = {
  render: args => <P3 {...args} />,
  args: defaultArg,
  parameters: { controls: { exclude: ['className'] }},
}

export const p4: Story = {
  render: args => <P4 {...args} />,
  args: defaultArg,
  parameters: { controls: { exclude: ['className'] }},
}
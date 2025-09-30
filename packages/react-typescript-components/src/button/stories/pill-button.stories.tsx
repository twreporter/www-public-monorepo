import type { Meta, StoryObj } from '@storybook/react-vite'
// utils
import { getRadioArgFromObject } from '../../storybook/utils/get-enum-arg'
// component
import PillButton from '../components/pill-button'
// icons
import { Cross } from '../../icons'
import { RELEASE_BRANCH } from '../../constants/release-branch'
import type React from 'react'

// Extend story args with virtual controls showLeft/showRight (not real component props)
type PillButtonStoryArgs = React.ComponentProps<typeof PillButton> & {
  showLeft?: boolean
  showRight?: boolean
}

const meta: Meta<PillButtonStoryArgs> = {
  title: 'Button/PillButton',
  component: PillButton,
  argTypes: {
    type: getRadioArgFromObject(PillButton.Type, PillButton.Type.primary),
    size: getRadioArgFromObject(PillButton.Size, PillButton.Size.s),
    theme: getRadioArgFromObject(PillButton.Theme, PillButton.Theme.normal),
    style: getRadioArgFromObject(PillButton.Style, PillButton.Style.dark),
    // showLeft & showRight args are only for storybook check
    showLeft: { control: 'boolean' },
    showRight: { control: 'boolean' },
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    text: '文字',
    type: PillButton.Type.primary,
    size: PillButton.Size.s,
    theme: PillButton.Theme.normal,
    style: PillButton.Style.dark,
    disabled: false,
    loading: false,
  },
  parameters: {
    controls: {
      exclude: [
        'className',
        'leftIconComponent',
        'rightIconComponent',
        'showLeft',
        'showRight',
      ],
    },
  },
}

export const ToggleIconDisplay: Story = {
  args: {
    text: '文字',
    type: PillButton.Type.primary,
    size: PillButton.Size.s,
    theme: PillButton.Theme.normal,
    style: PillButton.Style.dark,
    disabled: false,
    loading: false,
    showLeft: true,
    showRight: true,
  },
  parameters: {
    controls: {
      exclude: ['className', 'leftIconComponent', 'rightIconComponent'],
    },
  },
  render: ({ showLeft, showRight, ...rest }) => (
    <PillButton
      {...rest}
      leftIconComponent={showLeft ? Cross(RELEASE_BRANCH.master) : undefined}
      rightIconComponent={showRight ? Cross(RELEASE_BRANCH.master) : undefined}
    />
  ),
}

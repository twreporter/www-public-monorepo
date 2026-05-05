import type { Meta, StoryObj } from '@storybook/react-vite'
// utils
import { getRadioArgFromObject } from '../../storybook/utils/get-enum-arg'
// component
import EmptyStateV2 from '../empty-state-v2'
import { PillButton } from '../../button'
// constants
import { STYLE } from '../constants'
import { RELEASE_BRANCH } from '../../constants/release-branch'

const meta: Meta<typeof EmptyStateV2> = {
  title: 'EmptyState/EmptyStateV2',
  component: EmptyStateV2,
  argTypes: {
    releaseBranch: getRadioArgFromObject(RELEASE_BRANCH, RELEASE_BRANCH.master),
    style: getRadioArgFromObject(STYLE, STYLE.default),
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    title: '文字',
    guide: '文字文字',
    maxWidth: '280px',
    buttonComponents: [
      <PillButton text="按鈕" key={1} />,
      <PillButton text="按鈕" type={PillButton.Type.secondary} key={2} />,
    ],
  },
}

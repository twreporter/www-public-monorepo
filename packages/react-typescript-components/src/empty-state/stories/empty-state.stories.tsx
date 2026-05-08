import type { Meta, StoryObj } from '@storybook/react-vite'
// utils
import { getRadioArgFromObject } from '../../storybook/utils/get-enum-arg'
// component
import EmptyState from '../empty-state'
// constants
import { STYLE } from '../constants'
import { RELEASE_BRANCH } from '../../constants/release-branch'

const meta: Meta<typeof EmptyState> = {
  title: 'EmptyState/EmptyState',
  component: EmptyState,
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
    showGuide: true,
    guide: '文字文字',
    showButton: true,
    buttonText: '按鈕',
    buttonUrl: '/',
    maxWidth: '280px',
  },
}

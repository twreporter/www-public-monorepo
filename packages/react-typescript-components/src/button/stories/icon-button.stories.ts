import type { Meta, StoryObj } from '@storybook/react-vite'
// utils
import { getRadioArgFromObject } from '../../storybook/utils/get-enum-arg'
// components
import IconButton from '../components/icon-button'
// constants
import { RELEASE_BRANCH } from '../../constants/release-branch'
// example icon
import { Cross } from '../../icons'

const meta = {
  title: 'Button/IconButton',
  component: IconButton,
  argTypes: {
    theme: getRadioArgFromObject(IconButton.Theme, IconButton.Theme.normal),
    type: getRadioArgFromObject(IconButton.Type, IconButton.Type.primary),
  },
} satisfies Meta<typeof IconButton>

export default meta

// create basic story
export const Basic: StoryObj<typeof meta> = {
  args: {
    iconComponent: Cross(RELEASE_BRANCH.master),
    theme: IconButton.Theme.normal,
    type: IconButton.Type.primary,
    disabled: false,
    active: false,
  },
  parameters: {
    controls: { exclude: ['className', 'onClick', 'iconComponent'] },
  },
}

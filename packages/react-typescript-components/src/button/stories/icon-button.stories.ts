import type { Meta, StoryObj } from '@storybook/react-vite'
// utils
import { getRadioArgFromObject } from '../../storybook/utils/get-enum-arg'
// components
import IconButton from '../components/icon-button'
// icons (pick one existing icon for showcase)
import { Cross } from '../../icons'
import { THEME } from '../../constants/theme'
import { TYPE } from '../constants'

const meta = {
  title: 'Button/IconButton',
  component: IconButton,
  argTypes: {
    theme: getRadioArgFromObject(IconButton.Theme, IconButton.Theme.normal),
    type: getRadioArgFromObject(TYPE, TYPE.primary),
  },
} satisfies Meta<typeof IconButton>

export default meta

// create basic story
export const Basic: StoryObj<typeof meta> = {
  args: {
    iconComponent: Cross('master'),
    theme: THEME.normal,
    type: TYPE.primary,
    disabled: false,
    active: false,
  },
  parameters: {
    controls: { exclude: ['className', 'onClick', 'iconComponent'] },
  },
}

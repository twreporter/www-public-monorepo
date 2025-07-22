/** @jsxRuntime classic */
/** @jsx jsx */

import type { AdminConfig } from '@keystone-6/core/types'
import { jsx } from '@keystone-ui/core'
import { CustomNavigation } from './components/CustomNavigation'

function CustomLogo() {
  return <h3>報導者 CMS</h3>
}

export const components: AdminConfig['components'] = {
  Logo: CustomLogo,
  Navigation: CustomNavigation,
}

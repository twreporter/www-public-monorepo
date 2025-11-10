import type { StorybookConfig } from '@storybook/react-vite'

import { join, dirname } from 'node:path'

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')))
}
const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [getAbsolutePath('@storybook/addon-docs')],
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },
  // Support deployment to different paths (dev, staging, production)
  core: {
    disableTelemetry: true,
  },
  // Use environment variable to set the base path for GitHub Pages deployment
  managerHead: (head) => `
    ${head}
    ${process.env.STORYBOOK_BASE_PATH ? `<base href="${process.env.STORYBOOK_BASE_PATH}/">` : ''}
  `,
  async viteFinal(config) {
    const { mergeConfig } = await import('vite')
    return mergeConfig(config, {
      base: process.env.STORYBOOK_BASE_PATH || '/',
      define: {
        'process.env': {},
      },
    })
  },
}
export default config

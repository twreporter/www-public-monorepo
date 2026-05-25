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
  previewHead: (head) => `
    ${head}
    <script>
      (function(d) {
        var config = {
          kitId: 'vlk1qbe',
          scriptTimeout: 3000,
          async: true
        },
        h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
        })(document);
    </script>
  `,
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

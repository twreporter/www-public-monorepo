import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    core: 'src/core/index.ts',
    react: 'src/react/index.ts',
    'theme-emotion': 'src/themes/emotion/index.ts',
    'theme-tailwind': 'src/themes/tailwind/index.ts',
  },
  format: ['esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  splitting: false,
  treeshake: true,
  target: 'es2022',
  external: [
    'react',
    'react-dom',
    'react/jsx-runtime',
    'react/jsx-dev-runtime',
    'lexical',
    '@lexical/react',
    '@lexical/link',
    '@lexical/table',
    '@lexical/code',
    '@lexical/list',
    '@lexical/rich-text',
    '@lexical/selection',
    '@lexical/utils',
    '@lexical/overflow',
    '@emotion/react',
    '@emotion/css',
    '@emotion/styled'
  ]
})

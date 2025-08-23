import { defineConfig } from 'tsup'

export default defineConfig({
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  outDir: 'lib',
  external: ['next', 'react', 'react-dom'],
  target: 'esnext',
  treeshake: true,
})

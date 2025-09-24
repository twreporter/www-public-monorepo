# @twreporter/react-typescript-components

React components built with TypeScript and Tailwind CSS.

## Roadmap

- [X] add storybook
- [ ] add test

## Installation

```bash
yarn add @twreporter/react-typescript-components
# or
npm install @twreporter/react-typescript-components
```

## Peer Dependencies

Make sure your project has the following peer dependencies installed:

- react ^19.0.0
- react-dom ^19.0.0
- tailwindcss ^4.1.11

## Usage

```tsx
import { Title2 } from '@twreporter/react-typescript-components/lib/title-bar'

function App() {
  return (
    <Title2 title="Title" subtitle="Subtitle" />
  )
}
```

## Development & Build

### Storybook

Run storybook on localhost

```bash
yarn storybook
```

### Build

```bash
yarn build
```

The output files will be generated in the `lib/` directory.

### Build tool change: tsup → tsdown

We replaced tsup with tsdown for building this package due to intermittent memory crashes when generating type declarations with tsup (ERR_WORKER_OUT_OF_MEMORY). See: https://github.com/egoist/tsup/issues/920

What changed

- Components are built with tsdown (see `tsdown.config.ts`).
- Scripts:
  - `yarn build:components` runs tsdown.
  - `yarn build` cleans, builds components, then builds Tailwind CSS to `lib/styles.css`.

Impact

- No breaking changes for consumers: we still ship ESM and CJS outputs in `lib/` with bundled `.d.ts` and sourcemaps.
- For contributors: use `yarn build` or `yarn build:components`; tsup is no longer used.

## License

MIT

# @twreporter/react-typescript-components

React components built with TypeScript and Tailwind CSS.

## Roadmap

- [ ] add storybook
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

```bash
yarn build
```

The output files will be generated in the `lib/` directory.

## License

MIT

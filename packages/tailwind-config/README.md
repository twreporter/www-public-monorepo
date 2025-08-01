# @twreporter/tailwind-config

Tailwind CSS config for TW Reporter projects.

## Installation

```bash
yarn add @twreporter/tailwind-config postcss tailwindcss autoprefixer
```

## Usage

### Import shared styles

```css
@import "@twreporter/tailwind-config";
```

### Use PostCSS config

In your `postcss.config.js`:

```js
import { postcssConfig } from "@twreporter/tailwind-config/postcss";
export default postcssConfig;
```

## Peer Dependencies

- `postcss`
- `tailwindcss`
- `autoprefixer`

## License

MIT

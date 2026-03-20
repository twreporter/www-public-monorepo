# @repo/lexical-editor

Reusable Lexical editor package for the monorepo.

## Background

This package extracts the Lexical editor implementation from the Keystone 6 CMS project into a shared monorepo package.

Current goals:

- share editor logic between `cms` and `frontend`
- keep editor core independent from any single styling solution
- support multiple theme implementations
- make future editor-related features easier to maintain

## Scope

This package is intended to provide:

- editor core logic
- Lexical nodes / commands / serialization helpers
- React integration layer
- theme adapters for different consumers

This package is **not** intended to own:

- CMS global design system
- Keystone-specific page layout
- frontend app-specific business logic

## Proposed Structure

```txt
src/
  core/
  react/
  themes/
    emotion/
    tailwind/
```

### Layer Responsibilities

`core/`
Contains editor domain logic that should not be tied to a styling system.

Examples:
- nodes
- commands
- transforms
- serialization
- theme type definitions

`react/`
Contains React / Lexical React integration.

Examples:
- editor shell
- plugins
- hooks
- context
- React composition logic

`themes/`
Contains theme implementations for different consumers.

Examples:
- themes/emotion for CMS
- themes/tailwind for frontend

## Installation

This package is intended to be consumed from the monorepo workspace.

Example:
```bash
yarn workspace cms add @twreporter/lexical-editor
```
or via workspace dependency in package.json.

## Usage

Example import:
```ts
import { LexicalEditor } from '@twreporter/lexical-editor'
```

## Build

```bash
yarn workspace @twreporter/lexical-editor build
```

## Dev

```bash
yarn workspace @twreporter/lexical-editor dev
```

## Design Principles

- editor core should not depend on Emotion or Tailwind
- React integration should not hard-code a single theme implementation
- consumer-specific composition should stay outside core
- theme layer should be replaceable

## Notes

- This package currently targets React-based consumers only.
- Styling strategy is adapter-based rather than package-wide lock-in.
- CMS-specific or frontend-specific business behavior should be injected from the consumer when possible.
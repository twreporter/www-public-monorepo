# www-public-monorepo

This is a monorepo for a web application, containing a Next.js frontend and a KeystoneJS CMS.

## Tech Stack

-   **Monorepo Management**: [Yarn Workspaces](https://yarnpkg.com/features/workspaces) & [Lerna](https://lerna.js.org/)
-   **Package Manager**: [Yarn](https://yarnpkg.com/)
-   **Frontend**: [Next.js](https://nextjs.org/) 15 (with Turbopack) & [React](https://react.dev/) 19
-   **CMS**: [KeystoneJS](https://keystonejs.com/) 6
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Linting & Formatting**: [Biome](https://biomejs.dev/)
-   **Git Hooks**: [Husky](https://typicode.github.io/husky/), [lint-staged](https://github.com/lint-staged/lint-staged), [commitlint](https://commitlint.js.org/)

## Project Structure

The repository is structured as a monorepo with the following packages:

-   `packages/cms`: The KeystoneJS content management system.
-   `packages/frontend`: The Next.js frontend application.

## Prerequisites

-   [Node.js](https://nodejs.org/) (version specified in `.nvmrc` if available, otherwise latest LTS is recommended)
-   [Yarn](https://yarnpkg.com/getting-started/install)

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd www-public-monorepo
    ```

2.  **Install dependencies:**
    From the root of the project, run:
    ```bash
    yarn install
    ```

## Development

You can run the frontend and CMS in separate terminals for development.

### Running the CMS

To start the KeystoneJS development server:

```bash
yarn workspace www-cms dev
```

The CMS will be available at `http://localhost:3000` (or as configured).

### Running the Frontend

To start the Next.js frontend development server with Turbopack:

```bash
yarn workspace www-frontend dev
```

The frontend will be available at `http://localhost:3001` (or the next available port if 3000 is taken by the CMS).

## Scripts

-   `yarn lint`: Check for linting and formatting errors across the entire project.
-   `yarn lint:fix`: Automatically fix linting and formatting errors.
-   `yarn build:frontend`: Build the frontend application for production.
-   `yarn version:bump`: Create a new version of the packages using Lerna.

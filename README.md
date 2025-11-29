# Turbo Repo Boilerplate with Next.js Best Practices

🚀 A production-ready monorepo boilerplate combining **Turborepo** with **Next.js 16+ best practices**. Includes two Next.js apps (admin and web) with shared packages, TypeScript, ESLint, Prettier, testing, Storybook, and modern tooling.

Built with best practices and prioritizing developer experience: Next.js 16+, TypeScript, ESLint, Prettier, Lefthook, Vitest, Playwright, Commitlint, VSCode, Tailwind CSS 4, Error Monitoring with [Sentry](https://sentry.io/for/nextjs/), Logging with LogTape, Monitoring as Code, Storybook, Multi-language (i18n), AI-powered code reviews with CodeRabbit, Security with [Arcjet](https://launch.arcjet.com/), and more.

## ✨ Features

### Monorepo Structure

- 🏗️ **Turborepo** for fast, cached builds
- 📦 **Shared packages** with `@repo` prefix
- 🔄 **Workspace dependencies** managed with pnpm
- ⚡ **Parallel execution** and intelligent caching

### Next.js Apps

- ⚡ **Next.js 16+** with App Router
- 🔥 **TypeScript** with strict mode
- 💎 **Tailwind CSS 4**
- ✅ **React 19** with React Compiler
- 🌐 **Multi-language (i18n)** with next-intl
- 🎨 **shadcn/ui** components
- 🔄 **React Query** for data fetching
- 🗃️ **Zustand** for state management
- ⌨️ **React Hook Form** with Zod validation

### Developer Experience

- 📏 **ESLint** with Antfu config
- 💖 **Prettier** for code formatting
- 🦊 **Lefthook** for Git hooks
- 🚓 **Commitlint** for commit messages
- 📓 **Commitizen** for standard commits
- 🔍 **Knip** for unused code detection
- 🌍 **i18n-check** for translation validation
- 🗂️ **VSCode** configuration (Debug, Settings, Tasks, Extensions)

### Testing & Quality

- 🦺 **Vitest** for unit testing (with browser mode)
- 🧪 **Playwright** for E2E testing
- 🎉 **Storybook** for UI development
- ☂️ **Codecov** for code coverage
- 👷 **GitHub Actions** for CI/CD

### Monitoring & Security

- 🚨 **Sentry** for error monitoring
- 🔍 **Sentry Spotlight** for local development
- 📝 **LogTape** with Better Stack for logging
- 🖥️ **Checkly** for monitoring as code
- 🔐 **Arcjet** for security and bot protection
- 📊 **PostHog** for analytics

### Additional Features

- 🎁 **Semantic Release** for automatic changelog
- 🔍 **Visual regression testing** with Chromatic
- ⚙️ **Bundle Analyzer** for optimization
- 🤖 **SEO** metadata, JSON-LD and Open Graph
- 🗺️ **Sitemap.xml** and robots.txt
- 👷 **Dependabot** for dependency updates
- 🐰 **CodeRabbit** for AI-powered code reviews

## 📁 Project Structure

```
turbo-repo-boilerplate/
├── apps/
│   ├── admin/              # Admin interface (Next.js) - Port 3001
│   │   ├── src/
│   │   ├── .storybook/     # Storybook configuration
│   │   ├── tests/          # App-specific tests
│   │   ├── vitest.config.mts
│   │   └── playwright.config.ts
│   └── web/                # Web app (Next.js) - Port 3000
│       ├── src/
│       ├── .storybook/     # Storybook configuration
│       ├── tests/          # App-specific tests
│       ├── vitest.config.mts
│       └── playwright.config.ts
├── packages/
│   ├── eslint-config/      # Shared ESLint configuration
│   ├── typescript-config/  # Shared TypeScript configuration
│   ├── ui/                 # Shared UI components (shadcn/ui)
│   ├── utils/              # Shared utility functions
│   └── types/              # Shared TypeScript types
├── tests/
│   └── e2e/                # Shared E2E tests
├── .github/                # GitHub Actions, Dependabot, FUNDING
├── .storybook/             # Root Storybook config (if needed)
├── .vscode/                # VSCode configuration
├── docs/                   # Project documentation
├── checkly.config.ts       # Checkly monitoring config
├── codecov.yml             # Codecov configuration
├── commitlint.config.ts    # Commitlint configuration
├── knip.config.ts          # Knip configuration
├── lefthook.yml            # Lefthook Git hooks
├── playwright.config.ts    # Root Playwright config
├── vitest.config.mts       # Root Vitest config
└── turbo.json              # Turborepo configuration
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 20
- **pnpm** >= 9.0.0

### Installation

```bash
git clone <your-repo-url> my-project-name
cd my-project-name
pnpm install
```

### Development

Run all apps in development mode:

```bash
pnpm dev
```

This will start:

- **Admin app** on http://localhost:3001
- **Web app** on http://localhost:3000

Run specific app:

```bash
pnpm --filter admin dev
pnpm --filter web dev
```

### Build

Build all apps:

```bash
pnpm build
```

Build with bundle analysis:

```bash
pnpm build-stats
```

### Testing

Run unit tests:

```bash
pnpm test
```

Run E2E tests:

```bash
pnpm test:e2e
```

Run Storybook:

```bash
pnpm storybook
```

### Code Quality

Lint code:

```bash
pnpm lint
pnpm lint:fix
```

Type checking:

```bash
pnpm type-check
```

Check for unused dependencies:

```bash
pnpm check:deps
```

Check i18n translations:

```bash
pnpm check:i18n
```

### Git Hooks

The project uses **Lefthook** for Git hooks. It will automatically:

- Run linters on staged files
- Validate commit messages
- Run tests before push

### Commit Messages

Use Commitizen for standard commit messages:

```bash
pnpm commit
```

## 📦 Packages

### `@repo/ui`

Shared UI components built with shadcn/ui.

- Button component
- Input component
- More components can be added

**Usage:**

```typescript
import { Button } from '@repo/ui';
```

### `@repo/types`

Shared TypeScript type definitions.

**Usage:**

```typescript
import type { BaseEntity, ApiResponse } from '@repo/types';
```

### `@repo/utils`

Shared utility functions.

**Usage:**

```typescript
import { getBaseUrl, formatDate } from '@repo/utils';
```

### `@repo/hooks`

Shared React hooks for common functionality.

**Usage:**

```typescript
import { useDebouncedValue, useLocalStorage, useMediaQuery } from '@repo/hooks';
```

### `@repo/eslint-config`

Shared ESLint configuration for the monorepo.

### `@repo/typescript-config`

Shared TypeScript configuration for the monorepo.

## 🛠️ Tech Stack

- **Framework**: Next.js 16+
- **Language**: TypeScript 5.9+
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui
- **Monorepo**: Turborepo
- **Package Manager**: pnpm
- **State Management**: Zustand
- **Data Fetching**: React Query (TanStack Query)
- **Form Handling**: React Hook Form
- **Validation**: Zod
- **Internationalization**: next-intl
- **Monitoring**: Sentry
- **Security**: Arcjet
- **Testing**: Vitest, Playwright
- **UI Development**: Storybook

## 📚 Documentation

Comprehensive documentation is available in the `docs/` folder:

- **[Project Structure and Best Practices](./docs/project-structure-and-best-practices.md)** - Complete guide on project structure, conventions, and best practices
- **[Development Workflow](./docs/development-workflow.md)** - Git workflow, commit guidelines, and development process

## 🔧 Configuration Files

All configuration files from the Next.js boilerplate are included:

- `checkly.config.ts` - Monitoring as Code
- `codecov.yml` - Code coverage
- `commitlint.config.ts` - Commit message linting
- `knip.config.ts` - Unused code detection
- `lefthook.yml` - Git hooks
- `playwright.config.ts` - E2E testing
- `vitest.config.mts` - Unit testing
- `.coderabbit.yaml` - AI code reviews
- `.github/` - GitHub Actions, Dependabot, FUNDING

## 🎯 Best Practices Included

- ✅ TypeScript strict mode
- ✅ ESLint with best practices (Antfu config)
- ✅ Prettier for code formatting
- ✅ Shared UI components
- ✅ Shared utilities and types
- ✅ Proper monorepo structure
- ✅ Turbo caching for faster builds
- ✅ Next.js 16+ App Router
- ✅ React 19 with React Compiler
- ✅ Modern tooling and configurations
- ✅ Comprehensive testing setup
- ✅ CI/CD with GitHub Actions
- ✅ Error monitoring and logging
- ✅ Security best practices

## 📝 Scripts Reference

### Root Scripts

- `pnpm dev` - Start all apps in development
- `pnpm build` - Build all apps
- `pnpm build-stats` - Build with bundle analysis
- `pnpm test` - Run all unit tests
- `pnpm test:e2e` - Run all E2E tests
- `pnpm lint` - Lint all packages
- `pnpm lint:fix` - Fix linting issues
- `pnpm type-check` - Type check all packages
- `pnpm check:deps` - Check for unused dependencies
- `pnpm check:i18n` - Validate i18n translations
- `pnpm storybook` - Start Storybook
- `pnpm commit` - Interactive commit with Commitizen
- `pnpm clean` - Clean all build artifacts

### App-Specific Scripts

Each app (`admin` and `web`) has the same scripts:

- `dev` - Start development server
- `build` - Build for production
- `start` - Start production server
- `test` - Run unit tests
- `test:e2e` - Run E2E tests
- `storybook` - Start Storybook
- `lint` - Lint code
- `type-check` - Type check

## 🤝 Contributing

This is a boilerplate template. Feel free to:

- Fork and customize for your needs
- Submit issues for improvements
- Contribute enhancements

## 📄 License

MIT

## 🙏 Credits

This boilerplate combines:

- [Turborepo](https://turbo.build/) - Monorepo build system
- [Next.js Boilerplate with Best Practices](https://github.com/Quaid5050/nextjs-boilerplate-with-best-practices) - Next.js best practices
- Enhanced and maintained by Quaid Ahmed

---

**Made with ♥ by Quaid Ahmed**

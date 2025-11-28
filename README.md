# Turbo Repo Boilerplate with Next.js Best Practices

A production-ready monorepo boilerplate combining Turborepo with Next.js best practices. Includes two Next.js apps (admin and web) with shared packages, TypeScript, ESLint, Prettier, and modern tooling.

## Structure

```
turbo-repo-boilerplate/
├── apps/
│   ├── admin/          # Admin interface (Next.js) - Port 3001
│   └── web/            # Storefront/Web app (Next.js) - Port 3000
├── packages/
│   ├── eslint-config/  # Shared ESLint configuration
│   ├── typescript-config/ # Shared TypeScript configuration
│   ├── ui/             # Shared UI components (shadcn/ui)
│   ├── utils/          # Shared utility functions
│   └── types/          # Shared TypeScript types
└── turbo.json          # Turbo configuration
```

## Getting Started

### Prerequisites

- Node.js >= 20
- pnpm >= 9.0.0

### Installation

```bash
pnpm install
```

### Development

Run all apps in development mode:

```bash
pnpm dev
```

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

### Linting

```bash
pnpm lint
pnpm lint:fix
```

### Type Checking

```bash
pnpm type-check
# or
pnpm check-types
```

## Apps

### Admin (`apps/admin`)

Admin interface application.
- Runs on port 3001
- Uses Next.js 16+ with App Router
- Includes all best practices from the boilerplate

### Web (`apps/web`)

Customer-facing web application.
- Runs on port 3000
- Uses Next.js 16+ with App Router
- Includes all best practices from the boilerplate

## Packages

### `@repo/ui`

Shared UI components built with shadcn/ui.
- Button component
- Input component
- More components can be added

### `@repo/types`

Shared TypeScript type definitions (to be expanded).

### `@repo/utils`

Shared utility functions (to be expanded).

### `@repo/eslint-config`

Shared ESLint configuration for the monorepo.

### `@repo/typescript-config`

Shared TypeScript configuration for the monorepo.

## Tech Stack

- **Framework**: Next.js 16+
- **Language**: TypeScript 5.9+
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui
- **Monorepo**: Turborepo
- **Package Manager**: pnpm
- **State Management**: Zustand
- **Data Fetching**: React Query (TanStack Query)
- **Form Handling**: React Hook Form
- **Internationalization**: next-intl
- **Monitoring**: Sentry
- **Security**: Arcjet

## Best Practices Included

- ✅ TypeScript strict mode
- ✅ ESLint with best practices
- ✅ Prettier for code formatting
- ✅ Shared UI components
- ✅ Shared utilities and types
- ✅ Proper monorepo structure
- ✅ Turbo caching for faster builds
- ✅ Next.js 16+ App Router
- ✅ React 19
- ✅ Modern tooling and configurations

## License

MIT

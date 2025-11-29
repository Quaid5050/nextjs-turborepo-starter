// Root ESLint config for monorepo
// This config is used by lefthook and other root-level tools
// Individual apps have their own eslint.config.mjs files

export default [
  {
    ignores: [
      '**/node_modules/**',
      '**/.next/**',
      '**/dist/**',
      '**/build/**',
      '**/.turbo/**',
      '**/coverage/**',
      '**/storybook-static/**',
      '**/pnpm-lock.yaml',
      '**/package-lock.json',
      '**/yarn.lock',
    ],
  },
];

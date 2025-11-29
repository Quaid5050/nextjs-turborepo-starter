# Troubleshooting Guide

This guide helps you resolve common issues when working with this boilerplate.

## Table of Contents

1. [Playwright Browser Installation](#playwright-browser-installation)
2. [Test Failures](#test-failures)
3. [TypeScript Errors](#typescript-errors)
4. [Build Issues](#build-issues)
5. [Environment Variables](#environment-variables)
6. [Dependency Issues](#dependency-issues)

## Playwright Browser Installation

### Problem

When running tests, you encounter an error like:

```
error during close browserType.launch: Executable doesn't exist at
/Users/.../Library/Caches/ms-playwright/chromium_headless_shell-1200/...
```

Or:

```
╔═════════════════════════════════════════════════════════════════════════╗
║ Looks like Playwright Test or Playwright was just installed or updated. ║
║ Please run the following command to download new browsers:              ║
║                                                                         ║
║     pnpm exec playwright install                                        ║
╚═════════════════════════════════════════════════════════════════════════╝
```

### Solution

Install Playwright browsers:

```bash
pnpm exec playwright install
```

This will download:

- Chromium (with headless shell)
- Firefox
- WebKit
- FFMPEG

### Why This Happens

Playwright browsers are not included in `node_modules` to keep the repository size small. They must be installed separately after `pnpm install`.

### Prevention

Add this to your setup instructions or CI/CD pipeline:

```bash
pnpm install
pnpm exec playwright install
```

## Test Failures

### Browser Tests Failing

**Symptoms:**

- Tests pass but show browser errors
- "Executable doesn't exist" errors

**Solution:**

```bash
pnpm exec playwright install
```

### Unit Tests Failing

**Symptoms:**

- TypeScript errors in tests
- Module resolution errors

**Solutions:**

1. **Clear cache and reinstall:**

   ```bash
   pnpm clean
   pnpm install
   ```

2. **Check TypeScript configuration:**

   ```bash
   pnpm type-check
   ```

3. **Verify test configuration:**
   Check `vitest.config.mts` in the app directory

## TypeScript Errors

### Errors in Shared Packages

**Symptoms:**

- Type errors in `@repo/*` packages
- "Cannot find module" errors

**Solutions:**

1. **Reinstall dependencies:**

   ```bash
   pnpm install
   ```

2. **Type check specific package:**

   ```bash
   pnpm --filter "@repo/types" type-check
   ```

3. **Rebuild workspace:**
   ```bash
   pnpm build
   ```

### Module Resolution Errors

**Symptoms:**

- "Cannot find module '@repo/...'"
- Import errors

**Solutions:**

1. **Verify workspace configuration:**
   Check `pnpm-workspace.yaml` includes all packages

2. **Clear and reinstall:**

   ```bash
   rm -rf node_modules
   pnpm install
   ```

3. **Check package.json exports:**
   Verify `@repo/*` packages have correct `exports` field

## Build Issues

### Build Fails with Cache Errors

**Solution:**

```bash
pnpm clean
pnpm build
```

### Turbo Cache Issues

**Solution:**

```bash
pnpm turbo clean
pnpm build
```

### Next.js Build Errors

**Symptoms:**

- Build fails with module errors
- Type errors during build

**Solutions:**

1. **Clear Next.js cache:**

   ```bash
   rm -rf apps/*/.next
   pnpm build
   ```

2. **Check environment variables:**
   Ensure all required env vars are set (see [Environment Variables](#environment-variables))

3. **Verify transpilePackages:**
   Check `next.config.ts` includes all `@repo/*` packages

## Environment Variables

### Missing Environment Variables

**Symptoms:**

- Runtime errors about missing env vars
- Build succeeds but app crashes

**Solution:**

1. **Check required variables:**
   See `apps/*/src/libs/Env.ts` for required variables

2. **Create `.env.local` files:**

   ```bash
   # apps/admin/.env.local
   NEXT_PUBLIC_APP_URL=http://localhost:3001
   NODE_ENV=development
   ```

3. **Validate environment:**
   The `Env.ts` file will throw errors if required variables are missing

### Environment Variable Validation Errors

**Symptoms:**

- Errors from `@t3-oss/env-nextjs`
- "Invalid environment variable" errors

**Solution:**

1. **Check variable format:**
   - URLs must be valid URLs
   - Booleans must be "true" or "false"
   - Enums must match allowed values

2. **Review `Env.ts`:**
   Check the validation schema in `apps/*/src/libs/Env.ts`

## Dependency Issues

### Unused Dependencies

**Symptoms:**

- Warnings from Knip
- Large `node_modules`

**Solution:**

```bash
pnpm check:deps
```

This will show unused dependencies that can be removed.

### Version Conflicts

**Symptoms:**

- Peer dependency warnings
- Incompatible package versions

**Solution:**

1. **Check for updates:**

   ```bash
   pnpm outdated
   ```

2. **Update dependencies:**

   ```bash
   pnpm update
   ```

3. **Resolve conflicts:**
   Check `package.json` files for version mismatches

### Installation Issues

**Symptoms:**

- `pnpm install` fails
- Lock file conflicts

**Solutions:**

1. **Delete lock file and reinstall:**

   ```bash
   rm pnpm-lock.yaml
   pnpm install
   ```

2. **Clear pnpm store:**

   ```bash
   pnpm store prune
   pnpm install
   ```

3. **Check Node.js version:**
   Ensure Node.js >= 20 (check with `node --version`)

## Getting Help

If you encounter an issue not covered here:

1. **Check existing issues:**
   Search the [GitHub Issues](https://github.com/Quaid5050/nextjs-turborepo-starter/issues)

2. **Create a new issue:**
   Include:
   - Error messages
   - Steps to reproduce
   - Node.js and pnpm versions
   - OS information

3. **Check documentation:**
   - [Project Structure Guide](./project-structure-and-best-practices.md)
   - [Development Workflow](./development-workflow.md)

## Common Commands Reference

```bash
# Install dependencies
pnpm install

# Install Playwright browsers (required for tests)
pnpm exec playwright install

# Run tests
pnpm test

# Type check
pnpm type-check

# Lint
pnpm lint

# Build
pnpm build

# Clean everything
pnpm clean
```

# Playwright Testing Guide

This guide will help you get started with Playwright E2E testing in this monorepo.

## Table of Contents

1. [Quick Start](#quick-start)
2. [Running Tests](#running-tests)
3. [Writing Tests](#writing-tests)
4. [Test Structure](#test-structure)
5. [Best Practices](#best-practices)
6. [Common Patterns](#common-patterns)
7. [Debugging](#debugging)

## Quick Start

### Prerequisites

1. **Install Playwright browsers** (if not already done):
   ```bash
   make setup
   # or
   pnpm exec playwright install
   ```

2. **Start the development server** (in a separate terminal):
   ```bash
   make dev
   # or
   pnpm dev
   ```

### Run Your First Test

```bash
# Run all E2E tests
make test-e2e
# or
pnpm test:e2e

# Run tests for a specific app
pnpm --filter admin test:e2e
pnpm --filter web test:e2e
```

## Running Tests

### Run All Tests

```bash
# Using Makefile
make test-e2e

# Using pnpm
pnpm test:e2e
```

### Run Tests for Specific App

```bash
# Admin app
pnpm --filter admin test:e2e

# Web app
pnpm --filter web test:e2e
```

### Run Specific Test File

```bash
# Run a specific test file
pnpm exec playwright test tests/e2e/Sanity.check.e2e.ts

# Run tests matching a pattern
pnpm exec playwright test --grep "Sanity"
```

### Run Tests in UI Mode (Interactive) - **RECOMMENDED FOR VIEWING BROWSER**

```bash
# Open Playwright UI for interactive testing (you can see the browser!)
pnpm exec playwright test --ui

# Or for a specific app
cd apps/admin
pnpm exec playwright test --ui

# Or using Makefile
make test-e2e-ui
```

**What you'll see:**
- 🌐 **Live browser** - Watch tests run in real-time
- 📸 **Screenshots** - See screenshots taken during tests
- 🎥 **Video recordings** - Watch test execution videos
- 📊 **Test timeline** - See step-by-step execution
- 🔍 **DOM snapshots** - Inspect page state at each step

### Run Tests in Debug Mode

```bash
# Run with Playwright Inspector
pnpm exec playwright test --debug

# Or for a specific test
pnpm exec playwright test tests/e2e/Sanity.check.e2e.ts --debug
```

### Run Tests in Headed Mode (See Browser)

```bash
# Run tests with visible browser
pnpm exec playwright test --headed
```

### Run Tests on Specific Browser

```bash
# Run only on Chromium
pnpm exec playwright test --project=chromium

# Run only on Firefox (if configured)
pnpm exec playwright test --project=firefox
```

## Writing Tests

### Test File Location

E2E tests are located in:
- **Shared tests**: `tests/e2e/*.e2e.ts`
- **App-specific tests**: `apps/*/tests/e2e/*.e2e.ts`

### Basic Test Structure

```typescript
import { expect, test } from '@playwright/test';

test.describe('Feature Name', () => {
  test('should do something', async ({ page }) => {
    // Navigate to a page
    await page.goto('/');

    // Interact with elements
    await page.getByRole('button', { name: 'Click me' }).click();

    // Assert expectations
    await expect(page.getByText('Success')).toBeVisible();
  });
});
```

### Example: Testing a Form

```typescript
import { expect, test } from '@playwright/test';

test.describe('Contact Form', () => {
  test('should submit contact form successfully', async ({ page }) => {
    await page.goto('/contact');

    // Fill form fields
    await page.getByLabel('Name').fill('John Doe');
    await page.getByLabel('Email').fill('john@example.com');
    await page.getByLabel('Message').fill('Hello, this is a test message');

    // Submit form
    await page.getByRole('button', { name: 'Submit' }).click();

    // Wait for success message
    await expect(page.getByText('Thank you for your message')).toBeVisible();
  });

  test('should show validation errors', async ({ page }) => {
    await page.goto('/contact');

    // Try to submit empty form
    await page.getByRole('button', { name: 'Submit' }).click();

    // Check for validation errors
    await expect(page.getByText('Name is required')).toBeVisible();
    await expect(page.getByText('Email is required')).toBeVisible();
  });
});
```

### Example: Testing Navigation

```typescript
import { expect, test } from '@playwright/test';

test.describe('Navigation', () => {
  test('should navigate between pages', async ({ page }) => {
    await page.goto('/');

    // Click navigation link
    await page.getByRole('link', { name: 'About' }).click();

    // Verify URL changed
    await expect(page).toHaveURL(/\/about$/);

    // Verify page content
    await expect(page.getByRole('heading', { name: 'About Us' })).toBeVisible();
  });
});
```

## Test Structure

### Test File Naming

- **E2E tests**: `*.e2e.ts` - Run before deployment
- **Check tests**: `*.check.e2e.ts` - Run after deployment (for monitoring)

### Test Organization

```typescript
import { expect, test } from '@playwright/test';

// Use describe blocks to group related tests
test.describe('Feature Name', () => {
  // Use beforeEach for setup
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  // Individual test cases
  test('should do something', async ({ page }) => {
    // Test implementation
  });

  test('should handle edge case', async ({ page }) => {
    // Test implementation
  });
});
```

## Best Practices

### 1. Use Semantic Selectors

**✅ Good:**
```typescript
await page.getByRole('button', { name: 'Submit' }).click();
await page.getByLabel('Email').fill('test@example.com');
await page.getByPlaceholder('Enter your name').fill('John');
```

**❌ Avoid:**
```typescript
await page.locator('#submit-button').click();
await page.locator('.email-input').fill('test@example.com');
```

### 2. Use Explicit Waits

**✅ Good:**
```typescript
await expect(page.getByText('Success')).toBeVisible();
await page.waitForURL(/\/success$/);
```

**❌ Avoid:**
```typescript
await page.waitForTimeout(5000); // Fixed timeout
```

### 3. Organize Tests with describe blocks

```typescript
test.describe('User Authentication', () => {
  test.describe('Login', () => {
    test('should login with valid credentials', async ({ page }) => {
      // Test implementation
    });

    test('should show error with invalid credentials', async ({ page }) => {
      // Test implementation
    });
  });

  test.describe('Logout', () => {
    test('should logout successfully', async ({ page }) => {
      // Test implementation
    });
  });
});
```

### 4. Use Fixtures for Reusable Setup

```typescript
import { test as base } from '@playwright/test';

// Create custom fixture
const test = base.extend({
  authenticatedPage: async ({ page }, use) => {
    // Login logic
    await page.goto('/login');
    await page.getByLabel('Email').fill('user@example.com');
    await page.getByLabel('Password').fill('password');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForURL(/\/dashboard$/);
    
    await use(page);
  },
});

test('should access protected route', async ({ authenticatedPage }) => {
  await authenticatedPage.goto('/dashboard');
  await expect(authenticatedPage.getByText('Welcome')).toBeVisible();
});
```

### 5. Clean Up After Tests

```typescript
test('should create and delete item', async ({ page }) => {
  // Create item
  await page.goto('/items');
  await page.getByRole('button', { name: 'Create' }).click();
  // ... create logic

  // Clean up: Delete item
  await page.getByRole('button', { name: 'Delete' }).click();
  await page.getByRole('button', { name: 'Confirm' }).click();
});
```

## Common Patterns

### Waiting for API Calls

```typescript
test('should load data from API', async ({ page }) => {
  // Wait for network request to complete
  await page.goto('/');
  await page.waitForResponse(response => 
    response.url().includes('/api/data') && response.status() === 200
  );

  // Verify data is displayed
  await expect(page.getByText('Data loaded')).toBeVisible();
});
```

### Handling Dialogs

```typescript
test('should handle confirmation dialog', async ({ page }) => {
  page.on('dialog', async dialog => {
    expect(dialog.message()).toContain('Are you sure?');
    await dialog.accept();
  });

  await page.getByRole('button', { name: 'Delete' }).click();
});
```

### Taking Screenshots

```typescript
test('should capture screenshot', async ({ page }) => {
  await page.goto('/');
  await page.screenshot({ path: 'screenshot.png' });
  
  // Or for full page
  await page.screenshot({ path: 'full-page.png', fullPage: true });
});
```

### Testing Mobile Viewport

```typescript
test.use({
  viewport: { width: 375, height: 667 }, // iPhone SE
});

test('should work on mobile', async ({ page }) => {
  await page.goto('/');
  // Mobile-specific tests
});
```

### Testing Different Locales

```typescript
test.describe('Internationalization', () => {
  ['en', 'fr'].forEach(locale => {
    test(`should display content in ${locale}`, async ({ page }) => {
      await page.goto(`/${locale}`);
      // Test locale-specific content
    });
  });
});
```

## Debugging

### 1. Use Playwright Inspector

```bash
pnpm exec playwright test --debug
```

This opens the Playwright Inspector where you can:
- Step through tests
- See the browser in action
- Inspect elements
- View console logs

### 2. Use Console Logs

```typescript
test('should debug with logs', async ({ page }) => {
  // Listen to console logs
  page.on('console', msg => console.log('Browser console:', msg.text()));

  // Listen to network requests
  page.on('request', request => console.log('Request:', request.url()));
  page.on('response', response => console.log('Response:', response.url(), response.status()));

  await page.goto('/');
});
```

### 3. Use Trace Viewer

Traces are automatically saved on failure. View them:

```bash
pnpm exec playwright show-trace trace.zip
```

### 4. Pause Execution

```typescript
test('should pause for debugging', async ({ page }) => {
  await page.goto('/');
  await page.pause(); // Execution pauses here
  // Continue manually in inspector
});
```

### 5. Slow Down Execution

```typescript
test.use({
  slowMo: 1000, // Slow down by 1 second per action
});

test('should run slowly', async ({ page }) => {
  await page.goto('/');
  // Actions will be slower, easier to observe
});
```

## Configuration

### Playwright Config Location

- **Root config**: `playwright.config.ts` (for web app)
- **Admin config**: `apps/admin/playwright.config.ts`

### Key Configuration Options

```typescript
export default defineConfig({
  testDir: './tests/e2e',        // Test directory
  timeout: 60 * 1000,            // Test timeout (60s)
  expect: {
    timeout: 20 * 1000,           // Assertion timeout (20s)
  },
  webServer: {
    command: 'pnpm dev',          // Command to start dev server
    url: 'http://localhost:3000', // Server URL
    reuseExistingServer: !process.env.CI, // Reuse if already running
  },
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'retain-on-failure',   // Save trace on failure
    video: 'retain-on-failure',   // Save video on failure
  },
});
```

## CI/CD Integration

Tests run automatically in CI/CD. The configuration:
- Runs on multiple browsers in CI
- Saves traces and videos on failure
- Uses GitHub Actions reporter
- Fails the build if tests fail

## Resources

- [Playwright Documentation](https://playwright.dev/)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Playwright API Reference](https://playwright.dev/docs/api/class-playwright)
- [Playwright Selectors Guide](https://playwright.dev/docs/selectors)

## Quick Reference

```bash
# Run all tests
make test-e2e

# Run in UI mode
pnpm exec playwright test --ui

# Run in debug mode
pnpm exec playwright test --debug

# Run specific test
pnpm exec playwright test tests/e2e/Sanity.check.e2e.ts

# Run with headed browser
pnpm exec playwright test --headed

# Show trace
pnpm exec playwright show-trace trace.zip

# Install browsers
pnpm exec playwright install
```


# Viewing Playwright Test Results

This guide explains how to view screenshots, videos, and interact with the browser during Playwright tests.

## 🎯 Quick Ways to See the Browser

### 1. **UI Mode (Best for Watching Tests)** ⭐

Run tests with the interactive UI where you can see the browser in real-time:

```bash
# Using Makefile
make test-e2e-ui

# Or directly
pnpm exec playwright test --ui
```

**What you get:**
- 🌐 **Live browser window** - See tests running in real-time
- 📸 **Screenshots** - View screenshots taken during tests
- 🎥 **Video recordings** - Watch full test execution
- 📊 **Step-by-step timeline** - See each action as it happens
- 🔍 **DOM inspection** - Inspect page state at any step

The UI opens in your browser at `http://localhost:9323` (or similar port).

### 2. **Headed Mode (See Browser Window)**

Run tests with visible browser windows:

```bash
pnpm exec playwright test --headed
```

This shows the actual browser windows while tests run (but no interactive UI).

### 3. **Debug Mode (Step Through Tests)**

Run tests with Playwright Inspector for step-by-step debugging:

```bash
pnpm exec playwright test --debug
```

**What you get:**
- **Playwright Inspector** - Step through tests one action at a time
- **Browser window** - See the browser with highlighted elements
- **Console** - View console logs and network requests

## 📸 Viewing Screenshots

### Where Screenshots Are Stored

Screenshots are saved in:
```
apps/[app-name]/test-results/
├── [test-name]-[browser]/
│   ├── screenshot-*.png
│   └── ...
```

### View Screenshots After Tests

1. **Automatic screenshots** (on failure):
   - Location: `apps/*/test-results/*/screenshot-*.png`
   - Created automatically when tests fail

2. **Manual screenshots** (from test code):
   ```typescript
   await page.screenshot({ path: 'screenshot.png' });
   ```

3. **Visual regression screenshots** (Chromatic):
   - Location: `apps/*/test-results/chromatic-archives/`
   - Created by `takeSnapshot()` in visual tests

### Open Screenshots

```bash
# View screenshots in Finder (macOS)
open apps/web/test-results

# Or navigate manually
cd apps/web/test-results
# Then open any .png files
```

## 🎥 Viewing Videos

Videos are recorded when tests fail (if configured):

```bash
# Location
apps/*/test-results/*/video.webm

# View with
open apps/web/test-results/*/video.webm
```

## 🔍 Viewing Traces

Traces contain full test execution details:

### Generate Trace Report

```bash
# After running tests, view trace
pnpm exec playwright show-trace apps/web/test-results/*/trace.zip
```

**What you'll see:**
- Full test execution timeline
- Network requests
- Console logs
- DOM snapshots at each step
- Screenshots
- Video playback

### Trace Viewer Features

- **Time travel** - Jump to any point in the test
- **Network inspection** - See all API calls
- **Console logs** - View all console output
- **DOM snapshots** - Inspect page state
- **Screenshots** - See visual state at each step

## 📊 HTML Test Report

Generate an HTML report of all test runs:

```bash
# Generate report
pnpm exec playwright show-report

# Or open existing report
pnpm exec playwright show-report apps/web/playwright-report
```

**Report includes:**
- Test results summary
- Screenshots
- Videos
- Traces
- Error messages
- Execution time

## 🖼️ Visual Regression Testing (Chromatic)

For visual tests using Chromatic:

```bash
# Screenshots are stored in
apps/*/test-results/chromatic-archives/archive/

# View Chromatic snapshots
# These are JSON files with base64-encoded images
```

## 🎮 Interactive Testing Workflow

### Recommended Workflow:

1. **Start with UI Mode:**
   ```bash
   make test-e2e-ui
   ```

2. **Watch tests run** - See browser in real-time

3. **If test fails:**
   - Check screenshots in `test-results/`
   - View trace: `pnpm exec playwright show-trace [trace.zip]`
   - Watch video: Open `.webm` file

4. **Debug specific test:**
   ```bash
   pnpm exec playwright test tests/e2e/Sanity.check.e2e.ts --debug
   ```

## 📁 File Locations Summary

```
apps/[app-name]/
├── test-results/              # Test artifacts
│   ├── [test-name]-[browser]/
│   │   ├── screenshot-*.png  # Screenshots
│   │   ├── video.webm        # Video recording
│   │   └── trace.zip         # Full trace
│   └── chromatic-archives/   # Visual regression
│       └── archive/
│           └── *.snapshot.json
└── playwright-report/        # HTML reports (if generated)
```

## 🚀 Quick Commands Reference

```bash
# See browser running (interactive UI) - BEST OPTION!
make test-e2e-ui
# Or for specific app:
make test-e2e-ui-web    # Web app
make test-e2e-ui-admin  # Admin app

# See browser window (headed mode)
make test-e2e-headed
# Or for specific app:
cd apps/web && pnpm exec playwright test --headed
cd apps/admin && pnpm exec playwright test --headed

# Debug step-by-step
pnpm exec playwright test --debug

# View trace
pnpm exec playwright show-trace [trace.zip]

# View HTML report
pnpm exec playwright show-report

# Open test results folder
open apps/web/test-results  # macOS
```

## 💡 Tips

1. **Use UI mode for development** - Best way to see what's happening
2. **Traces are most useful** - They contain everything (screenshots, network, console)
3. **Screenshots are in test-results** - Check there after test failures
4. **Clean regularly** - Use `make clean-test` to remove old artifacts


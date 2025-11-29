# Sentry Spotlight for Local Development

Sentry Spotlight is a local development tool that allows you to see errors, performance issues, and debugging information **without sending data to Sentry**. It works entirely offline and provides a real-time view of what's happening in your application.

## What is Sentry Spotlight?

**Sentry Spotlight** is a desktop application that:

- ✅ **Works offline** - No internet connection required
- ✅ **Real-time error viewing** - See errors as they happen
- ✅ **No Sentry account needed** - Works without a Sentry DSN
- ✅ **Performance monitoring** - Track performance issues locally
- ✅ **Debug information** - Full stack traces, breadcrumbs, and context
- ✅ **Privacy-focused** - All data stays on your machine

## How It Works

### Architecture

```
Your App (Browser)  →  Spotlight Integration  →  Spotlight Desktop App
     ↓                        ↓                          ↓
  Errors occur          Captures errors          Displays in UI
  Performance data      Sends to Spotlight        Real-time updates
```

### Two Components

1. **Browser Integration** (`spotlightBrowserIntegration`)
   - Captures errors and performance data in your browser
   - Sends data to the Spotlight desktop app via WebSocket

2. **Desktop App** (Spotlight)
   - Receives data from your browser
   - Displays errors, performance, and debugging info
   - Works completely offline

## Current Setup

Your project is already configured with Spotlight! Here's what's set up:

### 1. Server-Side Configuration

In `apps/web/src/instrumentation.ts` and `apps/admin/src/instrumentation.ts`:

```typescript
const sentryOptions = {
  // Enable Spotlight in development
  spotlight: process.env.NODE_ENV === 'development',
  // ... other options
};
```

This enables Spotlight for **server-side** errors (API routes, server components).

### 2. Client-Side Configuration

In `apps/web/src/instrumentation-client.ts` and `apps/admin/src/instrumentation-client.ts`:

```typescript
integrations: [
  // ... other integrations
  ...(process.env.NODE_ENV === 'development'
    ? [Sentry.spotlightBrowserIntegration()]
    : []),
],
```

This enables Spotlight for **client-side** errors (browser JavaScript errors).

## How to Use Spotlight

### Option 1: Automatic (Recommended)

Spotlight is **automatically enabled** in development mode! Just:

1. **Start your development server**:

   ```bash
   make dev
   # or
   pnpm dev
   ```

2. **Install and run Spotlight desktop app** (one-time setup):

   ```bash
   # From the app directory
   cd apps/web
   pnpm dev:spotlight

   # Or from root
   pnpm --filter web dev:spotlight
   ```

3. **Open your app in the browser** (e.g., `http://localhost:3000`)

4. **Trigger an error** (use the test page at `/en/debug/sentry`)

5. **Check Spotlight desktop app** - errors will appear automatically!

### Option 2: Manual Installation

If you prefer to install Spotlight globally:

1. **Install Spotlight desktop app**:

   ```bash
   npm install -g @spotlightjs/spotlight
   # or
   pnpm add -g @spotlightjs/spotlight
   ```

2. **Run Spotlight**:

   ```bash
   spotlight
   ```

3. **Start your dev server**:

   ```bash
   make dev
   ```

4. **Open your app** - Spotlight will automatically connect!

## What You'll See

### In Spotlight Desktop App

When you open Spotlight, you'll see:

1. **Issues Tab**
   - List of all errors
   - Real-time updates as errors occur
   - Error details with stack traces

2. **Performance Tab**
   - Performance transactions
   - Web vitals
   - Slow operations

3. **Replay Tab** (if enabled)
   - Session replays
   - User interactions

### In Browser Console

You'll see connection messages:

```
[Sentry Spotlight] Connected to Spotlight
```

If Spotlight is not running:

```
[Sentry Spotlight] Could not connect to Spotlight
```

## Features

### ✅ Automatic Error Capture

All errors are automatically captured:

- JavaScript errors
- Unhandled promise rejections
- Console errors
- API route errors
- Server component errors

### ✅ Real-Time Updates

Errors appear in Spotlight **immediately** as they occur - no refresh needed!

### ✅ Full Context

Each error includes:

- **Stack trace** with source code
- **Breadcrumbs** (user actions)
- **User context** (if set)
- **Tags** (if set)
- **Request details**
- **Environment info**

### ✅ Performance Monitoring

Track:

- Page load times
- API response times
- Slow database queries
- Performance bottlenecks

### ✅ Privacy

- **No data leaves your machine**
- **No Sentry account required**
- **Works completely offline**
- **Perfect for local development**

## Configuration

### Enable/Disable Spotlight

Spotlight is automatically enabled in development mode. To disable:

**Option 1: Environment Variable**

```bash
# .env.local
NODE_ENV=production  # Spotlight only works in development
```

**Option 2: Code Configuration**

Edit `instrumentation.ts`:

```typescript
spotlight: false,  // Disable Spotlight
```

Edit `instrumentation-client.ts`:

```typescript
integrations: [
  // Remove spotlightBrowserIntegration
],
```

### Custom Port

By default, Spotlight runs on port `8969`. To change it:

```typescript
Sentry.spotlightBrowserIntegration({
  sidecarUrl: 'http://localhost:YOUR_PORT',
});
```

## Troubleshooting

### Spotlight Not Connecting

**Problem**: Browser console shows "Could not connect to Spotlight"

**Solutions**:

1. **Make sure Spotlight desktop app is running**:

   ```bash
   pnpm dev:spotlight
   ```

2. **Check if Spotlight is on the correct port** (default: 8969)

3. **Check browser console** for connection errors

4. **Restart Spotlight**:

   ```bash
   # Stop Spotlight (Ctrl+C)
   # Start again
   pnpm dev:spotlight
   ```

5. **Restart dev server**:
   ```bash
   # Stop dev server (Ctrl+C)
   make dev
   ```

### Errors Not Appearing

**Problem**: Errors occur but don't show in Spotlight

**Solutions**:

1. **Check development mode**: Spotlight only works when `NODE_ENV === 'development'`

2. **Verify integration is enabled**: Check `instrumentation-client.ts` has `spotlightBrowserIntegration()`

3. **Check browser console** for Spotlight connection messages

4. **Enable debug mode**:

   ```bash
   NEXT_PUBLIC_SENTRY_DEBUG=true
   ```

5. **Check Spotlight desktop app** is running and connected

### Spotlight Desktop App Won't Start

**Problem**: `pnpm dev:spotlight` fails

**Solutions**:

1. **Install Spotlight globally**:

   ```bash
   pnpm add -g @spotlightjs/spotlight
   spotlight
   ```

2. **Check port availability**: Make sure port 8969 is not in use

3. **Check Node.js version**: Spotlight requires Node.js 16+

4. **Try manual installation**:
   ```bash
   npm install -g @spotlightjs/spotlight
   spotlight
   ```

## Comparison: Spotlight vs Sentry Dashboard

| Feature               | Spotlight (Local)   | Sentry Dashboard (Cloud) |
| --------------------- | ------------------- | ------------------------ |
| **Internet Required** | ❌ No               | ✅ Yes                   |
| **Sentry Account**    | ❌ No               | ✅ Yes                   |
| **Data Storage**      | Local only          | Cloud                    |
| **Real-time**         | ✅ Yes              | ✅ Yes                   |
| **Production Use**    | ❌ Development only | ✅ Yes                   |
| **Team Sharing**      | ❌ No               | ✅ Yes                   |
| **Alerts**            | ❌ No               | ✅ Yes                   |
| **Historical Data**   | ❌ No               | ✅ Yes                   |

## Best Practices

### Development Workflow

1. **Use Spotlight for local development**
   - Fast feedback
   - No internet required
   - Privacy-focused

2. **Use Sentry Dashboard for production**
   - Team collaboration
   - Historical data
   - Alerts and notifications

### When to Use Spotlight

✅ **Use Spotlight when:**

- Developing locally
- Testing error handling
- Debugging issues
- Working offline
- Privacy is important

❌ **Don't use Spotlight when:**

- In production
- Need team collaboration
- Need historical data
- Need alerts

## Quick Start Checklist

- [ ] Start Spotlight desktop app: `pnpm dev:spotlight`
- [ ] Start dev server: `make dev`
- [ ] Open app in browser: `http://localhost:3000`
- [ ] Check browser console for "Connected to Spotlight"
- [ ] Trigger an error (use `/en/debug/sentry` test page)
- [ ] Check Spotlight desktop app for the error

## Additional Resources

- [Sentry Spotlight Documentation](https://spotlightjs.com/)
- [Sentry Spotlight GitHub](https://github.com/getsentry/spotlight)
- [Sentry Next.js Guide](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
- [Spotlight Installation Guide](https://spotlightjs.com/docs/getting-started)

## Example Workflow

```bash
# Terminal 1: Start Spotlight
cd apps/web
pnpm dev:spotlight

# Terminal 2: Start dev server
make dev

# Browser: Open app
# http://localhost:3000/en/debug/sentry

# Click "Trigger Client Error"
# → Error appears in Spotlight desktop app immediately!
```

That's it! Spotlight makes local development with Sentry seamless and private. 🎉

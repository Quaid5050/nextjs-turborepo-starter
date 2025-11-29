# Sentry Error Monitoring Testing Guide

This guide explains how to test and verify that Sentry error monitoring is working correctly in your application.

## Table of Contents

1. [Quick Start](#quick-start)
2. [Testing Sentry](#testing-sentry)
3. [Test Page](#test-page)
4. [Verifying in Sentry Dashboard](#verifying-in-sentry-dashboard)
5. [Debug Mode](#debug-mode)
6. [Common Issues](#common-issues)

## Quick Start

### Prerequisites

1. **Set up Sentry DSN** in your environment variables:

   ```bash
   # .env.local or .env
   NEXT_PUBLIC_SENTRY_DSN=https://your-sentry-dsn@sentry.io/project-id
   ```

2. **Optional: Set up Sentry organization and project** (for source maps):

   ```bash
   SENTRY_ORGANIZATION=your-org
   SENTRY_PROJECT=your-project
   SENTRY_AUTH_TOKEN=your-auth-token
   ```

3. **Start your development server**:
   ```bash
   make dev
   # or
   pnpm dev
   ```

## Testing Sentry

### Using the Test Page

We've created a dedicated test page to verify Sentry is working:

1. **Navigate to the test page**:

   ```
   http://localhost:3000/en/debug/sentry
   # or
   http://localhost:3000/[your-locale]/debug/sentry
   ```

2. **Click the error buttons** to trigger different types of errors:
   - **Client-Side Errors**: JavaScript errors, unhandled rejections, console errors
   - **Server-Side Errors**: API route errors, server component errors
   - **Custom Messages**: Custom messages, breadcrumbs, user context, tags
   - **Performance**: Performance transactions

3. **Check your Sentry dashboard** - errors should appear within a few seconds

### Manual Testing

You can also test Sentry programmatically:

#### Client-Side Error

```typescript
import * as Sentry from '@sentry/nextjs';

// Trigger an error
try {
  throw new Error('Test error');
} catch (error) {
  Sentry.captureException(error);
}
```

#### Server-Side Error (API Route)

```typescript
// app/api/test/route.ts
import * as Sentry from '@sentry/nextjs';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    throw new Error('Test server error');
  } catch (error) {
    Sentry.captureException(error);
    return NextResponse.json({ error: 'Error captured' }, { status: 500 });
  }
}
```

#### Custom Message

```typescript
Sentry.captureMessage('This is a test message', 'info');
```

#### Add Context

```typescript
Sentry.setUser({
  id: '123',
  username: 'test-user',
  email: 'test@example.com',
});

Sentry.setTag('feature', 'checkout');
Sentry.setContext('checkout', {
  cartId: 'cart-123',
  itemCount: 5,
});
```

## Test Page

The test page (`/debug/sentry`) provides buttons to test:

### Client-Side Errors

1. **Trigger Client Error**: Throws a JavaScript error
2. **Trigger Unhandled Rejection**: Creates an unhandled promise rejection
3. **Trigger Console Error**: Sends a console error to Sentry

### Server-Side Errors

1. **Trigger API Route Error**: Errors in API route handlers
2. **Trigger Server Error**: Server-side errors with context

### Custom Messages & Context

1. **Send Custom Message**: Sends a custom message to Sentry
2. **Add Breadcrumb**: Adds breadcrumbs for error context
3. **Set User Context**: Sets user information
4. **Add Tags**: Adds custom tags to errors

### Performance Monitoring

1. **Test Performance Transaction**: Creates a performance transaction

## Verifying in Sentry Dashboard

### Steps to Verify

1. **Open Sentry Dashboard**: Go to [https://sentry.io](https://sentry.io)

2. **Navigate to Issues**: Click on "Issues" in the sidebar

3. **Check for New Errors**: You should see errors appear within a few seconds after triggering them

4. **View Error Details**: Click on an error to see:
   - **Stack Trace**: Full stack trace with source code
   - **Breadcrumbs**: User actions leading to the error
   - **User Context**: User information (if set)
   - **Tags**: Custom tags
   - **Environment**: Development/Production
   - **Release**: Application version

5. **Check Performance**: Go to "Performance" tab to see transactions

### Development Mode - Spotlight

In development mode, Sentry Spotlight is enabled. This allows you to see errors locally:

1. **Start Spotlight**: Run `make spotlight` or `pnpm dev:spotlight`
2. **Check Browser Console**: Look for Spotlight connection messages
3. **Spotlight UI**: Errors will appear in the Spotlight desktop app
4. **No Network Required**: Spotlight works offline for local development

For detailed instructions, see the [Sentry Spotlight Guide](./sentry-spotlight.md).

## Debug Mode

Enable debug mode to see detailed Sentry logs in the console:

### Enable Debug Mode

Add to your `.env.local`:

```bash
NEXT_PUBLIC_SENTRY_DEBUG=true
```

### What You'll See

With debug mode enabled, you'll see:

- Sentry initialization logs
- Error capture confirmations
- Network requests to Sentry
- Configuration details

### Disable Debug Mode

Remove or set to `false`:

```bash
NEXT_PUBLIC_SENTRY_DEBUG=false
# or remove the variable
```

## Common Issues

### Errors Not Appearing in Sentry

1. **Check DSN**: Verify `NEXT_PUBLIC_SENTRY_DSN` is set correctly
2. **Check Disabled Flag**: Ensure `NEXT_PUBLIC_SENTRY_DISABLED` is not set to `true`
3. **Check Network**: Verify network requests are not blocked
4. **Enable Debug Mode**: Set `NEXT_PUBLIC_SENTRY_DEBUG=true` to see what's happening
5. **Check Browser Console**: Look for Sentry error messages

### Source Maps Not Working

1. **Check Environment Variables**:

   ```bash
   SENTRY_ORGANIZATION=your-org
   SENTRY_PROJECT=your-project
   SENTRY_AUTH_TOKEN=your-auth-token
   ```

2. **Build with Source Maps**: Source maps are uploaded during build

   ```bash
   pnpm build
   ```

3. **Check Sentry Settings**: Verify source maps are enabled in Sentry project settings

### Spotlight Not Working

1. **Check Development Mode**: Spotlight only works in development
2. **Check Browser Console**: Look for Spotlight connection errors
3. **Install Spotlight**: May need to install Spotlight desktop app for full features

### Too Many Errors in Development

If you're getting too many errors during development:

1. **Disable Sentry in Development**:

   ```bash
   NEXT_PUBLIC_SENTRY_DISABLED=true
   ```

2. **Reduce Sample Rate**: Adjust `tracesSampleRate` in `instrumentation-client.ts`

3. **Use Spotlight Only**: Spotlight works locally without sending to Sentry

## Best Practices

1. **Test Regularly**: Use the test page to verify Sentry is working
2. **Monitor Production**: Keep Sentry enabled in production for real error tracking
3. **Set Up Alerts**: Configure alerts in Sentry for critical errors
4. **Review Errors**: Regularly review and fix errors in Sentry dashboard
5. **Add Context**: Always add relevant context (user, tags, breadcrumbs) to errors

## Accessing Sentry Dashboard

**Quick Access:**

- **Sentry Dashboard**: [https://sentry.io](https://sentry.io)
- **Sign Up**: [https://sentry.io/signup/](https://sentry.io/signup/)

**To view errors:**

1. Log in to [https://sentry.io](https://sentry.io)
2. Select your **Organization** and **Project**
3. Click **"Issues"** in the sidebar
4. Errors will appear within a few seconds after triggering them

For detailed instructions, see [Sentry Dashboard Access Guide](./sentry-dashboard-access.md).

## Additional Resources

- [Sentry Next.js Documentation](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
- [Sentry Spotlight](https://spotlightjs.com/)
- [Sentry Dashboard](https://sentry.io)
- [Sentry Dashboard Access Guide](./sentry-dashboard-access.md) - Complete guide on accessing and navigating Sentry

# How to Access Sentry Dashboard

This guide explains how to access and navigate the Sentry dashboard to view your application errors.

## Quick Access

**Sentry Dashboard URL:** [https://sentry.io](https://sentry.io)

## Step-by-Step Guide

### 1. Sign Up / Log In

1. Go to [https://sentry.io](https://sentry.io)
2. Click **"Sign Up"** (if you don't have an account) or **"Log In"** (if you already have one)
3. You can sign up with:
   - GitHub
   - Google
   - Email

### 2. Create a Project (If You Don't Have One)

If this is your first time using Sentry:

1. After logging in, you'll be prompted to **"Create Project"**
2. Select **"Next.js"** as your platform
3. Enter a **Project Name** (e.g., "best-perfumes-store" or "web-app")
4. Choose your **Organization** (or create a new one)
5. Click **"Create Project"**

### 3. Get Your DSN (Data Source Name)

After creating a project, Sentry will show you your **DSN**. It looks like:

```
https://abc123def456@o123456.ingest.sentry.io/789012
```

**Important:** Copy this DSN - you'll need it for your environment variables!

### 4. Add DSN to Your Project

Add the DSN to your `.env.local` file:

```bash
# .env.local
NEXT_PUBLIC_SENTRY_DSN=https://your-dsn-here@sentry.io/project-id
```

### 5. Navigate to Your Project Dashboard

Once you have a project:

1. **Select your Organization** (top left dropdown)
2. **Select your Project** (top left, next to organization)
3. You'll see the main dashboard with:
   - **Issues** - List of all errors
   - **Performance** - Performance monitoring
   - **Releases** - Application releases
   - **Alerts** - Error alerts

### 6. View Errors (Issues)

To see errors from your application:

1. Click **"Issues"** in the left sidebar (or top navigation)
2. You'll see a list of all errors
3. **Click on any error** to see:
   - **Stack Trace** - Full error details with line numbers
   - **Breadcrumbs** - User actions leading to the error
   - **User Context** - User information (if set)
   - **Tags** - Custom tags
   - **Environment** - Development/Production
   - **Release** - Application version
   - **Request** - HTTP request details

### 7. Test and Verify

1. **Trigger an error** using the test page:

   ```
   http://localhost:3000/en/debug/sentry
   ```

2. **Wait a few seconds** (errors appear within 5-10 seconds)

3. **Refresh your Sentry Issues page** - you should see the new error!

## Dashboard Sections

### Issues Page

- **All Issues**: List of all errors
- **Unresolved**: Errors that haven't been fixed
- **For Review**: Errors that need attention
- **Ignored**: Errors you've chosen to ignore

### Performance Page

- **Transactions**: Performance data
- **Web Vitals**: Core web vitals metrics
- **Traces**: Detailed performance traces

### Releases Page

- **Releases**: Application versions
- **Source Maps**: Uploaded source maps for better stack traces

### Settings Page

- **Client Keys (DSN)**: Your DSN configuration
- **Alerts**: Configure error alerts
- **Integrations**: Third-party integrations
- **Source Maps**: Source map upload settings

## Finding Your Organization and Project

If you need to find your organization or project name for environment variables:

1. Go to your project in Sentry
2. Click **Settings** (gear icon) in the left sidebar
3. Click **"Client Keys (DSN)"**
4. You'll see:
   - **Organization slug** (used for `SENTRY_ORGANIZATION`)
   - **Project slug** (used for `SENTRY_PROJECT`)

Or check the URL:

```
https://sentry.io/organizations/YOUR-ORG/projects/YOUR-PROJECT/
```

## Environment Variables Reference

For full Sentry setup, you may want these environment variables:

```bash
# Required for error tracking
NEXT_PUBLIC_SENTRY_DSN=https://your-dsn@sentry.io/project-id

# Optional: For source map uploads
SENTRY_ORGANIZATION=your-org-slug
SENTRY_PROJECT=your-project-slug
SENTRY_AUTH_TOKEN=your-auth-token

# Optional: Debug mode
NEXT_PUBLIC_SENTRY_DEBUG=true

# Optional: Disable Sentry (for testing)
NEXT_PUBLIC_SENTRY_DISABLED=false
```

## Getting Your Auth Token (For Source Maps)

If you want to upload source maps for better stack traces:

1. Go to **Settings** → **Account** → **Auth Tokens**
2. Click **"Create New Token"**
3. Select scopes:
   - `project:releases`
   - `org:read`
4. Copy the token and add to `.env.local`:
   ```bash
   SENTRY_AUTH_TOKEN=your-token-here
   ```

## Troubleshooting

### Can't See Errors?

1. **Check DSN**: Make sure `NEXT_PUBLIC_SENTRY_DSN` is set correctly
2. **Check Disabled Flag**: Ensure `NEXT_PUBLIC_SENTRY_DISABLED` is not `true`
3. **Wait a Few Seconds**: Errors can take 5-10 seconds to appear
4. **Check Network**: Make sure requests to Sentry aren't blocked
5. **Enable Debug Mode**: Set `NEXT_PUBLIC_SENTRY_DEBUG=true` to see what's happening

### Wrong Project?

1. Check the DSN in your environment variables matches your Sentry project
2. Make sure you're looking at the correct organization/project in Sentry

### Need Help?

- [Sentry Documentation](https://docs.sentry.io/)
- [Sentry Next.js Guide](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
- [Sentry Support](https://sentry.io/support/)

## Quick Links

- **Sentry Dashboard**: [https://sentry.io](https://sentry.io)
- **Create Account**: [https://sentry.io/signup/](https://sentry.io/signup/)
- **Documentation**: [https://docs.sentry.io](https://docs.sentry.io)

# Sentry Production Setup - Quick Guide

Simple steps to set up Sentry for production.

## ✅ What You Need

1. **Sentry Account** - Sign up at [sentry.io](https://sentry.io)
2. **DSN (Data Source Name)** - Get from your Sentry project
3. **Environment Variables** - Add to your production environment

## 🚀 Quick Setup (3 Steps)

### Step 1: Get Your Sentry DSN

1. Go to [https://sentry.io](https://sentry.io) and log in
2. Select your **Organization** → **Project**
3. Go to **Settings** → **Client Keys (DSN)**
4. Copy your DSN (looks like: `https://abc123@o123456.ingest.sentry.io/789012`)

### Step 2: Add Environment Variables

Add to your **production environment** (Vercel, Railway, etc.):

```bash
# Required
NEXT_PUBLIC_SENTRY_DSN=https://your-dsn@sentry.io/project-id

# Optional (for source maps - better stack traces)
SENTRY_ORGANIZATION=your-org-slug
SENTRY_PROJECT=your-project-slug
SENTRY_AUTH_TOKEN=your-auth-token
```

### Step 3: Deploy

That's it! Deploy your app. Sentry will automatically:
- ✅ Capture errors
- ✅ Track performance
- ✅ Send data to your Sentry dashboard

## 📋 Environment Variables Reference

### Required

```bash
NEXT_PUBLIC_SENTRY_DSN=https://your-dsn@sentry.io/project-id
```

### Optional (Recommended for Better Stack Traces)

```bash
# Get these from Sentry project settings
SENTRY_ORGANIZATION=your-org-slug
SENTRY_PROJECT=your-project-slug

# Get from: Settings → Account → Auth Tokens
SENTRY_AUTH_TOKEN=your-auth-token
```

### Optional (Debugging)

```bash
# Enable debug logs (only for troubleshooting)
NEXT_PUBLIC_SENTRY_DEBUG=false

# Disable Sentry (if needed)
NEXT_PUBLIC_SENTRY_DISABLED=false
```

## 🔍 How to Get Auth Token (For Source Maps)

1. Go to **Settings** → **Account** → **Auth Tokens**
2. Click **"Create New Token"**
3. Select scopes:
   - ✅ `project:releases`
   - ✅ `org:read`
4. Copy the token → Add to `SENTRY_AUTH_TOKEN`

## 📊 What Happens in Production

### Automatic Features

- ✅ **Error Tracking** - All errors are captured
- ✅ **Performance Monitoring** - Track slow operations
- ✅ **Session Replay** - See user sessions (10% sample rate)
- ✅ **Source Maps** - Better stack traces (if configured)

### What's Different from Development?

| Feature | Development | Production |
|---------|------------|------------|
| **Spotlight** | ✅ Enabled | ❌ Disabled |
| **Sends to Sentry** | ✅ Yes | ✅ Yes |
| **Sample Rate** | 100% | 100% (adjust if needed) |
| **Replay Rate** | 10% | 10% |

## 🎯 Verify It's Working

1. **Deploy your app**
2. **Trigger a test error** (or wait for a real one)
3. **Check Sentry Dashboard**:
   - Go to [sentry.io](https://sentry.io)
   - Select your project
   - Click **"Issues"**
   - Errors should appear within seconds!

## ⚙️ Production Optimizations (Optional)

### Reduce Sample Rates

If you have high traffic, reduce sample rates in `instrumentation-client.ts`:

```typescript
// Reduce performance sampling
tracesSampleRate: 0.1, // 10% instead of 100%

// Reduce replay sampling
replaysSessionSampleRate: 0.01, // 1% instead of 10%
```

### Adjust Error Sampling

In `instrumentation.ts`:

```typescript
tracesSampleRate: 0.1, // Sample 10% of transactions
```

## 🚨 Important Notes

1. **Don't disable in production** - Keep `NEXT_PUBLIC_SENTRY_DISABLED=false` or unset
2. **Source maps are optional** - App works without them, but stack traces are better with them
3. **Auth token is optional** - Only needed for automatic source map uploads
4. **DSN is required** - Without it, Sentry won't work

## 🆘 Troubleshooting

### Errors Not Appearing?

1. ✅ Check `NEXT_PUBLIC_SENTRY_DSN` is set correctly
2. ✅ Check `NEXT_PUBLIC_SENTRY_DISABLED` is not `true`
3. ✅ Wait 5-10 seconds (errors can take time to appear)
4. ✅ Check Sentry dashboard → Issues page

### Stack Traces Not Showing Source Code?

1. ✅ Add `SENTRY_ORGANIZATION`, `SENTRY_PROJECT`, `SENTRY_AUTH_TOKEN`
2. ✅ Build your app (source maps are uploaded during build)
3. ✅ Check Sentry project settings → Source Maps

### Too Many Errors?

1. ✅ Reduce sample rates (see above)
2. ✅ Set up error filtering in Sentry dashboard
3. ✅ Configure alerts to only notify on important errors

## 📚 More Information

- [Sentry Dashboard Access](./sentry-dashboard-access.md) - How to access Sentry
- [Sentry Testing Guide](./sentry-testing.md) - How to test Sentry
- [Sentry Spotlight Guide](./sentry-spotlight.md) - Local development tool

## ✅ Checklist

Before deploying to production:

- [ ] Sentry account created
- [ ] Project created in Sentry
- [ ] DSN copied
- [ ] `NEXT_PUBLIC_SENTRY_DSN` added to production environment
- [ ] (Optional) Source map variables added
- [ ] App deployed
- [ ] Errors appearing in Sentry dashboard

That's it! Your production error monitoring is ready. 🎉


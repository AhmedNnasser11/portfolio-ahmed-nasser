# Next.js `use cache: private` Demo

A minimal Next.js App Router project demonstrating the `use cache: private` directive with cookies, headers, and searchParams.

## What is `use cache: private`?

The `use cache: private` directive in Next.js enables **personalized caching** for data that varies by user. Unlike shared/static caching, private caching:

- ✅ Caches data **per user** based on cookies, headers, and other runtime values
- ✅ Improves performance for personalized content
- ✅ Respects `cacheLife` configurations for fine-grained control
- ❌ Does NOT share cached data between different users

## Prerequisites

- Node.js 18+
- Next.js 15.1.0 or later

## Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
testprivate/
├── app/
│   ├── lib/
│   │   └── cache.ts          # Cached function with 'use cache: private'
│   ├── api/
│   │   └── set-cookie/
│   │       └── route.ts       # API route to set demo cookie
│   └── page.tsx               # Main demo page
├── next.config.ts             # Next.js config with cacheComponents: true
└── package.json
```

## How to Use

### 1. Set a Demo Cookie

Visit one of these URLs to set your user cookie:

- **Alice**: [http://localhost:3000/api/set-cookie?user=alice](http://localhost:3000/api/set-cookie?user=alice)
- **Bob**: [http://localhost:3000/api/set-cookie?user=bob](http://localhost:3000/api/set-cookie?user=bob)
- **Custom**: `http://localhost:3000/api/set-cookie?user=YOUR_NAME`

You should see a JSON response confirming the cookie was set.

### 2. View the Demo Page

Navigate to [http://localhost:3000](http://localhost:3000)

The page displays:

- 🍪 Current cookie value (`demoUser`)
- 🌐 User-Agent header
- 🔢 SearchParam `?v=` value
- ⚡ Cached personalized data with timestamp and execution ID

### 3. Test Cache Behavior

#### Test 1: Refresh the Page

1. Refresh the page multiple times within 60 seconds
2. **Expected**: You'll see the SAME `executionId` (data is cached)
3. **Server logs**: No new execution logs appear

#### Test 2: Change Query Parameter

1. Click the "Navigate to ?v=1" button
2. **Expected**: NEW `executionId` (different cache key)
3. **Server logs**: New execution logged with 🔥 markers

#### Test 3: Change Cookie

1. Visit `/api/set-cookie?user=bob` (if you were Alice)
2. Return to the home page
3. **Expected**: NEW `executionId` (personalized cache)
4. **Server logs**: New execution logged

#### Test 4: Wait for Revalidation

1. Wait 60+ seconds after initial load
2. Refresh the page
3. **Expected**: Cache revalidates in background
4. **Server logs**: New execution after stale period

## Understanding the Cache Configuration

In `app/lib/cache.ts`, the cached function uses:

```typescript
cacheLife({
  stale: 60, // 60 seconds - data is fresh
  revalidate: 120, // 120 seconds - revalidate in background
  expire: 180, // 180 seconds - hard expiration
});
```

- **0-60s**: Data is fresh, served from cache
- **60-120s**: Data is stale, revalidates in background
- **120-180s**: Data revalidates before serving
- **180s+**: Cache expires, always fetches fresh

## Server Logs

Watch your terminal for cache execution logs:

```
🔥 CACHE FUNCTION EXECUTED 🔥
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⏰ Timestamp: 2025-12-15T12:06:37.123Z
🆔 Execution ID: abc123
👤 Cookie (demoUser): alice
🌐 User-Agent: Mozilla/5.0...
🔢 SearchParam (v): 1
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

When you see these logs, the cached function is executing. No logs = cached data is being served!

## Key Differences: Private vs Shared Caching

| Feature             | `use cache: private`                | Shared/Static Cache          |
| ------------------- | ----------------------------------- | ---------------------------- |
| **Personalization** | ✅ Per-user caching                 | ❌ Same for all users        |
| **Cookies/Headers** | ✅ Can use runtime values           | ❌ Static only               |
| **Use Case**        | User dashboards, personalized feeds | Public pages, static content |
| **Cache Storage**   | Per-user cache entries              | Single shared entry          |

## Troubleshooting

### Cache not working?

- Ensure `cacheComponents: true` is set in `next.config.ts`
- Verify you're using Next.js 15.1.0+
- Check server logs for execution markers

### Cookie not setting?

- Check browser DevTools → Application → Cookies
- Ensure you visited `/api/set-cookie?user=NAME` first
- Try clearing cookies and setting again

### Always seeing fresh data?

- Wait times might be too short to observe caching
- Check if you're changing `?v=` parameter between requests
- Verify the `executionId` in the UI - same ID = cached

## Learn More

- [Next.js use cache: private Documentation](https://nextjs.org/docs/app/api-reference/directives/use-cache-private)
- [Next.js Caching Guide](https://nextjs.org/docs/app/building-your-application/caching)
- [cacheLife API Reference](https://nextjs.org/docs/app/api-reference/next-config-js/cacheLife)

## License

MIT

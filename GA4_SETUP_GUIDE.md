# Google Analytics 4 Setup Guide

## Step 1: Get Your GA4 Measurement ID

### Option A: Create a New GA4 Property
1. Go to [Google Analytics](https://analytics.google.com/)
2. Click "Admin" (gear icon in bottom left)
3. Click "Create Property"
4. Fill in:
   - **Property name**: MicroTools
   - **Time zone**: Your timezone
   - **Currency**: USD
5. Click "Create" → Select "Web" platform
6. Enter your website URL: `https://www.microtoolshub.org`
7. Click "Create stream"
8. Copy the **Measurement ID** (looks like `G-XXXXXXXXXX`)

### Option B: Get ID from Existing Property
1. Go to Google Analytics > Admin
2. Select your property → Data Streams
3. Click your web stream
4. Copy the **Measurement ID** at the top

## Step 2: Set Up Local Environment Variables

1. Open `.env.local` in your project root
2. Add your GA4 Measurement ID:
```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```
3. Save the file
4. Restart your dev server: `npm run dev`

## Step 3: Set Up Vercel Environment Variables

### Via Vercel Dashboard
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your "50+ Tools" project
3. Click **Settings** → **Environment Variables**
4. Click **Add New**
5. Fill in:
   - **Name**: `NEXT_PUBLIC_GA_ID`
   - **Value**: `G-XXXXXXXXXX` (your GA4 Measurement ID)
   - **Environments**: Select `Production`, `Preview`, `Development`
6. Click **Save**
7. Redeploy the project (click **Deployments** → click latest → **Redeploy**)

### Via Vercel CLI
```bash
vercel env add NEXT_PUBLIC_GA_ID
# Paste your Measurement ID when prompted
# Select all environments when asked
vercel deploy --prod
```

## Step 4: Commit Changes to Git

```bash
# Check which files changed
git status

# Stage all changes (including new tracking hooks)
git add .

# Commit with descriptive message
git commit -m "chore: implement google analytics 4 tracking system

- Added useAnalytics hook for page view tracking on navigation
- Added useScrollDepth hook for scroll depth tracking at 25%, 50%, 75%, 100%
- Integrated GA4 event tracking in tool calculator (tool_used, tool_calculation)
- Added click tracking for Calculate, Copy, Share buttons
- Updated lib/ga4.ts with 12+ tracking functions (page views, events, errors, etc)
- Updated app/layout.tsx to inject GA4 gtag.js script with environment variables
- Updated components/tools/tool-page-client.tsx with analytics integration
- Added .env.example with GA4 setup documentation"

# Push to GitHub
git push origin main
```

## Step 5: Verify Analytics Setup

### Local Testing (Development)
1. Open your local app: `http://localhost:3000`
2. Open **Chrome DevTools** (F12)
3. Go to **Network** tab
4. Search for `gtag` or `googletagmanager`
5. You should see requests to `www.googletagmanager.com`
6. In **Console**, run:
```javascript
window.gtag('config', 'G-XXXXXXXXXX')
```
You should see no errors.

### Production Verification
1. Go to your deployed site: `https://www.microtoolshub.org`
2. Open DevTools (F12)
3. Click on a tool to trigger events
4. In **Network** tab, look for requests to `googletagmanager.com`
5. Verify the requests contain your Measurement ID

### Google Analytics Realtime Dashboard
1. Go to [Google Analytics](https://analytics.google.com/)
2. Select your MicroTools property
3. Click **Realtime** (left sidebar)
4. Use your website in another tab
5. You should see:
   - **Active Users**: should increase to 1+
   - **Events**: custom events like `tool_used`, `tool_calculation`
   - **Page views**: each navigation tracked

### Event Tracking Verification Checklist
- [ ] Page views tracked (navigate between pages)
- [ ] Tool usage tracked (open any tool page)
- [ ] Calculation tracked (click Calculate button)
- [ ] Button clicks tracked (click Copy/Share buttons)
- [ ] Scroll depth tracked (scroll down pages)
- [ ] Navigation tracked (click menu items)

## Step 6: Troubleshooting

### GA4 Tag Not Appearing
1. Check if `NEXT_PUBLIC_GA_ID` is set:
   ```bash
   echo $NEXT_PUBLIC_GA_ID  # Linux/Mac
   echo %NEXT_PUBLIC_GA_ID%  # Windows
   ```
2. Verify the value starts with `G-`
3. Rebuild: `npm run build`
4. Restart: `npm run dev`

### No Events in Realtime Dashboard
1. Wait 30-60 seconds after triggering event
2. Check browser console for errors: `F12 → Console`
3. Verify `window.gtag` is defined
4. Check that gtag.js script loaded:
   ```javascript
   // In console, check for gtag script
   document.querySelector('script[src*="googletagmanager"]')
   ```

### Vercel Deployment Issues
1. After adding env variables, **redeploy** the project
2. Deployments don't use updated env variables automatically
3. Go to **Deployments** tab and click **Redeploy** on latest

## Integration Points

### Page View Tracking
- Automatically tracked via `useAnalytics()` hook
- Fires on every route change (next/navigation)
- Captures URL and page title

### Tool Usage Tracking
- Triggered when opening a tool page
- Tracks: tool name, category, input count
- Updated as user fills in form inputs

### Tool Calculation Tracking
- Triggered when user clicks "Calculate"
- Tracks: tool name, category, result type
- Links calculation to specific tool

### Button Click Tracking
- Calculate, Copy, Share buttons tracked
- Includes button label, type, and location
- Helps identify user interaction patterns

### Scroll Depth Tracking
- Automatically tracks at 25%, 50%, 75%, 100%
- Helps measure engagement depth
- Only fires once per threshold per page

## Custom Events You Can Add

The GA4 module supports unlimited custom events. Examples:

```typescript
import { trackEvent } from '@/lib/ga4'

// Track search
trackEvent('search', {
  search_query: 'BMI calculator',
  result_count: 1,
})

// Track external link click
trackEvent('external_link_click', {
  link_url: 'https://example.com',
  link_domain: 'example.com',
})

// Track form submission
trackEvent('form_submission', {
  form_name: 'contact',
  form_type: 'contact',
})
```

## Files Modified/Created

- ✅ `lib/ga4.ts` - GA4 tracking module
- ✅ `lib/hooks/useAnalytics.ts` - Page view tracking hook
- ✅ `lib/hooks/useScrollDepth.ts` - Scroll depth tracking hook
- ✅ `app/layout.tsx` - GA4 script injection
- ✅ `components/tools/tool-page-client.tsx` - Tool page tracking integration
- ✅ `.env.example` - Environment variable template
- ✅ `.env.local` - Local environment variables (add your GA ID here)

## Next Steps

1. Get your GA4 Measurement ID
2. Update `.env.local` with your ID
3. Test locally with `npm run dev`
4. Add environment variable to Vercel
5. Redeploy to production
6. Verify in Analytics Realtime dashboard
7. Commit and push changes

## Support

For questions:
- [Google Analytics Help](https://support.google.com/analytics)
- [Next.js Script Component Docs](https://nextjs.org/docs/app/building-your-application/optimizing/scripts)
- [GA4 Best Practices](https://support.google.com/analytics/answer/11109416)

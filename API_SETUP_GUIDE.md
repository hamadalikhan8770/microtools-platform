# AI Tools API Setup Guide

## Overview

This guide explains how to set up the Google Gemini API (primary) and Groq API (secondary) for the AI tools on MicroTools.

---

## API Architecture

### Primary API: Google Gemini
**Used for premium quality tools:**
- AI Resume Generator
- AI Proposal Generator
- AI Email Writer

**Why Gemini?**
- Superior content quality
- Better understanding of complex tasks
- Perfect for professional documents
- Fastest inference for structured content

### Secondary API: Groq
**Used for fast, lightweight tools:**
- AI Bio Generator
- AI Hashtag Generator
- AI YouTube Title Generator

**Why Groq?**
- Extremely fast (1-3 seconds)
- Free tier, no credit card required
- Excellent for short-form content
- Automatic fallback if Gemini unavailable

---

## Step 1: Get Google Gemini API Key

### 1. Visit Google AI Studio
Go to: https://aistudio.google.com/

### 2. Sign in with Google
- Use your Google account
- If you don't have one, create it (free)

### 3. Create API Key
- Click "Get API Key" button
- Select "Create API Key in new project"
- Copy your API key immediately
- **Store it safely** - you'll need it for Vercel

### 4. Enable API
- The Generative Language API should be automatically enabled
- If not, enable it in Google Cloud Console

**✅ Free Tier Limits:**
- 60 requests per minute
- 1,500 requests per day
- More than enough for standard use

---

## Step 2: Get Groq API Key (Optional but Recommended)

### 1. Visit Groq Console
Go to: https://console.groq.com/

### 2. Sign Up (Free)
- Click "Sign In" then "Create Account"
- No credit card required
- Instant approval

### 3. Create API Key
- Go to "API Keys" section
- Click "Create New API Key"
- Copy your API key
- **Store it safely**

**✅ Free Tier:**
- Up to 14,400 requests per day
- Perfect for our use cases

---

## Step 3: Configure in Vercel

### 1. Go to Your Vercel Project
- Visit: https://vercel.com/dashboard
- Select your "MicroTools" project

### 2. Open Project Settings
- Click "Settings" tab
- Go to "Environment Variables" section

### 3. Add Gemini API Key
- **Name:** `GEMINI_API_KEY`
- **Value:** Paste your key from step 1
- **Environments:** Select "Production" and "Preview"
- Click "Save"

### 4. Add Groq API Key (Optional)
- **Name:** `GROQ_API_KEY`
- **Value:** Paste your key from step 2
- **Environments:** Select "Production" and "Preview"
- Click "Save"

### 5. Redeploy
- Go to "Deployments" tab
- Click the three dots on latest deployment
- Select "Redeploy"
- Wait for deployment to complete

---

## Step 4: Verify Setup

### Test the Tools

#### Using Resume Generator:
1. Visit: https://www.microtoolshub.org/ai-tools/resume-generator
2. Fill in sample resume data:
   - Name: "John Smith"
   - Email: "john@example.com"
   - Phone: "(123) 456-7890"
   - Experience: "Project Manager at Tech Corp 2020-2023"
3. Click "Generate Resume"
4. Should see resume appear in preview within 5 seconds

#### Using Proposal Generator:
1. Visit: https://www.microtoolshub.org/ai-tools/proposal-generator
2. Fill in sample proposal data
3. Click "Generate Proposal"
4. Should see proposal in preview within 5 seconds

#### Using Email Writer:
1. Visit: https://www.microtoolshub.org/ai-tools/email-writer
2. Fill in sample email data
3. Click "Generate Email"
4. Should see email in preview within 3 seconds

**✅ All tools should work without errors**

---

## Troubleshooting

### Tool says "API not configured"
**Problem:** API key not set in Vercel
**Solution:**
1. Double-check API key is added to Vercel environment variables
2. Verify it's redeployed (redeploy will be triggered automatically)
3. Wait 2-3 minutes for changes to propagate
4. Hard refresh browser (Ctrl+Shift+R on Windows, Cmd+Shift+R on Mac)

### Tool is slow (>10 seconds)
**Problem:** API is under load or network issue
**Solution:**
1. Try again in a moment
2. Check your internet connection
3. Groq automatically switches to secondary if available

### "No content generated" error
**Problem:** API response format issue
**Solution:**
1. Try with different input
2. Check API keys are correct
3. Visit https://status.groq.com for service status

### Other errors
**Check:**
1. API key is correctly copied (no extra spaces)
2. API key is valid (test on official APIs)
3. Rate limits not exceeded
4. Browser console (F12) for detailed errors

---

## API Key Security

### Best Practices
✅ **Do:**
- Store keys in Vercel environment variables only
- Never commit keys to Git/GitHub
- Rotate keys periodically
- Use separate keys for dev/production if needed

❌ **Don't:**
- Hardcode keys in files
- Share keys via email/chat
- Use same key across projects
- Commit .env files to Git

### If Key is Compromised
1. Regenerate key immediately in API dashboard
2. Update in Vercel environment variables
3. Redeploy
4. No other action needed (keys have no persistent access)

---

## Monitoring Usage

### Google Gemini
- Check usage at: https://aistudio.google.com/ → Usage
- Shows daily requests and quota
- Resets daily at midnight UTC

### Groq
- Check usage at: https://console.groq.com/ → Usage
- Shows daily requests and quota
- Resets daily

**Tip:** Both have generous free tiers. You'll rarely hit limits unless you have massive traffic.

---

## Upgrading (Optional)

### If You Need Higher Limits

**Google Gemini:**
- Paid tier available at https://cloud.google.com/
- Pay-as-you-go pricing
- Higher request limits

**Groq:**
- Free tier is usually sufficient
- Pro tier available for higher limits
- Contact support for enterprise options

---

## Alternative APIs (Backup)

If Groq/Gemini fails, the system automatically falls back:

1. **Resume/Proposal/Email** → Uses Gemini first, falls back to Groq
2. **Bio/Hashtags/Titles** → Uses Groq first, falls back to Gemini

This ensures maximum reliability.

---

## Testing Locally (Optional)

To test locally before deploying:

```bash
# Create .env.local file in project root
echo "GEMINI_API_KEY=your_key_here" > .env.local
echo "GROQ_API_KEY=your_groq_key_here" >> .env.local

# Run dev server
npm run dev

# Test at http://localhost:3000/ai-tools/resume-generator
```

---

## Support

### Issues with Gemini?
- Visit: https://aistudio.google.com/support
- Check documentation: https://ai.google.dev/

### Issues with Groq?
- Visit: https://console.groq.com/docs
- Check status: https://status.groq.com

### Issues with MicroTools?
- Email: hamadali0032@gmail.com
- Check browser console for detailed errors

---

## Summary Checklist

- [ ] Got Gemini API key from https://aistudio.google.com/
- [ ] Got Groq API key from https://console.groq.com/ (optional)
- [ ] Added GEMINI_API_KEY to Vercel environment variables
- [ ] Added GROQ_API_KEY to Vercel (optional)
- [ ] Redeployed project to Vercel
- [ ] Tested Resume Generator at /ai-tools/resume-generator
- [ ] Tested Proposal Generator at /ai-tools/proposal-generator
- [ ] Tested Email Writer at /ai-tools/email-writer
- [ ] Verified no API errors in browser console
- [ ] Checked AdSense dashboard - no policy violations

**Once all boxes are checked, you're done! 🎉**

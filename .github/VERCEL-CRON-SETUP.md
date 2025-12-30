# 🚀 Vercel Cron Jobs Setup Guide

## Overview
This project uses **Vercel Cron Jobs** to automatically update the database daily with:
- New YouTube videos from design channels (runs at 2:00 AM UTC)
- Clean up dead/broken resource links (runs at 3:00 AM UTC)

## ✅ Advantages over GitHub Actions
- ✅ Runs directly on Vercel (same platform as your website)
- ✅ No manual triggers needed
- ✅ Completely automatic
- ✅ Uses Vercel's built-in cron system
- ✅ Easier to debug and monitor

---

## 📋 Setup Steps

### Step 1: Add Environment Variables to Vercel

Go to your Vercel project settings:
**https://vercel.com/samantha-blablablas-projects/design-resources-website/settings/environment-variables**

Click **"Add New"** and add these variables:

| Variable Name | Value | Environment |
|--------------|-------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://kmzcbwiqlfdcrqqndglm.supabase.co` | Production |
| `SUPABASE_SERVICE_ROLE_KEY` | (Copy from `.env.local`) | Production |
| `YOUTUBE_API_KEY` | (Copy from `.env.local`) | Production |
| `CRON_SECRET` | Generate a random string (e.g., `cron_secret_abc123xyz`) | Production |

**How to generate CRON_SECRET:**
```bash
# Run this in terminal to generate a secure random secret:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Or just use a simple string like: `my_secret_cron_key_2025`

---

### Step 2: Deploy to Vercel

Once you've added all environment variables, the cron jobs will automatically run according to schedule after deployment.

**Deploy command:**
```bash
git add .
git commit -m "Setup Vercel Cron Jobs"
git push origin main
```

Vercel will auto-deploy when you push to `main` branch.

---

## 📅 Cron Schedule

| Job | Schedule | Time (UTC) | Time (Vietnam) | Description |
|-----|----------|-----------|----------------|-------------|
| Fetch Videos | `0 2 * * *` | 2:00 AM | 9:00 AM | Fetch new YouTube videos |
| Cleanup | `0 3 * * *` | 3:00 AM | 10:00 AM | Remove dead links |

**Cron format:** `minute hour day month dayOfWeek`
- `0 2 * * *` = Every day at 2:00 AM UTC
- `0 3 * * *` = Every day at 3:00 AM UTC

---

## 🧪 Testing Cron Jobs

### Test Locally
```bash
# Test fetch videos endpoint (requires CRON_SECRET in .env.local)
curl -X GET http://localhost:3000/api/cron/fetch-videos \
  -H "Authorization: Bearer YOUR_CRON_SECRET"

# Test cleanup endpoint
curl -X GET http://localhost:3000/api/cron/cleanup \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

### Test on Production
```bash
# Replace YOUR_CRON_SECRET with your actual secret
curl -X GET https://design-resources-website.vercel.app/api/cron/fetch-videos \
  -H "Authorization: Bearer YOUR_CRON_SECRET"

curl -X GET https://design-resources-website.vercel.app/api/cron/cleanup \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

---

## 📊 Monitoring Cron Jobs

### View Cron Logs in Vercel
1. Go to: https://vercel.com/samantha-blablablas-projects/design-resources-website
2. Click **"Deployments"** tab
3. Click on latest deployment
4. Click **"Functions"** tab
5. Look for `/api/cron/fetch-videos` and `/api/cron/cleanup`
6. View logs to see execution results

### Check Cron Execution Status
Vercel Dashboard will show:
- ✅ Green = Success
- ❌ Red = Failed
- 🕐 Scheduled time
- 📊 Execution duration

---

## 🔧 Files Overview

| File | Purpose |
|------|---------|
| `app/api/cron/fetch-videos/route.ts` | API endpoint to fetch YouTube videos |
| `app/api/cron/cleanup/route.ts` | API endpoint to cleanup dead resources |
| `vercel.json` | Vercel cron configuration |
| `.github/VERCEL-CRON-SETUP.md` | This documentation |

---

## 🐛 Troubleshooting

### Cron job not running?
1. **Check environment variables** - Make sure all 4 variables are set in Vercel
2. **Check CRON_SECRET** - Must match between Vercel env and your API routes
3. **Redeploy** - Push a new commit to trigger redeployment
4. **Check Vercel logs** - Look for error messages in function logs

### "Unauthorized" error?
- CRON_SECRET is missing or incorrect in Vercel environment variables

### No new videos?
- Channels haven't uploaded new videos
- YouTube API quota exceeded (10,000 units/day)
- Videos already exist in database

### Database errors?
- Check Supabase connection
- Verify SERVICE_ROLE_KEY has correct permissions
- Check database schema

---

## ✨ How It Works

1. **Vercel Cron System** triggers the API routes at scheduled times
2. **API Route** (`/api/cron/fetch-videos`) validates request using CRON_SECRET
3. **Fetch Script** runs inside the API route, fetches videos from YouTube
4. **Database Insert** stores new videos in Supabase
5. **Cleanup Route** (`/api/cron/cleanup`) removes dead links
6. **Response** returns summary of what was done

---

## 🎯 Next Steps After Setup

1. ✅ Add all 4 environment variables to Vercel
2. ✅ Generate and add CRON_SECRET
3. ✅ Deploy to Vercel (push to main branch)
4. ✅ Wait for next scheduled run (2 AM UTC next day)
5. ✅ Check Vercel logs to verify it worked
6. ✅ Check database for new videos

---

**Created:** 2025-12-30
**Last Updated:** 2025-12-30

---

## 🆚 GitHub Actions vs Vercel Cron

| Feature | GitHub Actions | Vercel Cron |
|---------|---------------|-------------|
| Setup complexity | More complex | Simpler |
| Manual trigger needed? | Yes (was failing) | No |
| Built into platform? | Separate service | Yes |
| Debugging | GitHub logs | Vercel logs |
| **Winner** | ❌ | ✅ |

**Decision: We're using Vercel Cron because it's simpler and more reliable!**

# 🤖 Automation Setup Guide

## Overview
This project uses GitHub Actions to automatically update the database daily with:
- New YouTube videos from design channels
- Clean up dead/broken resource links

## 📋 Prerequisites

You need to add the following secrets to your GitHub repository:

### How to Add GitHub Secrets

1. Go to your repository on GitHub: https://github.com/samantha-blablabla/design-resources-website
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add each of the following secrets:

### Required Secrets

| Secret Name | Description | Value |
|------------|-------------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | `https://kmzcbwiqlfdcrqqndglm.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key | See `.env.local` file |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (admin) | See `.env.local` file |
| `YOUTUBE_API_KEY` | YouTube Data API v3 key | See `.env.local` file |

**⚠️ IMPORTANT:** Copy the exact values from your `.env.local` file.

---

## 🚀 Workflow Details

### Automatic Schedule
- **Runs daily at**: 2:00 AM UTC (9:00 AM Vietnam time)
- **Actions performed**:
  1. Fetch latest videos from YouTube design channels
  2. Clean up dead resources (broken links, deleted videos)

### Manual Trigger
You can also run the workflow manually:
1. Go to **Actions** tab in GitHub
2. Select **Daily Database Update** workflow
3. Click **Run workflow** button

---

## 📊 Monitoring

### Check Workflow Status
1. Go to **Actions** tab: https://github.com/samantha-blablabla/design-resources-website/actions
2. Look for "Daily Database Update" workflow
3. Click on any run to see detailed logs

### What to Look For
- ✅ Green checkmark = Success
- ❌ Red X = Failed (check logs for errors)
- 🟡 Yellow dot = Running

---

## 🧪 Testing Locally

Before the automation runs automatically, you can test it locally:

```bash
# Test fetching YouTube videos
npm run fetch-videos

# Test cleanup of dead resources
npm run cleanup-dead

# Run both (full daily update)
npm run daily-update
```

**Note:** Make sure you have `.env.local` file with all required keys.

---

## 📝 Scripts Overview

| Script | Command | Description |
|--------|---------|-------------|
| Fetch Videos | `npm run fetch-videos` | Fetch new YouTube videos from design channels |
| Cleanup Dead | `npm run cleanup-dead` | Remove broken links and deleted videos |
| Daily Update | `npm run daily-update` | Run both fetch and cleanup |

---

## 🔧 Customization

### Change Schedule
Edit `.github/workflows/daily-update.yml`:

```yaml
schedule:
  - cron: '0 2 * * *'  # Change time here (UTC)
```

**Cron examples:**
- `0 2 * * *` = 2:00 AM UTC daily
- `0 */6 * * *` = Every 6 hours
- `0 0 * * 1` = Every Monday at midnight

### Add More Channels
Edit `scripts/fetch-youtube-videos.ts`:

```typescript
const DESIGN_CHANNELS = {
  'Channel Name': 'CHANNEL_ID_HERE',
  // Add more channels...
};
```

---

## 🐛 Troubleshooting

### Workflow Failed

**Check these:**
1. Are all GitHub Secrets set correctly?
2. Are the API keys still valid?
3. Check workflow logs for specific error messages

### No New Videos

**Possible reasons:**
- Channels haven't uploaded new videos
- YouTube API quota exceeded (10,000 units/day)
- Videos already exist in database

### Database Errors

**Check:**
1. Supabase connection is working
2. Service role key has correct permissions
3. Database schema matches script expectations

---

## 📚 Related Files

- Workflow file: `.github/workflows/daily-update.yml`
- Fetch videos script: `scripts/fetch-youtube-videos.ts`
- Cleanup script: `scripts/cron-cleanup-dead-resources.ts`
- Package scripts: `package.json`

---

## ✅ Setup Checklist

- [ ] Add all 4 secrets to GitHub repository
- [ ] Test scripts locally (`npm run daily-update`)
- [ ] Wait for first automatic run (next day at 2 AM UTC)
- [ ] Check workflow status in Actions tab
- [ ] Monitor database for new videos

---

**Created:** 2025-12-30
**Last Updated:** 2025-12-30

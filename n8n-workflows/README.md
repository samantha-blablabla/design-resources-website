# n8n Workflows for Design Resources Website

Collection of n8n workflows to automate content fetching for the design resources website.

## 📦 Workflows

### 1. YouTube Videos Fetcher - Multi Channel (`youtube-videos-fetcher-multi-channel.json`) ⭐ **RECOMMENDED**
**Purpose**: Automatically fetch design tutorial videos from 11 YouTube channels with intelligent auto-categorization

**Schedule**: Daily at 6:00 AM

**What it does**:
- Fetches latest 10 videos from each channel (110 videos total)
- Extracts video metadata (title, description, thumbnail, published date)
- **Intelligent auto-categorization** based on title/description/channel:
  - Design Categories: UI, UX, Web Design, Branding, Graphic Design
  - Motion & 3D: Motion Graphics, 3D Design, Blender
  - Tools: Figma, Adobe, Design Tools
  - Topics: Tutorial, Portfolio, Typography, Color Theory, Business, AI
- Checks for duplicates before inserting
- Inserts only new videos into Supabase
- Returns up to 5 relevant tags per video

**Channels monitored** (11 channels):
- **UI/UX Design**: DesignCourse, Flux Academy, Jesse Showalter
- **Design Business**: The Futur, Charli Marie
- **Motion Graphics**: Motion Design School, School of Motion, Dope Motions
- **3D Design**: DesignWithArash, Blender Guru, Blender Bros

**Auto-categorization keywords**:
- UI Design: ui, user interface, interface design
- UX Design: ux, user experience, usability
- Web Design: web design, website, responsive
- Motion Graphics: motion, animation, after effects
- 3D Design: 3d, blender, cinema 4d, c4d, maya
- Figma: figma
- Adobe: adobe, photoshop, illustrator, xd, premiere
- AI: ai, midjourney, dall-e, chatgpt
- And more...

### 2. YouTube Videos Fetcher - Single Channel (`youtube-videos-fetcher-fixed.json`)
**Purpose**: Simple workflow for testing with a single YouTube channel

**Schedule**: Daily at 6:00 AM

**What it does**:
- Fetches latest 5 videos from DesignCourse channel
- Basic categorization (Design, Tutorial tags)
- Checks for duplicates
- Good for testing and development

---

## 🚀 How to Import

### Step 1: Import Workflow
1. Go to your n8n instance: https://n8n.thienstyle.com
2. Navigate to **Workflows** → Click **Import from File**
3. Select the workflow JSON file (e.g., `youtube-videos-fetcher.json`)
4. Click **Import**

### Step 2: Setup Credentials

#### For YouTube Videos Fetcher:
You need to set up **2 credentials**:

**A. YouTube API Key**
1. Go to n8n **Settings** → **Credentials** → **New Credential**
2. Search for "HTTP Request" or create environment variable
3. Add your YouTube API key as `YOUTUBE_API_KEY`

**B. Supabase PostgreSQL**
1. Go to **Settings** → **Credentials** → **New Credential**
2. Select "Postgres"
3. Name it: `Supabase PostgreSQL`
4. Fill in connection details:
   - **Host**: `db.kmzcbwiqlfdcrqqndglm.supabase.co`
   - **Database**: `postgres`
   - **User**: `postgres.kmzcbwiqlfdcrqqndglm`
   - **Password**: Your Supabase service role key
   - **Port**: `5432`
   - **SSL**: Enable (set to `require`)

### Step 3: Configure Environment Variables (Optional)
If using environment variables for API keys:

1. Go to **Settings** → **Environment Variables**
2. Add:
   - `YOUTUBE_API_KEY`: Your YouTube Data API v3 key

### Step 4: Test the Workflow
1. Open the imported workflow
2. Click **Execute Workflow** (test run)
3. Check execution log for any errors
4. Verify data in Supabase `resources` table

### Step 5: Activate
1. Toggle **Active** switch in the workflow
2. The workflow will now run automatically daily at 6 AM

---

## 🔧 Customization

### Change Schedule
Edit the "Schedule Daily 6AM" node:
- Current: `0 6 * * *` (6:00 AM every day)
- Example: `0 */6 * * *` (Every 6 hours)

### Add More Channels
Edit the "Set YouTube Channels" node and add to the JSON array:
```json
{
  "id": "CHANNEL_ID_HERE",
  "name": "Channel Name"
}
```

### Modify Auto-Categorization
Edit the JavaScript code in "Transform & Categorize" node to add custom tags or categories.

---

## 📊 Monitoring

### Check Execution History
1. Go to **Executions** tab in n8n
2. Filter by workflow name
3. Click on execution to see detailed logs

### Typical Results
- **Fetched**: ~130 videos (13 channels × 10 videos)
- **Inserted**: 5-20 new videos (depends on channel activity)
- **Skipped**: 110-125 existing videos
- **Duration**: ~2-3 minutes per execution

---

## ⚠️ Troubleshooting

### Error: "YouTube API quota exceeded"
- **Cause**: YouTube API has daily quota limit (10,000 units/day)
- **Solution**: Reduce `maxResults` in "YouTube API - Search Videos" node or reduce frequency

### Error: "Supabase connection failed"
- **Check**: Supabase credentials are correct
- **Check**: IP whitelist in Supabase (if enabled)
- **Check**: Database is accessible

### No new videos inserted
- **Check**: Videos might already exist in database
- **Check**: Channels might not have published new content
- **Check**: Execution logs for skipped items

---

## 🔐 Security Notes

- ⚠️ **Never commit API keys** to git
- ✅ Use n8n's credential system (encrypted storage)
- ✅ Use environment variables for sensitive data
- ✅ Enable 2FA on your n8n instance

---

## 📝 Next Workflows

Coming soon:
- [ ] RSS Inspiration Fetcher (Dribbble, Behance, Awwwards)
- [ ] GitHub Resources Scraper (graphic design repos)
- [ ] Content Cleanup (remove old/outdated content)
- [ ] Email Digest (weekly summary of new content)

---

## 💬 Support

If you encounter issues:
1. Check execution logs in n8n
2. Verify credentials are configured correctly
3. Test individual nodes using "Execute Node" button
4. Check Supabase database manually

---

**Created for**: Design Resources Website
**Last Updated**: 2025-12-30
**n8n Version**: Compatible with n8n v1.x+

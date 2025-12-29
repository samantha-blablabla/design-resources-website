# Fetch Resources Edge Function

Automated resource scraper with AI classification.

## Features

- **Web Scraping**: Fetches design resources from bookmarks.design
- **AI Classification**: Uses OpenAI GPT-4o-mini to classify resources
- **Duplicate Prevention**: URL normalization and upsert logic
- **Scheduled Execution**: Runs automatically every 3 days

## Environment Variables

Required in Supabase Edge Functions:

```bash
SUPABASE_URL=your-project-url
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
OPENAI_API_KEY=your-openai-api-key  # Optional, uses fallback if not set
```

## AI Classification

For each resource, AI generates:
- **Category**: Main category (e.g., "UI Design", "Icons")
- **Tags**: 2-4 relevant tags
- **Emoji**: Representative emoji
- **Description**: 1-2 sentence description

## Cron Schedule

Configured in `cron.yml`:
- Runs every 3 days at midnight UTC
- Cron expression: `0 0 */3 * *`

## Deploy

```bash
# Deploy function
supabase functions deploy fetch-resources

# Set environment variables
supabase secrets set OPENAI_API_KEY=your-key

# Deploy cron (if using Supabase cron)
# Cron is automatically configured via cron.yml
```

## Manual Invoke

```bash
# Local testing
supabase functions serve fetch-resources

# Production invoke
curl -X POST https://your-project.supabase.co/functions/v1/fetch-resources \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

## Response Format

```json
{
  "success": true,
  "totalFound": 100,
  "inserted": 25,
  "skipped": 75,
  "errors": 0,
  "data": [...]
}
```

## Duplicate Prevention

1. URL normalization (lowercase, remove trailing slash, www)
2. Check existing URLs before insert
3. Upsert with `onConflict: 'url'`
4. Deduplicate scraped data before processing

## Rate Limiting

- 500ms delay between AI classification calls
- Prevents API rate limit issues

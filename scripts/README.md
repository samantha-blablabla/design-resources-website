# Database Maintenance Scripts

This directory contains automated scripts for maintaining the resources database, including thumbnail generation and dead link detection/removal.

## Available Scripts

### 1. YouTube Thumbnail Updates

**Script**: `update-youtube-thumbnails.ts`

Automatically fetches and updates YouTube video thumbnails for all video tutorials in the database.

```bash
npx tsx scripts/update-youtube-thumbnails.ts
```

**Features:**
- Extracts video IDs from various YouTube URL formats
- Generates high-quality thumbnail URLs (maxresdefault)
- Skips videos that already have thumbnails
- Uses service role key for database updates

---

### 2. Dead Link Detection

#### Check Dead Videos Only
**Script**: `check-dead-thumbnails.ts`

Checks all video tutorials for dead/inaccessible YouTube links without removing them.

```bash
npx tsx scripts/check-dead-thumbnails.ts
```

#### Check All Resources
**Script**: `validate-all-resources.ts`

Validates all resources in the database (videos, icons, colors, UI kits, etc.).

```bash
npx tsx scripts/validate-all-resources.ts
```

**Features:**
- Smart URL checking (YouTube-specific for videos, HTTP HEAD for others)
- Category-based validation summary
- Detailed dead resource reporting
- No deletions - read-only operation

---

### 3. Dead Link Removal

#### Remove Dead Videos Only
**Script**: `remove-dead-videos.ts`

Removes video tutorials with inaccessible YouTube thumbnails.

```bash
npx tsx scripts/remove-dead-videos.ts
```

#### Remove All Dead Resources
**Script**: `remove-all-dead-resources.ts`

Removes all resources (any category) with dead/inaccessible URLs.

```bash
npx tsx scripts/remove-all-dead-resources.ts
```

⚠️ **Warning**: These scripts permanently delete resources from the database.

---

### 4. Validation Before Insert

**Script**: `validate-before-insert.ts`

Validates YouTube URLs before inserting them into the database. Designed for use in automation pipelines.

```bash
npx tsx scripts/validate-before-insert.ts
```

**Usage in Code:**
```typescript
import { validateYouTubeUrls } from './scripts/validate-before-insert';

const urls = [
  'https://www.youtube.com/watch?v=VIDEO_ID_1',
  'https://www.youtube.com/watch?v=VIDEO_ID_2',
];

const { valid, invalid } = await validateYouTubeUrls(urls);

// Only insert valid URLs
for (const item of valid) {
  await supabase.from('resources').insert({
    url: item.url,
    thumbnail_url: item.thumbnailUrl,
    // ... other fields
  });
}
```

---

### 5. Cron Job - Automated Cleanup

**Script**: `cron-cleanup-dead-resources.ts`

Production-ready cron job for scheduled dead resource cleanup.

```bash
# Dry run (no deletions)
DRY_RUN=true npx tsx scripts/cron-cleanup-dead-resources.ts

# Production run (will delete)
npx tsx scripts/cron-cleanup-dead-resources.ts
```

**Features:**
- Configurable rate limiting
- Request timeout handling
- Dry run mode for testing
- Detailed logging
- Error handling

**Recommended Cron Schedules:**

```bash
# Daily at 2 AM
0 2 * * * cd /path/to/project && npx tsx scripts/cron-cleanup-dead-resources.ts

# Weekly on Sunday at 2 AM
0 2 * * 0 cd /path/to/project && npx tsx scripts/cron-cleanup-dead-resources.ts

# Monthly on 1st at 2 AM
0 2 1 * * cd /path/to/project && npx tsx scripts/cron-cleanup-dead-resources.ts
```

**On Vercel/Netlify**: Use Vercel Cron Jobs or Netlify Functions with scheduled triggers.

---

## Environment Variables Required

All scripts require these environment variables (from `.env.local`):

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

---

## Workflow Examples

### Initial Setup
```bash
# 1. Update all YouTube thumbnails
npx tsx scripts/update-youtube-thumbnails.ts

# 2. Check for dead links
npx tsx scripts/validate-all-resources.ts

# 3. Remove dead resources if any found
npx tsx scripts/remove-all-dead-resources.ts
```

### Regular Maintenance
```bash
# Weekly: Check and clean up dead resources
npx tsx scripts/cron-cleanup-dead-resources.ts
```

### Before Adding New Resources
```bash
# Validate URLs before insertion
npx tsx scripts/validate-before-insert.ts
```

---

## Script Performance

- **Validation Speed**: ~300ms per resource (with delays to avoid rate limiting)
- **Expected Runtime**:
  - 60 resources: ~3-4 minutes
  - 100 resources: ~5-6 minutes
  - 200 resources: ~10-12 minutes

---

## Error Handling

All scripts include:
- ✅ Network timeout handling (10s default)
- ✅ Rate limiting delays (300ms between requests)
- ✅ Detailed error logging
- ✅ Graceful failure handling
- ✅ Transaction rollback on errors

---

## Best Practices

1. **Always test in dry run mode first**
   ```bash
   DRY_RUN=true npx tsx scripts/cron-cleanup-dead-resources.ts
   ```

2. **Back up database before bulk deletions**
   - Use Supabase dashboard to create backups
   - Or export data: `supabase db dump > backup.sql`

3. **Monitor logs when running in production**
   - Check for unusual patterns
   - Verify deletion counts are reasonable

4. **Schedule cleanup during low-traffic hours**
   - Recommended: 2-4 AM in your timezone

5. **Test new resources before batch insertion**
   ```bash
   npx tsx scripts/validate-before-insert.ts
   ```

---

## Troubleshooting

### "Command not found: npx"
Install Node.js and npm first.

### "Error: supabaseUrl is required"
Make sure `.env.local` exists and contains correct environment variables.

### "Permission denied" or "Access denied"
Ensure you're using `SUPABASE_SERVICE_ROLE_KEY` not `SUPABASE_ANON_KEY`.

### Script hangs or times out
- Increase timeout in script configuration
- Check network connectivity
- Some resources may be very slow to respond

### Too many resources marked as dead
- May be network issues on your end
- Try running script again after a few minutes
- Check if specific domains are blocked

---

## Contributing

When adding new scripts:
1. Follow existing naming conventions
2. Include TypeScript types
3. Add error handling
4. Update this README
5. Test thoroughly before committing

---

## License

Same as the main project.

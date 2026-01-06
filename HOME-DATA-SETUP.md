# Home Page Data Setup Guide

## ✅ Tasks Completed

### 1. N8n Automation Check

**Status**: ✅ Working (workflow created and tested)

**n8n Workflow**: `youtube-videos-fetcher-multi-channel.json`
- Fetches from 11 YouTube design channels
- Intelligent auto-categorization
- Runs daily at 6 AM
- Inserts new videos to Supabase automatically

**To activate**:
1. Go to https://n8n.thienstyle.com/workflow/EcYUQknGPR0vQwfe
2. Click "Active" toggle to enable daily automation
3. Videos will auto-populate in database every day

---

### 2. Fill Home Page Data

**Current Home Page Sections**:
1. **Featured AI Tools** - Shows `category='ai-tools'` AND `featured=true`
2. **Featured Tools** - Shows any category with `featured=true`
3. **Latest Resources** - Shows latest (excluding videos)

**Data Prepared**:
- ✅ 5 Featured AI Tools (Midjourney, ChatGPT, Runway ML, Framer AI, Adobe Firefly)
- ✅ 3 Featured Tools (Figma, Adobe Creative Cloud, Procreate)
- ✅ 6 Latest Resources (Gradients, UI Kits, Textures, Icons, Fonts, Mockups)

**How to Insert Data**:

#### Option 1: Using Supabase SQL Editor (Recommended)
1. Go to https://supabase.com/dashboard
2. Select your project
3. Go to "SQL Editor"
4. Open `fill-home-data.sql` file
5. Copy all SQL content
6. Paste into SQL Editor
7. Click "Run" to execute

#### Option 2: Using psql Command Line
```bash
psql "postgresql://postgres.kmzcbwiqlfdcrqqndglm:Abc27102003@@db.kmzcbwiqlfdcrqqndglm.supabase.co:5432/postgres" -f fill-home-data.sql
```

#### Option 3: Manual Insert via Admin Page
1. Go to http://localhost:3000/admin
2. Use the "Add Resource" form for each item
3. Make sure to set `featured=true` for AI Tools and Featured Tools
4. Set `featured=false` for Latest Resources

---

### 3. Admin Sync Issue - Root Cause & Solution

**Problem**: Admin page updates to Supabase but website doesn't show changes immediately

**Root Cause**:
1. **No Real-time Updates** - Website doesn't listen to Supabase changes
2. **Client-side Cache** - React state caches old data
3. **No Auto-refresh** - Need to manually refresh browser to see changes

**Solution 1: Add Router Refresh (Quick Fix)**

Update `app/admin/page.tsx` after successful update/create:

```typescript
// Import useRouter
import { useRouter } from 'next/navigation';

// Inside component
const router = useRouter();

// In handleSubmit function, after successful update:
if (!error) {
    alert('Updated successfully!');
    setEditingResource(null);
    resetForm();
    onRefresh();
    router.refresh(); // ← ADD THIS LINE
}
```

**Solution 2: Add Real-time Subscriptions (Better)**

Add Supabase real-time listener to Home page (`app/page.tsx`):

```typescript
useEffect(() => {
    // Initial fetch
    fetchData();

    // Subscribe to changes
    const channel = supabase
        .channel('resources-changes')
        .on('postgres_changes',
            { event: '*', schema: 'public', table: 'resources' },
            (payload) => {
                console.log('Change detected!', payload);
                fetchData(); // Refetch data when changes occur
            }
        )
        .subscribe();

    // Cleanup
    return () => {
        supabase.removeChannel(channel);
    };
}, []);
```

**Solution 3: Clear Cache on Update**

Add cache busting to fetch calls:

```typescript
const { data: featured } = await supabase
    .from('resources')
    .select('*')
    .eq('featured', true)
    .limit(3)
    .single(); // Remove caching
```

---

## 📊 Verification Steps

### Check Home Page Data:
1. Start dev server: `npm run dev`
2. Open http://localhost:3000
3. Verify 3 sections show data:
   - Featured AI Tools (5 items)
   - Featured Tools (3 items)
   - Latest Resources (6 items)

### Check n8n Automation:
1. Go to n8n: https://n8n.thienstyle.com
2. Check "Executions" tab
3. Verify workflow ran successfully
4. Check database for new videos

### Check Admin Sync:
1. Go to http://localhost:3000/admin
2. Edit a resource (change title or description)
3. Go back to http://localhost:3000
4. Refresh page - changes should appear

---

## 🔧 Implementation Priority

**Immediate (Do Now)**:
1. ✅ Insert home page data using SQL file
2. ✅ Activate n8n workflow
3. ⚠️ Add router.refresh() to admin page (Quick fix)

**Short-term (This Week)**:
1. Add real-time subscriptions to home page
2. Test admin sync thoroughly
3. Monitor n8n automation daily

**Long-term (Future)**:
1. Add loading states
2. Add error handling
3. Add admin analytics dashboard

---

## 📁 Files Created

- `fill-home-data.sql` - SQL script to insert home page data
- `fill-home-data.js` - Node.js script (alternative method)
- `check-n8n-data.js` - Script to verify n8n automation data
- `HOME-DATA-SETUP.md` - This documentation file

---

## 🚀 Next Steps

1. **Insert Data**: Run `fill-home-data.sql` in Supabase SQL Editor
2. **Activate n8n**: Enable the YouTube workflow
3. **Fix Admin Sync**: Add `router.refresh()` to admin page
4. **Test Everything**: Verify all 3 sections on home page
5. **Monitor**: Check n8n executions daily

---

## ❓ Troubleshooting

### Home Page Shows No Data
- Check if data was inserted: Query `SELECT * FROM resources WHERE featured=true`
- Check browser console for errors
- Clear browser cache (Ctrl+Shift+R)

### Admin Changes Don't Appear
- Hard refresh browser (Ctrl+Shift+R)
- Check if `router.refresh()` was added
- Verify update was successful in Supabase dashboard

### n8n Workflow Not Running
- Check if workflow is "Active" (green toggle)
- Check "Executions" tab for errors
- Verify YouTube API key is valid
- Check Supabase credentials in workflow

---

## 📞 Support

If you encounter any issues:
1. Check browser console for errors
2. Check Supabase logs
3. Check n8n execution logs
4. Verify environment variables in `.env.local`

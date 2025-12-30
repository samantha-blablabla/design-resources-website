# Resources Page Redesign Plan

## 🎯 Goal
Transform Resources page from "design tools/GitHub repos" to "downloadable graphic design resources" (Brushes, Gradients, Textures, etc.)

---

## 📊 Current State

### Database
- **Table**: `resources`
- **Current categories**: `design-tools`, `video-tutorials`, `inspiration`
- **Current fields**: title, description, url, category, tags, image_url, gradient, created_at

### Pages
- **Resources page**: `/app/resources/page.tsx` - Displays design tools
- **Admin page**: `/app/admin/page.tsx` - Manages all resources with filter

---

## 🎨 New Resource Categories (Tags)

### Core Categories (15 types)
1. **brushes** - Photoshop/Procreate/Illustrator brushes
2. **gradients** - Gradient packs for design
3. **textures** - Surface textures (paper, fabric, concrete, etc.)
4. **patterns** - Seamless patterns
5. **mockups** - Product mockups (phone, laptop, packaging)
6. **ui-kits** - UI component kits
7. **text-effects** - Photoshop text styles and effects
8. **icons** - Icon packs (SVG, PNG)
9. **fonts** - Typography and font families
10. **templates** - Design templates (flyer, poster, social media)
11. **actions** - Photoshop actions
12. **presets** - Lightroom/Camera RAW presets
13. **illustrations** - Vector illustrations
14. **3d-assets** - 3D models and objects
15. **stock-photos** - Free stock photography

---

## 🗄️ Database Changes

### Option 1: Keep Existing Table, Add New Category
- **Pros**: No data loss, backwards compatible
- **Cons**: Mixed content types in one table
- **Decision**: ❌ Not chosen (cậu muốn xóa data cũ)

### Option 2: Clean Slate - Update Category Values ✅ CHOSEN
- **Action**: Delete all `category = 'design-tools'` resources
- **Keep**: `video-tutorials` and `inspiration` (unchanged)
- **Add**: New graphic design resource entries with tags above
- **Pros**: Clean separation, focused content
- **Cons**: Lose existing design-tools data (acceptable per requirements)

### New Fields Needed
Add optional fields for downloadable resources:
```sql
ALTER TABLE resources ADD COLUMN IF NOT EXISTS download_url TEXT;
ALTER TABLE resources ADD COLUMN IF NOT EXISTS file_type VARCHAR(50);
ALTER TABLE resources ADD COLUMN IF NOT EXISTS file_size VARCHAR(20);
ALTER TABLE resources ADD COLUMN IF NOT EXISTS license_type VARCHAR(50);
ALTER TABLE resources ADD COLUMN IF NOT EXISTS preview_images TEXT[];
```

**Field Descriptions**:
- `download_url`: Direct download link or external resource page
- `file_type`: e.g., "PSD", "AI", "PNG", "SVG", "ZIP"
- `file_size`: e.g., "15 MB", "230 KB"
- `license_type`: e.g., "Free", "Personal Use", "Commercial"
- `preview_images`: Array of preview image URLs

---

## 📁 File Changes

### 1. Resources Page (`app/resources/page.tsx`)
**Changes**:
- Update filter to show 15 new tags instead of old categories
- Update card display to show file_type, file_size, license badges
- Change "Visit" button to "Download" or "View Resource"
- Add resource-specific metadata display

### 2. Admin Page (`app/admin/page.tsx`)
**Changes**:
- Split Resources tab into 3 sub-tabs:
  - **Videos Tab**: Manage video-tutorials
  - **Resources Tab**: Manage graphic-design-resources
  - **Inspiration Tab**: Manage inspiration
- Update stats cards to reflect 3 categories
- Fix filter dropdown styling (make it proper select dropdown)
- Update form fields to include new optional fields (download_url, file_type, etc.)

### 3. Automation (`app/api/cron/fetch-all-content/route.ts`)
**Changes**:
- Remove GitHub trending fetch for resources
- Add new sources for graphic design resources:
  - **Option A**: Freepik RSS (if available)
  - **Option B**: Envato Elements free section
  - **Option C**: Dribbble freebies
  - **Option D**: Behance free resources
  - **Manual**: Admin can manually add resources via admin panel

**Decision**: Start with **manual addition** via admin, automation can be added later if good RSS sources found.

---

## 🎨 UI/UX Changes

### Resources Page
**Before**: Grid of cards with generic "design tool" info
**After**:
- Filter by resource type (Brushes, Gradients, etc.)
- Cards show:
  - Preview image/thumbnail
  - Resource title
  - File type badge (PSD, AI, SVG, etc.)
  - File size
  - License type (Free, Personal, Commercial)
  - Tags
  - Download/View button

### Admin Page
**Before**: Single Resources tab managing all
**After**:
- **Sidebar tabs**:
  - Videos (video-tutorials)
  - Resources (graphic-design-resources)
  - Inspiration (inspiration)
  - UI Settings
  - Colors
  - Tags
  - Typography

- **Resources Tab specific**:
  - Table columns: Thumbnail | Title | Type | File Size | License | Tags | Actions
  - Add Resource form with new fields
  - Filter by resource tag (15 types)
  - Better filter dropdown (styled select, not search bar)

---

## 🚀 Implementation Steps

### Phase 1: Database Cleanup ✅
1. Backup existing data (optional)
2. Delete old design-tools resources:
   ```sql
   DELETE FROM resources WHERE category = 'design-tools';
   ```
3. Add new columns if needed (download_url, file_type, etc.)

### Phase 2: Update Resources Page ✅
1. Update tag filter to 15 new categories
2. Update card component to show new metadata
3. Add download/external link button
4. Test with dummy data

### Phase 3: Update Admin Page ✅
1. Redesign sidebar with 3 main tabs (Videos/Resources/Inspiration)
2. Create separate manager components for each type
3. Fix filter dropdown styling
4. Add new form fields for resources
5. Update stats to show 3 categories

### Phase 4: Test on Localhost ✅
1. Verify resources page displays correctly
2. Verify admin can add/edit/delete resources
3. Verify filter works correctly
4. Check mobile responsiveness

### Phase 5: Automation (Later) ⏳
1. Research RSS feeds for free design resources
2. Implement fetcher if good sources found
3. Or keep manual for curated quality

---

## 📝 Notes

- **No breaking changes** to videos and inspiration
- **Clean separation** between content types
- **Manual curation** initially for quality control
- **Automation optional** - can add later if needed

---

**Created**: December 31, 2025
**Status**: Planning → Implementation
**Next**: Start with database cleanup and UI updates

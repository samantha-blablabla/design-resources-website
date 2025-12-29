# 📊 Data Sources - Design Resources

> **Mục tiêu:** Nguồn data FREE & CLEAN cho thiết kế đồ họa
> **Updated:** 2025-12-29

---

## ✅ TIÊU CHÍ LỰA CHỌN

### PHẢI CÓ:
- ✅ FREE - Không cần trả tiền
- ✅ No login required - Không cần đăng nhập (ưu tiên)
- ✅ Clean content - Nội dung chuyên nghiệp, không spam
- ✅ RSS/API available - Có RSS feed hoặc API
- ✅ High quality - Chất lượng cao
- ✅ Regular updates - Cập nhật thường xuyên

### KHÔNG CHẤP NHẬN:
- ❌ Forums/Discussion sites - Diễn đàn thảo luận
- ❌ Spam content - Nội dung spam
- ❌ Paid only - Chỉ có nội dung trả phí
- ❌ Low quality - Chất lượng thấp
- ❌ Requires login - Bắt buộc đăng nhập

---

## 🎨 NGUỒN DATA CHÍNH

### 1. DESIGN INSPIRATION

#### A. **Behance** ⭐⭐⭐⭐⭐
- **URL:** https://www.behance.net/
- **RSS:** `https://www.behance.net/feeds/projects`
- **Category RSS:**
  - Graphic Design: `https://www.behance.net/feeds/projects?field=graphic-design`
  - Illustration: `https://www.behance.net/feeds/projects?field=illustration`
  - Web Design: `https://www.behance.net/feeds/projects?field=web-design`
  - Branding: `https://www.behance.net/feeds/projects?field=branding`
  - UI/UX: `https://www.behance.net/feeds/projects?field=ui-ux`

**Pros:**
- ✅ Very high quality curated projects
- ✅ Clean, professional content
- ✅ Has RSS feeds
- ✅ Multiple categories
- ✅ FREE to access

**Cons:**
- ⚠️ RSS might be limited (need to test)
- ⚠️ May need scraping for full data

**Implementation:**
```typescript
const BEHANCE_FEEDS = {
  graphicDesign: 'https://www.behance.net/feeds/projects?field=graphic-design',
  illustration: 'https://www.behance.net/feeds/projects?field=illustration',
  webDesign: 'https://www.behance.net/feeds/projects?field=web-design',
  branding: 'https://www.behance.net/feeds/projects?field=branding',
  uiux: 'https://www.behance.net/feeds/projects?field=ui-ux'
};
```

---

#### B. **Dribbble** ⭐⭐⭐⭐
- **URL:** https://dribbble.com/
- **RSS:** `https://dribbble.com/shots/popular.rss`
- **API:** https://developer.dribbble.com/ (requires API key)

**RSS Feeds:**
- Popular: `https://dribbble.com/shots/popular.rss`
- Recent: `https://dribbble.com/shots/recent.rss`
- By tag: `https://dribbble.com/tags/{tag}.rss`

**Pros:**
- ✅ High-quality design shots
- ✅ Has RSS feeds
- ✅ Clean UI/UX focus
- ✅ Tags available

**Cons:**
- ⚠️ Limited RSS (only basic info)
- ⚠️ API requires registration

**Implementation:**
```typescript
const DRIBBBLE_FEEDS = {
  popular: 'https://dribbble.com/shots/popular.rss',
  recent: 'https://dribbble.com/shots/recent.rss',
  webDesign: 'https://dribbble.com/tags/web-design.rss',
  uiDesign: 'https://dribbble.com/tags/ui-design.rss'
};
```

---

#### C. **Awwwards** ⭐⭐⭐⭐⭐
- **URL:** https://www.awwwards.com/
- **RSS:** `https://www.awwwards.com/blog/feed/`
- **Sites of the Day:** `https://www.awwwards.com/websites/com/`

**Pros:**
- ✅ Award-winning web designs
- ✅ Very high quality
- ✅ Professional & clean
- ✅ Has blog RSS

**Cons:**
- ⚠️ Might need scraping for site listings
- ⚠️ Blog RSS only (not sites)

**Implementation:**
```typescript
const AWWWARDS_FEEDS = {
  blog: 'https://www.awwwards.com/blog/feed/',
  // Sites require scraping
};
```

---

### 2. DESIGN RESOURCES

#### D. **Figma Community** ⭐⭐⭐⭐⭐
- **URL:** https://www.figma.com/community
- **API:** Figma REST API (requires auth)

**Categories:**
- Files (design systems, UI kits)
- Plugins
- Widgets

**Pros:**
- ✅ Very high quality design files
- ✅ FREE downloads
- ✅ Has API
- ✅ Official source

**Cons:**
- ⚠️ Requires Figma API key
- ⚠️ No RSS feed

**Implementation:**
```typescript
// Requires Figma API
const FIGMA_API = 'https://api.figma.com/v1/files/{key}';
```

---

#### E. **UI8 Free Goods** ⭐⭐⭐⭐
- **URL:** https://ui8.net/
- **Free Section:** https://ui8.net/category/freebies

**Pros:**
- ✅ High-quality UI kits
- ✅ Has free section
- ✅ Clean, professional

**Cons:**
- ⚠️ No RSS/API
- ⚠️ Requires scraping
- ⚠️ Limited free items

---

### 3. ICONS & ILLUSTRATIONS

#### F. **Iconoir** ⭐⭐⭐⭐⭐
- **URL:** https://iconoir.com/
- **GitHub:** https://github.com/iconoir-icons/iconoir
- **API:** Via npm package

**Pros:**
- ✅ 100% FREE & open source
- ✅ Over 1,400+ icons
- ✅ Clean minimal design
- ✅ SVG format

**Implementation:**
```typescript
// Add as featured resource
{
  title: 'Iconoir Icon Library',
  description: 'Over 1,400+ free SVG icons for your design projects',
  tags: ['icons', 'svg', 'free', 'open-source'],
  url: 'https://iconoir.com/'
}
```

---

#### G. **unDraw** ⭐⭐⭐⭐⭐
- **URL:** https://undraw.co/
- **Illustrations:** FREE, customizable

**Pros:**
- ✅ 100% FREE
- ✅ Customizable colors
- ✅ SVG format
- ✅ Commercial use OK

**Implementation:**
```typescript
{
  title: 'unDraw Illustrations',
  description: 'Free customizable SVG illustrations for any project',
  tags: ['illustrations', 'svg', 'free', 'customizable'],
  url: 'https://undraw.co/'
}
```

---

### 4. STOCK PHOTOS

#### H. **Unsplash** ⭐⭐⭐⭐⭐
- **URL:** https://unsplash.com/
- **API:** https://unsplash.com/developers
- **RSS:** Available

**Pros:**
- ✅ Very high quality photos
- ✅ FREE API (5,000 requests/hour)
- ✅ No attribution required
- ✅ Commercial use OK

**Implementation:**
```typescript
const UNSPLASH_API = 'https://api.unsplash.com/search/photos';
// Categories: design, workspace, ui, mockup
```

---

#### I. **Pexels** ⭐⭐⭐⭐
- **URL:** https://www.pexels.com/
- **API:** https://www.pexels.com/api/

**Pros:**
- ✅ FREE API
- ✅ High quality
- ✅ Commercial use OK

---

### 5. DESIGN ARTICLES & TUTORIALS

#### J. **Smashing Magazine** ⭐⭐⭐⭐⭐
- **URL:** https://www.smashingmagazine.com/
- **RSS:** `https://www.smashingmagazine.com/feed/`

**Pros:**
- ✅ In-depth articles
- ✅ High quality tutorials
- ✅ Has RSS feed
- ✅ Respected source

**Implementation:**
```typescript
const SMASHING_FEED = 'https://www.smashingmagazine.com/feed/';
```

---

#### K. **CSS-Tricks** ⭐⭐⭐⭐
- **URL:** https://css-tricks.com/
- **RSS:** `https://css-tricks.com/feed/`

**Pros:**
- ✅ Excellent tutorials
- ✅ Has RSS
- ✅ Web design focus

---

### 6. YOUTUBE CHANNELS (Design)

#### L. **The Futur** ⭐⭐⭐⭐⭐
- **Channel:** https://www.youtube.com/@thefutur
- **Focus:** Brand design, business

#### M. **DesignCourse** ⭐⭐⭐⭐
- **Channel:** https://www.youtube.com/@DesignCourse
- **Focus:** UI/UX, full courses

#### N. **Flux Academy** ⭐⭐⭐⭐
- **Channel:** https://www.youtube.com/@FluxAcademy
- **Focus:** Modern design workflows

---

## 🚀 IMPLEMENTATION PLAN

### Phase 1: Manual Curation (Immediate)
**Time:** 1-2 hours

Thêm thủ công các resources chất lượng cao:
```typescript
const manualResources = [
  // Icons
  { title: 'Iconoir', url: 'https://iconoir.com/', category: 'icons' },
  { title: 'Heroicons', url: 'https://heroicons.com/', category: 'icons' },
  { title: 'Lucide', url: 'https://lucide.dev/', category: 'icons' },

  // Illustrations
  { title: 'unDraw', url: 'https://undraw.co/', category: 'illustrations' },
  { title: 'Storyset', url: 'https://storyset.com/', category: 'illustrations' },

  // UI Kits (Free)
  { title: 'Flowbite', url: 'https://flowbite.com/', category: 'ui-kits' },
  { title: 'Shadcn UI', url: 'https://ui.shadcn.com/', category: 'ui-kits' },

  // Colors
  { title: 'Coolors', url: 'https://coolors.co/', category: 'colors' },
  { title: 'Color Hunt', url: 'https://colorhunt.co/', category: 'colors' },

  // Typography
  { title: 'Google Fonts', url: 'https://fonts.google.com/', category: 'typography' },
  { title: 'FontPair', url: 'https://www.fontpair.co/', category: 'typography' },
];
```

### Phase 2: RSS Integration (Next)
**Time:** 2-3 hours

Setup RSS parsers:
```typescript
// lib/rss-parser.ts
import Parser from 'rss-parser';

const sources = {
  behance: 'https://www.behance.net/feeds/projects',
  dribbble: 'https://dribbble.com/shots/popular.rss',
  smashing: 'https://www.smashingmagazine.com/feed/',
  awwwards: 'https://www.awwwards.com/blog/feed/'
};

export async function fetchRSS(feedUrl: string) {
  const parser = new Parser();
  const feed = await parser.parseURL(feedUrl);
  return feed.items;
}
```

### Phase 3: Auto-update Cron (Future)
**Time:** 3-4 hours

Daily cron job to fetch new resources:
```typescript
// app/api/cron/fetch-resources/route.ts
export async function GET() {
  // Fetch from all RSS sources
  // Parse and save to Supabase
  // Clean duplicates
}
```

---

## 📋 TASK CHECKLIST

### Immediate (Today)
- [ ] Add 20-30 manual resources to database
  - [ ] 5 Icon libraries
  - [ ] 5 Illustration sources
  - [ ] 5 UI Kit resources
  - [ ] 5 Color tools
  - [ ] 5 Design tools
  - [ ] 5 Typography resources

### This Week
- [ ] Setup RSS parser
- [ ] Fetch from Behance RSS
- [ ] Fetch from Dribbble RSS
- [ ] Fetch from Smashing Magazine
- [ ] Test and verify data quality

### Next Week
- [ ] Setup YouTube Data API
- [ ] Fetch design tutorial videos
- [ ] Setup auto-update cron
- [ ] Add image fetching

---

## 💾 DATABASE STRUCTURE

```sql
-- resources table
CREATE TABLE resources (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  url TEXT,
  category TEXT,
  tags TEXT[],
  source TEXT, -- 'manual', 'behance', 'dribbble', etc.
  featured BOOLEAN DEFAULT false,
  thumbnail_url TEXT,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🎯 SUCCESS METRICS

**Goal:** 100+ quality resources trong 1 tuần

- Week 1: 30 manual resources ✅
- Week 2: +50 from RSS feeds
- Week 3: +20 from YouTube
- Week 4: Auto-update running

---

## 📝 NEXT STEPS

Cậu muốn:

### Option A: Thêm manual resources ngay (30 phút)
Tớ sẽ tạo script để insert 20-30 resources chất lượng vào Supabase

### Option B: Setup RSS parser trước (1 giờ)
Tớ sẽ code RSS parser và test với Behance/Dribbble

### Option C: Tạm dừng, push hết documentation lên GitHub
Để sau làm tiếp, giờ commit hết docs đã

**Cậu chọn nào?** 🤔

---

**Updated:** 2025-12-29

# 🤖 Context Cho Claude AI

> **MỤC ĐÍCH:** File này giúp Claude AI hiểu nhanh dự án khi bắt đầu chat mới
> **CẬP NHẬT:** 2025-12-29 23:00

---

## 📊 TRẠNG THÁI DỰ ÁN

### ✅ Build Status
- **Last Deploy:** 2025-12-29
- **Build:** ✅ Successful  
- **Dev Server:** ✅ Running at http://localhost:3000
- **Website:** https://design-resources-website.vercel.app/

### 🔧 Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** CSS Modules + Global CSS
- **Icons:** iconoir-react
- **Database:** Supabase (Project ID: kmzcbwiqlfdcrqqndglm)
- **Hosting:** Vercel
- **AI:** Groq API (free)
- **APIs:** YouTube Data API v3

### 💰 Cost
- **$0/month** - 100% FREE

---

## 📝 CÔNG VIỆC MỚI NHẤT

### Session 1 (2025-12-29 sáng):
1. ✅ Fix Featured Tools loading issue
   - File: `components/FeaturedTools.tsx`
   - Change: Added `.eq('featured', true)` to query

2. ✅ Fix metadata viewport warnings
   - File: `app/layout.tsx`
   - Change: Separated `viewport` export from `metadata`

3. ✅ Push code lên GitHub
   - Commit: `8c2925a`
   - Branch: `main`

### Session 2 (2025-12-29 tối): ⭐ MAJOR UPDATE

#### 1. Route Restructuring & Icon Fixes
- ✅ Fixed `PlayOutline` icon error → Changed to `Play`
- ✅ Renamed `/tips` → `/videos` route
- ✅ Separated Videos from Resources page completely
- Files: `components/Header.tsx`, `components/CategoryGrid.tsx`, `app/videos/page.tsx`

#### 2. Slider Navigation Enhancement
- ✅ Added left/right arrow buttons (Desktop only ≥1024px)
- ✅ Glassmorphism design with hover effects
- ✅ Auto hide/show based on scroll position
- ✅ Removed card fade-in animation for smoother scrolling
- Files: `components/CardSlider.tsx`, `app/globals.css`

#### 3. Admin Panel Development 🎉
- ✅ **Created `/admin` page** with password protection (password: `admin123`)
- ✅ **5 Management Tabs:**
  1. Quản lý Resources (CRUD interface)
  2. Cài đặt UI (Background, Cards, Spacing, Header)
  3. Màu sắc (CSS color variables)
  4. Tags (Custom tag management)
  5. Typography (Fonts, sizes, weights)
- ✅ Full responsive design
- ✅ 300+ lines custom admin CSS
- Files: `app/admin/page.tsx`, `app/globals.css`

#### 4. Database Automation Scripts
- ✅ YouTube thumbnail extractor
- ✅ Resource validation system (check dead links)
- ✅ Dead resource removal script
- ✅ Cron job for scheduled maintenance
- Files: `scripts/update-youtube-thumbnails.ts`, `scripts/validate-all-resources.ts`,
  `scripts/remove-all-dead-resources.ts`, `scripts/cron-cleanup-dead-resources.ts`

---

## 🎯 ĐANG LÀM / CẦN LÀM

Xem file [TODO.md](TODO.md) để biết chi tiết.

**Quick summary:**
- [ ] Connect Admin Panel to Supabase (currently UI only)
- [ ] Test slider arrows on production
- [ ] Deploy updates to Vercel
- [ ] Add proper authentication to Admin Panel

---

## 🔗 LINKS QUAN TRỌNG

| Service | URL |
|---------|-----|
| **Website** | https://design-resources-website.vercel.app/ |
| **Admin Panel (Local)** | http://localhost:3000/admin |
| **GitHub** | https://github.com/samantha-blablabla/design-resources-website |
| **Supabase** | https://supabase.com/dashboard/project/kmzcbwiqlfdcrqqndglm |
| **Vercel** | https://vercel.com/samanthas-projects-56df48a7 |
| **Reference** | https://toools.design |

---

## 📚 TÀI LIỆU QUAN TRỌNG

Khi cần hiểu dự án, đọc theo thứ tự:

1. **[CONTEXT.md](CONTEXT.md)** - File này, overview dự án
2. **[TODO.md](TODO.md)** - Công việc hiện tại và đã làm
3. **[PROGRESS-SUMMARY.md](PROGRESS-SUMMARY.md)** - Tổng quan tiến độ
4. **[NHAT-KY-DU-AN.md](NHAT-KY-DU-AN.md)** - Lịch sử dự án
5. **[AUTOMATION-PLAN-FREE.md](AUTOMATION-PLAN-FREE.md)** - Hệ thống automation
6. **[QUICK-START.md](QUICK-START.md)** - Hướng dẫn setup

---

## 🗂️ CẤU TRÚC PROJECT

### Key Directories:
```
design-resources-website/
├── app/
│   ├── admin/          ⭐ NEW - Admin panel
│   ├── videos/         ⭐ RENAMED from /tips
│   ├── resources/      
│   ├── inspiration/
│   └── page.tsx        (Homepage)
├── components/
│   ├── CardSlider.tsx  ⭐ UPDATED - Navigation arrows
│   ├── Header.tsx      ⭐ UPDATED - Play icon
│   └── CategoryGrid.tsx
├── scripts/            ⭐ NEW - Automation scripts
│   ├── update-youtube-thumbnails.ts
│   ├── validate-all-resources.ts
│   └── cron-cleanup-dead-resources.ts
└── app/globals.css     ⭐ UPDATED - Admin styles
```

---

## 🗄️ CẤU TRÚC SUPABASE

### Tables:
1. **resources** - Main resources table
   - Filters: `.neq('category', 'video-tutorials')` for Resources page
   - Featured resources: `.eq('featured', true)`
2. **inspirations** - Empty
3. **videos** - Empty (using resources table with category filter)
4. **articles** - Empty
5. **crawl_logs** - Empty

### Migrations Status:
- ✅ 001_create_tables.sql - Done
- ⚠️ 002_enable_rls.sql - Cần verify
- ❌ 003_seed_dummy_data.sql - Chưa chạy (optional)
- ❌ 004_hashtag_functions.sql - Chưa chạy

---

## 🐛 KNOWN ISSUES

### Fixed:
- ✅ Featured Tools loading forever
- ✅ Metadata viewport warnings
- ✅ PlayOutline icon error
- ✅ Video/Resources separation

### Current Issues:
- ⚠️ Admin Panel is UI-only, not connected to database yet
- ⚠️ Database migration errors (non-blocking, build still succeeds)

### To Check:
- ⚠️ RLS policies có hoạt động không?
- ⚠️ Slider arrows work on all screen sizes?

---

## 💡 WORKFLOW VỚI CLAUDE

### Khi Bắt Đầu Chat Mới:

**Bước 1:** Nói với Claude:
```
"Đọc file CONTEXT.md và TODO.md để hiểu dự án.
Tớ đang làm việc trên 2 máy khác nhau."
```

**Bước 2:** Claude sẽ tự động:
1. Đọc CONTEXT.md (file này)
2. Đọc TODO.md
3. Đọc các file .md liên quan
4. Hiểu được đang làm gì, cần làm gì tiếp

**Bước 3:** Bắt đầu làm việc tiếp!

---

## 🔄 SYNC GIỮA 2 MÁY

### Trước khi làm việc:
```bash
# Chạy file sync.bat
# Hoặc:
git pull origin main
```

### Sau khi làm việc xong:
```bash
# Chạy file sync.bat
# Hoặc:
git add .
git commit -m "Update: [mô tả]"
git push origin main
```

---

## 🎨 DESIGN SYSTEM NOTE

**Về Figma Integration:**
- ❌ Claude KHÔNG thể đọc trực tiếp Figma links
- ✅ Cần export Design Tokens (JSON/CSS)
- ✅ Hoặc chụp screenshots các components
- ✅ Sử dụng plugins: "Design Tokens" hoặc "Style Dictionary"

**Current Design:**
- Background: Purple pastel gradient `#fcf5ff → #fdf8ff`
- Cards: Glassmorphism with blur effects
- Typography: Plus Jakarta Sans
- Icons: iconoir-react
- Reference: toools.design

---

## 📞 NEXT STEPS

Xem [TODO.md](TODO.md) để biết công việc tiếp theo.

**Priority:**
1. Connect Admin Panel to Supabase
2. Deploy updates to Vercel
3. Test slider navigation on production
4. Add proper authentication

---

**Cập nhật lần cuối:** 2025-12-29 23:30
**Session:** Admin Panel + Slider Navigation (Complete) + Videos/Resources Separation
**Máy cập nhật:** Claude AI Assistant

**Latest Changes:**
- ✅ Slider arrows added to all 3 sections (Featured Tools, Latest Resources, AI Tools)
- ✅ Arrows positioned between section headers and sliders (like toools.design)
- ✅ Improved spacing between sections for better visual clarity
- ✅ Desktop only display (≥1024px)
- ✅ Auto-disable based on scroll state

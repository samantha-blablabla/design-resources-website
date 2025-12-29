# 🤖 Context Cho Claude AI

> **MỤC ĐÍCH:** Giúp Claude AI hiểu nhanh dự án khi bắt đầu chat mới
> **CẬP NHẬT:** 2025-12-29
> **GIT LÀ SOURCE OF TRUTH** - File này chỉ là summary

---

## 📊 PROJECT INFO

### Website
- **Live:** https://design-resources-website.vercel.app/
- **Local:** http://localhost:3000
- **Admin:** http://localhost:3000/admin (password: admin123)

### Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** CSS Modules + Global CSS
- **Icons:** iconoir-react
- **Database:** Supabase (PostgreSQL)
- **Hosting:** Vercel (auto-deploy on push)
- **Cost:** $0/month (100% FREE)

### Repository
- **GitHub:** https://github.com/samantha-blablabla/design-resources-website
- **Branch:** main
- **Latest Deploy:** 2025-12-29

---

## 🗂️ PROJECT STRUCTURE

```
design-resources-website/
├── app/
│   ├── admin/          # Admin panel (5 tabs)
│   ├── videos/         # Video tutorials page
│   ├── resources/      # Resources page (excludes videos)
│   ├── inspiration/    # Inspiration gallery
│   └── page.tsx        # Homepage with featured tools
├── components/
│   ├── CardSlider.tsx  # Slider with navigation arrows
│   ├── Header.tsx      # Navigation header
│   ├── Card.tsx        # Resource card component
│   └── ui/             # Reusable UI components
├── scripts/            # Automation scripts
│   ├── update-youtube-thumbnails.ts
│   ├── validate-all-resources.ts
│   └── cron-cleanup-dead-resources.ts
└── app/globals.css     # Global styles + admin styles
```

---

## 🗄️ DATABASE (SUPABASE)

### Connection
- **Project ID:** kmzcbwiqlfdcrqqndglm
- **URL:** https://supabase.com/dashboard/project/kmzcbwiqlfdcrqqndglm

### Main Table: `resources`
```sql
- category: 'ui-kits' | 'icons' | 'video-tutorials' | etc.
- featured: boolean (for homepage slider)
- tags: array of strings
- title, description, url, image_url
```

### Query Patterns
```typescript
// Homepage featured tools
.eq('featured', true)

// Resources page (exclude videos)
.neq('category', 'video-tutorials')

// Videos page (only videos)
.eq('category', 'video-tutorials')
```

---

## 🎯 KEY FEATURES

### 1. Admin Panel (`/admin`)
- Password protection (admin123)
- 5 tabs: Resources, UI Settings, Colors, Tags, Typography
- Currently UI-only, needs Supabase connection

### 2. Slider Navigation
- Desktop only (≥1024px)
- Left/right arrows with glassmorphism
- Auto hide/show based on scroll position
- 3 sections: Featured Tools, Latest Resources, AI Tools

### 3. Videos Separation
- Videos have their own page at `/videos`
- Resources page excludes video-tutorials category
- Better UX for different content types

### 4. Automation Scripts
- YouTube thumbnail extraction
- Resource validation (check dead links)
- Automated cleanup via cron

---

## 🐛 KNOWN ISSUES

### Current
- ⚠️ Admin Panel not connected to Supabase yet
- ⚠️ Some database migration warnings (non-blocking)

### Fixed Recently
- ✅ Featured Tools loading issue
- ✅ PlayOutline icon error → changed to Play
- ✅ Metadata viewport warnings
- ✅ Videos/Resources separation

---

## 🔗 IMPORTANT LINKS

| Service | URL |
|---------|-----|
| **Website** | https://design-resources-website.vercel.app/ |
| **GitHub** | https://github.com/samantha-blablabla/design-resources-website |
| **Supabase** | https://supabase.com/dashboard/project/kmzcbwiqlfdcrqqndglm |
| **Vercel** | https://vercel.com/samanthas-projects-56df48a7 |
| **Design Reference** | https://toools.design |

---

## 📚 DOCUMENTATION

### For Daily Work:
1. **[WORKFLOW.md](WORKFLOW.md)** ⭐ Git workflow giữa 2 máy
2. **[TODO.md](TODO.md)** - Task list
3. **[CONTEXT.md](CONTEXT.md)** - File này

### For Major Updates:
- **DEPLOYMENT-SUMMARY-[hash].md** - Chi tiết deployment lớn
- **ADMIN-GUIDE.md** - Hướng dẫn admin panel

### For Reference:
- **PROGRESS-SUMMARY.md** - Tổng quan tiến độ
- **NHAT-KY-DU-AN.md** - Lịch sử dự án
- **AUTOMATION-PLAN-FREE.md** - Hệ thống automation

---

## 💡 WORKFLOW VỚI CLAUDE

### Khi Bắt Đầu Chat Mới:

**Nói với Claude:**
```
"Đọc CONTEXT.md và TODO.md để hiểu dự án.
Chạy git log để xem commit gần nhất.
Tớ đang làm việc trên 2 máy."
```

**Claude sẽ:**
1. Đọc CONTEXT.md (file này)
2. Đọc TODO.md (task list)
3. Chạy `git log` để xem changes gần nhất
4. Tóm tắt tình trạng dự án
5. Hỏi bạn muốn làm gì tiếp

---

## 🔄 SYNC GIỮA 2 MÁY

### ⚠️ ĐỌC FILE [WORKFLOW.md](WORKFLOW.md) ĐỂ BIẾT CHI TIẾT

**Quick Commands:**
```bash
# Khi bắt đầu làm việc
git pull origin main
git log --oneline -5

# Khi kết thúc làm việc
git add .
git commit -m "Add: [description]"
git push origin main
```

**Rule:**
- ✅ Git là source of truth
- ✅ Đọc `git log` để xem thay đổi
- ✅ Đọc `git diff` để xem chi tiết code
- ❌ Không ghi code vào CONTEXT.md
- ❌ Không copy code vào TODO.md

---

## 🎨 DESIGN SYSTEM

**Current Design:**
- **Background:** Purple pastel gradient `#fcf5ff → #fdf8ff`
- **Cards:** Glassmorphism with blur effects
- **Typography:** Plus Jakarta Sans
- **Icons:** iconoir-react
- **Reference:** toools.design

**Figma Note:**
- ❌ Claude KHÔNG thể đọc Figma links trực tiếp
- ✅ Cần export Design Tokens (JSON/CSS)
- ✅ Hoặc screenshot components
- ✅ Use plugins: "Design Tokens" or "Style Dictionary"

---

## 📞 NEXT STEPS

Xem **[TODO.md](TODO.md)** để biết tasks cụ thể.

**High Priority:**
1. Connect Admin Panel to Supabase
2. Test slider arrows on production
3. Add proper authentication to admin

---

## 🚀 QUICK START

```bash
# Setup
git clone [repo]
npm install
cp .env.example .env.local
# Add Supabase keys to .env.local

# Development
npm run dev          # Start dev server
npm run build        # Test production build

# Git workflow
git pull             # Before working
git push             # After working

# Documentation
code WORKFLOW.md     # Git commands
code TODO.md         # Task list
```

---

**Cập nhật:** 2025-12-29
**Version:** Simplified (Git as source of truth)
**Để biết chi tiết code changes:** Chạy `git log` và `git diff`

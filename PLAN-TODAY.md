# 📋 Kế Hoạch Công Việc Hôm Nay

> **Ngày:** 2025-12-29
> **Mục tiêu:** Hoàn thiện Design System & Data

---

## 1️⃣ DESIGN SYSTEM UI (Chuẩn Figma)

### 🎯 Mục Tiêu:
Tạo Design System chuyên nghiệp, sạch sẽ như Figma

### 📊 Phân Tích Hiện Tại:
**Tốt:**
- ✅ Layout grid gọn gàng
- ✅ Responsive design
- ✅ Category navigation

**Cần Cải Thiện:**
- ❌ Quá nhiều gradient (pastel)
- ❌ Emoji thay vì icons chuyên nghiệp
- ❌ Typography chưa rõ ràng
- ❌ Thiếu shadows/depth tinh tế
- ❌ Màu sắc chưa nhất quán

### ✨ Design System Mới (Chuẩn Figma):

#### **Colors:**
```css
/* Primary */
--color-primary: #0D99FF;      /* Figma blue */
--color-primary-hover: #0B7FD9;

/* Neutrals */
--color-gray-50: #FAFAFA;
--color-gray-100: #F5F5F5;
--color-gray-200: #E5E5E5;
--color-gray-300: #D4D4D4;
--color-gray-600: #525252;
--color-gray-900: #171717;

/* Surface */
--color-surface: #FFFFFF;
--color-border: #E5E5E5;

/* Text */
--color-text-primary: #171717;
--color-text-secondary: #525252;
```

#### **Typography:**
```css
/* Font Family */
--font-primary: 'Inter', -apple-system, system-ui, sans-serif;

/* Sizes */
--text-xs: 12px;
--text-sm: 14px;
--text-base: 16px;
--text-lg: 18px;
--text-xl: 20px;
--text-2xl: 24px;
--text-3xl: 30px;
--text-4xl: 36px;

/* Weights */
--font-regular: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

#### **Spacing:**
```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-6: 24px;
--space-8: 32px;
--space-12: 48px;
--space-16: 64px;
```

#### **Shadows:**
```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
--shadow-md: 0 4px 8px rgba(0, 0, 0, 0.04), 0 0 2px rgba(0, 0, 0, 0.06);
--shadow-lg: 0 12px 24px rgba(0, 0, 0, 0.08), 0 0 4px rgba(0, 0, 0, 0.04);
```

#### **Border Radius:**
```css
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-full: 9999px;
```

### 📦 Components Cần Update:

1. **Card Component** (Thay gradient → Clean white với shadow)
2. **Button Component** (Figma style)
3. **Tag/Badge Component** (Pills với border)
4. **Navigation** (Cleaner)
5. **Icons** (Replace emoji với Lucide/Iconoir)

---

## 2️⃣ KIỂM TRA DATA CÁC PAGE

### 📄 Pages Cần Check:

#### A. **Home Page** (`/`)
- [ ] Featured Tools section
- [ ] Latest Resources
- [ ] AI Tools section

#### B. **Resources Page** (`/resources`)
- [ ] All categories
- [ ] Filters working
- [ ] Data từ Supabase

#### C. **Inspiration Page** (`/inspiration`)
- [ ] Gallery layout
- [ ] Images loading

#### D. **Tips Page** (`/tips`)
- [ ] Video cards
- [ ] YouTube integration

### 🔍 Checklist:
- [ ] Data có hiển thị từ Supabase?
- [ ] Có dummy data backup không?
- [ ] Hashtags có hiển thị?
- [ ] Images có load được?
- [ ] Descriptions đầy đủ?

---

## 3️⃣ HỆ THỐNG THUMBNAIL IMAGES

### 🎨 Cấu Trúc Đề Xuất:

#### **Folder Structure:**
```
public/
└── images/
    ├── resources/          ← Resource thumbnails
    │   ├── ui-kits/
    │   ├── icons/
    │   ├── illustrations/
    │   └── ...
    ├── inspirations/       ← Inspiration images
    │   ├── web/
    │   ├── mobile/
    │   └── dashboard/
    └── placeholders/       ← Fallback images
        ├── resource.png
        ├── inspiration.png
        └── video.png
```

#### **Naming Convention:**
```
Format: {category}-{slug}.{ext}

Examples:
- ui-kits-figma-design-system.png
- icons-minimal-icon-set.png
- web-modern-landing-page.png
```

#### **Image Specs:**

| Type | Width | Height | Ratio | Format |
|------|-------|--------|-------|--------|
| **Resource Card** | 400px | 300px | 4:3 | PNG/WebP |
| **Inspiration** | 800px | 600px | 4:3 | PNG/WebP/JPG |
| **Video Thumb** | 640px | 360px | 16:9 | JPG |
| **Placeholder** | 400px | 300px | 4:3 | PNG |

#### **Tự Động Hóa (Nếu Có URL):**
```typescript
// lib/generate-placeholder.ts
- Tạo gradient placeholder
- Thêm emoji/icon
- Text overlay với title
```

#### **Thủ Công:**
1. Bạn chuẩn bị ảnh theo specs trên
2. Đặt tên theo convention
3. Upload vào folder tương ứng
4. Tôi sẽ update database với image paths

---

## 4️⃣ NGUỒN DATA THIẾT KẾ ĐỒ HỌA

### 🎨 **Nguồn Sạch & Clean:**

#### **A. Design Resources:**
1. **Behance** - https://www.behance.net/
   - Has RSS: `https://www.behance.net/feeds/projects`
   - Clean, curated projects
   - Categories: Graphic Design, Illustration, Branding

2. **Dribbble Popular** - https://dribbble.com/
   - RSS: `https://dribbble.com/shots/popular.rss`
   - High-quality design shots
   - Tags available

3. **Awwwards** - https://www.awwwards.com/
   - RSS: `https://www.awwwards.com/blog/feed/`
   - Award-winning designs
   - Very clean & professional

4. **Designer News** - https://www.designernews.co/
   - Clean design news aggregator
   - Has API/RSS

5. **Smashing Magazine** - https://www.smashingmagazine.com/
   - RSS: `https://www.smashingmagazine.com/feed/`
   - In-depth articles
   - Design tutorials

#### **B. Free Resources:**
1. **Unsplash** - https://unsplash.com/
   - API: https://unsplash.com/developers
   - Free photos
   - Tags: design, ui, workspace

2. **Pexels** - https://www.pexels.com/
   - API available
   - Free stock photos
   - Design-related content

3. **UI8** - https://ui8.net/
   - Has "Free Goods" section
   - Clean UI kits
   - Can scrape free items

4. **Figma Community** - https://www.figma.com/community
   - Free design files
   - Can fetch via Figma API
   - Very high quality

#### **C. YouTube Channels (Design):**
1. **The Futur** - Brand design, business
2. **Jesse Showalter** - UI/UX tutorials
3. **DesignCourse** - Full courses
4. **Flux Academy** - Modern design
5. **CharliMarieTV** - Graphic design

### 📊 Implementation:

**RSS-Based Sources (Easy):**
```typescript
const RSS_SOURCES = {
  behance: 'https://www.behance.net/feeds/projects',
  dribbble: 'https://dribbble.com/shots/popular.rss',
  awwwards: 'https://www.awwwards.com/blog/feed/',
  smashing: 'https://www.smashingmagazine.com/feed/'
};
```

**API-Based Sources (Need Keys):**
```typescript
const API_SOURCES = {
  unsplash: 'https://api.unsplash.com/search/photos',
  figma: 'https://api.figma.com/v1/files/{key}/components'
};
```

### ✅ Recommendation:
**Ưu tiên:**
1. Behance RSS (Graphic Design)
2. Dribbble RSS (UI/UX)
3. Awwwards RSS (Web Design)
4. Smashing Magazine (Articles)
5. YouTube Design channels (đã có)

**Tất cả FREE, không cần login, sạch & professional!**

---

## 📅 Timeline:

### Sáng (3-4 giờ):
- [ ] Task 1: Design System UI (2 giờ)
- [ ] Task 2: Check data pages (1 giờ)

### Chiều (3-4 giờ):
- [ ] Task 3: Setup thumbnail system (1 giờ)
- [ ] Task 4: Add data sources (2 giờ)

---

## 🎯 Priority:

**High:**
1. Design System UI (ảnh hưởng lớn nhất)
2. Thumbnail system (cần thiết cho UX)

**Medium:**
3. Check data pages
4. Add data sources

---

**Bắt đầu từ đâu?** 🚀

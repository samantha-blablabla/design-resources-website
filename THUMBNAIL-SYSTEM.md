# 📸 Thumbnail Image System

> **Mục tiêu:** Hệ thống quản lý ảnh thumbnail cho Resources, Inspiration, Videos
> **Updated:** 2025-12-29

---

## 📁 FOLDER STRUCTURE

```
public/
└── images/
    ├── resources/              ← Resource thumbnails
    │   ├── ui-kits/
    │   │   ├── figma-design-system.png
    │   │   ├── mobile-ui-kit-pro.png
    │   │   └── ...
    │   ├── icons/
    │   │   ├── icon-library-pro.png
    │   │   ├── minimal-icon-set.png
    │   │   └── ...
    │   ├── illustrations/
    │   ├── photos/
    │   ├── typography/
    │   ├── colors/
    │   ├── design-tools/
    │   ├── ai/
    │   └── accessibility/
    │
    ├── inspiration/            ← Inspiration images
    │   ├── web/
    │   │   ├── modern-landing-page.jpg
    │   │   ├── ecommerce-homepage.jpg
    │   │   └── ...
    │   ├── mobile/
    │   ├── dashboard/
    │   ├── branding/
    │   └── illustration/
    │
    ├── videos/                 ← Video thumbnails (YouTube)
    │   ├── fundamentals/
    │   ├── tools/
    │   ├── ui-ux/
    │   ├── web/
    │   └── advanced/
    │
    └── placeholders/           ← Fallback images
        ├── resource-default.png
        ├── inspiration-default.jpg
        └── video-default.jpg
```

---

## 📐 IMAGE SPECIFICATIONS

### 1. Resource Thumbnails
| Property | Value |
|----------|-------|
| **Width** | 400px |
| **Height** | 300px |
| **Aspect Ratio** | 4:3 |
| **Format** | PNG or WebP |
| **Max Size** | 100KB |
| **Background** | White or Transparent |

**Use case:** UI Kits, Icons, Design Tools, etc.

---

### 2. Inspiration Images
| Property | Value |
|----------|-------|
| **Width** | 800px |
| **Height** | 600px |
| **Aspect Ratio** | 4:3 |
| **Format** | JPG, PNG, or WebP |
| **Max Size** | 200KB |
| **Quality** | 85% |

**Use case:** Web designs, Mobile apps, Dashboards

---

### 3. Video Thumbnails
| Property | Value |
|----------|-------|
| **Width** | 640px |
| **Height** | 360px |
| **Aspect Ratio** | 16:9 |
| **Format** | JPG |
| **Max Size** | 150KB |
| **Quality** | 80% |

**Use case:** YouTube video thumbnails (auto-fetch from API)

---

### 4. Placeholder Images
| Property | Value |
|----------|-------|
| **Width** | 400px |
| **Height** | 300px |
| **Aspect Ratio** | 4:3 |
| **Format** | PNG |
| **Style** | Gradient + Icon/Emoji |

**Use case:** Fallback khi không có ảnh thật

---

## 🏷️ NAMING CONVENTION

### Format:
```
{category}-{slug}.{ext}

Ví dụ:
- ui-kits-figma-design-system.png
- icons-minimal-icon-set.png
- web-modern-landing-page.jpg
- video-color-theory-basics.jpg
```

### Rules:
1. **Lowercase** - Tất cả chữ thường
2. **Kebab-case** - Dùng dấu gạch ngang `-`
3. **No spaces** - Không khoảng trắng
4. **Descriptive** - Tên mô tả rõ ràng
5. **Max 50 chars** - Không quá dài

### Examples:

✅ **GOOD:**
```
ui-kits-figma-design-system.png
icons-iconoir-library.png
web-landing-page-saas.jpg
video-typography-basics.jpg
```

❌ **BAD:**
```
Image1.png                    ← Không mô tả
Figma Design System.png       ← Có spaces
UI_KITS_FIGMA.PNG            ← Uppercase, underscore
very-long-name-that-describes-everything-in-detail.png  ← Quá dài
```

---

## 🎨 PLACEHOLDER GENERATION

### Option A: Manual Placeholders (Recommended)

Tạo 3 placeholder images với pastel gradients:

#### 1. **resource-default.png** (400x300)
```
Background: linear-gradient(135deg, #DBEAFE 0%, #E0E7FF 100%)
Icon: 🎨 (centered, size: 80px)
```

#### 2. **inspiration-default.jpg** (800x600)
```
Background: linear-gradient(135deg, #FCE7F3 0%, #F3E8FF 100%)
Icon: 🖼️ (centered, size: 120px)
```

#### 3. **video-default.jpg** (640x360)
```
Background: linear-gradient(135deg, #FEF3C7 0%, #FFEDD5 100%)
Icon: ▶️ (centered, size: 100px)
```

### Option B: Auto-generated Placeholders

Sử dụng service như:
- **Placeholder.com**: `https://via.placeholder.com/400x300/DBEAFE/3B82F6?text=Resource`
- **UI Avatars**: Custom gradient backgrounds
- **Canvas API**: Generate on-the-fly

---

## 💾 DATABASE SCHEMA

### Table: `resources`
```sql
ALTER TABLE resources ADD COLUMN IF NOT EXISTS
  thumbnail_url TEXT,
  image_url TEXT;

-- thumbnail_url: Small preview (400x300)
-- image_url: Full size image (optional)
```

### Usage:
```typescript
// Component sẽ ưu tiên:
const imageUrl = resource.thumbnail_url
  || resource.image_url
  || '/images/placeholders/resource-default.png';
```

---

## 🔄 IMAGE WORKFLOW

### Workflow 1: Manual Upload
```
1. Cậu chuẩn bị ảnh (400x300, PNG/WebP)
2. Đặt tên theo convention: ui-kits-figma-design-system.png
3. Upload vào folder: public/images/resources/ui-kits/
4. Update database: thumbnail_url = '/images/resources/ui-kits/figma-design-system.png'
5. Done!
```

### Workflow 2: Auto-fetch (Future)
```
1. User nhập URL của resource
2. Backend fetch ảnh từ URL (screenshot service)
3. Resize về 400x300
4. Optimize (compress)
5. Save vào Supabase Storage
6. Update database với thumbnail_url
```

### Workflow 3: Use Gradients (Current)
```
1. Không có ảnh thật
2. Component dùng gradient + emoji từ database
3. Clean & fast, không cần upload ảnh
4. Đang dùng cách này! ✅
```

---

## 📋 IMPLEMENTATION CHECKLIST

### Phase 1: Setup Folders ✅
- [x] Tạo folder structure trong `public/images/`
- [x] Tạo subfolders cho categories
- [ ] Tạo 3 placeholder images

### Phase 2: Update Components
- [ ] Update Card.tsx để handle thumbnail_url
- [ ] Add fallback logic (image → gradient → placeholder)
- [ ] Test với dummy data

### Phase 3: Database
- [ ] Add thumbnail_url column to resources table
- [ ] Add image_url column (optional)
- [ ] Update existing dummy data với image paths

### Phase 4: Upload Real Images (Optional)
- [ ] Chuẩn bị 10-15 real thumbnails
- [ ] Upload vào folders
- [ ] Update database

---

## 🎯 RECOMMENDATION

**Hiện tại:**
- ✅ Dùng **gradient + emoji** (đang làm rất tốt!)
- ✅ Không cần upload ảnh ngay
- ✅ Clean, fast, consistent

**Tương lai khi có data thật:**
- 📸 Fetch thumbnails từ URLs
- 📸 Auto-screenshot websites
- 📸 Supabase Storage để host ảnh

**Kết luận:**
→ Giữ nguyên gradient system hiện tại
→ Setup folder structure để sẵn sàng
→ Không cần upload ảnh thủ công ngay

---

## 🚀 NEXT STEPS

Cậu muốn:

### A. Tạo folder structure + placeholder images (15 phút)
```bash
# Tớ sẽ tạo:
- public/images/ folders
- 3 placeholder images (gradient + emoji)
```

### B. Giữ nguyên gradient system, skip Task 3
```
- Gradient đang work tốt rồi
- Không cần thumbnails ngay
- Sang Task 4: Data sources luôn
```

**Cậu chọn A hay B?** 🤔

---

**Updated:** 2025-12-29

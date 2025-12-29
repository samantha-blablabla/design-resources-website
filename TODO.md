# 📋 TODO List - Design Resources Website

> **Cập nhật:** 2025-12-29 23:00
> **Session:** Video/Resources separation + Admin Panel + Slider improvements

---

## ✅ Đã Hoàn Thành

### Session Trước (2025-12-29 sáng)
- [x] Fix Featured Tools loading issue
- [x] Fix metadata viewport warnings
- [x] Setup Git repository
- [x] Push code lên GitHub
- [x] Tích hợp Supabase
- [x] Tạo automation system (100% FREE)
- [x] Hashtag system
- [x] Image fetcher

### Session Mới Nhất (2025-12-29 tối)

#### 1. Icon Fixes & Route Restructuring
- [x] **Fix PlayOutline icon error** - Đổi sang icon `Play` từ iconoir-react
  - Files: `components/Header.tsx`, `components/CategoryGrid.tsx`
- [x] **Rename /tips → /videos** - Tách riêng video tutorials
  - Moved: `app/tips/page.tsx` → `app/videos/page.tsx`
  - Updated: Navigation, CategoryGrid, Header
- [x] **Separate Videos from Resources** - Videos không còn hiển thị trong Resources page
  - Updated: `app/resources/page.tsx` với filter `.neq('category', 'video-tutorials')`

#### 2. Card Slider Enhancements
- [x] **Added Navigation Arrows** (Desktop only, ≥1024px)
  - Left/Right arrow buttons với glassmorphism design
  - Auto hide/show based on scroll position
  - Smooth scroll animation
  - Files: `components/CardSlider.tsx`, `app/globals.css`
- [x] **Removed Slider Card Animation**
  - Bỏ fade-in animation cho scroll mượt hơn
  - Simplified component from `AnimatedCard` → `SliderCard`

#### 3. Admin Panel Development ⭐
- [x] **Created comprehensive Admin Page** at `/admin`
- [x] **Password Protection** (password: `admin123`)
- [x] **5 Management Tabs:**
  1. **Quản lý Resources** - Form CRUD operations cho resources
  2. **Cài đặt UI** - Background gradient, Card settings, Spacing, Header config
  3. **Màu sắc** - Manage all CSS color variables
  4. **Tags** - Add/manage tags với custom colors
  5. **Typography** - Font family, sizes, weights, line heights
- [x] **Admin CSS Styling** - 300+ lines custom admin styles
- [x] **Responsive Design** - Mobile + Desktop support
- Files created: `app/admin/page.tsx`
- Files modified: `app/globals.css`

#### 4. Database Scripts
- [x] **YouTube Thumbnail Extractor** - Auto fetch thumbnails từ YouTube links
- [x] **Resource Validation System** - Check dead links across all resources
- [x] **Dead Link Removal** - Automatically remove inaccessible resources
- [x] **Cron Job Script** - Scheduled maintenance automation
- Files: `scripts/update-youtube-thumbnails.ts`, `scripts/validate-all-resources.ts`,
  `scripts/remove-all-dead-resources.ts`, `scripts/cron-cleanup-dead-resources.ts`

---

## 🔄 Đang Làm

- [ ] Testing Admin Panel functionality
- [ ] Verifying slider arrows work correctly on desktop

---

## ⏳ Cần Làm

### Urgent (Ưu tiên cao)
- [ ] **Connect Admin Panel to Supabase** - Make CRUD operations work
- [ ] **Test slider navigation** on production build
- [ ] **Deploy updates** to Vercel
- [ ] Verify Videos page loads correctly

### Important (Quan trọng)
- [ ] Add authentication to Admin Panel (replace simple password)
- [ ] Implement actual color/UI changes from Admin settings
- [ ] Add image upload for resources
- [ ] Setup API keys (YouTube, Groq) nếu chưa có
- [ ] Test cron job automation

### Nice to Have (Có thì tốt)
- [ ] Design System integration (need Figma exports)
- [ ] Add search functionality
- [ ] User favorites system
- [ ] Dark mode toggle
- [ ] Thêm loading states
- [ ] Optimize images
- [ ] Add error boundaries

---

## 📝 Ghi Chú

### Vấn Đề Đang Gặp:
- Admin Panel hiện tại chỉ là UI, chưa kết nối database
- Database migration errors (non-blocking)

### Ý Tưởng Mới:
- Cân nhắc sử dụng NextAuth.js cho admin authentication
- Implement real-time updates với Supabase subscriptions

### Links Quan Trọng:
- Website: https://design-resources-website.vercel.app/
- Admin Panel: http://localhost:3000/admin (password: admin123)
- GitHub: https://github.com/samantha-blablabla/design-resources-website
- Supabase: https://supabase.com/dashboard/project/kmzcbwiqlfdcrqqndglm
- Vercel: https://vercel.com/samanthas-projects-56df48a7

---

## 🔄 Workflow Giữa 2 Máy

### Khi BẮT ĐẦU làm việc:
1. Chạy `sync.bat` để pull code mới nhất
2. Đọc file TODO.md này để biết đang làm gì
3. Update "Máy đang làm" ở đầu file

### Khi KẾT THÚC làm việc:
1. Update TODO.md (tick các task đã xong)
2. Chạy `sync.bat` để push code lên
3. Commit message nên ghi rõ làm gì

---

## 💡 Tips Cho Claude AI

Khi bắt đầu chat mới với Claude:

**Nói với Claude:**
> "Đọc file TODO.md và CONTEXT.md để hiểu context. Tớ đang làm việc trên 2 máy khác nhau."

Claude sẽ:
1. Đọc TODO.md để biết tiến độ
2. Đọc CONTEXT.md để hiểu dự án
3. Đọc các file docs để hiểu chi tiết
4. Tiếp tục từ task cuối cùng

---

**Cập nhật lần cuối:** 2025-12-29 23:00
**Người cập nhật:** Claude AI (Session: Admin Panel + Slider)

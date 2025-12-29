# 🔐 Admin Panel - Hướng Dẫn Sử Dụng

> **Trang Admin:** http://localhost:3000/admin (local) hoặc https://yoursite.vercel.app/admin (production)
> **Password:** `admin123` (tạm thời - cần đổi sau)

---

## 📍 Cách Truy Cập Admin Panel

### Trên Localhost (Development):
1. Đảm bảo dev server đang chạy: `npm run dev`
2. Mở browser và truy cập: **http://localhost:3000/admin**
3. Nhập password: `admin123`
4. Click "Đăng nhập"

### Trên Production (Vercel):
1. Truy cập: **https://design-resources-website.vercel.app/admin**
2. Nhập password: `admin123`
3. Click "Đăng nhập"

---

## 🎨 Chức Năng Admin Panel

Admin Panel có **5 tabs** quản lý:

### 1️⃣ Quản lý Resources
**Mục đích:** Thêm, sửa, xóa design resources

**Các trường trong form:**
- **Tiêu đề:** Tên của resource (VD: "Figma Design System")
- **Mô tả:** Mô tả chi tiết về resource
- **URL:** Link đến resource
- **Category:** Chọn loại resource
  - ui-kits
  - icons
  - illustrations
  - photos
  - colors
  - typography
  - design-tools
  - ai
  - video-tutorials
- **Tags:** Các tags phân cách bằng dấu phẩy (VD: "free, figma, ui-design")
- **Image URL:** Link ảnh preview

**Hiện tại:** Chỉ là UI, chưa kết nối database
**TODO:** Cần implement CRUD operations với Supabase

---

### 2️⃣ Cài đặt UI
**Mục đích:** Tùy chỉnh giao diện website

**Các settings:**

#### Background Settings
- **Background Gradient:** Chọn 2 màu cho gradient background
- Hiện tại: `#fcf5ff → #fdf8ff` (purple pastel)

#### Card Settings
- **Border Radius:** 0-24px (hiện tại: 12px)
- **Card Shadow:** Small, Medium, Large

#### Spacing Settings
- **Container Width:** Độ rộng tối đa (hiện tại: 1280px)
- **Gap between cards:** Khoảng cách giữa các cards (16-48px)

#### Header Settings
- **Header Height:** Chiều cao header (hiện tại: 80px)
- **Header Blur:** Độ blur của glassmorphism (0-20px)

**Hiện tại:** Chỉ là UI preview
**TODO:** Cần implement logic để update CSS variables

---

### 3️⃣ Màu sắc
**Mục đích:** Quản lý color palette của website

**Các màu quản lý:**
- `--color-bg` - Background (hiện tại: #fafafa)
- `--color-surface` - Card surface (hiện tại: #ffffff)
- `--color-text` - Text màu chính (hiện tại: #1a1a1a)
- `--color-text-muted` - Text màu nhạt (hiện tại: #666666)
- `--color-border` - Border (hiện tại: #e5e5e5)
- `--color-accent` - Accent color (hiện tại: #6366f1)

**Cách sử dụng:**
1. Click vào color picker hoặc nhập hex code
2. Xem preview real-time
3. Click "Lưu màu sắc" để apply

**Hiện tại:** Chỉ là UI preview
**TODO:** Cần implement logic để update globals.css

---

### 4️⃣ Tags
**Mục đích:** Quản lý tags cho resources

**Chức năng:**
- Thêm tag mới với tên và màu tùy chỉnh
- Xem danh sách tất cả tags hiện có
- Mỗi tag có màu riêng để dễ phân biệt

**Form thêm tag:**
- **Tag Name:** Tên tag (VD: "figma")
- **Display Name:** Tên hiển thị (VD: "Figma")
- **Color:** Màu cho tag (color picker)

**Hiện tại:** Chỉ là UI preview
**TODO:** Cần kết nối với database để lưu tags

---

### 5️⃣ Typography
**Mục đích:** Quản lý fonts và typography settings

**Settings:**

#### Font Family
- **Primary Font:** Plus Jakarta Sans (hiện tại)
- **Fallback Fonts:** -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif

#### Font Sizes
- **Heading 1:** 48px
- **Heading 2:** 32px
- **Body Text:** 16px

#### Font Weights
- **Light:** 300
- **Regular:** 400
- **Bold:** 700

#### Line Heights
- **Headings:** 1.2
- **Body:** 1.6

**Hiện tại:** Chỉ là UI preview
**TODO:** Cần implement logic để update CSS variables

---

## ⚠️ Known Issues & Limitations

### Hiện Tại:
1. **Admin Panel chỉ là UI** - Chưa kết nối database
2. **Password đơn giản** - Chỉ dùng state check, không secure
3. **Không có user roles** - Chỉ có 1 admin account
4. **Settings không persist** - Reload là mất settings

### Cần Làm:
1. ✅ Connect CRUD operations to Supabase
2. ✅ Implement proper authentication (NextAuth.js)
3. ✅ Make UI settings actually update CSS
4. ✅ Add file upload for images
5. ✅ Add confirmation dialogs for delete actions
6. ✅ Add loading states
7. ✅ Add success/error notifications

---

## 🔒 Security Notes

### ⚠️ QUAN TRỌNG:

1. **ĐỔI PASSWORD NGAY:**
   - File: `app/admin/page.tsx`
   - Dòng 19: `if (password === 'admin123')`
   - Hoặc implement proper auth với NextAuth.js

2. **KHÔNG commit sensitive data:**
   - Admin credentials
   - API keys
   - Database passwords

3. **SỬ DỤNG ENVIRONMENT VARIABLES:**
   ```bash
   ADMIN_PASSWORD=your-secure-password
   NEXTAUTH_SECRET=your-nextauth-secret
   ```

4. **ENABLE RLS (Row Level Security) trong Supabase:**
   - Chạy migration `002_enable_rls.sql`
   - Setup policies cho admin operations

---

## 🚀 Future Enhancements

### Phase 1 - Database Integration:
- [ ] Connect Resources Manager to Supabase
- [ ] Implement add/edit/delete resources
- [ ] Add image upload với Supabase Storage
- [ ] Implement search and filters

### Phase 2 - Authentication:
- [ ] Replace simple password với NextAuth.js
- [ ] Add Google/GitHub login
- [ ] Implement user roles (admin, editor, viewer)
- [ ] Add activity logs

### Phase 3 - Advanced Features:
- [ ] Real-time settings preview
- [ ] Bulk operations (import/export resources)
- [ ] Analytics dashboard
- [ ] Scheduled publishing
- [ ] Version control for settings

---

## 📝 Development Notes

### Files liên quan:
```
app/admin/page.tsx          # Main admin component
app/globals.css             # Admin styles (lines 1454-1876)
```

### CSS Classes:
- `.admin-login-card` - Login form
- `.admin-tabs` - Tab navigation
- `.admin-content` - Tab content area
- `.admin-form-card` - Form container
- `.admin-button-primary` - Primary buttons
- `.admin-button-secondary` - Secondary buttons
- `.admin-table` - Data tables
- `.admin-setting-card` - Settings cards

---

## 💡 Tips

1. **Keyboard Shortcuts:**
   - ESC - Close modals/forms
   - Enter - Submit forms

2. **Mobile View:**
   - Admin panel responsive trên mobile
   - Tabs scroll horizontal nếu nhiều tabs

3. **Browser DevTools:**
   - Mở Console để xem logs
   - Check Network tab khi implement API calls

---

## 📞 Support

Nếu gặp vấn đề:
1. Check browser console for errors
2. Verify dev server đang chạy
3. Check file TODO.md và CONTEXT.md
4. Ask Claude AI với context đầy đủ

---

**Cập nhật:** 2025-12-29
**Version:** 1.0 (UI Only)
**Next Update:** Khi implement Supabase integration

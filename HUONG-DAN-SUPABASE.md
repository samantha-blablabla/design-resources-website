# 📘 Hướng Dẫn Cài Đặt Supabase

## ✅ Đã Hoàn Thành

Các file tích hợp Supabase đã được tạo sẵn:

- **lib/supabase.ts** - Supabase client
- **lib/types.ts** - TypeScript types cho các bảng database
- **.env.local** - File biến môi trường
- **package.json** - Đã cập nhật @supabase/supabase-js dependency

Tất cả các trang đã được cấu hình fetch data từ Supabase:
- **Trang chủ** - Lấy featured resources
- **Resources** - Lấy tất cả resources
- **Inspiration** - Lấy inspirations
- **Tips** - Lấy videos

---

## 🔧 Các Bước Cần Làm

### Bước 1: Cài Đặt Supabase Package

Mở terminal và chạy:

```powershell
npm install
```

Lệnh này sẽ cài đặt package `@supabase/supabase-js`.

---

### Bước 2: Lấy Thông Tin Supabase

1. Truy cập https://supabase.com và đăng nhập
2. Chọn project của bạn (hoặc tạo project mới)
3. Vào **Settings** → **API**
4. Copy 2 giá trị sau:
   - **Project URL** (dạng: `https://xxxxx.supabase.co`)
   - **Anon/Public key** (dạng: `eyJhbGciOi...`)

---

### Bước 3: Cập Nhật File .env.local

File `.env.local` đã tồn tại trong project. Mở file và thay thế các giá trị:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**Ví dụ:**
```env
NEXT_PUBLIC_SUPABASE_URL=https://kmzcbwiqlfdcrqqndglm.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

### Bước 4: Tạo Các Bảng Trong Database

1. Vào Supabase Dashboard
2. Click vào **SQL Editor** (bên trái)
3. Click **New Query**
4. Copy và paste đoạn SQL sau:

```sql
-- Bảng Resources (Tài nguyên thiết kế)
CREATE TABLE resources (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  tags TEXT[] DEFAULT '{}',
  emoji TEXT,
  gradient TEXT,
  category TEXT,
  url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bảng Inspirations (Nguồn cảm hứng)
CREATE TABLE inspirations (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  tags TEXT[] DEFAULT '{}',
  emoji TEXT,
  gradient TEXT,
  category TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bảng Videos (Video hướng dẫn)
CREATE TABLE videos (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  emoji TEXT,
  gradient TEXT,
  duration TEXT,
  youtube_id TEXT,
  category TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tạo unique index cho URL trong bảng resources (tránh trùng lặp)
CREATE UNIQUE INDEX IF NOT EXISTS resources_url_idx ON resources(url);
```

5. Click **Run** để tạo các bảng

---

### Bước 5: Thêm Dữ Liệu Mẫu (Tùy Chọn)

Nếu bạn muốn thêm dữ liệu mẫu để test, chạy SQL sau:

```sql
-- Thêm dữ liệu mẫu cho Resources
INSERT INTO resources (title, description, tags, emoji, gradient, url) VALUES
('Figma Design System', 'Hệ thống thiết kế hoàn chỉnh với components', 
 ARRAY['Figma', 'UI Kit'], '🎨', 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 'https://figma.com'),
('Color Palette Generator', 'Công cụ tạo bảng màu bằng AI',
 ARRAY['Colors', 'Tool'], '🌈', 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', 'https://coolors.co'),
('Typography Guide', 'Hướng dẫn typography chi tiết',
 ARRAY['Typography', 'Guide'], '✍️', 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', 'https://typescale.com');

-- Thêm dữ liệu mẫu cho Inspirations
INSERT INTO inspirations (title, description, tags, emoji, gradient) VALUES
('Modern Landing Page', 'Typography táo bạo và màu sắc rực rỡ',
 ARRAY['Web Design'], '🚀', 'linear-gradient(135deg, #f857a6 0%, #ff5858 100%)'),
('Mobile App UI', 'Thiết kế app di động hiện đại',
 ARRAY['Mobile', 'App'], '📱', 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'),
('Dashboard Design', 'Admin dashboard với dark mode',
 ARRAY['Dashboard', 'Dark Mode'], '📊', 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)');

-- Thêm dữ liệu mẫu cho Videos
INSERT INTO videos (title, description, emoji, gradient, duration, youtube_id) VALUES
('Color Theory Basics', 'Học các nguyên tắc cơ bản về màu sắc',
 '🎨', 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', '12:34', 'dQw4w9WgXcQ'),
('Typography Best Practices', 'Cách sử dụng typography hiệu quả',
 '✍️', 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', '15:20', 'dQw4w9WgXcQ'),
('UI Animation Guide', 'Tạo animation mượt mà cho UI',
 '✨', 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', '18:45', 'dQw4w9WgXcQ');
```

---

### Bước 6: Khởi Động Lại Dev Server

1. Nếu dev server đang chạy, dừng lại (Ctrl+C)
2. Chạy lại:

```powershell
npm run dev
```

3. Truy cập http://localhost:3000

---

### Bước 7: Kiểm Tra

Mở website và kiểm tra:
- ✅ Data hiển thị từ Supabase (không còn dummy data)
- ✅ Tất cả các trang hiển thị đúng
- ✅ Không có lỗi trong Console (F12)

---

## 📝 Cách Hoạt Động

- Mỗi trang có function async để fetch data từ Supabase
- Nếu kết nối Supabase thất bại hoặc bảng trống → **hiển thị dummy data**
- Website vẫn hoạt động ngay cả khi chưa setup database
- Không cần Edge Functions hay cron jobs - chỉ là fetch data đơn giản

---

## 🔄 Tự Động Cập Nhật Data (Tùy Chọn)

Nếu bạn muốn website **tự động fetch và phân loại resources** từ bookmarks.design mỗi 3 ngày:

1. Đọc file [edge_function_deployment.md](./edge_function_deployment.md)
2. Deploy Edge Function lên Supabase
3. Cấu hình cron job

---

## ⚠️ Lưu Ý Quan Trọng

### Security
- **KHÔNG bao giờ** commit file `.env.local` lên Git
- File `.gitignore` đã được cấu hình để bỏ qua file này

### Performance
- Supabase có giới hạn 50,000 requests/tháng (free plan)
- Đủ cho website cá nhân/test

### Data
- Nếu bảng trống, website sẽ hiển thị dummy data
- Bạn có thể thêm/sửa/xóa data trực tiếp trong Supabase Dashboard

---

## 🆘 Xử Lý Lỗi

### Lỗi: "Invalid API key"
- Kiểm tra lại `NEXT_PUBLIC_SUPABASE_ANON_KEY` trong file `.env.local`
- Đảm bảo copy đúng key từ Supabase Dashboard

### Lỗi: "Connection failed"
- Kiểm tra `NEXT_PUBLIC_SUPABASE_URL` có đúng format không
- Kiểm tra kết nối Internet

### Website vẫn hiển thị dummy data
- Kiểm tra các bảng đã được tạo trong Supabase chưa
- Kiểm tra đã thêm dữ liệu vào bảng chưa
- Restart dev server (Ctrl+C → `npm run dev`)

---

## 🎯 Tóm Tắt Nhanh

```powershell
# 1. Cài package
npm install

# 2. Cập nhật .env.local với thông tin Supabase của bạn

# 3. Tạo bảng trong Supabase SQL Editor (copy SQL ở Bước 4)

# 4. Restart server
npm run dev

# 5. Kiểm tra: http://localhost:3000
```

**Hoàn tất!** Website của bạn giờ đã kết nối với Supabase! 🎉

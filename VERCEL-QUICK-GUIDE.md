# ⚡ HƯỚNG DẪN NHANH - Điền Supabase trong Vercel

![Supabase API Keys](C:/Users/Admin/.gemini/antigravity/brain/e0512c27-ead6-48cb-afa9-23146a792a28/supabase_api_keys_1766910763226.png)

## 🔑 Lấy Thông Tin Supabase

### 1. Vào Supabase:
- Truy cập: https://supabase.com/dashboard
- Đăng nhập
- Chọn project (hoặc tạo mới)

### 2. Lấy API Keys:
- Click **Settings** (icon bánh răng ⚙️)
- Chọn **API**
- Copy 2 giá trị:
  - **Project URL**
  - **anon public** key

---

## ✍️ Điền Vào Vercel

Ở màn hình **Environment Variables**:

### Biến 1:
```
Key:   NEXT_PUBLIC_SUPABASE_URL
Value: [Paste Project URL của bạn]
```

### Biến 2 (Click "Add More"):
```
Key:   NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: [Paste anon public key của bạn]
```

### Ví dụ:
```
NEXT_PUBLIC_SUPABASE_URL
https://xyzproject.supabase.co

NEXT_PUBLIC_SUPABASE_ANON_KEY
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFz...
```

---

## 🚀 Deploy

Sau khi điền xong → Click **"Deploy"** → Đợi 2-3 phút → Xong!

---

## ⚠️ Chưa có Supabase?

**2 lựa chọn:**

### A. Deploy với dummy data (Nhanh):
- **Bỏ qua** Environment Variables
- Click **Deploy** luôn
- Website vẫn chạy được!
- Thêm Supabase sau

### B. Tạo Supabase ngay (5 phút):
1. https://supabase.com/dashboard
2. New Project
3. Chọn region **Southeast Asia**
4. Tạo password
5. Đợi 2 phút
6. Lấy keys theo hướng dẫn trên

---

**💡 Khuyên:** Deploy với dummy data trước để test, thêm Supabase sau!

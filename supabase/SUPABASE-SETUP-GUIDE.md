# 📘 Hướng Dẫn Setup Supabase - Cực Kỳ Đơn Giản

## 🎯 Bước 1: Truy cập Supabase SQL Editor

1. Mở trình duyệt, vào [https://supabase.com](https://supabase.com)
2. Đăng nhập vào project của cậu
3. Ở sidebar bên trái, click vào **SQL Editor** (icon database ⚡)

---

## 🎯 Bước 2: Chạy Migration 001 - Tạo Tables

1. Trong SQL Editor, click nút **New query**
2. Mở file: `supabase/migrations/001_create_tables.sql`
3. **Copy toàn bộ nội dung** file đó
4. **Paste** vào SQL Editor
5. Click nút **Run** (hoặc Ctrl+Enter)
6. Đợi ~5 giây → Sẽ thấy thông báo "Success ✅"

✅ **Xong! Bây giờ cậu có 5 tables: resources, inspirations, videos, articles, crawl_logs**

---

## 🎯 Bước 3: Chạy Migration 002 - Enable RLS (Security)

1. Trong SQL Editor, click **New query** lần nữa
2. Mở file: `supabase/migrations/002_enable_rls.sql`
3. **Copy toàn bộ nội dung**
4. **Paste** vào SQL Editor
5. Click **Run**
6. Đợi ~5 giây → Thấy "Success ✅"

✅ **Xong! Bây giờ website có thể READ data, nhưng chỉ server mới WRITE được (bảo mật)**

---

## 🎯 Bước 4 (OPTIONAL): Seed Dummy Data để Test

Nếu cậu muốn test xem tables hoạt động chưa:

1. Trong SQL Editor, click **New query**
2. Mở file: `supabase/migrations/003_seed_dummy_data.sql`
3. **Copy toàn bộ**
4. **Paste** vào SQL Editor
5. Click **Run**

✅ **Xong! Bây giờ có vài sample data để test**

Để xem data:
- Ở sidebar, click **Table Editor**
- Chọn table `resources` → thấy 3 sample items
- Chọn table `inspirations` → thấy 2 sample items
- etc.

---

## 🎯 Bước 5: Lấy API Keys

Để code có thể kết nối với Supabase:

1. Ở sidebar, click **Settings** (icon gear ⚙️)
2. Click **API**
3. Cuộn xuống phần **Project API keys**
4. Copy 2 keys này:
   - **`anon / public`** key
   - **`service_role`** key (⚠️ BẢO MẬT, không share public)

---

## 🎯 Bước 6: Thêm Keys vào .env.local

1. Ở VSCode, mở file `.env.local` (nếu chưa có thì tạo mới)
2. Paste vào:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...your-anon-key
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...your-service-role-key

# YouTube API (sẽ setup sau)
YOUTUBE_API_KEY=

# Groq API (sẽ setup sau)
GROQ_API_KEY=

# Cron Secret (random string)
CRON_SECRET=your-random-secret-here
```

3. Thay `your-project` bằng URL thật của cậu
4. Paste keys đã copy ở bước 5

---

## ✅ XONG! Database Setup Hoàn Tất

Bây giờ cậu có:
- ✅ 5 tables trong Supabase
- ✅ Row Level Security enabled
- ✅ API keys để connect
- ✅ (Optional) Sample data để test

---

## 🔍 Kiểm Tra Xem Setup Thành Công Chưa

1. Ở Supabase dashboard, click **Table Editor**
2. Xem danh sách tables bên trái:
   - ☑️ `resources`
   - ☑️ `inspirations`
   - ☑️ `videos`
   - ☑️ `articles`
   - ☑️ `crawl_logs`

3. Nếu thấy đủ 5 tables → **THÀNH CÔNG! 🎉**

---

## ❓ Troubleshooting

### Lỗi: "relation already exists"
- Nghĩa là table đã tồn tại rồi
- **Giải pháp**: Skip migration đó, hoặc chạy lệnh xóa table trước:
```sql
DROP TABLE IF EXISTS resources CASCADE;
DROP TABLE IF EXISTS inspirations CASCADE;
DROP TABLE IF EXISTS videos CASCADE;
DROP TABLE IF EXISTS articles CASCADE;
DROP TABLE IF EXISTS crawl_logs CASCADE;
```
Rồi chạy lại migration 001.

### Lỗi: "permission denied"
- Nghĩa là chưa enable RLS đúng cách
- **Giải pháp**: Chạy lại migration 002

### Không thấy data sau khi seed
- Check lại bằng cách vào **Table Editor** → chọn table → xem rows
- Hoặc chạy query:
```sql
SELECT COUNT(*) FROM resources;
```

---

## 📞 Next Steps

Sau khi setup xong database, tớ sẽ:
1. ✅ Connect Next.js app với Supabase
2. ✅ Tạo RSS parsers
3. ✅ Setup YouTube API
4. ✅ Tạo cron jobs

**Báo tớ khi cậu chạy xong 3 migration files nhé!** 🚀

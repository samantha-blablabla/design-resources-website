# 🔑 Hướng Dẫn Lấy API Keys (100% FREE)

## 1. Supabase API Keys ✅

**Đã có rồi từ project Supabase của cậu**

1. Vào [https://supabase.com](https://supabase.com)
2. Login → chọn project
3. Sidebar → **Settings** (⚙️) → **API**
4. Copy 2 keys:
   - `anon / public` key
   - `service_role` key (⚠️ BẢO MẬT)

---

## 2. YouTube Data API v3 Key (FREE) 🎥

### Bước 1: Tạo Google Cloud Project
1. Vào [https://console.cloud.google.com](https://console.cloud.google.com)
2. Đăng nhập với Google account
3. Click **Select a project** → **NEW PROJECT**
4. Đặt tên project: `DesignHub` hoặc gì cũng được
5. Click **CREATE**

### Bước 2: Enable YouTube Data API
1. Ở menu bên trái, click **APIs & Services** → **Library**
2. Search: `YouTube Data API v3`
3. Click vào → Click **ENABLE**

### Bước 3: Tạo API Key
1. Ở menu bên trái, click **Credentials**
2. Click **+ CREATE CREDENTIALS** → **API key**
3. Copy API key vừa tạo
4. Click **Restrict Key** (khuyến nghị)
   - Application restrictions: **None** (hoặc HTTP referrers nếu muốn)
   - API restrictions: **Restrict key** → Chọn **YouTube Data API v3**
5. Click **SAVE**

### Free Quota:
- 10,000 units/day
- 1 video fetch = ~3 units
- = ~3,000 videos/day (QUÁ ĐỦ!)

✅ **Copy API key vào `.env.local`**

---

## 3. Groq AI API Key (FREE, Unlimited) 🤖

### Bước 1: Tạo Groq Account
1. Vào [https://console.groq.com](https://console.groq.com)
2. Click **Sign Up** (dùng Google/GitHub)
3. Verify email

### Bước 2: Tạo API Key
1. Sau khi login, vào [https://console.groq.com/keys](https://console.groq.com/keys)
2. Click **Create API Key**
3. Đặt tên: `DesignHub Automation`
4. Click **Submit**
5. **Copy key ngay** (chỉ hiện 1 lần)

### Free Tier:
- **30 requests/minute**
- **14,400 requests/day**
- **100% free, không giới hạn!**
- Model: Llama3-8b-8192 (rất nhanh, chất lượng tốt)

✅ **Copy API key vào `.env.local`**

---

## 4. Cron Secret (Random String) 🔒

Để bảo vệ cron endpoint, tạo một random string:

### Option 1: Online Generator
1. Vào [https://www.random.org/strings/](https://www.random.org/strings/)
2. Generate 1 string, 32 characters
3. Copy string

### Option 2: Terminal (nếu có OpenSSL)
```bash
openssl rand -base64 32
```

✅ **Copy vào `.env.local`**

---

## 5. File `.env.local` Hoàn Chỉnh

Tạo file `.env.local` ở root project, paste vào:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

# YouTube Data API v3
YOUTUBE_API_KEY=AIzaSy...

# Groq AI API
GROQ_API_KEY=gsk_...

# Cron Secret
CRON_SECRET=your-random-string-here
```

⚠️ **QUAN TRỌNG:**
- File `.env.local` đã có trong `.gitignore` → KHÔNG bị push lên GitHub
- KHÔNG chia sẻ `service_role` key với ai
- Thay tất cả `xxxxx` bằng keys thật của cậu

---

## 6. Thêm Environment Variables vào Vercel

Sau khi deploy lên Vercel, cần thêm env vars:

1. Vào [https://vercel.com](https://vercel.com)
2. Chọn project **design-resources-website**
3. Settings → **Environment Variables**
4. Thêm từng biến:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `YOUTUBE_API_KEY`
   - `GROQ_API_KEY`
   - `CRON_SECRET`
5. Click **Save**
6. Redeploy project

---

## ✅ Checklist

- [ ] Supabase URL & Keys
- [ ] YouTube API Key
- [ ] Groq API Key
- [ ] Cron Secret (random string)
- [ ] File `.env.local` created
- [ ] Vercel Environment Variables added

---

## 🔍 Test API Keys

Sau khi setup xong, test bằng cách:

```bash
# Test YouTube API
curl "https://www.googleapis.com/youtube/v3/search?key=YOUR_KEY&channelId=UCQsVmhSa4X-G3lHlUtejzLA&part=snippet&maxResults=1"

# Test Groq API
curl https://api.groq.com/openai/v1/models \
  -H "Authorization: Bearer YOUR_GROQ_KEY"
```

Nếu không có lỗi → **THÀNH CÔNG!** 🎉

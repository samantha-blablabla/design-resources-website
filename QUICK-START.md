# 🚀 Quick Start Guide - Setup trong 15 phút

## 📋 Checklist Tổng Quan

- [ ] **Bước 1**: Setup Supabase Database (5 phút)
- [ ] **Bước 2**: Lấy API Keys (5 phút)
- [ ] **Bước 3**: Deploy lên Vercel (5 phút)
- [ ] **Bước 4**: Test automation

---

## 🎯 Bước 1: Setup Supabase (5 phút)

1. Mở [`supabase/SUPABASE-SETUP-GUIDE.md`](supabase/SUPABASE-SETUP-GUIDE.md)
2. Làm theo từng bước (copy-paste SQL)
3. Lấy API keys

**Quick version:**
```
Supabase → SQL Editor → New Query
→ Copy paste file 001_create_tables.sql → Run
→ Copy paste file 002_enable_rls.sql → Run
→ (Optional) Copy paste file 003_seed_dummy_data.sql → Run
```

✅ Xong → Có 5 tables trong database

---

## 🎯 Bước 2: Lấy API Keys (5 phút)

Mở [`API-KEYS-GUIDE.md`](API-KEYS-GUIDE.md) và lấy:

1. ✅ **Supabase Keys** (đã có từ bước 1)
2. 🆓 **YouTube API Key** - [Google Cloud Console](https://console.cloud.google.com)
3. 🆓 **Groq AI Key** - [Groq Console](https://console.groq.com/keys)
4. 🔒 **Cron Secret** - Random string

Tạo file `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
YOUTUBE_API_KEY=AIzaSy...
GROQ_API_KEY=gsk_...
CRON_SECRET=random-string-here
```

---

## 🎯 Bước 3: Deploy lên Vercel (5 phút)

### Option A: Deploy mới
1. Push code lên GitHub (done rồi!)
2. Vào [https://vercel.com](https://vercel.com)
3. Import GitHub repo: `design-resources-website`
4. Settings → Environment Variables → Add tất cả keys từ `.env.local`
5. Deploy!

### Option B: Project đã có sẵn
1. Vào Vercel → Chọn project
2. Settings → Environment Variables
3. Add từng biến:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `YOUTUBE_API_KEY`
   - `GROQ_API_KEY`
   - `CRON_SECRET`
4. Redeploy

✅ Xong → Website live với automation!

---

## 🎯 Bước 4: Test Automation

### Test Manual (ngay bây giờ)
```bash
# Localhost
curl http://localhost:3000/api/cron/daily-update \
  -H "Authorization: Bearer YOUR_CRON_SECRET"

# Production
curl https://your-site.vercel.app/api/cron/daily-update \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

Nếu thấy response:
```json
{
  "success": true,
  "inspirations": { "added": 5, "skipped": 0 },
  "videos": { "added": 10, "skipped": 0 },
  ...
}
```

→ **THÀNH CÔNG!** 🎉

### Test Auto (Vercel Cron)
- Cron sẽ tự chạy **mỗi ngày lúc 9am** (theo timezone server)
- Check logs: Vercel → Project → Deployments → View Function Logs

---

## 📊 Kiểm Tra Dữ Liệu

Sau khi chạy automation:

1. Vào Supabase → Table Editor
2. Xem tables:
   - `inspirations` - Design inspiration từ Dribbble, Behance
   - `videos` - YouTube tutorials
   - `articles` - Articles từ Medium, Smashing Magazine
   - `resources` - Design tools từ Product Hunt
   - `crawl_logs` - Logs của automation runs

3. Refresh website → Thấy data mới!

---

## 🔧 Troubleshooting

### "Unauthorized" error khi test cron
→ Check `CRON_SECRET` trong `.env.local` và Vercel env vars

### Không có data mới
→ Check Vercel Function Logs để xem errors

### YouTube API quota exceeded
→ Free tier: 10k/day. Nếu vượt, đợi hôm sau reset.

### Groq API rate limit
→ 30 requests/min. Automation đã có delay, không lo.

---

## 📚 Documentation Files

- [`AUTOMATION-PLAN-FREE.md`](AUTOMATION-PLAN-FREE.md) - Kế hoạch chi tiết 100% FREE
- [`API-KEYS-GUIDE.md`](API-KEYS-GUIDE.md) - Hướng dẫn lấy keys
- [`supabase/SUPABASE-SETUP-GUIDE.md`](supabase/SUPABASE-SETUP-GUIDE.md) - Setup database

---

## 🎉 Done!

Website bây giờ sẽ tự động cập nhật nội dung mỗi ngày:
- ✅ Design inspiration mới từ Dribbble, Behance
- ✅ YouTube videos mới từ các kênh design
- ✅ Articles mới từ Medium, Smashing Magazine
- ✅ Design tools mới từ Product Hunt

**100% FREE. Zero cost. Sustainable long-term!** 🚀

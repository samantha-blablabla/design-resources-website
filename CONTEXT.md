# 🤖 Context Cho Claude AI

> **MỤC ĐÍCH:** File này giúp Claude AI hiểu nhanh dự án khi bắt đầu chat mới
> **CẬP NHẬT:** 2025-12-29 08:53

---

## 📊 TRẠNG THÁI DỰ ÁN

### ✅ Build Status
- **Last Deploy:** 2025-12-29
- **Build:** ✅ Successful
- **Website:** https://design-resources-website.vercel.app/

### 🔧 Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Database:** Supabase (Project ID: kmzcbwiqlfdcrqqndglm)
- **Hosting:** Vercel
- **AI:** Groq API (free)
- **APIs:** YouTube Data API v3

### 💰 Cost
- **$0/month** - 100% FREE

---

## 📝 CÔNG VIỆC MỚI NHẤT

### Lần Fix Cuối (2025-12-29):
1. ✅ Fix Featured Tools loading issue
   - File: `components/FeaturedTools.tsx`
   - Change: Added `.eq('featured', true)` to query

2. ✅ Fix metadata viewport warnings
   - File: `app/layout.tsx`
   - Change: Separated `viewport` export from `metadata`

3. ✅ Push code lên GitHub
   - Commit: `8c2925a`
   - Branch: `main`

---

## 🎯 ĐANG LÀM / CẦN LÀM

Xem file [TODO.md](TODO.md) để biết chi tiết.

**Quick summary:**
- [ ] Test website sau deploy mới
- [ ] Verify RLS policies trong Supabase
- [ ] Setup API keys cho automation
- [ ] Test cron job

---

## 🔗 LINKS QUAN TRỌNG

| Service | URL |
|---------|-----|
| **Website** | https://design-resources-website.vercel.app/ |
| **GitHub** | https://github.com/samantha-blablabla/design-resources-website |
| **Supabase** | https://supabase.com/dashboard/project/kmzcbwiqlfdcrqqndglm |
| **Vercel** | https://vercel.com/samanthas-projects-56df48a7 |
| **Reference** | https://toools.design |

---

## 📚 TÀI LIỆU QUAN TRỌNG

Khi cần hiểu dự án, đọc theo thứ tự:

1. **[PROGRESS-SUMMARY.md](PROGRESS-SUMMARY.md)** - Tổng quan tiến độ
2. **[NHAT-KY-DU-AN.md](NHAT-KY-DU-AN.md)** - Lịch sử dự án
3. **[TODO.md](TODO.md)** - Công việc hiện tại
4. **[AUTOMATION-PLAN-FREE.md](AUTOMATION-PLAN-FREE.md)** - Hệ thống automation
5. **[QUICK-START.md](QUICK-START.md)** - Hướng dẫn setup

---

## 🗄️ CẤU TRÚC SUPABASE

### Tables:
1. **resources** - 3 rows (2 featured)
2. **inspirations** - Empty
3. **videos** - Empty
4. **articles** - Empty
5. **crawl_logs** - Empty

### Migrations Status:
- ✅ 001_create_tables.sql - Done
- ⚠️ 002_enable_rls.sql - Cần verify
- ❌ 003_seed_dummy_data.sql - Chưa chạy (optional)
- ❌ 004_hashtag_functions.sql - Chưa chạy

---

## 🐛 KNOWN ISSUES

### Fixed:
- ✅ Featured Tools loading forever
- ✅ Metadata viewport warnings

### To Check:
- ⚠️ RLS policies có hoạt động không?
- ⚠️ Cron job có được setup chưa?

---

## 💡 WORKFLOW VỚI CLAUDE

### Khi Bắt Đầu Chat Mới:

**Bước 1:** Nói với Claude:
```
"Đọc file CONTEXT.md và TODO.md để hiểu dự án.
Tớ đang làm việc trên 2 máy khác nhau."
```

**Bước 2:** Claude sẽ tự động:
1. Đọc CONTEXT.md (file này)
2. Đọc TODO.md
3. Đọc các file .md liên quan
4. Hiểu được đang làm gì, cần làm gì tiếp

**Bước 3:** Bắt đầu làm việc tiếp!

---

## 🔄 SYNC GIỮA 2 MÁY

### Trước khi làm việc:
```bash
# Chạy file sync.bat
# Hoặc:
git pull origin main
```

### Sau khi làm việc xong:
```bash
# Chạy file sync.bat
# Hoặc:
git add .
git commit -m "Update: [mô tả]"
git push origin main
```

---

## 📞 NEXT STEPS

Xem [TODO.md](TODO.md) để biết công việc tiếp theo.

---

**Cập nhật lần cuối:** 2025-12-29 08:53
**Commit mới nhất:** 8c2925a
**Máy cập nhật:** [Ghi tên máy]

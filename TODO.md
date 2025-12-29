# 📋 TODO List - Design Resources Website

> **Cập nhật:** 2025-12-29
> **Rule:** Chỉ track tasks, KHÔNG ghi implementation details (có Git log rồi)

---

## ⏳ Đang Làm

- Nothing currently in progress

---

## 🔥 Urgent (Cần làm ngay)

- [ ] **Connect Admin Panel to Supabase**
  - Make Resources CRUD work
  - Save UI settings to database/localStorage
  - Implement color/typography changes

- [ ] **Test Production Build**
  - Verify slider arrows work on production
  - Check Videos page loads correctly
  - Test admin panel on deployed site

- [ ] **Fix Any Production Errors**
  - Monitor Vercel logs
  - Check browser console

---

## 📌 Important (Quan trọng)

- [ ] **Admin Authentication**
  - Replace simple password with proper auth
  - Consider NextAuth.js or Supabase Auth

- [ ] **Admin Features**
  - Image upload for resources
  - Bulk import/export resources
  - Preview before publish

- [ ] **Database**
  - Verify RLS policies work
  - Test all Supabase queries
  - Setup API keys if missing (YouTube, Groq)

- [ ] **Automation**
  - Test cron job scripts
  - Setup scheduled tasks on Vercel/external service

---

## 💡 Nice to Have (Có thì tốt)

- [ ] **Search & Filter**
  - Global search across all resources
  - Advanced filters

- [ ] **User Features**
  - Favorites system
  - User accounts
  - Submission system for new resources

- [ ] **UI/UX**
  - Dark mode toggle
  - Loading states
  - Error boundaries
  - Image optimization

- [ ] **Design System**
  - Export Figma design tokens
  - Document component library

---

## ✅ Đã Hoàn Thành

### Latest Session (2025-12-29 tối)

#### Major Features
- [x] Admin Panel with 5 tabs at `/admin`
- [x] Slider navigation arrows (glassmorphism)
- [x] Videos/Resources separation
- [x] Fixed PlayOutline icon error
- [x] Card improvements (text truncation)
- [x] Database automation scripts

#### Details
- [x] Password protection for admin (admin123)
- [x] 300+ lines admin CSS
- [x] YouTube thumbnail extractor script
- [x] Resource validation system
- [x] Dead link removal automation
- [x] Cron job for cleanup
- [x] Documentation updates

### Previous Sessions

#### 2025-12-29 sáng
- [x] Fix Featured Tools loading issue
- [x] Fix metadata viewport warnings
- [x] Setup Git repository
- [x] Supabase integration
- [x] Hashtag system

#### Earlier
- [x] Initial project setup
- [x] Homepage with featured tools
- [x] Resources page
- [x] Inspiration page
- [x] Videos page (formerly /tips)
- [x] Responsive design
- [x] Vercel deployment

---

## 📝 Notes

### Current Status
- ✅ Build: Successful
- ✅ Deployed: Vercel auto-deploy working
- ⚠️ Admin Panel: UI-only, needs database connection
- ⚠️ Migrations: Some warnings (non-blocking)

### Links
- Website: https://design-resources-website.vercel.app/
- Admin: http://localhost:3000/admin
- GitHub: https://github.com/samantha-blablabla/design-resources-website
- Supabase: https://supabase.com/dashboard/project/kmzcbwiqlfdcrqqndglm

---

## 💡 Workflow Tips

### Khi Bắt Đầu Chat Với Claude:

**Nói với Claude:**
```
"Đọc CONTEXT.md và TODO.md để hiểu dự án.
Chạy git log để xem thay đổi gần nhất.
Tớ đang làm trên 2 máy."
```

### Khi Check Out Task:
- [ ] Đánh dấu task trong section "Đang Làm"
- [ ] Làm việc
- [ ] Test
- [ ] Git commit với message rõ ràng
- [ ] Move task xuống "Đã Hoàn Thành"
- [ ] Push to GitHub

### Xem Chi Tiết Code Changes:
```bash
# Đừng đọc TODO.md, đọc Git!
git log --oneline -10
git show
git diff
```

---

**Cập nhật:** 2025-12-29
**Version:** Simplified (Git for code, TODO for tasks only)
**Để biết implementation details:** Chạy `git log` và `git diff`

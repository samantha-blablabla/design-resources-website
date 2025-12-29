# 🔄 Hướng Dẫn Làm Việc Trên 2 Máy

## 🎯 VẤN ĐỀ

- Làm việc trên 2 máy khác nhau (máy công ty + máy cá nhân)
- Claude AI không lưu lịch sử chat giữa các máy
- Cần đồng bộ code và context

---

## ✅ GIẢI PHÁP (Đã Setup Xong!)

### 1. **Git Sync** ✅
- Mọi thay đổi đều được push lên GitHub
- Khi chuyển máy → pull code mới nhất về

### 2. **TODO.md** ✅
- Track công việc đang làm
- Update mỗi khi hoàn thành task

### 3. **CONTEXT.md** ✅
- Context nhanh cho Claude AI
- Liệt kê links, status, issues

### 4. **sync.bat** ✅
- Script tự động pull + commit + push
- Chỉ cần double-click!

---

## 📖 WORKFLOW

### 🟢 KHI BẮT ĐẦU LÀM VIỆC (Máy Mới)

#### Bước 1: Clone Code (Chỉ lần đầu)
```bash
cd "D:\Projects"
git clone https://github.com/samantha-blablabla/design-resources-website.git
cd design-resources-website
npm install
```

#### Bước 2: Pull Code Mới Nhất
```bash
# Double-click file này:
sync.bat

# Hoặc chạy:
git pull origin main
```

#### Bước 3: Đọc Context
1. Mở file **[TODO.md](TODO.md)** - Xem đang làm gì
2. Mở file **[CONTEXT.md](CONTEXT.md)** - Xem status dự án

#### Bước 4: Nói Với Claude
```
Đọc file CONTEXT.md và TODO.md để hiểu dự án.
Tớ đang làm việc trên 2 máy khác nhau.
[Paste nội dung task cần làm]
```

---

### 🔴 KHI KẾT THÚC LÀM VIỆC

#### Bước 1: Update TODO.md
- Tick ✅ các task đã xong
- Thêm task mới (nếu có)
- Ghi lại vấn đề gặp phải (nếu có)

#### Bước 2: Sync Code Lên GitHub
```bash
# Double-click file này:
sync.bat

# Script sẽ tự động:
# 1. Pull code mới (nếu có ai push)
# 2. Commit tất cả changes
# 3. Push lên GitHub
```

**Hoặc chạy thủ công:**
```bash
git add .
git commit -m "Update: [mô tả công việc làm]"
git push origin main
```

#### Bước 3: Update CONTEXT.md (Nếu Có Thay Đổi Lớn)
- Cập nhật "Công việc mới nhất"
- Cập nhật "Known Issues"
- Cập nhật thời gian

---

## 💡 TIPS

### Nếu Quên Đã Làm Gì:

**Cách 1:** Đọc TODO.md
```
Xem task nào đã tick ✅
```

**Cách 2:** Xem Git Log
```bash
git log --oneline -10
# Xem 10 commits gần nhất
```

**Cách 3:** Hỏi Claude
```
Đọc file CONTEXT.md và TODO.md rồi cho tớ biết:
1. Đã làm được gì?
2. Đang làm gì?
3. Cần làm gì tiếp?
```

---

### Nếu Bị Conflict (2 Máy Sửa Cùng File):

```bash
# Cách 1: Stash changes rồi pull
git stash
git pull origin main
git stash pop
# Resolve conflicts manually

# Cách 2: Overwrite (NGUY HIỂM - chỉ khi chắc chắn)
git fetch origin
git reset --hard origin/main
```

---

### File Nào Cần Đọc Khi Chat Với Claude:

**Luôn luôn đọc:**
1. [CONTEXT.md](CONTEXT.md) - Context nhanh
2. [TODO.md](TODO.md) - Công việc hiện tại

**Tùy task, đọc thêm:**
- [PROGRESS-SUMMARY.md](PROGRESS-SUMMARY.md) - Tổng quan tiến độ
- [NHAT-KY-DU-AN.md](NHAT-KY-DU-AN.md) - Lịch sử dự án
- [AUTOMATION-PLAN-FREE.md](AUTOMATION-PLAN-FREE.md) - Automation chi tiết
- [QUICK-START.md](QUICK-START.md) - Setup từ đầu

---

## 📁 CẤU TRÚC FILES

```
design-resources-website/
├── CONTEXT.md          ← ⭐ Context cho Claude
├── TODO.md             ← ⭐ Công việc hiện tại
├── sync.bat            ← ⭐ Script tự động sync
│
├── PROGRESS-SUMMARY.md ← Tổng quan
├── NHAT-KY-DU-AN.md    ← Lịch sử
├── QUICK-START.md      ← Setup guide
├── FIX-SUMMARY.md      ← Các fix gần nhất
│
├── app/                ← Next.js pages
├── components/         ← React components
├── lib/                ← Utils & helpers
└── supabase/           ← Database migrations
```

---

## ✅ CHECKLIST

### Máy Mới (Setup Lần Đầu):
- [ ] Clone repo từ GitHub
- [ ] Chạy `npm install`
- [ ] Tạo file `.env.local` (copy từ `.env.local.example`)
- [ ] Test: `npm run dev`

### Mỗi Lần Bắt Đầu:
- [ ] Chạy `sync.bat` (pull code mới)
- [ ] Đọc `TODO.md`
- [ ] Đọc `CONTEXT.md`
- [ ] Nói với Claude đọc 2 files trên

### Mỗi Lần Kết Thúc:
- [ ] Update `TODO.md`
- [ ] Chạy `sync.bat` (push code)
- [ ] (Optional) Update `CONTEXT.md` nếu có thay đổi lớn

---

## 🆘 TROUBLESHOOTING

### "Git không được nhận dạng"
```bash
# Cài Git: https://git-scm.com/download/win
```

### "npm không được nhận dạng"
```bash
# Cài Node.js: https://nodejs.org
```

### "Conflict khi pull"
```bash
# Xem file nào bị conflict:
git status

# Resolve conflicts rồi:
git add .
git commit -m "Resolve conflicts"
```

---

## 🎉 TÓM TẮT

**Workflow Đơn Giản:**

1. **Bắt đầu:** `sync.bat` → Đọc TODO.md → Chat với Claude
2. **Làm việc:** Code → Test → Update TODO.md
3. **Kết thúc:** `sync.bat` → Done!

**Khi chuyển máy:**
- Code tự động sync qua GitHub
- TODO.md có track progress
- Claude đọc CONTEXT.md để hiểu ngữ cảnh

**Easy! 🚀**

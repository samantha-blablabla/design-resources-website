# 🔄 Git Workflow Giữa 2 Máy

> **MỤC ĐÍCH:** Hướng dẫn sync code giữa máy công ty và máy cá nhân
> **QUAN TRỌNG:** Git là source of truth, không phải markdown files

---

## 📌 Quy Tắc Vàng

### ✅ ĐÚNG:
- **Git là nguồn chân lý duy nhất** - Tất cả code changes ở trong Git history
- Đọc `git log` và `git diff` để xem thay đổi
- Pull trước khi làm việc, push sau khi xong
- Commit messages phải rõ ràng

### ❌ SAI:
- ~~Ghi tất cả code changes vào CONTEXT.md~~ (quá dài, khó maintain)
- ~~Copy/paste code vào TODO.md~~ (duplicate với Git)
- ~~Làm việc không pull trước~~ (conflict!)
- ~~Push không commit message~~ (không biết làm gì)

---

## 🚀 Workflow Chuẩn

### 1️⃣ Khi BẮT ĐẦU Làm Việc (Máy Mới)

```bash
# Bước 1: Pull code mới nhất từ GitHub
git pull origin main

# Bước 2: Xem người khác đã làm gì
git log --oneline -10

# Bước 3: Xem chi tiết thay đổi gần nhất
git show

# Bước 4: Nếu muốn xem tất cả files đã thay đổi
git diff HEAD~1

# Bước 5: Start dev server
npm run dev
```

**💡 Nói với Claude:**
```
"Vừa pull code mới từ máy khác.
Cho tớ xem git log 5 commits gần nhất và tóm tắt đã làm gì."
```

---

### 2️⃣ Khi ĐANG Làm Việc

```bash
# Kiểm tra files đã thay đổi
git status

# Xem chi tiết thay đổi
git diff

# Xem thay đổi của 1 file cụ thể
git diff app/admin/page.tsx
```

---

### 3️⃣ Khi KẾT THÚC Làm Việc

```bash
# Bước 1: Xem đã thay đổi gì
git status

# Bước 2: Add tất cả thay đổi
git add .

# Bước 3: Commit với message rõ ràng
git commit -m "Add: Admin panel with 5 tabs

- Created /admin page with password protection
- Added Resources, UI Settings, Colors, Tags, Typography tabs
- Added 300+ lines admin CSS
- Still need to connect to Supabase"

# Bước 4: Push lên GitHub
git push origin main

# Bước 5: Verify đã push thành công
git status
```

---

## 📝 Commit Message Format

### Template:
```
[Type]: [Short summary in English]

[Optional detailed description in Vietnamese]
[What was changed]
[What still needs to be done]
```

### Types:
- `Add:` - Thêm feature mới
- `Fix:` - Sửa bug
- `Update:` - Cập nhật feature có sẵn
- `Refactor:` - Refactor code
- `Style:` - Thay đổi CSS/UI
- `Docs:` - Cập nhật documentation
- `Deploy:` - Deployment changes

### Examples:

**✅ GOOD:**
```bash
git commit -m "Add: Slider navigation arrows

- Added left/right arrows to CardSlider
- Desktop only (≥1024px)
- Glassmorphism design with hover effects
- Auto hide/show based on scroll position"
```

**✅ GOOD:**
```bash
git commit -m "Fix: PlayOutline icon error

Changed from PlayOutline to Play icon in Header and CategoryGrid"
```

**❌ BAD:**
```bash
git commit -m "update"  # Không rõ làm gì
git commit -m "fix bug"  # Bug gì?
git commit -m "wip"  # Work in progress không nên commit
```

---

## 🔍 Lệnh Git Hữu Ích

### Xem Lịch Sử

```bash
# Xem 10 commits gần nhất (compact)
git log --oneline -10

# Xem chi tiết 1 commit
git show [commit-hash]

# Xem thay đổi giữa 2 commits
git diff [commit1] [commit2]

# Xem files thay đổi trong commit cuối
git diff --name-only HEAD~1
```

### So Sánh Code

```bash
# Xem tất cả thay đổi chưa commit
git diff

# Xem thay đổi đã staged
git diff --staged

# So sánh với commit trước
git diff HEAD~1

# So sánh 1 file cụ thể
git diff HEAD~1 app/admin/page.tsx
```

### Kiểm Tra Status

```bash
# Xem tình trạng hiện tại
git status

# Xem branch hiện tại
git branch

# Xem remote repository
git remote -v
```

---

## 🚨 Xử Lý Conflict

### Nếu gặp conflict khi pull:

```bash
# Bước 1: Git sẽ báo conflict
git pull origin main
# CONFLICT (content): Merge conflict in app/page.tsx

# Bước 2: Xem files bị conflict
git status

# Bước 3: Mở file bị conflict, tìm:
# <<<<<<< HEAD
# (code máy hiện tại)
# =======
# (code từ GitHub)
# >>>>>>> [commit hash]

# Bước 4: Chọn code nào giữ lại, xóa các dòng <<<<, ====, >>>>

# Bước 5: Add và commit
git add .
git commit -m "Merge: Resolved conflict in app/page.tsx"
git push origin main
```

**💡 Tips:** Tránh conflict bằng cách:
- Luôn pull trước khi làm việc
- Push thường xuyên (đừng để quá nhiều changes)
- Không làm cùng 1 file trên 2 máy cùng lúc

---

## 🤖 Workflow Với Claude AI

### Scenario 1: Máy Mới Bắt Đầu Làm

**Bạn:**
```
"Vừa pull code mới từ GitHub.
Đọc CONTEXT.md và git log 5 commits gần nhất để hiểu đã làm gì.
Tóm tắt cho tớ."
```

**Claude sẽ:**
1. Chạy `git log --oneline -5`
2. Đọc CONTEXT.md
3. Đọc TODO.md
4. Tóm tắt những gì đã làm
5. Hỏi bạn muốn làm gì tiếp

---

### Scenario 2: Đang Làm Giữa Chừng

**Bạn:**
```
"Tớ đang làm admin panel.
Show tớ git diff để xem đã thay đổi những gì."
```

**Claude sẽ:**
1. Chạy `git diff`
2. Summarize các thay đổi
3. Đề xuất commit message

---

### Scenario 3: Sẵn Sàng Push

**Bạn:**
```
"Đã xong rồi, chuẩn bị push.
Viết commit message cho tớ với."
```

**Claude sẽ:**
1. Chạy `git status` và `git diff`
2. Tạo commit message chuẩn
3. Run git commands để commit & push

---

## 📋 Quick Reference

### Commands Hàng Ngày

| Task | Command |
|------|---------|
| **Bắt đầu làm việc** | `git pull origin main` |
| **Xem đã làm gì** | `git status` |
| **Xem chi tiết** | `git diff` |
| **Lưu thay đổi** | `git add .` |
| **Commit** | `git commit -m "message"` |
| **Push lên GitHub** | `git push origin main` |
| **Xem lịch sử** | `git log --oneline -10` |
| **Xem commit detail** | `git show` |

---

## ⚙️ One-Click Sync (Optional)

### Tạo file `sync.bat` (Windows):

```batch
@echo off
echo ==========================================
echo    GIT SYNC - Design Resources Website
echo ==========================================
echo.

echo [1/4] Pulling latest changes...
git pull origin main

echo.
echo [2/4] Checking status...
git status

echo.
echo [3/4] Do you want to push changes? (y/n)
set /p push="Enter choice: "

if /i "%push%"=="y" (
    echo.
    echo [4/4] Adding and pushing changes...
    git add .
    set /p message="Enter commit message: "
    git commit -m "%message%"
    git push origin main
    echo.
    echo ✅ Sync complete!
) else (
    echo.
    echo ℹ️  Changes not pushed
)

echo.
pause
```

**Cách dùng:**
- Double-click `sync.bat` khi bắt đầu/kết thúc làm việc
- Tự động pull và hỏi có muốn push không

---

## 🎯 Summary

### Khi Ở Máy Công Ty:
1. `git pull` → code mới nhất
2. Làm việc
3. `git add . && git commit -m "message" && git push`

### Khi Về Máy Cá Nhân:
1. `git pull` → nhận code từ máy công ty
2. Đọc `git log` để hiểu đã làm gì
3. Tiếp tục làm việc
4. Push lại lên GitHub

### Git Là Source of Truth:
- ✅ Code changes → Git history
- ✅ What changed → `git diff`
- ✅ When changed → `git log`
- ✅ Who changed → `git log --author`

### Markdown Files Chỉ Là Summary:
- `CONTEXT.md` → Project overview
- `TODO.md` → Task list only
- `WORKFLOW.md` → Git instructions (file này)

---

**Cập nhật:** 2025-12-29
**Mục đích:** Giúp sync code giữa 2 máy dễ dàng, không bị conflict, dễ hiểu logic

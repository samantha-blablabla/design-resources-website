# 📚 Sync Documentation Folder

**Purpose**: Đồng bộ công việc giữa 2 máy tính (Office & Personal)

## 📁 Files in This Folder

### 1. `SESSION-2025-12-29.md`
**Chi tiết đầy đủ về session hôm nay**:
- ✅ Tasks đã hoàn thành
- 🐛 Bugs đã fix
- 📝 Code changes với line numbers cụ thể
- ⏳ Issues đang pending
- 💡 Notes quan trọng cho session tiếp theo

**👉 ĐỌC FILE NÀY ĐẦU TIÊN khi chuyển máy!**

### 2. `CURRENT-STATE.md`
**Tổng quan tình trạng hiện tại của project**:
- 🎯 Latest changes overview
- 📱 Mobile responsiveness status
- 🏠 Homepage layout structure
- 📁 Key files and their state
- 🔧 Development environment status
- 🚀 Production deployment info
- 🐛 Known issues
- ✅ Testing checklist

### 3. `QUICK-REFERENCE.md`
**Reference nhanh cho commands và configs**:
- 🚀 Most used commands
- 📁 Important files locations
- 🎨 CSS classes reference
- 🔍 Where to find specific code
- 🐛 Common issues & solutions
- 📊 Component props examples

### 4. `README.md`
**File này** - Giải thích folder structure

---

## 🔄 Workflow Khi Chuyển Máy

### Máy 1 (Office) → Máy 2 (Personal)

**Trên Máy 1** (cuối ngày làm việc):
```bash
# Tất cả changes đã được commit và push
git push origin main
# Files trong .sync-docs/ đã được update tự động
```

**Trên Máy 2** (ngày hôm sau):
```bash
# 1. Pull latest code
git pull origin main

# 2. ĐỌC CÁC FILES TRONG FOLDER NÀY
# Đọc theo thứ tự:
# - SESSION-2025-12-29.md (chi tiết session)
# - CURRENT-STATE.md (tổng quan project)
# - QUICK-REFERENCE.md (commands nhanh)

# 3. Start dev server
npm run dev

# 4. Continue working...
```

---

## 📌 Key Principles

1. **GitHub = Source of Truth** - Code chính thức trên GitHub, không phải markdown files
2. **Session Files = Context** - Files này chỉ để hiểu context, không phải để track tasks
3. **Read Before Code** - Luôn đọc session file trước khi code
4. **Update After Big Changes** - Update session file sau mỗi big change hoặc cuối session

---

## 🎯 What This Folder Solves

### ❌ Problem Before
- CONTEXT.md và TODO.md quá dài và khó maintain
- Không biết chính xác changes gì đã làm trên máy kia
- Mất thời gian context switching giữa 2 máy

### ✅ Solution Now
- Session file ngắn gọn, tập trung vào changes mới nhất
- Chi tiết line numbers, code snippets, reasons
- Quick reference cho commands thường dùng
- Clear testing checklist

---

## 📊 Khi Nào Update Files?

### `SESSION-{date}.md`
- Cuối mỗi session làm việc
- Sau khi deploy production
- Khi có breaking changes
- Khi fix được một bug quan trọng

### `CURRENT-STATE.md`
- Sau major features complete
- Khi project structure thay đổi
- Sau refactoring lớn

### `QUICK-REFERENCE.md`
- Khi thêm CSS classes mới
- Khi component props thay đổi
- Khi có new commands hữu ích

---

## 🔐 Git Rules for This Folder

- ✅ **COMMIT** files này cùng với code changes
- ✅ **PUSH** lên GitHub để sync
- ✅ **PULL** khi chuyển máy
- ❌ **DON'T** manually merge conflicts - always take latest version
- ❌ **DON'T** delete old session files (keep for history)

---

## 💡 Tips

1. **Bookmark this folder** trong VSCode Explorer
2. **Đọc QUICK-REFERENCE.md** khi quên commands
3. **Đọc SESSION file** khi quên làm gì session trước
4. **Update SESSION file** trước khi tắt máy
5. **Tạo session file mới** mỗi ngày làm việc mới

---

## 📞 Example Workflow

### Scenario: Chuyển từ Office (Máy 1) sang Personal (Máy 2)

**Trên Office Computer (cuối ngày)**:
```bash
# 1. All work done and committed
git add .
git commit -m "Fix: Video card mobile optimization"
git push origin main

# 2. Session file đã được tạo trong .sync-docs/
# 3. Đóng máy, về nhà
```

**Trên Personal Computer (sáng hôm sau)**:
```bash
# 1. Open terminal
cd "c:\Users\Admin\OneDrive\Máy tính\WebForDesign"

# 2. Pull latest
git pull origin main

# 3. Đọc session file
# Open: .sync-docs/SESSION-2025-12-29.md
# Đọc để hiểu:
# - Tasks nào đã done
# - Issues nào đang pending
# - Code changes ở đâu
# - Testing checklist

# 4. Start dev server
npm run dev

# 5. Verify production nếu có pending issues
# Open: https://design-resources-website.vercel.app/videos

# 6. Continue với tasks mới
```

---

## 🎉 Benefits

- ⚡ **Faster context switching** - Không mất thời gian nhớ lại
- 📝 **Clear documentation** - Biết chính xác làm gì
- 🐛 **Easier debugging** - Có line numbers và reasons
- ✅ **Better testing** - Có checklist rõ ràng
- 🔄 **Smooth collaboration** - Giữa 2 máy của cùng 1 người

---

**Created**: December 29, 2025
**Purpose**: 2-Computer Development Workflow Sync
**Location**: `.sync-docs/` trong project root

---

Chúc ngủ ngon! Ngày mai đọc files này là hiểu hết rồi 🌙

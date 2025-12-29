# 🚀 Hướng Dẫn Cài Đặt Node.js

## ⚠️ Vấn Đề Hiện Tại

Bạn đang gặp lỗi khi chạy `npm run dev` vì **Node.js chưa được cài đặt** trên máy tính.

**Lỗi:**
```
npm : The term 'npm' is not recognized as the name of a cmdlet, function, script file, or operable program.
```

---

## ✅ Giải Pháp: Cài Đặt Node.js

### Bước 1: Tải Node.js

1. Truy cập: **https://nodejs.org**
2. Tải phiên bản **LTS** (Long Term Support) - Khuyến nghị
   - Hoặc: Tải trực tiếp tại https://nodejs.org/dist/v20.11.0/node-v20.11.0-x64.msi

![Download Node.js](https://nodejs.org/static/images/logo.svg)

---

### Bước 2: Cài Đặt Node.js

1. Mở file `.msi` vừa tải về
2. Click **Next** → **I accept** → **Next**
3. ✅ **Quan trọng:** Chọn "Automatically install the necessary tools"
4. Click **Next** → **Install**
5. Đợi cài đặt hoàn tất (1-2 phút)
6. Click **Finish**

---

### Bước 3: Khởi Động Lại PowerShell

**QUAN TRỌNG:** Phải đóng và mở lại PowerShell để Node.js được nhận diện!

1. Đóng tất cả cửa sổ PowerShell/Terminal hiện tại
2. Mở PowerShell mới
3. Chạy lệnh kiểm tra:

```powershell
node --version
npm --version
```

**Kết quả mong đợi:**
```
v20.11.0  (hoặc tương tự)
10.2.4    (hoặc tương tự)
```

---

### Bước 4: Cài Đặt Dependencies

Vào thư mục project và cài đặt packages:

```powershell
cd "c:\Users\Admin\OneDrive\Máy tính\WebForDesign"
npm install
```

Đợi khoảng 1-2 phút cho npm tải và cài đặt tất cả packages.

---

### Bước 5: Chạy Dev Server

```powershell
npm run dev
```

**Kết quả mong đợi:**
```
> webfordesign@0.1.0 dev
> next dev

  ▲ Next.js 15.1.4
  - Local:        http://localhost:3000

 ✓ Starting...
 ✓ Ready in 2.3s
```

---

### Bước 6: Mở Website

Mở browser và truy cập: **http://localhost:3000**

Bạn sẽ thấy website chạy trên máy tính của mình! 🎉

---

## 🎯 Tóm Tắt Nhanh

```powershell
# 1. Tải và cài Node.js từ https://nodejs.org

# 2. Đóng và mở lại PowerShell

# 3. Kiểm tra
node --version
npm --version

# 4. Vào thư mục project
cd "c:\Users\Admin\OneDrive\Máy tính\WebForDesign"

# 5. Cài dependencies
npm install

# 6. Chạy dev server
npm run dev

# 7. Mở browser: http://localhost:3000
```

---

## 📌 Lưu Ý

### ✅ Website Vẫn Chạy Trên Vercel!

Dù chưa cài Node.js, website của bạn **VẪN ĐANG LIVE** tại:
- **https://design-resources-website.vercel.app**

Cài Node.js chỉ để:
- Chạy website trên **máy tính** (localhost)
- **Test thay đổi** trước khi push lên Vercel
- **Phát triển** website dễ dàng hơn

### 🔄 Workflow Sau Khi Cài Node.js

```
1. Chỉnh code trên máy tính 💻
   ↓
2. npm run dev → Test tại localhost:3000 🧪
   ↓
3. OK rồi → Chạy push.bat 📤
   ↓
4. Vercel tự động deploy ✨
   ↓
5. Website live sau 2-3 phút 🚀
```

---

## 🆘 Xử Lý Lỗi

### Lỗi: "npm not recognized" sau khi cài Node.js

**Nguyên nhân:** Chưa restart PowerShell

**Giải pháp:**
1. Đóng **TẤT CẢ** cửa sổ PowerShell/Terminal
2. Mở PowerShell mới
3. Thử lại `node --version`

---

### Lỗi: "ENOENT: no such file or directory"

**Nguyên nhân:** Đang ở sai thư mục

**Giải pháp:**
```powershell
cd "c:\Users\Admin\OneDrive\Máy tính\WebForDesign"
npm install
```

---

### Lỗi: Port 3000 đã bị chiếm

**Giải pháp:**
```powershell
# Next.js sẽ tự động chuyển sang port 3001
# Hoặc dừng process đang dùng port 3000:
npx kill-port 3000
npm run dev
```

---

## ✅ Checklist

- [ ] Tải Node.js LTS từ https://nodejs.org
- [ ] Cài đặt Node.js (chọn "install necessary tools")
- [ ] Đóng và mở lại PowerShell
- [ ] Chạy `node --version` để kiểm tra
- [ ] Vào thư mục project
- [ ] Chạy `npm install`
- [ ] Chạy `npm run dev`
- [ ] Mở http://localhost:3000

---

**Sau khi hoàn tất, bạn sẽ có thể chỉnh UI và xem kết quả ngay lập tức!** 🎨✨

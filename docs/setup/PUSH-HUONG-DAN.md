# 🚀 HƯỚNG DẪN PUSH CODE LÊN GITHUB

## ✅ Repository đã có: 
https://github.com/samantha-blablabla/design-resources-website

---

## 🔧 CÁCH 1: Chạy File Batch (DỄ NHẤT)

1. Mở File Explorer
2. Vào thư mục: `c:\Users\Admin\OneDrive\Máy tính\WebForDesign`
3. **Double-click** file `push.bat`
4. Đợi cho đến khi thấy "THANH CONG!"

✅ Xong! Code đã lên GitHub.

---

## 🔧 CÁCH 2: Restart PowerShell Và Chạy Lại

### Bước 1: Đóng PowerShell hiện tại

### Bước 2: Mở PowerShell MỚI
- Nhấn `Windows + X`
- Chọn "Windows PowerShell" hoặc "Terminal"

### Bước 3: Chạy các lệnh sau:

```powershell
cd "c:\Users\Admin\OneDrive\Máy tính\WebForDesign"

# Xóa remote cũ
git remote remove origin

# Thêm remote đúng
git remote add origin https://github.com/samantha-blablabla/design-resources-website.git

# Đổi branch thành main
git branch -M main

# Push lên GitHub
git push -u origin main
```

---

## 🔧 CÁCH 3: Dùng GitHub Desktop (TIỆN NHẤT)

### Tải GitHub Desktop:
1. Vào: https://desktop.github.com/
2. Tải và cài đặt
3. Đăng nhập GitHub

### Push code:
1. File → Add Local Repository
2. Chọn thư mục: `c:\Users\Admin\OneDrive\Máy tính\WebForDesign`
3. Click "Publish repository"
4. Chọn repository: `design-resources-website`
5. Click "Push origin"

✅ Xong!

---

## ❓ Nếu Yêu Cầu Đăng Nhập

Khi push lần đầu, GitHub sẽ hỏi đăng nhập:

### Dùng GitHub Credential Manager (Tự động)
- Nhập username: `samantha-blablabla`
- Nhập password hoặc Personal Access Token

### Lấy Personal Access Token:
1. Vào: https://github.com/settings/tokens
2. Generate new token (classic)
3. Chọn quyền **repo**
4. Copy token và dùng làm password

---

## ✅ SAU KHI PUSH THÀNH CÔNG

Repository của bạn đã sẵn sàng tại:
```
https://github.com/samantha-blablabla/design-resources-website
```

### Bước tiếp theo:
1. 🚀 **Deploy lên Vercel**
   - Vào: https://vercel.com/new
   - Import từ GitHub
   - Chọn repository `design-resources-website`
   - Add biến môi trường (SUPABASE_URL, SUPABASE_ANON_KEY)
   - Deploy!

2. 📱 **Chia sẻ với người khác**
   - Share link GitHub repository
   - Hoặc share link Vercel sau khi deploy

3. 🔄 **Update code sau này**
   ```powershell
   git add .
   git commit -m "Update: mô tả thay đổi"
   git push
   ```

---

## 🆘 Troubleshooting

### "Git không được nhận dạng"
→ Restart PowerShell hoặc dùng file `push.bat`

### "Authentication failed"
→ Dùng Personal Access Token thay vì password

### "Repository không tồn tại"
→ Kiểm tra lại URL: https://github.com/samantha-blablabla/design-resources-website

---

**💡 TIP:** Cách dễ nhất là dùng file `push.bat` - chỉ cần double-click!

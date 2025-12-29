# Hướng Dẫn Sửa Lỗi Git Push Nhanh

## Cách 1: Chạy Script Tự Động (KHUYÊN DÙNG)

Trong terminal PowerShell đã chạy Git thành công:

```powershell
cd "c:\Users\Admin\OneDrive\Máy tính\WebForDesign"
.\push-to-github.ps1
```

Script sẽ tự động:
- ✅ Xóa remote cũ (có YOUR_USERNAME)
- ✅ Hỏi username GitHub của bạn
- ✅ Thêm remote đúng
- ✅ Đổi branch thành main
- ✅ Push lên GitHub

## Cách 2: Chạy Từng Lệnh Thủ Công

### Bước 1: Xóa remote cũ
```powershell
git remote remove origin
```

### Bước 2: Thêm remote với username THẬT của bạn
```powershell
# Thay YOUR_REAL_USERNAME bằng username GitHub thật
git remote add origin https://github.com/YOUR_REAL_USERNAME/design-resources-website.git
```

### Bước 3: Đổi tên branch thành main
```powershell
git branch -M main
```

### Bước 4: Push lên GitHub
```powershell
git push -u origin main
```

## ❓ Nếu Chưa Tạo Repository Trên GitHub

1. Vào: https://github.com/new
2. Repository name: `design-resources-website`
3. Chọn **Public** hoặc **Private**
4. **KHÔNG tick** "Add a README file"
5. Click **Create repository**

Sau đó chạy lại script hoặc các lệnh ở trên.

## 🔐 Nếu Yêu Cầu Đăng Nhập

GitHub sẽ yêu cầu xác thực. Bạn có 2 options:

### Option 1: Personal Access Token
1. Vào: https://github.com/settings/tokens
2. Generate new token (classic)
3. Chọn quyền **repo**
4. Copy token
5. Khi push, dùng token làm password

### Option 2: GitHub CLI (Dễ hơn)
```powershell
# Cài GitHub CLI
winget install --id GitHub.cli

# Đăng nhập
gh auth login
```

## ✅ Sau Khi Push Thành Công

Repository của bạn sẽ ở:
```
https://github.com/YOUR_USERNAME/design-resources-website
```

Bạn có thể:
- 🚀 Deploy lên Vercel từ GitHub
- 👥 Share code với người khác
- 💾 Backup code an toàn
- 🔄 Sync giữa nhiều máy

## 📝 Lưu Ý

⚠️ File `.env.local` sẽ KHÔNG được push (đã ignore)
⚠️ Folder `node_modules` sẽ KHÔNG được push (đã ignore)
✅ Các file quan trọng đã được commit

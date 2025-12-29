# Script Sửa Lỗi Git và Push Lên GitHub
# Chạy trong PowerShell đã có Git

# Bước 1: Xóa remote cũ (có YOUR_USERNAME)
git remote remove origin

# Bước 2: Hỏi username GitHub
Write-Host "Nhập GitHub username của bạn:" -ForegroundColor Yellow
$username = Read-Host

# Bước 3: Thêm remote với username thật
git remote add origin "https://github.com/$username/design-resources-website.git"

# Bước 4: Kiểm tra branch hiện tại
$currentBranch = git branch --show-current
Write-Host "Branch hiện tại: $currentBranch" -ForegroundColor Cyan

# Bước 5: Đổi tên branch thành main (nếu cần)
if ($currentBranch -ne "main") {
    Write-Host "Đang đổi tên branch thành 'main'..." -ForegroundColor Yellow
    git branch -M main
}

# Bước 6: Push lên GitHub
Write-Host "Đang push lên GitHub..." -ForegroundColor Yellow
git push -u origin main

# Bước 7: Hiển thị kết quả
if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ THÀNH CÔNG! Code đã được push lên GitHub" -ForegroundColor Green
    Write-Host "Repository URL: https://github.com/$username/design-resources-website" -ForegroundColor Cyan
} else {
    Write-Host "`n❌ Có lỗi xảy ra. Vui lòng kiểm tra lại." -ForegroundColor Red
}

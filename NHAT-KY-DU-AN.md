# 📔 Nhật Ký Dự Án: Design Resources Website

Dưới đây là tổng hợp toàn bộ các bước thực hiện từ khi bắt đầu dự án đến thời điểm hiện tại.

---

## 📅 Lịch Sử Thực Hiện

### 1. Khởi Tạo & Cấu Trúc Dự Án
- **Khởi tạo**: Xây dựng dự án bằng Next.js (App Router).
- **Trang chính**: Thiết lập các trang Home, Resources, Inspiration, và Tips & Tricks.
- **Phong cách**: Sử dụng Vanilla CSS với hệ thống biến (variables) hiện đại, lấy cảm hứng từ tools.design.

### 2. Tích Hợp Supabase (Database)
- **Cấu hình Client**: Tạo `lib/supabase.ts` để kết nối với Supabase.
- **TypeScript**: Định nghĩa Types cho các bảng dữ liệu (`Resource`, `Inspiration`, `Video`).
- **Database Schema**: Thiết lập các bảng `resources`, `inspirations`, và `videos` trên Supabase.
- **Dữ liệu**: Cài đặt cơ chế tự động hiển thị dữ liệu mẫu (dummy data) nếu kết nối database bị trống hoặc lỗi.

### 3. Tái Cấu Trúc Thành Phần (UI Refactoring)
- **Thiết kế**: Chuyển các component hiển thị vào thư mục `components/ui/` (`Card.tsx`, `VideoCard.tsx`).
- **Nguyên tắc**: Tách biệt logic fetch data (Page) và logic hiển thị (Component/UI) để dễ bảo trì.

### 4. Xây Dựng Edge Function (AI Scraper)
- **Tự động hóa**: Tạo Supabase Edge Function `fetch-resources` để lấy dữ liệu từ `bookmarks.design`.
- **AI Phân Loại**: Tích hợp OpenAI GPT-4o-mini để tự động gắn thẻ (tags), đặt emoji và viết mô tả cho tài nguyên.
- **Chống trùng lặp**: Xây dựng cơ chế chuẩn hóa URL và kiểm tra trùng lặp trước khi lưu vào database.
- **Cron Job**: Thiết lập lịch chạy tự động mỗi 3 ngày một lần.

### 5. Triển Khai Lên Vercel (Deployment)
- **Deploy**: Kết nối GitHub với Vercel để website chạy online.
- **Fix lỗi Build**:
    - Tự động cấu hình Biến môi trường (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
    - Chỉnh sửa Framework Preset từ "Other" sang **Next.js**.
- **Kết quả**: Website đã LIVE tại [design-resources-website.vercel.app](https://design-resources-website.vercel.app).

### 6. Tùy Chỉnh UI & Sửa Lỗi Môi Trường Local
- **Font chữ**: Cập nhật font **Plus Jakarta Sans** từ Google Fonts cho toàn bộ trang web.
- **Lỗi PowerShell**: Sửa chính sách thực thi (`Execution Policy`) trên Windows để chạy được các lệnh npm.
- **Node.js**: Phát hiện máy chưa cài Node.js và tạo hướng dẫn cài đặt chi tiết để chạy server localhost.
- **Tự động hóa local**: Tạo file `start-dev.bat` để tự động hóa việc cài đặt và chạy server chỉ bằng 1 cú click.

### 7. Hệ Thống Tài Liệu (Documentation)
Đã tạo các file hướng dẫn chi tiết tiếng Việt:
- **HUONG-DAN-SUPABASE.md**: Cách cài đặt database.
- **HUONG-DAN-TUY-CHINH-UI.md**: Cách đổi màu, font, layout.
- **HUONG-DAN-CAI-NODE.md**: Cách cài đặt môi trường chạy code.
- **edge_function_deployment.md**: Cách deploy AI scraper.

---

## 🏁 Trạng Thái Cuối Cùng

- **Tình trạng website**: ✅ **Đã Live & Hoạt động tốt**.
- **Local Dev**: ✅ Đã có công cụ tự động chạy (`start-dev.bat`).
- **Giao diện**: ✅ Đã cập nhật font mới và layout chuẩn.

---

## 🕒 Thời Gian Kiểm Tra Cuối Cùng
- **Ngày**: 28 tháng 12 năm 2025
- **Giờ**: 17:25:45 (Giờ Việt Nam)

---
*Dự án đã sẵn sàng để bạn tiếp tục tùy chỉnh và phát triển thêm!* 🚀

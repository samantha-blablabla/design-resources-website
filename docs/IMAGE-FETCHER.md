# 🖼️ Automatic Image Fetcher

## Tổng quan

Hệ thống tự động lấy ảnh cho các resources không có thumbnail từ RSS feeds. Giải pháp này giúp website hiển thị preview images cho tất cả content, kể cả khi nguồn RSS không cung cấp.

## Cách hoạt động

### 1. Chiến lược tự động lấy ảnh (Smart Image Fetching)

Khi fetch RSS feed, hệ thống sẽ tự động thử các phương pháp sau theo thứ tự:

1. **RSS Media Tags** - Ưu tiên lấy từ RSS feed nếu có
   - `media:content`
   - `media:thumbnail`
   - `enclosure`

2. **Open Graph Image** - Scrape từ URL của resource
   - `og:image` meta tag
   - `twitter:image` meta tag
   - Ảnh đầu tiên trong content

3. **Screenshot Service** - Fallback cuối cùng
   - Sử dụng thum.io API
   - Tự động chụp screenshot trang web
   - Không cần API key

### 2. Các file liên quan

#### `lib/image-fetcher.ts` (MỚI)
```typescript
// Lấy Open Graph image từ URL
fetchOGImage(url: string): Promise<string | null>

// Tạo screenshot URL
getScreenshotUrl(url: string, width?: number, height?: number): string

// Smart fetcher - thử OG trước, screenshot sau
fetchSmartImage(url: string, topic?: string): Promise<string | null>

// Batch processing cho nhiều URLs
batchFetchImages(urls: string[], delayMs?: number): Promise<Map<string, string | null>>
```

#### `lib/rss-fetcher.ts` (CẬP NHẬT)
- Thêm parameter `autoFetchImages: boolean = true`
- Tự động gọi `fetchSmartImage()` nếu RSS không có ảnh
- Delay 500ms giữa mỗi request để tránh rate limiting

#### `components/ui/Card.tsx` (CẬP NHẬT)
- Support `imageUrl` prop
- Hiển thị ảnh real với emoji overlay góc phải dưới
- Fallback về gradient + emoji center nếu không có ảnh

#### `app/api/cron/daily-update/route.ts` (CẬP NHẬT)
- Lưu `image_url` vào database cho resources

#### `supabase/migrations/004_add_image_url_to_resources.sql` (MỚI)
- Thêm column `image_url` vào bảng `resources`

## Cách sử dụng

### Tự động (Recommended)

Mặc định, tính năng đã được bật trong cron job. Mỗi ngày lúc 9am, automation sẽ:

1. Fetch RSS feeds
2. Tự động lấy ảnh cho items không có thumbnail
3. Lưu vào Supabase với `image_url`

### Thủ công

```typescript
import { fetchSmartImage } from '@/lib/image-fetcher';

// Lấy ảnh cho 1 URL
const imageUrl = await fetchSmartImage('https://example.com');

// Tắt auto fetch cho RSS feed cụ thể
const items = await fetchRSSFeed(url, name, false); // autoFetchImages = false
```

### Test API

```bash
# Test image fetcher với URL bất kỳ
curl "http://localhost:3000/api/test-image-fetcher?url=https://producthunt.com/posts/figma"
```

Response:
```json
{
  "success": true,
  "url": "https://producthunt.com/posts/figma",
  "results": {
    "openGraphImage": "https://ph-files.imgix.net/...",
    "screenshotUrl": "https://image.thum.io/get/width/1200/crop/630/https://producthunt.com/posts/figma",
    "smartImage": "https://ph-files.imgix.net/...",
    "recommended": "https://ph-files.imgix.net/..."
  }
}
```

## Screenshot Services (Free tier)

Hệ thống hiện dùng **thum.io** (không cần API key):

```typescript
https://image.thum.io/get/width/1200/crop/630/{URL}
```

### Các service thay thế (nếu cần)

1. **ApiFlash** - 100 screenshots/month
   - https://apiflash.com

2. **ScreenshotAPI** - 100 screenshots/month
   - https://screenshotapi.net

3. **ScreenshotMachine** - 100 screenshots/month
   - https://screenshotmachine.com

## Rate Limiting

- Delay 500ms giữa mỗi request tự động lấy ảnh
- Limit 10 resources per cron run
- Avoid hitting rate limits của screenshot services

## Hiển thị trên UI

Cards sẽ tự động hiển thị:

- ✅ **Real image** nếu có `image_url` hoặc `thumbnail_url`
  - Ảnh full cover với emoji overlay góc phải dưới

- 🎨 **Gradient + emoji** nếu không có ảnh
  - Gradient pastel với emoji center (như cũ)

## Database Schema

```sql
-- Table: resources
ALTER TABLE resources
ADD COLUMN image_url TEXT;

-- Các table khác đã có sẵn
inspirations.image_url  -- Behance images
videos.thumbnail_url    -- YouTube thumbnails
articles                -- Không có images (dùng gradient)
```

## Lưu ý

1. **Next.js Image Config** - Đã cấu hình cho phép external images:
```javascript
// next.config.js
images: {
  remotePatterns: [{ protocol: 'https', hostname: '**' }],
  unoptimized: true,
}
```

2. **Performance** - Auto fetch có thể làm chậm cron job
   - Chỉ fetch cho 10 items/run
   - Có thể tắt bằng cách set `autoFetchImages: false`

3. **Cheerio dependency** - Đã cài đặt để parse HTML:
```bash
npm install cheerio
```

## Testing

1. **Chạy migration mới**:
```sql
-- Trong Supabase SQL Editor
-- Copy nội dung từ: supabase/migrations/004_add_image_url_to_resources.sql
```

2. **Test local**:
```bash
npm run dev
curl "http://localhost:3000/api/test-image-fetcher?url=https://producthunt.com"
```

3. **Test cron job**:
```bash
curl http://localhost:3000/api/cron/daily-update \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

## Kết quả

Sau khi implement:

- ✅ Product Hunt resources sẽ có ảnh preview
- ✅ Medium articles sẽ có featured images
- ✅ Behance inspirations đã có ảnh sẵn
- ✅ YouTube videos đã có thumbnails sẵn

Website trông professional hơn với preview images cho tất cả content! 🎉

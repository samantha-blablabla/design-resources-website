# 🚀 Hướng dẫn chạy SQL Migration

## Bước 1: Mở Supabase SQL Editor

Truy cập: https://supabase.com/dashboard/project/kmzcbwiqlfdcrqqndglm/sql/new

## Bước 2: Copy và Paste SQL này

```sql
-- Thêm các cột mới cho video metadata
ALTER TABLE resources
ADD COLUMN IF NOT EXISTS channel_name TEXT,
ADD COLUMN IF NOT EXISTS thumbnail_url TEXT,
ADD COLUMN IF NOT EXISTS published_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS duration TEXT;

-- Tạo indexes để tăng tốc queries
CREATE INDEX IF NOT EXISTS idx_resources_channel_name ON resources(channel_name);
CREATE INDEX IF NOT EXISTS idx_resources_published_at ON resources(published_at);

-- Thêm comments để ghi chú
COMMENT ON COLUMN resources.channel_name IS 'YouTube channel name';
COMMENT ON COLUMN resources.thumbnail_url IS 'YouTube thumbnail URL';
COMMENT ON COLUMN resources.published_at IS 'Original publish date from YouTube';
COMMENT ON COLUMN resources.duration IS 'Video duration (MM:SS or H:MM:SS)';
```

## Bước 3: Nhấn RUN (hoặc Ctrl+Enter)

Bạn sẽ thấy thông báo: **Success. No rows returned**

## Bước 4: Kiểm tra migration thành công

Chạy query này để xác nhận:

```sql
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'resources'
  AND column_name IN ('channel_name', 'thumbnail_url', 'published_at', 'duration');
```

Kết quả mong đợi (4 dòng):

| column_name    | data_type                   |
|----------------|-----------------------------|
| channel_name   | text                        |
| thumbnail_url  | text                        |
| published_at   | timestamp with time zone    |
| duration       | text                        |

## ✅ Xong rồi!

Sau khi chạy xong SQL, quay lại terminal và chạy:

```bash
npx tsx scripts/fetch-youtube-videos.ts
```

Script này sẽ fetch videos từ **13 YouTube channels**:
- UI/UX: The Futur, DesignCourse, Flux Academy, Jesse Showalter, Charli Marie, DesignWithArash, Optimistic Web
- Motion: Motion Design School, School of Motion, SonduckFilm, Dope Motions
- 3D: Josh - Blender Bros, Ryuu - Blender Bros

Mỗi video sẽ có đầy đủ: thumbnail, channel name, publish date, duration!

# 🤖 Automation & Data Crawling Plan

## 📋 Tổng Quan

Website sẽ tự động cập nhật nội dung hằng ngày từ nhiều nguồn khác nhau, sử dụng Supabase làm database chính và AI để phân loại/tối ưu dữ liệu.

---

## 🗄️ Supabase Database Schema

### Table 1: `resources`
```sql
CREATE TABLE resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  url TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL, -- 'ui-kits', 'icons', 'illustrations', 'photos', etc.
  tags TEXT[], -- Array of tags
  pricing TEXT, -- 'Free', 'Freemium', 'Premium', 'Free Trial'
  emoji TEXT,
  gradient TEXT,
  source TEXT, -- 'producthunt', 'undesign', 'manual'
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  last_crawled TIMESTAMPTZ
);

-- Indexes for performance
CREATE INDEX idx_resources_category ON resources(category);
CREATE INDEX idx_resources_featured ON resources(featured);
CREATE INDEX idx_resources_created_at ON resources(created_at DESC);
```

### Table 2: `inspirations`
```sql
CREATE TABLE inspirations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  source_url TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL, -- 'web', 'mobile', 'dashboard', 'branding', 'illustration'
  tags TEXT[],
  emoji TEXT,
  gradient TEXT,
  source TEXT, -- 'bookmarks.design', 'dribbble', 'behance', 'awwwards'
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  last_crawled TIMESTAMPTZ
);

CREATE INDEX idx_inspirations_category ON inspirations(category);
CREATE INDEX idx_inspirations_created_at ON inspirations(created_at DESC);
```

### Table 3: `videos`
```sql
CREATE TABLE videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  youtube_id TEXT NOT NULL UNIQUE,
  url TEXT NOT NULL,
  channel_name TEXT,
  channel_id TEXT,
  category TEXT NOT NULL, -- 'fundamentals', 'tools', 'ui-ux', 'web', 'advanced'
  duration TEXT, -- '12:34' format
  thumbnail_url TEXT,
  emoji TEXT,
  gradient TEXT,
  view_count INTEGER,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  last_crawled TIMESTAMPTZ
);

CREATE INDEX idx_videos_category ON videos(category);
CREATE INDEX idx_videos_published_at ON videos(published_at DESC);
```

### Table 4: `articles`
```sql
CREATE TABLE articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  url TEXT NOT NULL UNIQUE,
  author TEXT,
  source TEXT, -- 'Medium', 'Smashing Magazine', etc.
  category TEXT,
  tags TEXT[],
  emoji TEXT,
  gradient TEXT,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  last_crawled TIMESTAMPTZ
);

CREATE INDEX idx_articles_created_at ON articles(created_at DESC);
```

### Table 5: `crawl_logs`
```sql
CREATE TABLE crawl_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source TEXT NOT NULL, -- 'bookmarks.design', 'youtube:figma', etc.
  table_name TEXT NOT NULL, -- 'resources', 'inspirations', 'videos', 'articles'
  status TEXT NOT NULL, -- 'success', 'failed', 'partial'
  items_added INTEGER DEFAULT 0,
  items_updated INTEGER DEFAULT 0,
  error_message TEXT,
  started_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ
);

CREATE INDEX idx_crawl_logs_source ON crawl_logs(source);
CREATE INDEX idx_crawl_logs_started_at ON crawl_logs(started_at DESC);
```

---

## 🕷️ Crawling Strategy

### 1. Design Inspiration (bookmarks.design, Dribbble, Behance)

**Tần suất:** 3 lần/ngày (8:00, 14:00, 20:00)

**Dữ liệu cần crawl:**
- Title
- Image URL
- Source URL
- Category (tự động phân loại bằng AI)
- Tags

**Công cụ:**
- Puppeteer/Playwright cho dynamic content
- Cheerio cho static HTML
- OpenAI API để phân loại category & generate description

**Flow:**
```
1. Crawl website → Extract raw data
2. Check duplicate (by URL) trong Supabase
3. Nếu mới → AI phân loại category + generate description
4. AI chọn emoji + gradient phù hợp
5. Insert vào Supabase
6. Log vào crawl_logs
```

### 2. YouTube Videos

**Tần suất:** 2 lần/ngày (10:00, 18:00)

**Kênh ưu tiên:**
- Figma, DesignCourse, Flux Academy, The Futur, Jesse Showalter

**API:** YouTube Data API v3

**Dữ liệu cần crawl:**
- Video title, description
- Video ID, URL
- Channel name, ID
- Duration, thumbnail
- View count, publish date

**Flow:**
```
1. Gọi YouTube API với channel IDs
2. Lấy videos mới nhất (published trong 7 ngày qua)
3. Check duplicate by youtube_id
4. AI phân loại category (fundamentals, tools, ui-ux, etc.)
5. AI chọn emoji + gradient
6. Insert vào Supabase
```

### 3. Design Resources (Product Hunt, Undesign)

**Tần suất:** 1 lần/ngày (9:00)

**Dữ liệu cần crawl:**
- Tool/resource name
- Description
- URL
- Pricing (Free/Premium/Freemium)
- Category

**API:**
- Product Hunt API (có official API)
- Web scraping cho các site khác

### 4. Articles (Medium, Smashing Magazine)

**Tần suất:** 1 lần/ngày (11:00)

**Dữ liệu cần crawl:**
- Title, description
- Author, source
- URL, publish date
- Tags

---

## 🤖 AI Automation Tasks

### 1. Auto-Categorization
```typescript
// Sử dụng OpenAI để phân loại
const categorizeContent = async (title: string, description: string) => {
  const prompt = `
  Phân loại nội dung design này vào 1 trong các category:
  - ui-kits, icons, illustrations, photos, typography, colors
  - design-tools, ai, accessibility, prototyping
  - patterns, courses, articles

  Title: ${title}
  Description: ${description}

  Trả về JSON: { "category": "...", "tags": ["tag1", "tag2"] }
  `;

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }]
  });

  return JSON.parse(response.choices[0].message.content);
};
```

### 2. Auto-Generate Description
```typescript
// Tối ưu description cho SEO
const generateDescription = async (title: string, rawContent: string) => {
  const prompt = `
  Viết mô tả ngắn gọn (1-2 câu, max 150 chars) cho design resource này:
  Title: ${title}
  Content: ${rawContent}

  Mô tả phải hấp dẫn, rõ ràng, và SEO-friendly.
  `;

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }]
  });

  return response.choices[0].message.content;
};
```

### 3. Auto-Select Emoji & Gradient
```typescript
const selectEmojiAndGradient = async (category: string, title: string) => {
  const gradients = {
    'ui-kits': 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    'icons': 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)',
    'illustrations': 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)',
    // ... more gradients
  };

  const emojis = {
    'ui-kits': '🎨',
    'icons': '⭐',
    'illustrations': '🎭',
    // ... more emojis
  };

  return {
    emoji: emojis[category] || '✨',
    gradient: gradients[category] || 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
  };
};
```

---

## ⏰ Cron Jobs Schedule (Using Vercel Cron hoặc Supabase Edge Functions)

```javascript
// vercel.json
{
  "crons": [
    {
      "path": "/api/cron/crawl-inspirations",
      "schedule": "0 8,14,20 * * *" // 3 lần/ngày: 8am, 2pm, 8pm
    },
    {
      "path": "/api/cron/crawl-youtube",
      "schedule": "0 10,18 * * *" // 2 lần/ngày: 10am, 6pm
    },
    {
      "path": "/api/cron/crawl-resources",
      "schedule": "0 9 * * *" // 1 lần/ngày: 9am
    },
    {
      "path": "/api/cron/crawl-articles",
      "schedule": "0 11 * * *" // 1 lần/ngày: 11am
    },
    {
      "path": "/api/cron/cleanup-old-data",
      "schedule": "0 2 * * 0" // 1 lần/tuần: Chủ nhật 2am - xóa data cũ >6 tháng
    }
  ]
}
```

---

## 🛠️ Tech Stack cho Automation

### Backend (API Routes in Next.js)
```
/api/cron/
  ├── crawl-inspirations.ts    // Crawl bookmarks.design, Dribbble, etc.
  ├── crawl-youtube.ts          // Crawl YouTube videos
  ├── crawl-resources.ts        // Crawl Product Hunt, Undesign
  ├── crawl-articles.ts         // Crawl Medium, Smashing Magazine
  └── cleanup-old-data.ts       // Dọn dẹp data cũ
```

### Dependencies cần thêm
```json
{
  "dependencies": {
    "cheerio": "^1.0.0",           // HTML parsing
    "puppeteer": "^21.0.0",        // Dynamic content crawling
    "axios": "^1.6.0",             // HTTP requests
    "openai": "^4.20.0",           // AI categorization
    "youtube-transcript": "^1.0.6" // YouTube transcripts (optional)
  }
}
```

---

## 📊 Dashboard để Monitor Crawling

Tạo admin page tại `/admin` để:
- Xem crawl logs realtime
- Trigger manual crawl
- Xem stats: số items mới/ngày, success rate
- Approve/reject auto-generated content

---

## 🚀 Implementation Phases

### Phase 1: Setup Database (Week 1)
- [ ] Tạo Supabase tables
- [ ] Setup Row Level Security (RLS)
- [ ] Tạo API helpers

### Phase 2: Crawlers (Week 2-3)
- [ ] Implement bookmarks.design crawler
- [ ] Implement YouTube crawler với API
- [ ] Implement Product Hunt crawler
- [ ] Test & refine

### Phase 3: AI Integration (Week 4)
- [ ] Setup OpenAI API
- [ ] Auto-categorization
- [ ] Auto-description generation
- [ ] Auto emoji/gradient selection

### Phase 4: Automation (Week 5)
- [ ] Setup Vercel Cron Jobs
- [ ] Implement error handling & retry logic
- [ ] Setup email alerts cho failed crawls
- [ ] Create admin dashboard

### Phase 5: Monitoring & Optimization (Week 6)
- [ ] Monitor performance
- [ ] Optimize crawl speed
- [ ] Add rate limiting
- [ ] A/B test AI prompts

---

## 💰 Cost Estimation (Monthly)

- **Supabase**: Free tier (up to 500MB database)
- **OpenAI API**: ~$20-50/month (phụ thuộc số lượng items)
- **YouTube API**: Free (10,000 quota/day)
- **Vercel Cron**: Free (included in Hobby plan)

**Total: ~$20-50/month**

---

## ⚠️ Considerations

1. **Rate Limiting**: Tránh bị block bởi websites
   - Thêm delays giữa requests
   - Rotate user agents
   - Respect robots.txt

2. **Duplicate Detection**: Check URL uniqueness trước khi insert

3. **Data Quality**:
   - AI có thể sai category → cần manual review
   - Tạo admin interface để approve/reject

4. **Legal**:
   - Chỉ crawl public data
   - Respect copyright
   - Link back to original sources

---

## 📝 Next Steps

Cậu muốn tớ bắt đầu implement phần nào trước?
1. Setup Supabase database schema?
2. Tạo crawler đầu tiên (bookmarks.design)?
3. Setup YouTube API integration?
4. Setup OpenAI auto-categorization?

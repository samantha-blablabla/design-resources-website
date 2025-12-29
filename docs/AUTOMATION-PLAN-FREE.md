# 🤖 Automation Plan - 100% FREE Version

## 🎯 Mục Tiêu: Zero Cost, Long-term Sustainable

Tất cả sử dụng free tier và open-source tools. Phù hợp cho dự án phi lợi nhuận.

---

## 🗄️ Supabase Database Schema (GIỐNG PLAN CŨ)

### Table 1: `resources`
```sql
CREATE TABLE resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  url TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  tags TEXT[],
  pricing TEXT,
  emoji TEXT,
  gradient TEXT,
  source TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_resources_category ON resources(category);
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
  category TEXT NOT NULL,
  tags TEXT[],
  emoji TEXT,
  gradient TEXT,
  source TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
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
  category TEXT NOT NULL,
  duration TEXT,
  thumbnail_url TEXT,
  emoji TEXT,
  gradient TEXT,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_videos_category ON videos(category);
CREATE INDEX idx_videos_published_at ON videos(published_at DESC);
```

---

## 🆓 100% FREE Tech Stack

### ❌ KHÔNG DÙNG (VÌ TỐN PHÍ):
- ~~OpenAI API~~ ($20-50/month)
- ~~Anthropic Claude API~~
- ~~Puppeteer/Playwright~~ (cần server có headless browser)

### ✅ DÙNG (100% FREE):

1. **Database: Supabase Free Tier**
   - 500MB database storage (đủ cho hàng triệu records)
   - 50,000 monthly active users
   - 2GB file storage
   - Unlimited API requests
   - **→ FREE FOREVER**

2. **Hosting: Vercel Free Tier**
   - 100GB bandwidth/month
   - Unlimited deployments
   - Edge Functions (cho cron jobs)
   - **→ FREE FOREVER**

3. **YouTube API: Google Free Tier**
   - 10,000 quota units/day
   - = ~100 video fetches/day
   - **→ FREE FOREVER**

4. **AI Categorization: FREE Alternatives**
   - **Hugging Face Inference API** (free)
   - **Groq API** (free, siêu nhanh)
   - **Ollama** (self-hosted, 100% free)
   - Hoặc **rule-based** (không cần AI)

5. **Web Scraping: Cheerio + Axios**
   - Static HTML parsing
   - Không cần headless browser
   - **→ 100% FREE**

6. **RSS Feeds** thay vì crawl trực tiếp
   - Medium, Smashing Magazine có RSS
   - Parse RSS = no rate limit issues
   - **→ 100% FREE**

---

## 🕷️ FREE Crawling Strategy

### 1. **Design Inspiration - RSS/API Only**

**Nguồn có RSS feeds miễn phí:**
- ✅ **Dribbble RSS** - `https://dribbble.com/shots.rss`
- ✅ **Behance RSS** - `https://www.behance.net/feeds/projects`
- ✅ **Awwwards RSS** - `https://www.awwwards.com/blog/feed/`
- ✅ **CSS Design Awards RSS**

**→ KHÔNG crawl bookmarks.design** (phức tạp, dễ bị block)
**→ Chỉ dùng RSS feeds** (simple, reliable, free)

**Tần suất:** 2-3 lần/ngày (đủ cho RSS)

### 2. **YouTube Videos - Official API**

**100% Free với YouTube Data API v3**

Kênh YouTube ưu tiên (có channel IDs public):
```
Figma: UCQsVmhSa4X-G3lHlUtejzLA
DesignCourse: UCVyRiMvfUNMA1UPlDPzG5Ow
Flux Academy: UCN7dywl5wDxTu1RM3eJ_h9Q
The Futur: UCXb4KUGZK5tZJUWMXukB1lg
```

**API Call Example:**
```javascript
// Free: 10,000 quota units/day = ~100 videos/day
const fetchYouTubeVideos = async (channelId) => {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?` +
    `key=${YOUTUBE_API_KEY}&` +
    `channelId=${channelId}&` +
    `part=snippet&` +
    `order=date&` +
    `maxResults=10&` +
    `type=video`
  );
  return response.json();
};
```

**Tần suất:** 1 lần/ngày (tiết kiệm quota)

### 3. **Design Resources - RSS + Manual Curation**

**FREE RSS Feeds:**
- ✅ Product Hunt có RSS: `https://www.producthunt.com/feed`
- ✅ Designer News RSS
- ✅ Hacker News Design RSS

**Manual Curation:**
- Community submit (users có thể submit resources)
- Tớ hoặc admin thêm tay vào Supabase

**→ Hybrid: RSS auto + manual add**

### 4. **Articles - RSS Feeds**

**FREE RSS Feeds:**
```
Medium Design: https://medium.com/topic/design/feed
Smashing Magazine: https://www.smashingmagazine.com/feed/
CSS-Tricks: https://css-tricks.com/feed/
A List Apart: https://alistapart.com/main/feed/
```

**Tần suất:** 1 lần/ngày

---

## 🤖 FREE AI Categorization

### Option 1: **Groq API** (100% FREE, siêu nhanh)

```javascript
// Groq API - Free tier: 30 requests/min
const categorizeWithGroq = async (title, description) => {
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GROQ_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'llama3-8b-8192', // Free model
      messages: [{
        role: 'user',
        content: `Categorize this design resource into ONE category:
Categories: ui-kits, icons, illustrations, photos, typography, colors, design-tools, ai, accessibility, prototyping, patterns, courses, articles

Title: ${title}
Description: ${description}

Return JSON: {"category": "...", "tags": ["tag1", "tag2"]}`
      }],
      temperature: 0.3
    })
  });

  const data = await response.json();
  return JSON.parse(data.choices[0].message.content);
};
```

**Free Limits:**
- 30 requests/minute
- 14,400 requests/day
- **→ ĐỦ cho automation hàng ngày**

### Option 2: **Hugging Face Inference API** (FREE)

```javascript
// Hugging Face - Free tier
const categorizeWithHF = async (title, description) => {
  const response = await fetch(
    'https://api-inference.huggingface.co/models/facebook/bart-large-mnli',
    {
      headers: { Authorization: `Bearer ${HF_API_KEY}` },
      method: 'POST',
      body: JSON.stringify({
        inputs: `${title}. ${description}`,
        parameters: {
          candidate_labels: [
            'ui-kits', 'icons', 'illustrations', 'photos',
            'typography', 'colors', 'design-tools', 'ai'
          ]
        }
      })
    }
  );
  return response.json();
};
```

### Option 3: **Rule-Based** (No AI needed)

```javascript
// Simple keyword matching - 100% free, instant
const categorizeByKeywords = (title, description) => {
  const text = `${title} ${description}`.toLowerCase();

  if (text.match(/icon|iconset|icon pack/)) return 'icons';
  if (text.match(/ui kit|component|design system/)) return 'ui-kits';
  if (text.match(/illustration|artwork|graphic/)) return 'illustrations';
  if (text.match(/photo|image|stock/)) return 'photos';
  if (text.match(/font|typeface|typography/)) return 'typography';
  if (text.match(/color|palette|gradient/)) return 'colors';
  if (text.match(/figma|sketch|adobe|tool/)) return 'design-tools';
  if (text.match(/ai|artificial intelligence|gpt|ml/)) return 'ai';

  return 'design-tools'; // default
};
```

**→ Recommend: Groq API (free + accurate)**

---

## 📡 RSS Parser Implementation

```javascript
// lib/rss-parser.ts
import Parser from 'rss-parser';

const parser = new Parser();

export async function fetchRSSFeed(feedUrl: string) {
  try {
    const feed = await parser.parseURL(feedUrl);

    return feed.items.map(item => ({
      title: item.title,
      description: item.contentSnippet || item.description,
      url: item.link,
      publishedAt: item.pubDate ? new Date(item.pubDate) : new Date(),
      source: feed.title
    }));
  } catch (error) {
    console.error(`Error fetching RSS feed ${feedUrl}:`, error);
    return [];
  }
}
```

**Install:**
```bash
npm install rss-parser
```

---

## ⏰ FREE Cron Jobs (Vercel Edge Functions)

```typescript
// app/api/cron/daily-update/route.ts
import { NextResponse } from 'next/server';
import { fetchRSSFeed } from '@/lib/rss-parser';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    // 1. Fetch Dribbble RSS
    const dribbbleItems = await fetchRSSFeed('https://dribbble.com/shots.rss');

    // 2. Fetch YouTube videos
    const youtubeVideos = await fetchYouTubeVideos();

    // 3. Fetch Medium articles
    const mediumArticles = await fetchRSSFeed('https://medium.com/topic/design/feed');

    // 4. Categorize & insert to Supabase
    for (const item of dribbbleItems) {
      const category = categorizeByKeywords(item.title, item.description);
      const { emoji, gradient } = getEmojiAndGradient(category);

      await supabase.from('inspirations').insert({
        title: item.title,
        description: item.description,
        source_url: item.url,
        category,
        emoji,
        gradient,
        source: 'Dribbble'
      }).onConflict('source_url'); // Ignore duplicates
    }

    return NextResponse.json({ success: true, itemsProcessed: dribbbleItems.length });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
```

**Vercel Cron Setup (vercel.json):**
```json
{
  "crons": [
    {
      "path": "/api/cron/daily-update",
      "schedule": "0 9 * * *"
    }
  ]
}
```

**→ FREE trên Vercel Hobby plan**

---

## 📊 Updated Schedule (Optimized for Free Tier)

| Task | Tần suất | Tool | Free Limit |
|------|----------|------|------------|
| **Inspiration** (Dribbble, Behance RSS) | 1x/ngày (9am) | RSS Parser | Unlimited |
| **YouTube Videos** | 1x/ngày (10am) | YouTube API | 10k quota/day |
| **Articles** (Medium, Smashing) | 1x/ngày (11am) | RSS Parser | Unlimited |
| **Resources** (Product Hunt RSS) | 1x/ngày (2pm) | RSS Parser | Unlimited |
| **AI Categorization** | On-demand | Groq API | 14.4k/day |

**→ Tất cả chạy trong 1 cron job duy nhất: 1x/ngày lúc 9am**

---

## 💰 Cost: $0/month

| Service | Cost |
|---------|------|
| Supabase Database | $0 (free tier) |
| Vercel Hosting | $0 (free tier) |
| YouTube API | $0 (free tier) |
| Groq AI API | $0 (free tier) |
| RSS Parsing | $0 (built-in) |
| **TOTAL** | **$0/month** |

---

## 🚀 Implementation Plan (100% Free)

### Phase 1: Setup Database (1 ngày)
- [x] Supabase tables đã có
- [ ] Setup Row Level Security
- [ ] Test insert/query

### Phase 2: RSS Parsers (2-3 ngày)
- [ ] Install `rss-parser`
- [ ] Create RSS fetch functions
- [ ] Test Dribbble, Behance, Medium feeds
- [ ] Handle duplicates (check URL)

### Phase 3: YouTube Integration (1 ngày)
- [ ] Get YouTube API key (free)
- [ ] Fetch videos from design channels
- [ ] Parse video metadata
- [ ] Insert to Supabase

### Phase 4: Categorization (1-2 ngày)
- [ ] Setup Groq API (free account)
- [ ] Create categorization function
- [ ] Fallback to rule-based if API fails
- [ ] Test accuracy

### Phase 5: Automation (1 ngày)
- [ ] Create `/api/cron/daily-update` endpoint
- [ ] Combine all fetchers
- [ ] Add error handling
- [ ] Setup Vercel cron

### Phase 6: Manual Curation Tool (Optional)
- [ ] Admin page `/admin`
- [ ] Form để add resources thủ công
- [ ] Approve/reject auto-fetched items

**Total: ~1 tuần để hoàn thành**

---

## ⚠️ Limitations of Free Tier

### 1. **Slower Updates**
- Paid: Crawl 3x/day
- Free: RSS 1x/day
- **→ OK vì RSS cập nhật đủ nhanh**

### 2. **Less Advanced AI**
- Paid: GPT-4 (rất accurate)
- Free: Groq Llama3 (khá accurate, 90%+)
- **→ Có thể manual review/fix nếu sai**

### 3. **Fewer Sources**
- Paid: Có thể crawl bất kỳ site nào
- Free: Chỉ dùng RSS feeds
- **→ Vẫn đủ nguồn chất lượng**

### 4. **Manual Work**
- Một số resources phải thêm tay
- Review AI categorization
- **→ Trade-off hợp lý cho free**

---

## 🎯 Next Steps

Cậu muốn bắt đầu implement phase nào?

1. **Phase 2**: Setup RSS parsers (Dribbble, Behance, Medium)?
2. **Phase 3**: YouTube API integration?
3. **Phase 4**: Groq AI categorization?
4. Hay setup all at once?

Tớ sẵn sàng code ngay! 🚀

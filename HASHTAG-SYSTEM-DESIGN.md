# 🏷️ Hashtag System Design

## 💡 Concept

Thêm hashtag system để users có thể:
- ✅ Tìm kiếm nhanh bằng hashtag (ví dụ: #figma, #free, #ui-design)
- ✅ Click vào hashtag → filter tất cả items có tag đó
- ✅ Xem trending hashtags
- ✅ Combine multiple hashtags (AND/OR logic)

---

## 🗄️ Database Schema (Đã có sẵn!)

**Hiện tại các tables đã có field `tags TEXT[]`:**
- `resources.tags`
- `inspirations.tags`
- `videos.tags` (cần thêm)
- `articles.tags`

**→ KHÔNG CẦN migration mới!** Chỉ cần update UI và logic.

---

## 📊 Hashtag Sources

### 1. **Auto-generated từ AI**
AI sẽ generate hashtags dựa trên:
- Title
- Description
- Category
- Source

Example:
```
Title: "Figma Auto Layout Tutorial"
AI generates: ["figma", "auto-layout", "tutorial", "ui-design", "free"]
```

### 2. **Predefined Popular Hashtags**
```javascript
const POPULAR_HASHTAGS = {
  tools: ['figma', 'sketch', 'adobe-xd', 'framer', 'canva'],
  pricing: ['free', 'freemium', 'premium', 'open-source'],
  type: ['ui-design', 'ux-research', 'prototyping', 'branding', 'illustration'],
  platform: ['web', 'mobile', 'desktop', 'ios', 'android'],
  skill: ['beginner', 'intermediate', 'advanced'],
  topic: ['color-theory', 'typography', 'layout', 'animation', 'accessibility'],
};
```

### 3. **Format Rules**
- Lowercase only
- No spaces (use dash: `ui-design`)
- Max 20 chars per tag
- Max 10 tags per item
- No special characters (except dash)

---

## 🎨 UI/UX Design

### 1. **Hashtag Display trong Cards**
```
┌─────────────────────────┐
│  🎨 Figma Design System │
│                         │
│  Complete design system │
│  with components...     │
│                         │
│  #figma #ui-kit #free   │ ← Clickable hashtags
└─────────────────────────┘
```

### 2. **Search Bar với Hashtag Suggestions**
```
┌────────────────────────────────────┐
│ 🔍 Search or type #hashtag...      │
└────────────────────────────────────┘
   ↓ (khi gõ #)
┌────────────────────────────────────┐
│ Popular:                           │
│ #figma #free #ui-design #sketch    │
│ #illustration #typography          │
└────────────────────────────────────┘
```

### 3. **Active Filters Display**
```
Active filters:  [#figma ×]  [#free ×]  [Clear all]
```

### 4. **Trending Hashtags Section** (Sidebar or Top)
```
🔥 Trending
#figma        (234 items)
#free         (189 items)
#ui-design    (156 items)
#ai           (142 items)
#prototyping  (98 items)
```

---

## 🔧 Implementation Plan

### Phase 1: Backend Updates

#### 1.1. Update AI Categorizer để generate hashtags
```typescript
// lib/ai-categorizer.ts
export async function categorizeWithAI(
  title: string,
  description: string,
  type: string
): Promise<CategorizationResult> {
  // ... existing code ...

  // Thêm hashtag generation
  const hashtags = await generateHashtags(title, description, category);

  return {
    category,
    tags: hashtags, // Sẽ là hashtags thay vì generic tags
    emoji,
    gradient,
  };
}

function generateHashtags(title: string, desc: string, category: string): string[] {
  const text = `${title} ${desc}`.toLowerCase();
  const hashtags = new Set<string>();

  // 1. Add category as hashtag
  hashtags.add(category.replace('_', '-'));

  // 2. Extract tools
  if (text.match(/figma/)) hashtags.add('figma');
  if (text.match(/sketch/)) hashtags.add('sketch');
  if (text.match(/adobe xd|xd/)) hashtags.add('adobe-xd');
  if (text.match(/framer/)) hashtags.add('framer');

  // 3. Extract pricing
  if (text.match(/free/i)) hashtags.add('free');
  if (text.match(/premium|paid/i)) hashtags.add('premium');
  if (text.match(/open.?source/i)) hashtags.add('open-source');

  // 4. Extract type
  if (text.match(/ui|interface/)) hashtags.add('ui-design');
  if (text.match(/ux|experience/)) hashtags.add('ux-design');
  if (text.match(/prototype/)) hashtags.add('prototyping');
  if (text.match(/brand/)) hashtags.add('branding');
  if (text.match(/illustration/)) hashtags.add('illustration');

  // 5. Extract platform
  if (text.match(/web|website/)) hashtags.add('web');
  if (text.match(/mobile|app/)) hashtags.add('mobile');
  if (text.match(/ios|iphone/)) hashtags.add('ios');
  if (text.match(/android/)) hashtags.add('android');

  return Array.from(hashtags).slice(0, 10); // Max 10
}
```

#### 1.2. Create hashtag utility functions
```typescript
// lib/hashtag-utils.ts
export function normalizeHashtag(tag: string): string {
  return tag
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 20);
}

export function extractHashtags(text: string): string[] {
  const matches = text.match(/#[\w-]+/g) || [];
  return matches.map(tag => normalizeHashtag(tag.slice(1)));
}

export async function getTrendingHashtags(limit = 10) {
  // Query Supabase to get most used hashtags
  const { data } = await supabase.rpc('get_trending_hashtags', { limit_count: limit });
  return data;
}
```

#### 1.3. Add Supabase function để get trending hashtags
```sql
-- supabase/migrations/004_hashtag_functions.sql
CREATE OR REPLACE FUNCTION get_trending_hashtags(limit_count INTEGER DEFAULT 10)
RETURNS TABLE(hashtag TEXT, count BIGINT) AS $$
BEGIN
  RETURN QUERY
  SELECT
    unnest(tags) as hashtag,
    COUNT(*) as count
  FROM (
    SELECT tags FROM resources WHERE tags IS NOT NULL
    UNION ALL
    SELECT tags FROM inspirations WHERE tags IS NOT NULL
    UNION ALL
    SELECT tags FROM videos WHERE tags IS NOT NULL
    UNION ALL
    SELECT tags FROM articles WHERE tags IS NOT NULL
  ) AS all_tags
  GROUP BY hashtag
  ORDER BY count DESC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;
```

### Phase 2: Frontend Updates

#### 2.1. Create Hashtag Component
```typescript
// components/Hashtag.tsx
'use client';

interface HashtagProps {
  tag: string;
  count?: number;
  active?: boolean;
  onClick?: (tag: string) => void;
}

export default function Hashtag({ tag, count, active, onClick }: HashtagProps) {
  return (
    <button
      onClick={() => onClick?.(tag)}
      className={`hashtag ${active ? 'active' : ''}`}
    >
      #{tag}
      {count !== undefined && <span className="count">{count}</span>}
    </button>
  );
}
```

#### 2.2. Update Card Component để hiển thị hashtags
```typescript
// components/ui/Card.tsx
<div className="card-tags">
  {tags.map((tag, index) => (
    <Link
      key={index}
      href={`/resources?hashtag=${tag}`}
      className="tag hashtag"
    >
      #{tag}
    </Link>
  ))}
</div>
```

#### 2.3. Add Search Bar với hashtag support
```typescript
// components/SearchBar.tsx
'use client';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleChange = (value: string) => {
    setQuery(value);

    // Show hashtag suggestions when typing #
    if (value.includes('#')) {
      const lastHashtag = value.split('#').pop() || '';
      // Fetch suggestions from popular hashtags
      setSuggestions(getHashtagSuggestions(lastHashtag));
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search or type #hashtag..."
        value={query}
        onChange={(e) => handleChange(e.target.value)}
      />
      {suggestions.length > 0 && (
        <div className="suggestions">
          {suggestions.map(tag => (
            <button onClick={() => insertHashtag(tag)}>
              #{tag}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
```

#### 2.4. Update Resources Page với hashtag filtering
```typescript
// app/resources/page.tsx
export default function ResourcesPage({ searchParams }) {
  const [selectedHashtags, setSelectedHashtags] = useState<string[]>(
    searchParams.hashtag ? [searchParams.hashtag] : []
  );

  // Filter by hashtags
  const filteredResources = allResources.filter(resource => {
    if (selectedHashtags.length === 0) return true;
    return selectedHashtags.every(tag => resource.tags.includes(tag));
  });

  return (
    <>
      {/* Active hashtags */}
      {selectedHashtags.length > 0 && (
        <div className="active-filters">
          {selectedHashtags.map(tag => (
            <button onClick={() => removeHashtag(tag)}>
              #{tag} ×
            </button>
          ))}
          <button onClick={clearAll}>Clear all</button>
        </div>
      )}

      {/* Results */}
      <div className="grid">
        {filteredResources.map(resource => <Card {...resource} />)}
      </div>
    </>
  );
}
```

#### 2.5. Add Trending Hashtags Sidebar
```typescript
// components/TrendingHashtags.tsx
'use client';

export default function TrendingHashtags() {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    fetchTrendingHashtags().then(setTrending);
  }, []);

  return (
    <div className="trending-hashtags">
      <h3>🔥 Trending</h3>
      {trending.map(({ hashtag, count }) => (
        <Link href={`/resources?hashtag=${hashtag}`}>
          <Hashtag tag={hashtag} count={count} />
        </Link>
      ))}
    </div>
  );
}
```

### Phase 3: CSS Styling
```css
/* Hashtag styles */
.hashtag {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.75rem;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 999px;
  font-size: 0.8rem;
  color: var(--color-accent);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
}

.hashtag:hover {
  background: var(--color-accent);
  color: white;
  border-color: var(--color-accent);
}

.hashtag.active {
  background: var(--color-accent);
  color: white;
}

.hashtag .count {
  font-size: 0.75rem;
  opacity: 0.7;
}

/* Trending hashtags */
.trending-hashtags {
  padding: var(--spacing-md);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
}

.trending-hashtags h3 {
  font-size: 1rem;
  margin-bottom: var(--spacing-sm);
}

/* Active filters */
.active-filters {
  display: flex;
  gap: var(--spacing-xs);
  margin-bottom: var(--spacing-md);
  flex-wrap: wrap;
}

/* Search suggestions */
.suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  margin-top: 0.5rem;
  padding: var(--spacing-sm);
  box-shadow: var(--shadow-md);
  z-index: 10;
}
```

---

## 🎯 Features Summary

### ✅ Core Features
1. **Auto-generated hashtags** từ AI
2. **Clickable hashtags** trong cards
3. **Hashtag filtering** trên pages
4. **Search with hashtags** (#figma #free)
5. **Trending hashtags** section

### ✨ Advanced Features (Optional)
6. **Multi-hashtag filtering** (AND/OR logic)
7. **Hashtag autocomplete** trong search
8. **Related hashtags** suggestions
9. **Popular hashtags** by category
10. **Hashtag stats/analytics** page

---

## 📊 Example Hashtags by Category

**Resources:**
- Tools: `#figma`, `#sketch`, `#adobe-xd`, `#framer`, `#canva`
- Type: `#ui-kit`, `#icons`, `#illustrations`, `#fonts`
- Pricing: `#free`, `#premium`, `#freemium`, `#open-source`

**Inspiration:**
- Platform: `#web`, `#mobile`, `#desktop`
- Type: `#landing-page`, `#dashboard`, `#app-design`
- Industry: `#fintech`, `#saas`, `#ecommerce`

**Videos:**
- Topic: `#tutorial`, `#tips-tricks`, `#workflow`
- Tool: `#figma-tutorial`, `#sketch-tips`
- Level: `#beginner`, `#advanced`

**Articles:**
- Topic: `#ui-design`, `#ux-research`, `#design-system`
- Type: `#case-study`, `#guide`, `#opinion`

---

## 🚀 Implementation Priority

### Phase 1 (Essential - Làm ngay)
- [ ] Update AI categorizer để generate hashtags
- [ ] Update Card component để show hashtags
- [ ] Add hashtag filtering trên Resources page
- [ ] Basic hashtag CSS

### Phase 2 (Important - Tuần sau)
- [ ] Trending hashtags section
- [ ] Search với hashtag support
- [ ] Active filters display
- [ ] Hashtag utilities

### Phase 3 (Nice to have - Sau này)
- [ ] Hashtag autocomplete
- [ ] Related hashtags
- [ ] Analytics/stats page

---

## 💭 Cậu muốn tớ làm gì?

1. **Implement ngay Phase 1** (hashtag display + filtering)?
2. **Tạo migration 004** cho hashtag functions?
3. **Update UI components** với hashtag support?
4. Hay cậu muốn **customize** design trước?

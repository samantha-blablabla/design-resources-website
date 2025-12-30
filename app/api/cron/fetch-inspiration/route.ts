import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import Parser from 'rss-parser';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing required Supabase environment variables');
}

const supabase = createClient(supabaseUrl!, supabaseKey!);
const parser = new Parser();

// Design inspiration RSS feeds
const INSPIRATION_FEEDS = {
  'Dribbble': 'https://dribbble.com/shots/popular.rss',
  'Behance': 'https://www.behance.net/feeds/projects',
  'Awwwards': 'https://www.awwwards.com/blog/feed/',
  'Designspiration': 'https://www.designspiration.com/feed/',
  'Abduzeedo': 'https://abduzeedo.com/rss.xml',
};

const GRADIENTS = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
  'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
  'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
  'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
  'linear-gradient(135deg, #ff6e7f 0%, #bfe9ff 100%)',
];

function categorizeFeedItem(title: string, description: string, source: string): string[] {
  const text = (title + ' ' + description).toLowerCase();
  const tags: string[] = ['inspiration'];

  // Add source tag
  tags.push(source.toLowerCase().replace(/\s+/g, '-'));

  // Design categories
  if (text.match(/ui|interface|app/)) tags.push('ui-design', 'interface');
  if (text.match(/web|website/)) tags.push('web-design');
  if (text.match(/branding|logo|identity/)) tags.push('branding');
  if (text.match(/illustration|illustrator/)) tags.push('illustration');
  if (text.match(/typography|font|type/)) tags.push('typography');
  if (text.match(/color|palette/)) tags.push('color');
  if (text.match(/motion|animation|animated/)) tags.push('motion-design', 'animation');
  if (text.match(/3d|three-dimensional|render/)) tags.push('3d');
  if (text.match(/mobile|ios|android/)) tags.push('mobile-design');
  if (text.match(/ux|user experience/)) tags.push('ux-design');
  if (text.match(/graphic|poster|print/)) tags.push('graphic-design');
  if (text.match(/packaging/)) tags.push('packaging');
  if (text.match(/photography|photo/)) tags.push('photography');

  // Default tags
  if (tags.length === 2) tags.push('design', 'creative');

  return [...new Set(tags)];
}

async function fetchAndParseFeed(feedUrl: string, sourceName: string) {
  try {
    const feed = await parser.parseURL(feedUrl);
    const items = feed.items.slice(0, 10); // Get latest 10 items

    console.log(`📰 Fetched ${items.length} items from ${sourceName}`);

    return items.map(item => ({
      title: item.title || 'Untitled',
      description: (item.contentSnippet || item.content || '').slice(0, 300),
      url: item.link || '',
      publishedAt: item.pubDate || item.isoDate || new Date().toISOString(),
      source: sourceName,
      imageUrl: item.enclosure?.url || extractImageFromContent(item.content),
    }));
  } catch (error) {
    console.error(`❌ Error fetching ${sourceName}:`, error);
    return [];
  }
}

function extractImageFromContent(content?: string): string | undefined {
  if (!content) return undefined;

  // Try to extract image URL from HTML content
  const imgMatch = content.match(/<img[^>]+src="([^">]+)"/i);
  if (imgMatch) return imgMatch[1];

  // Try to find any image URL in content
  const urlMatch = content.match(/(https?:\/\/[^\s]+\.(jpg|jpeg|png|gif|webp))/i);
  if (urlMatch) return urlMatch[1];

  return undefined;
}

async function insertInspirationToSupabase(item: any, gradientIndex: number) {
  const tags = categorizeFeedItem(item.title, item.description, item.source);

  const resource = {
    title: item.title,
    description: item.description,
    url: item.url,
    category: 'inspiration',
    tags,
    source: `rss-${item.source.toLowerCase().replace(/\s+/g, '-')}`,
    gradient: GRADIENTS[gradientIndex % GRADIENTS.length],
    featured: false,
    image_url: item.imageUrl || null,
    published_at: item.publishedAt,
  };

  try {
    // Check if item already exists
    const { data: existing } = await supabase
      .from('resources')
      .select('id')
      .eq('url', resource.url)
      .single();

    if (existing) {
      return { success: false, reason: 'duplicate' };
    }

    const { data, error } = await supabase
      .from('resources')
      .insert([resource])
      .select();

    if (error) {
      console.error(`❌ Error inserting "${item.title}":`, error.message);
      return { success: false, reason: 'error', error };
    }

    console.log(`✅ Inserted: ${item.title}`);
    return { success: true, data };
  } catch (err) {
    console.error(`❌ Unexpected error:`, err);
    return { success: false, reason: 'exception', error: err };
  }
}

export async function GET(request: NextRequest) {
  // Only allow requests from Vercel Cron Jobs
  const cronHeader = request.headers.get('x-vercel-cron');

  if (cronHeader !== '1') {
    return NextResponse.json({
      error: 'Unauthorized - This endpoint can only be called by Vercel Cron Jobs'
    }, { status: 401 });
  }

  console.log('🎨 Starting to fetch design inspiration from RSS feeds...\n');

  let totalFetched = 0;
  let totalInserted = 0;
  let totalSkipped = 0;
  let totalErrors = 0;
  let gradientIndex = 0;

  for (const [sourceName, feedUrl] of Object.entries(INSPIRATION_FEEDS)) {
    console.log(`\n📡 Fetching from: ${sourceName}`);

    const items = await fetchAndParseFeed(feedUrl, sourceName);
    totalFetched += items.length;

    for (const item of items) {
      if (!item.url) {
        console.log(`⚠️  Skipped: No URL for "${item.title}"`);
        totalSkipped++;
        continue;
      }

      const result = await insertInspirationToSupabase(item, gradientIndex++);

      if (result.success) {
        totalInserted++;
      } else if (result.reason === 'duplicate') {
        totalSkipped++;
      } else {
        totalErrors++;
      }
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 Summary:');
  console.log('='.repeat(60));
  console.log(`🎨 Total items fetched: ${totalFetched}`);
  console.log(`✅ Successfully inserted: ${totalInserted}`);
  console.log(`⏭️  Skipped (duplicates): ${totalSkipped}`);
  console.log(`❌ Errors: ${totalErrors}`);
  console.log('='.repeat(60));

  return NextResponse.json({
    success: true,
    summary: {
      totalFetched,
      totalInserted,
      totalSkipped,
      totalErrors,
      sourcesProcessed: Object.keys(INSPIRATION_FEEDS).length,
    },
  });
}

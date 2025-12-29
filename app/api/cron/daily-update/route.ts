// Daily Cron Job - Fetch & update all content automatically
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { fetchMultipleFeeds, RSS_FEEDS } from '@/lib/rss-fetcher';
import { fetchMultipleChannels, DESIGN_CHANNELS, filterQualityVideos } from '@/lib/youtube-fetcher';
import { categorizeWithAI } from '@/lib/ai-categorizer';

// Supabase client với service_role key (có quyền write)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-key'
);

export async function GET(request: Request) {
  // Verify cron secret để bảo mật
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const startTime = Date.now();
  const logId = crypto.randomUUID();

  console.log(`🤖 [${logId}] Starting daily update job...`);

  try {
    // ==========================================
    // 1. FETCH INSPIRATIONS (Dribbble, Behance)
    // ==========================================
    console.log('📡 Fetching inspirations from RSS feeds...');
    const inspirationItems = await fetchMultipleFeeds(RSS_FEEDS.inspiration);

    let inspirationsAdded = 0;
    let inspirationsSkipped = 0;

    for (const item of inspirationItems.slice(0, 20)) { // Limit 20 per run
      try {
        // Categorize với AI
        const { category, tags, emoji, gradient } = await categorizeWithAI(
          item.title,
          item.description,
          'inspiration'
        );

        // Insert vào Supabase (skip if URL exists)
        const { error } = await supabase.from('inspirations').insert({
          title: item.title,
          description: item.description,
          source_url: item.url,
          image_url: item.imageUrl,
          category,
          tags,
          emoji,
          gradient,
          source: item.source,
        });

        if (error) {
          if (error.code === '23505') {
            // Duplicate key, skip
            inspirationsSkipped++;
          } else {
            console.error('❌ Error inserting inspiration:', error);
          }
        } else {
          inspirationsAdded++;
        }
      } catch (err) {
        console.error('❌ Error processing inspiration:', err);
      }
    }

    console.log(`✅ Inspirations: ${inspirationsAdded} added, ${inspirationsSkipped} skipped`);

    // Log to crawl_logs
    await supabase.from('crawl_logs').insert({
      source: RSS_FEEDS.inspiration.map(f => f.name).join(', '),
      table_name: 'inspirations',
      status: 'success',
      items_added: inspirationsAdded,
      items_skipped: inspirationsSkipped,
      completed_at: new Date().toISOString(),
    });

    // ==========================================
    // 2. FETCH YOUTUBE VIDEOS
    // ==========================================
    console.log('📺 Fetching YouTube videos...');
    const channelIds = Object.values(DESIGN_CHANNELS);
    const allVideos = await fetchMultipleChannels(channelIds, 5); // 5 videos per channel

    // Filter to only quality tutorial content (tips, tricks, tutorials)
    const videos = filterQualityVideos(allVideos);
    console.log(`🎯 Filtered to ${videos.length} quality videos (from ${allVideos.length} total)`);

    let videosAdded = 0;
    let videosSkipped = 0;

    for (const video of videos) {
      try {
        // Categorize với AI
        const { category, tags, emoji, gradient } = await categorizeWithAI(
          video.title,
          video.description,
          'video'
        );

        // Insert vào Supabase
        const { error } = await supabase.from('videos').insert({
          title: video.title,
          description: video.description,
          youtube_id: video.youtubeId,
          url: video.url,
          channel_name: video.channelName,
          channel_id: video.channelId,
          category,
          duration: video.duration,
          thumbnail_url: video.thumbnailUrl,
          emoji,
          gradient,
          view_count: video.viewCount,
          published_at: video.publishedAt.toISOString(),
        });

        if (error) {
          if (error.code === '23505') {
            videosSkipped++;
          } else {
            console.error('❌ Error inserting video:', error);
          }
        } else {
          videosAdded++;
        }
      } catch (err) {
        console.error('❌ Error processing video:', err);
      }
    }

    console.log(`✅ Videos: ${videosAdded} added, ${videosSkipped} skipped`);

    // Log to crawl_logs
    await supabase.from('crawl_logs').insert({
      source: 'YouTube Channels',
      table_name: 'videos',
      status: 'success',
      items_added: videosAdded,
      items_skipped: videosSkipped,
      completed_at: new Date().toISOString(),
    });

    // ==========================================
    // 3. FETCH ARTICLES (Medium, Smashing, etc.)
    // ==========================================
    console.log('📰 Fetching articles from RSS feeds...');
    const articleItems = await fetchMultipleFeeds(RSS_FEEDS.articles);

    let articlesAdded = 0;
    let articlesSkipped = 0;

    for (const item of articleItems.slice(0, 20)) { // Limit 20 per run
      try {
        // Categorize với AI
        const { category, tags, emoji, gradient } = await categorizeWithAI(
          item.title,
          item.description,
          'article'
        );

        // Insert vào Supabase
        const { error } = await supabase.from('articles').insert({
          title: item.title,
          description: item.description,
          url: item.url,
          author: item.author,
          source: item.source,
          category,
          tags,
          emoji,
          gradient,
          published_at: item.publishedAt.toISOString(),
        });

        if (error) {
          if (error.code === '23505') {
            articlesSkipped++;
          } else {
            console.error('❌ Error inserting article:', error);
          }
        } else {
          articlesAdded++;
        }
      } catch (err) {
        console.error('❌ Error processing article:', err);
      }
    }

    console.log(`✅ Articles: ${articlesAdded} added, ${articlesSkipped} skipped`);

    // Log to crawl_logs
    await supabase.from('crawl_logs').insert({
      source: RSS_FEEDS.articles.map(f => f.name).join(', '),
      table_name: 'articles',
      status: 'success',
      items_added: articlesAdded,
      items_skipped: articlesSkipped,
      completed_at: new Date().toISOString(),
    });

    // ==========================================
    // 4. FETCH RESOURCES (Product Hunt, etc.)
    // ==========================================
    console.log('🔧 Fetching resources from RSS feeds...');
    const resourceItems = await fetchMultipleFeeds(RSS_FEEDS.resources);

    let resourcesAdded = 0;
    let resourcesSkipped = 0;

    for (const item of resourceItems.slice(0, 10)) { // Limit 10 per run
      try {
        // Categorize với AI
        const { category, tags, emoji, gradient } = await categorizeWithAI(
          item.title,
          item.description,
          'resource'
        );

        // Insert vào Supabase
        const { error } = await supabase.from('resources').insert({
          title: item.title,
          description: item.description,
          url: item.url,
          image_url: item.imageUrl, // Auto-fetched image
          category,
          tags,
          pricing: 'Free', // Default, có thể refine sau
          emoji,
          gradient,
          source: item.source,
        });

        if (error) {
          if (error.code === '23505') {
            resourcesSkipped++;
          } else {
            console.error('❌ Error inserting resource:', error);
          }
        } else {
          resourcesAdded++;
        }
      } catch (err) {
        console.error('❌ Error processing resource:', err);
      }
    }

    console.log(`✅ Resources: ${resourcesAdded} added, ${resourcesSkipped} skipped`);

    // Note: No crawl_logs for resources (Product Hunt removed)

    // ==========================================
    // SUMMARY
    // ==========================================
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    const summary = {
      success: true,
      duration: `${duration}s`,
      inspirations: { added: inspirationsAdded, skipped: inspirationsSkipped },
      videos: { added: videosAdded, skipped: videosSkipped },
      articles: { added: articlesAdded, skipped: articlesSkipped },
      resources: { added: resourcesAdded, skipped: resourcesSkipped },
      total: {
        added: inspirationsAdded + videosAdded + articlesAdded + resourcesAdded,
        skipped: inspirationsSkipped + videosSkipped + articlesSkipped + resourcesSkipped,
      },
    };

    console.log(`🎉 [${logId}] Daily update completed in ${duration}s`);
    console.log(`📊 Total: ${summary.total.added} added, ${summary.total.skipped} skipped`);

    return NextResponse.json(summary);
  } catch (error: any) {
    console.error(`❌ [${logId}] Daily update failed:`, error);

    // Log error to crawl_logs
    await supabase.from('crawl_logs').insert({
      source: 'Daily Cron Job',
      table_name: 'all',
      status: 'failed',
      error_message: error.message,
      completed_at: new Date().toISOString(),
    });

    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

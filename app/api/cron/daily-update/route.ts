// Daily Cron Job - Auto-fetch YouTube videos
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const youtubeApiKey = process.env.YOUTUBE_API_KEY!;

// Design channels to fetch from
const DESIGN_CHANNELS = {
  // UI/UX Design
  'The Futur': 'UCwjmF42v_R5CwYbC4WYRpkg',
  'DesignCourse': 'UCVyRiMvfUNMA1UPlDPzG5Ow',
  'Flux Academy': 'UCN7dywl5wDxTu1RM3eJ_h9Q',
  'Jesse Showalter': 'UCvBGFeXbBrq3W9_0oNLJREQ',
  'Charli Marie': 'UCScRSwdX0t31gjk3MYXIuYQ',
  'DesignWithArash': 'UC_NhYYzcpz9QJZGm1nr0fWg',
  'Optimistic Web': 'UC1DYgzHSl7xblFi0d6jKDdA',

  // Motion Design
  'Motion Design School': 'UC-L0yvYPpGQZD3PHDLKiUpg',
  'School of Motion': 'UCAhdxqdrDN3gWJkaUFl9G-Q',
  'SonduckFilm': 'UC5DmsBrVi62DWBASLK5gMEw',
  'Dope Motions': 'UCgvrz9ioKv89HMyg42z4pyQ',

  // 3D Design
  'Josh - Blender Bros': 'UCXfGjwohMgPm4Ng2e1FXySw',
  'Ryuu - Blender Bros': 'UCEOVGZ2rpLhR7gSPvaexxxQ',
};

const GRADIENTS = [
  'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
  'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
  'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
  'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)',
  'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)',
  'linear-gradient(135deg, #fdcbf1 0%, #e6dee9 100%)',
  'linear-gradient(135deg, #c1dfc4 0%, #deecdd 100%)',
  'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
  'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
  'linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%)',
];

function parseDuration(isoDuration: string): string {
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return '0:00';

  const hours = parseInt(match[1] || '0');
  const minutes = parseInt(match[2] || '0');
  const seconds = parseInt(match[3] || '0');

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function categorizeVideo(title: string, description: string): string[] {
  const text = (title + ' ' + description).toLowerCase();
  const tags: string[] = ['video'];

  // Design fundamentals
  if (text.match(/color|palette|theory/)) tags.push('color-theory', 'fundamentals');
  if (text.match(/typography|font|type/)) tags.push('typography', 'fundamentals');
  if (text.match(/layout|composition|grid/)) tags.push('layout', 'fundamentals');

  // Tools
  if (text.match(/figma/)) tags.push('figma', 'tools');

  // UI/UX
  if (text.match(/ui design|user interface/)) tags.push('ui-design', 'interface');
  if (text.match(/ux|user experience|research/)) tags.push('ux-design', 'research');
  if (text.match(/mobile|app design/)) tags.push('mobile-design', 'app-design');

  // Web design
  if (text.match(/web design|website/)) tags.push('web-design');
  if (text.match(/responsive|mobile-first/)) tags.push('responsive', 'web-design');
  if (text.match(/css|html|javascript/)) tags.push('web-design', 'code');
  if (text.match(/animation|motion/)) tags.push('animation');

  // Motion Design
  if (text.match(/motion design|motion graphics|mograph/)) tags.push('motion-design', 'animation');
  if (text.match(/after effects|ae tutorial/)) tags.push('after-effects', 'motion-design', 'tools');
  if (text.match(/cinema 4d|c4d/)) tags.push('cinema-4d', '3d', 'tools');
  if (text.match(/kinetic typography/)) tags.push('kinetic-typography', 'motion-design');

  // 3D Design
  if (text.match(/3d|three dimensional/)) tags.push('3d');
  if (text.match(/blender/)) tags.push('blender', '3d', 'tools');
  if (text.match(/maya|3ds max/)) tags.push('3d-modeling', '3d', 'tools');
  if (text.match(/rendering|render/)) tags.push('rendering', '3d');
  if (text.match(/modeling|modelling/)) tags.push('3d-modeling', '3d');

  // Advanced topics
  if (text.match(/design system/)) tags.push('design-system', 'advanced');
  if (text.match(/accessibility|wcag|a11y/)) tags.push('accessibility', 'inclusive-design');
  if (text.match(/branding|brand identity|logo/)) tags.push('branding');

  // Career
  if (text.match(/portfolio|career|job/)) tags.push('career', 'portfolio');
  if (text.match(/freelance|client|business/)) tags.push('freelance', 'business');

  if (tags.length === 1) tags.push('fundamentals', 'tutorial');

  return [...new Set(tags)];
}

async function fetchChannelVideos(channelId: string, channelName: string, maxResults: number = 5) {
  try {
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?key=${youtubeApiKey}&channelId=${channelId}&part=snippet&order=date&type=video&maxResults=${maxResults}`;
    const searchResponse = await fetch(searchUrl);
    const searchData = await searchResponse.json();

    if (!searchData.items || searchData.items.length === 0) {
      return [];
    }

    const videoIds = searchData.items.map((item: any) => item.id.videoId).join(',');
    const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?key=${youtubeApiKey}&id=${videoIds}&part=snippet,contentDetails`;
    const detailsResponse = await fetch(detailsUrl);
    const detailsData = await detailsResponse.json();

    return detailsData.items.map((item: any) => ({
      id: item.id,
      title: item.snippet.title,
      description: item.snippet.description,
      duration: parseDuration(item.contentDetails.duration),
      publishedAt: item.snippet.publishedAt,
      thumbnailUrl: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default.url,
      channelTitle: item.snippet.channelTitle,
    }));
  } catch (error) {
    console.error(`Error fetching from ${channelName}:`, error);
    return [];
  }
}

export async function GET(request: Request) {
  // Verify cron secret for security
  const authHeader = request.headers.get('authorization');
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const startTime = Date.now();
  console.log('🤖 Starting daily YouTube video fetch...');

  try {
    if (!youtubeApiKey) {
      throw new Error('YouTube API key not configured');
    }

    let totalFetched = 0;
    let totalInserted = 0;
    let totalSkipped = 0;
    let gradientIndex = 0;

    for (const [channelName, channelId] of Object.entries(DESIGN_CHANNELS)) {
      console.log(`📺 Fetching from: ${channelName}`);

      const videos = await fetchChannelVideos(channelId, channelName, 5);
      totalFetched += videos.length;

      for (const video of videos) {
        const tags = categorizeVideo(video.title, video.description);
        const resource = {
          title: video.title, // Clean title without duration
          description: video.description.slice(0, 300) + (video.description.length > 300 ? '...' : ''),
          url: `https://www.youtube.com/watch?v=${video.id}`,
          category: 'video-tutorials',
          tags,
          source: `youtube-${video.channelTitle.toLowerCase().replace(/\s+/g, '-')}`,
          gradient: GRADIENTS[gradientIndex++ % GRADIENTS.length],
          featured: false,
          image_url: video.thumbnailUrl, // YouTube thumbnail
          thumbnail_url: video.thumbnailUrl,
          published_at: video.publishedAt,
          channel_name: video.channelTitle,
          duration: video.duration,
        };

        // Check if exists
        const { data: existing } = await supabase
          .from('resources')
          .select('id')
          .eq('url', resource.url)
          .single();

        if (existing) {
          totalSkipped++;
          continue;
        }

        // Insert new video
        const { error } = await supabase
          .from('resources')
          .insert([resource]);

        if (error) {
          console.error(`Error inserting ${video.title}:`, error.message);
        } else {
          totalInserted++;
          console.log(`✅ Inserted: ${video.title}`);
        }
      }
    }

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    const summary = {
      success: true,
      duration: `${duration}s`,
      fetched: totalFetched,
      inserted: totalInserted,
      skipped: totalSkipped,
      channels: Object.keys(DESIGN_CHANNELS),
    };

    console.log(`🎉 Completed in ${duration}s`);
    console.log(`📊 Fetched: ${totalFetched}, Inserted: ${totalInserted}, Skipped: ${totalSkipped}`);

    return NextResponse.json(summary);
  } catch (error: any) {
    console.error('❌ Daily update failed:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

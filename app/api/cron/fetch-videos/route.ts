import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Environment variables validation
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const youtubeApiKey = process.env.YOUTUBE_API_KEY;

if (!supabaseUrl || !supabaseKey || !youtubeApiKey) {
  console.error('Missing required environment variables');
}

const supabase = createClient(supabaseUrl!, supabaseKey!);

// High-quality design channels
const DESIGN_CHANNELS = {
  'The Futur': 'UCwjmF42v_R5CwYbC4WYRpkg',
  'DesignCourse': 'UCVyRiMvfUNMA1UPlDPzG5Ow',
  'Flux Academy': 'UCN7dywl5wDxTu1RM3eJ_h9Q',
  'Jesse Showalter': 'UCvBGFeXbBrq3W9_0oNLJREQ',
  'Charli Marie': 'UCScRSwdX0t31gjk3MYXIuYQ',
  'DesignWithArash': 'UC_NhYYzcpz9QJZGm1nr0fWg',
  'Optimistic Web': 'UC1DYgzHSl7xblFi0d6jKDdA',
  'Motion Design School': 'UC-L0yvYPpGQZD3PHDLKiUpg',
  'School of Motion': 'UCAhdxqdrDN3gWJkaUFl9G-Q',
  'SonduckFilm': 'UC5DmsBrVi62DWBASLK5gMEw',
  'Dope Motions': 'UCgvrz9ioKv89HMyg42z4pyQ',
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

  if (text.match(/color|palette|theory/)) tags.push('color-theory', 'fundamentals');
  if (text.match(/typography|font|type/)) tags.push('typography', 'fundamentals');
  if (text.match(/layout|composition|grid/)) tags.push('layout', 'fundamentals');
  if (text.match(/figma/)) tags.push('figma', 'tools');
  if (text.match(/adobe xd/)) tags.push('adobe-xd', 'tools');
  if (text.match(/sketch/)) tags.push('sketch', 'tools');
  if (text.match(/ui design|user interface/)) tags.push('ui-design', 'interface');
  if (text.match(/ux|user experience|research/)) tags.push('ux-design', 'research');
  if (text.match(/mobile|app design/)) tags.push('mobile-design', 'app-design');
  if (text.match(/prototype|prototyping/)) tags.push('prototyping');
  if (text.match(/web design|website/)) tags.push('web-design');
  if (text.match(/responsive|mobile-first/)) tags.push('responsive', 'web-design');
  if (text.match(/css|html|javascript/)) tags.push('web-design', 'code');
  if (text.match(/animation|motion/)) tags.push('animation');
  if (text.match(/motion design|motion graphics|mograph/)) tags.push('motion-design', 'animation');
  if (text.match(/after effects|ae tutorial/)) tags.push('after-effects', 'motion-design', 'tools');
  if (text.match(/cinema 4d|c4d/)) tags.push('cinema-4d', '3d', 'tools');
  if (text.match(/kinetic typography/)) tags.push('kinetic-typography', 'motion-design');
  if (text.match(/3d|three dimensional/)) tags.push('3d');
  if (text.match(/blender/)) tags.push('blender', '3d', 'tools');
  if (text.match(/maya|3ds max/)) tags.push('3d-modeling', '3d', 'tools');
  if (text.match(/rendering|render/)) tags.push('rendering', '3d');
  if (text.match(/modeling|modelling/)) tags.push('3d-modeling', '3d');
  if (text.match(/design system/)) tags.push('design-system', 'advanced');
  if (text.match(/accessibility|wcag|a11y/)) tags.push('accessibility', 'inclusive-design');
  if (text.match(/branding|brand identity|logo/)) tags.push('branding');
  if (text.match(/portfolio|career|job/)) tags.push('career', 'portfolio');
  if (text.match(/freelance|client|business/)) tags.push('freelance', 'business');

  if (tags.length === 1) tags.push('fundamentals', 'tutorial');
  return [...new Set(tags)];
}

async function fetchChannelVideos(channelId: string, channelName: string, maxResults: number = 10) {
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
    console.error(`Error fetching videos from ${channelName}:`, error);
    return [];
  }
}

async function insertVideoToSupabase(video: any, gradientIndex: number) {
  const tags = categorizeVideo(video.title, video.description);
  const resource = {
    title: video.title,
    description: video.description.slice(0, 300) + (video.description.length > 300 ? '...' : ''),
    url: `https://www.youtube.com/watch?v=${video.id}`,
    category: 'video-tutorials',
    tags,
    source: `youtube-${video.channelTitle.toLowerCase().replace(/\s+/g, '-')}`,
    gradient: GRADIENTS[gradientIndex % GRADIENTS.length],
    featured: false,
    image_url: video.thumbnailUrl,
    thumbnail_url: video.thumbnailUrl,
    published_at: video.publishedAt,
    channel_name: video.channelTitle,
    duration: video.duration,
  };

  try {
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
      console.error(`Error inserting "${video.title}":`, error.message);
      return { success: false, reason: 'error', error };
    }

    return { success: true, data };
  } catch (err) {
    console.error(`Unexpected error inserting "${video.title}":`, err);
    return { success: false, reason: 'exception', error: err };
  }
}

export async function GET(request: NextRequest) {
  // Only allow requests from Vercel Cron Jobs
  // Vercel automatically adds x-vercel-cron: 1 header to cron requests
  const cronHeader = request.headers.get('x-vercel-cron');

  if (cronHeader !== '1') {
    return NextResponse.json({
      error: 'Unauthorized - This endpoint can only be called by Vercel Cron Jobs'
    }, { status: 401 });
  }

  if (!youtubeApiKey) {
    return NextResponse.json({ error: 'YouTube API key not configured' }, { status: 500 });
  }

  let totalFetched = 0;
  let totalInserted = 0;
  let totalSkipped = 0;
  let totalErrors = 0;
  let gradientIndex = 0;

  for (const [channelName, channelId] of Object.entries(DESIGN_CHANNELS)) {
    const videos = await fetchChannelVideos(channelId, channelName, 10);
    totalFetched += videos.length;

    for (const video of videos) {
      const result = await insertVideoToSupabase(video, gradientIndex++);
      if (result.success) {
        totalInserted++;
      } else if (result.reason === 'duplicate') {
        totalSkipped++;
      } else {
        totalErrors++;
      }
    }
  }

  return NextResponse.json({
    success: true,
    summary: {
      totalFetched,
      totalInserted,
      totalSkipped,
      totalErrors,
      channelsProcessed: Object.keys(DESIGN_CHANNELS).length,
    },
  });
}

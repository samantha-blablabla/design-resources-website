import { createClient } from '@supabase/supabase-js';

// Environment variables (must be set before running this script)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const youtubeApiKey = process.env.YOUTUBE_API_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

// High-quality design channels from DATA-SOURCES.md
const DESIGN_CHANNELS = {
  // UI/UX Design
  'The Futur': 'UCwjmF42v_R5CwYbC4WYRpkg', // Brand design, business (@thefutur)
  'DesignCourse': 'UCVyRiMvfUNMA1UPlDPzG5Ow', // UI/UX, full courses (@DesignCourse)
  'Flux Academy': 'UCN7dywl5wDxTu1RM3eJ_h9Q', // Modern design workflows (@FluxAcademy)
  'Jesse Showalter': 'UCvBGFeXbBrq3W9_0oNLJREQ', // Web design, frontend
  'Charli Marie': 'UCScRSwdX0t31gjk3MYXIuYQ', // Design process, branding
  'DesignWithArash': 'UC_NhYYzcpz9QJZGm1nr0fWg', // UI/UX design
  'Optimistic Web': 'UC1DYgzHSl7xblFi0d6jKDdA', // Web design

  // Motion Design
  'Motion Design School': 'UC-L0yvYPpGQZD3PHDLKiUpg', // Motion design tutorials
  'School of Motion': 'UCAhdxqdrDN3gWJkaUFl9G-Q', // Motion graphics
  'SonduckFilm': 'UC5DmsBrVi62DWBASLK5gMEw', // Motion design
  'Dope Motions': 'UCgvrz9ioKv89HMyg42z4pyQ', // Motion graphics

  // 3D Design
  'Josh - Blender Bros': 'UCXfGjwohMgPm4Ng2e1FXySw', // 3D Blender
  'Ryuu - Blender Bros': 'UCEOVGZ2rpLhR7gSPvaexxxQ', // 3D Blender
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

interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  duration: string;
  publishedAt: string;
  thumbnailUrl: string;
  channelTitle: string;
}

// Convert ISO 8601 duration to human-readable format (e.g., PT15M33S -> 15:33)
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

// Categorize video based on title and description
function categorizeVideo(title: string, description: string): string[] {
  const text = (title + ' ' + description).toLowerCase();
  const tags: string[] = ['video'];

  // Design fundamentals
  if (text.match(/color|palette|theory/)) tags.push('color-theory', 'fundamentals');
  if (text.match(/typography|font|type/)) tags.push('typography', 'fundamentals');
  if (text.match(/layout|composition|grid/)) tags.push('layout', 'fundamentals');

  // Tools
  if (text.match(/figma/)) tags.push('figma', 'tools');
  if (text.match(/adobe xd/)) tags.push('adobe-xd', 'tools');
  if (text.match(/sketch/)) tags.push('sketch', 'tools');

  // UI/UX
  if (text.match(/ui design|user interface/)) tags.push('ui-design', 'interface');
  if (text.match(/ux|user experience|research/)) tags.push('ux-design', 'research');
  if (text.match(/mobile|app design/)) tags.push('mobile-design', 'app-design');
  if (text.match(/prototype|prototyping/)) tags.push('prototyping');

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

  // Default to fundamentals if no specific category
  if (tags.length === 1) tags.push('fundamentals', 'tutorial');

  return [...new Set(tags)]; // Remove duplicates
}

async function fetchChannelVideos(channelId: string, channelName: string, maxResults: number = 10): Promise<YouTubeVideo[]> {
  try {
    // Step 1: Get recent uploads from channel
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?key=${youtubeApiKey}&channelId=${channelId}&part=snippet&order=date&type=video&maxResults=${maxResults}`;

    const searchResponse = await fetch(searchUrl);
    const searchData = await searchResponse.json();

    if (!searchData.items || searchData.items.length === 0) {
      console.log(`⚠️  No videos found for channel: ${channelName}`);
      return [];
    }

    // Step 2: Get video details including duration
    const videoIds = searchData.items.map((item: any) => item.id.videoId).join(',');
    const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?key=${youtubeApiKey}&id=${videoIds}&part=snippet,contentDetails`;

    const detailsResponse = await fetch(detailsUrl);
    const detailsData = await detailsResponse.json();

    const videos: YouTubeVideo[] = detailsData.items.map((item: any) => ({
      id: item.id,
      title: item.snippet.title,
      description: item.snippet.description,
      duration: parseDuration(item.contentDetails.duration),
      publishedAt: item.snippet.publishedAt,
      thumbnailUrl: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default.url,
      channelTitle: item.snippet.channelTitle,
    }));

    return videos;
  } catch (error) {
    console.error(`❌ Error fetching videos from ${channelName}:`, error);
    return [];
  }
}

async function insertVideoToSupabase(video: YouTubeVideo, gradientIndex: number) {
  const tags = categorizeVideo(video.title, video.description);

  const resource = {
    title: video.title, // Clean title without duration
    description: video.description.slice(0, 300) + (video.description.length > 300 ? '...' : ''),
    url: `https://www.youtube.com/watch?v=${video.id}`,
    category: 'video-tutorials',
    tags,
    source: `youtube-${video.channelTitle.toLowerCase().replace(/\s+/g, '-')}`,
    gradient: GRADIENTS[gradientIndex % GRADIENTS.length],
    featured: false,
    image_url: video.thumbnailUrl, // YouTube thumbnail
    thumbnail_url: video.thumbnailUrl, // Add thumbnail field
    published_at: video.publishedAt, // YouTube publish date
    channel_name: video.channelTitle, // Channel name
    duration: video.duration, // Video duration
  };

  try {
    // Check if video already exists
    const { data: existing } = await supabase
      .from('resources')
      .select('id')
      .eq('url', resource.url)
      .single();

    if (existing) {
      console.log(`⏭️  Skipped (already exists): ${video.title}`);
      return { success: false, reason: 'duplicate' };
    }

    const { data, error } = await supabase
      .from('resources')
      .insert([resource])
      .select();

    if (error) {
      console.error(`❌ Error inserting "${video.title}":`, error.message);
      return { success: false, reason: 'error', error };
    }

    console.log(`✅ Inserted: ${video.title} (${video.duration}) [${tags.slice(0, 3).join(', ')}]`);
    return { success: true, data };
  } catch (err) {
    console.error(`❌ Unexpected error inserting "${video.title}":`, err);
    return { success: false, reason: 'exception', error: err };
  }
}

async function fetchAndStoreYouTubeVideos() {
  console.log('🎬 Starting to fetch videos from YouTube channels...\n');

  if (!youtubeApiKey) {
    console.error('❌ YouTube API key not found in .env.local');
    console.log('💡 Add YOUTUBE_API_KEY=your-key-here to .env.local');
    return;
  }

  let totalFetched = 0;
  let totalInserted = 0;
  let totalSkipped = 0;
  let totalErrors = 0;
  let gradientIndex = 0;

  for (const [channelName, channelId] of Object.entries(DESIGN_CHANNELS)) {
    console.log(`\n📺 Fetching from: ${channelName}`);
    console.log(`   Channel ID: ${channelId}\n`);

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

  console.log('\n' + '='.repeat(60));
  console.log('📊 Summary:');
  console.log('='.repeat(60));
  console.log(`🎥 Total videos fetched: ${totalFetched}`);
  console.log(`✅ Successfully inserted: ${totalInserted}`);
  console.log(`⏭️  Skipped (duplicates): ${totalSkipped}`);
  console.log(`❌ Errors: ${totalErrors}`);
  console.log('='.repeat(60));

  console.log('\n📂 Channels processed:');
  Object.keys(DESIGN_CHANNELS).forEach(name => {
    console.log(`   - ${name}`);
  });
}

fetchAndStoreYouTubeVideos()
  .then(() => {
    console.log('\n✨ Done!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('\n💥 Fatal error:', err);
    process.exit(1);
  });

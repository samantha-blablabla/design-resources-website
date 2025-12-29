import dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const youtubeApiKey = process.env.YOUTUBE_API_KEY!;

// YouTube handles to get channel IDs for
const YOUTUBE_HANDLES = [
  '@DesignWithArash',
  '@OptimisticWeb',
  '@motiondesignschool',
  '@schoolofmotion',
  '@SonduckFilm',
  '@dopemotions',
  '@JoshGambrell',
  '@PonteRyuurui',
];

async function getChannelIdFromHandle(handle: string): Promise<{ handle: string; channelId: string | null; channelName: string | null }> {
  try {
    // Remove @ if present
    const cleanHandle = handle.replace('@', '');

    // Use YouTube API to search for the channel
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${cleanHandle}&key=${youtubeApiKey}`;

    const response = await fetch(searchUrl);
    const data = await response.json();

    if (data.items && data.items.length > 0) {
      const channelId = data.items[0].id.channelId || data.items[0].snippet.channelId;
      const channelName = data.items[0].snippet.channelTitle;
      return { handle, channelId, channelName };
    }

    return { handle, channelId: null, channelName: null };
  } catch (error) {
    console.error(`Error fetching ${handle}:`, error);
    return { handle, channelId: null, channelName: null };
  }
}

async function getAllChannelIds() {
  console.log('🔍 Fetching Channel IDs from YouTube handles...\n');

  if (!youtubeApiKey) {
    console.error('❌ YouTube API key not found');
    return;
  }

  const results = [];

  for (const handle of YOUTUBE_HANDLES) {
    console.log(`Fetching: ${handle}...`);
    const result = await getChannelIdFromHandle(handle);

    if (result.channelId) {
      console.log(`✅ ${result.channelName}: ${result.channelId}`);
      results.push(result);
    } else {
      console.log(`❌ Could not find channel for ${handle}`);
    }

    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 200));
  }

  console.log('\n' + '='.repeat(80));
  console.log('📋 Copy this to your DESIGN_CHANNELS object:\n');
  console.log('const DESIGN_CHANNELS = {');
  results.forEach(({ channelName, channelId }) => {
    console.log(`  '${channelName}': '${channelId}',`);
  });
  console.log('};\n');
  console.log('='.repeat(80));
}

getAllChannelIds()
  .then(() => {
    console.log('\n✨ Done!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('\n💥 Error:', err);
    process.exit(1);
  });

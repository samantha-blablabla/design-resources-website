// YouTube API Fetcher - Fetch videos from YouTube channels
import axios from 'axios';

export interface YouTubeVideo {
  title: string;
  description: string;
  youtubeId: string;
  url: string;
  channelName: string;
  channelId: string;
  thumbnailUrl: string;
  duration: string;
  publishedAt: Date;
  viewCount?: number;
}

/**
 * Convert ISO 8601 duration to readable format (e.g., "12:34")
 */
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

/**
 * Fetch recent videos from a YouTube channel
 */
export async function fetchYouTubeChannelVideos(
  channelId: string,
  maxResults: number = 10
): Promise<YouTubeVideo[]> {
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    console.error('❌ YOUTUBE_API_KEY not found in .env.local');
    return [];
  }

  try {
    console.log(`📺 Fetching videos from channel: ${channelId}`);

    // Step 1: Search for recent videos
    const searchResponse = await axios.get(
      'https://www.googleapis.com/youtube/v3/search',
      {
        params: {
          key: apiKey,
          channelId,
          part: 'snippet',
          order: 'date',
          type: 'video',
          maxResults,
          publishedAfter: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // Last 30 days
        },
      }
    );

    const videoIds = searchResponse.data.items.map((item: any) => item.id.videoId).join(',');

    if (!videoIds) {
      console.log(`⚠️  No videos found for channel ${channelId}`);
      return [];
    }

    // Step 2: Get video details (duration, views, etc.)
    const detailsResponse = await axios.get(
      'https://www.googleapis.com/youtube/v3/videos',
      {
        params: {
          key: apiKey,
          id: videoIds,
          part: 'snippet,contentDetails,statistics',
        },
      }
    );

    const videos: YouTubeVideo[] = detailsResponse.data.items.map((item: any) => ({
      title: item.snippet.title,
      description: item.snippet.description.substring(0, 200), // Max 200 chars
      youtubeId: item.id,
      url: `https://www.youtube.com/watch?v=${item.id}`,
      channelName: item.snippet.channelTitle,
      channelId: item.snippet.channelId,
      thumbnailUrl: item.snippet.thumbnails.maxres?.url || item.snippet.thumbnails.high.url,
      duration: parseDuration(item.contentDetails.duration),
      publishedAt: new Date(item.snippet.publishedAt),
      viewCount: parseInt(item.statistics.viewCount || '0'),
    }));

    console.log(`✅ Fetched ${videos.length} videos from ${videos[0]?.channelName || 'Unknown'}`);
    return videos;
  } catch (error: any) {
    console.error(`❌ Error fetching YouTube videos for ${channelId}:`, error.response?.data || error.message);
    return [];
  }
}

/**
 * Fetch videos from multiple channels
 */
export async function fetchMultipleChannels(
  channelIds: string[],
  maxResultsPerChannel: number = 5
): Promise<YouTubeVideo[]> {
  const results = await Promise.allSettled(
    channelIds.map((id) => fetchYouTubeChannelVideos(id, maxResultsPerChannel))
  );

  const allVideos: YouTubeVideo[] = [];
  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      allVideos.push(...result.value);
    } else {
      console.error(`❌ Failed to fetch channel ${channelIds[index]}:`, result.reason);
    }
  });

  return allVideos;
}

/**
 * Design-focused YouTube channels
 * Priority: Channels with high-quality design tips, tricks, and tutorials
 */
export const DESIGN_CHANNELS = {
  // UI/UX Design
  figma: 'UCQsVmhSa4X-G3lHlUtejzLA',
  designCourse: 'UCVyRiMvfUNMA1UPlDPzG5Ow',
  fluxAcademy: 'UCN7dywl5wDxTu1RM3eJ_h9Q',

  // Motion Design
  schoolOfMotion: 'UCMrvp_ektXMU0SAxHqjGehw', // School of Motion
  benMarriott: 'UCpjMuShip-p7ZyCGSiOp5xQ', // Ben Marriott (Satori Graphics)
  dopeMotions: 'UCcJ0_JjsmJcbUdS-wE95-lQ', // Dope Motions

  // General Design
  theFutur: 'UCXb4KUGZK5tZJUWMXukB1lg',
  jesseShowalter: 'UCvBGFeXbBrq3W9_0oNLJREQ',
};

/**
 * Filter videos to only include high-quality tutorial content
 */
export function filterQualityVideos(videos: YouTubeVideo[]): YouTubeVideo[] {
  const qualityKeywords = [
    'tip', 'tips', 'trick', 'tricks', 'tutorial', 'how to',
    'guide', 'learn', 'design', 'animation', 'motion',
    'beginner', 'advanced', 'master', 'technique'
  ];

  return videos.filter(video => {
    const titleLower = video.title.toLowerCase();
    const descLower = video.description.toLowerCase();

    // Must contain at least one quality keyword
    const hasQualityKeyword = qualityKeywords.some(keyword =>
      titleLower.includes(keyword) || descLower.includes(keyword)
    );

    // Exclude live streams, podcasts, announcements
    const excludeKeywords = ['live', 'stream', 'podcast', 'announcement', 'news'];
    const hasExcludeKeyword = excludeKeywords.some(keyword => titleLower.includes(keyword));

    return hasQualityKeyword && !hasExcludeKeyword;
  });
}

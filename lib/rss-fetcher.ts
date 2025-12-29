// RSS Fetcher - Fetch content from RSS feeds
import Parser from 'rss-parser';
import { fetchSmartImage } from './image-fetcher';

const parser = new Parser({
  customFields: {
    item: [
      ['media:content', 'mediaContent'],
      ['media:thumbnail', 'mediaThumbnail'],
      ['description', 'description'],
      ['content:encoded', 'contentEncoded'],
    ],
  },
});

export interface RSSItem {
  title: string;
  description: string;
  url: string;
  publishedAt: Date;
  source: string;
  imageUrl?: string;
  author?: string;
}

/**
 * Fetch and parse RSS feed with automatic image fetching
 */
export async function fetchRSSFeed(
  feedUrl: string,
  sourceName: string,
  autoFetchImages: boolean = true
): Promise<RSSItem[]> {
  try {
    console.log(`📡 Fetching RSS feed: ${sourceName}`);
    const feed = await parser.parseURL(feedUrl);

    const items: RSSItem[] = [];

    for (const item of feed.items) {
      // Extract image URL from various sources
      let imageUrl: string | undefined;
      if (item.mediaContent) {
        imageUrl = (item.mediaContent as any)?.$ ?.url;
      } else if (item.mediaThumbnail) {
        imageUrl = (item.mediaThumbnail as any)?.$ ?.url;
      } else if (item.enclosure?.url) {
        imageUrl = item.enclosure.url;
      }

      // If no image found and autoFetchImages is enabled, use logo/favicon (fast, no scraping needed)
      if (!imageUrl && autoFetchImages && item.link) {
        console.log(`🔍 No image in RSS, using Clearbit logo for: ${item.link}`);
        const { getLogoUrl } = await import('./image-fetcher');
        imageUrl = getLogoUrl(item.link);

        // Fallback to screenshot if logo fails (logo returns 404 for unknown domains)
        // Note: Clearbit will return transparent 1x1 pixel for unknown domains
      }

      // Clean description (remove HTML tags)
      let description = item.contentSnippet || item.description || '';
      description = description.replace(/<[^>]*>/g, '').trim();
      description = description.substring(0, 200); // Max 200 chars

      items.push({
        title: item.title || 'Untitled',
        description,
        url: item.link || '',
        publishedAt: item.pubDate ? new Date(item.pubDate) : new Date(),
        source: sourceName,
        imageUrl,
        author: (item as any).creator || (item as any).author,
      });
    }

    console.log(`✅ Fetched ${items.length} items from ${sourceName}`);
    return items;
  } catch (error) {
    console.error(`❌ Error fetching RSS feed ${sourceName}:`, error);
    return [];
  }
}

/**
 * Fetch multiple RSS feeds in parallel
 */
export async function fetchMultipleFeeds(
  feeds: Array<{ url: string; name: string }>,
  autoFetchImages: boolean = true
): Promise<RSSItem[]> {
  const results = await Promise.allSettled(
    feeds.map(({ url, name }) => fetchRSSFeed(url, name, autoFetchImages))
  );

  const allItems: RSSItem[] = [];
  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      allItems.push(...result.value);
    } else {
      console.error(`❌ Failed to fetch ${feeds[index].name}:`, result.reason);
    }
  });

  return allItems;
}

/**
 * RSS Feed sources
 * Note: Product Hunt removed due to low quality "Discussion | Link" items
 */
export const RSS_FEEDS = {
  inspiration: [
    // Dribbble RSS deprecated, using Behance only
    { url: 'https://www.behance.net/feeds/projects', name: 'Behance' },
    // Awwwards không có RSS public, bỏ qua
  ],
  articles: [
    { url: 'https://medium.com/feed/tag/design', name: 'Medium Design' },
    { url: 'https://www.smashingmagazine.com/feed/', name: 'Smashing Magazine' },
    { url: 'https://css-tricks.com/feed/', name: 'CSS-Tricks' },
    { url: 'https://alistapart.com/main/feed/', name: 'A List Apart' },
  ],
  resources: [
    // Product Hunt removed - low quality content
    // Will rely on YouTube tutorials and curated tools instead
  ],
};

// Image Fetcher - Automatically fetch images for resources without thumbnails
import axios from 'axios';
import * as cheerio from 'cheerio';

/**
 * Extract Open Graph image from a URL
 */
export async function fetchOGImage(url: string): Promise<string | null> {
  try {
    console.log(`🖼️  Fetching OG image from: ${url}`);

    const response = await axios.get(url, {
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; DesignResourceBot/1.0)',
      },
    });

    const $ = cheerio.load(response.data);

    // Try Open Graph image first
    let imageUrl = $('meta[property="og:image"]').attr('content');

    // Fallback to Twitter card image
    if (!imageUrl) {
      imageUrl = $('meta[name="twitter:image"]').attr('content');
    }

    // Fallback to first large image in content
    if (!imageUrl) {
      const firstImg = $('img').first().attr('src');
      if (firstImg) {
        imageUrl = firstImg;
      }
    }

    if (imageUrl) {
      // Convert relative URLs to absolute
      if (imageUrl.startsWith('//')) {
        imageUrl = 'https:' + imageUrl;
      } else if (imageUrl.startsWith('/')) {
        const baseUrl = new URL(url);
        imageUrl = `${baseUrl.protocol}//${baseUrl.host}${imageUrl}`;
      }

      console.log(`✅ Found OG image: ${imageUrl}`);
      return imageUrl;
    }

    console.log(`⚠️  No OG image found for: ${url}`);
    return null;
  } catch (error) {
    console.error(`❌ Error fetching OG image from ${url}:`, error);
    return null;
  }
}

/**
 * Get logo using Clearbit Logo API (free, high quality)
 * Extracts domain from URL and fetches company logo
 */
export function getLogoUrl(url: string, size: number = 256): string {
  try {
    const domain = new URL(url).hostname.replace('www.', '');
    return `https://logo.clearbit.com/${domain}`;
  } catch {
    return '';
  }
}

/**
 * Get favicon using Google Favicon Service
 */
export function getFaviconUrl(url: string, size: number = 256): string {
  try {
    const domain = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=${size}`;
  } catch {
    return '';
  }
}

/**
 * Get screenshot using public API service
 * Using screenshotone.com free tier (100 screenshots/month)
 */
export function getScreenshotUrl(url: string, width: number = 1200, height: number = 630): string {
  const encodedUrl = encodeURIComponent(url);

  // Alternative free services:
  // 1. apiflash.com (100 screenshots/month)
  // 2. screenshotapi.net (100 screenshots/month)
  // 3. screenshotmachine.com (100 screenshots/month)

  // Using URL2PNG alternative (no API key needed for basic usage)
  return `https://image.thum.io/get/width/${width}/crop/${height}/${url}`;
}

/**
 * Get Unsplash random image by topic (fallback option)
 */
export function getUnsplashPlaceholder(topic: string = 'design'): string {
  // Using Unsplash Source API (free, no API key needed)
  return `https://source.unsplash.com/featured/1200x630/?${encodeURIComponent(topic)},web-design`;
}

/**
 * Smart image fetcher - tries multiple methods
 */
export async function fetchSmartImage(
  url: string,
  topic?: string
): Promise<string | null> {
  // Method 1: Try to get Open Graph image
  const ogImage = await fetchOGImage(url);
  if (ogImage) {
    return ogImage;
  }

  // Method 2: Use screenshot service as fallback
  console.log(`📸 Using screenshot service for: ${url}`);
  return getScreenshotUrl(url);
}

/**
 * Batch fetch images for multiple URLs
 */
export async function batchFetchImages(
  urls: string[],
  delayMs: number = 1000
): Promise<Map<string, string | null>> {
  const results = new Map<string, string | null>();

  for (const url of urls) {
    const imageUrl = await fetchSmartImage(url);
    results.set(url, imageUrl);

    // Add delay to avoid rate limiting
    if (delayMs > 0) {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }

  return results;
}

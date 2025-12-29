import { NextResponse } from 'next/server';
import { fetchSmartImage, fetchOGImage, getScreenshotUrl } from '@/lib/image-fetcher';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json(
      {
        success: false,
        error: 'Missing URL parameter. Usage: /api/test-image-fetcher?url=https://example.com',
      },
      { status: 400 }
    );
  }

  try {
    console.log(`🧪 Testing image fetcher for: ${url}`);

    // Test Open Graph image extraction
    const ogImage = await fetchOGImage(url);

    // Get screenshot URL
    const screenshotUrl = getScreenshotUrl(url);

    // Test smart fetcher (tries OG first, then screenshot)
    const smartImage = await fetchSmartImage(url);

    return NextResponse.json({
      success: true,
      url,
      results: {
        openGraphImage: ogImage,
        screenshotUrl,
        smartImage,
        recommended: smartImage || screenshotUrl,
      },
      note: 'smartImage is the recommended choice (OG image if available, screenshot as fallback)',
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}

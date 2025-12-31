import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Combined endpoint to fetch all content types (videos, inspiration, resources)
// This reduces Vercel Cron Jobs from 4 to 2 (fetch-all + cleanup)

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const GROQ_API_KEY = process.env.GROQ_API_KEY;

// YouTube channels to fetch from
const YOUTUBE_CHANNELS = [
    { id: 'UCVyRiMvfUNMA1UPlDPzG5Ow', name: 'DesignCourse' },
    { id: 'UCPDGLCpPvLZQIFJdV8ZroTA', name: 'Flux Academy' },
    { id: 'UCzBkNPSxw15qrW_Y8p-oCUw', name: 'Jesse Showalter' },
    { id: 'UC-b3c7kxa5vU-bnmaROgvog', name: 'The Futur' },
    { id: 'UCZHkx_OyRXHb1D3XTqOidRw', name: 'Charli Marie' },
    { id: 'UCQ_DTLof0a_OrcuAlH9bIkA', name: 'Motion Design School' },
    { id: 'UCMrvLMUITAImCHMOhX88PYQ', name: 'School of Motion' },
    { id: 'UCVyRiMvfUNMA1UPlDPzG5Ow', name: 'SonduckFilm' },
    { id: 'UCFW5V23lFeq_EZ-n0l_Y-xg', name: 'Dope Motions' },
    { id: 'UCLtuLmuevwxQzkn6SMR6kZQ', name: 'DesignWithArash' },
    { id: 'UCOKHwx1VCdgnxwbjyb9Iu1g', name: 'Blender Guru' },
    { id: 'UCSLLdTBwLMfTKWCyqUmVwxg', name: 'Josh - Blender Bros' },
    { id: 'UCWWybvw9jnpOdJq_6wTHryA', name: 'Ryuu - Blender Bros' },
];

// Inspiration sources - RSS feeds + APIs
const INSPIRATION_SOURCES = {
    rss: [
        { url: 'https://www.awwwards.com/blog/feed/', source: 'Awwwards', limit: 3 },
        { url: 'https://packagingoftheworld.com/feed', source: 'Packaging of the World', limit: 3 },
    ],
    apis: [
        {
            url: 'https://www.artstation.com/api/v2/community/explore/projects/trending.json?page=1&per_page=3',
            source: 'ArtStation',
            type: 'artstation'
        },
    ]
};

// Parse ISO 8601 duration (PT1H2M3S) to readable format
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

// Auto-categorize and tag videos based on title and description
function categorizeVideo(title: string, description: string, channelName: string) {
    const combined = `${title} ${description} ${channelName}`.toLowerCase();

    let category = 'video-tutorials';
    const tags: string[] = [];

    // Categorize based on content
    if (combined.includes('ui') || combined.includes('interface')) tags.push('UI Design');
    if (combined.includes('ux') || combined.includes('user experience')) tags.push('UX Design');
    if (combined.includes('motion') || combined.includes('animation')) {
        tags.push('Motion Design');
        category = 'video-tutorials';
    }
    if (combined.includes('3d') || combined.includes('blender') || combined.includes('cinema 4d')) {
        tags.push('3D Design');
    }
    if (combined.includes('web design') || combined.includes('website')) tags.push('Web Design');
    if (combined.includes('logo') || combined.includes('branding')) tags.push('Branding');
    if (combined.includes('figma')) tags.push('Figma');
    if (combined.includes('adobe') || combined.includes('photoshop') || combined.includes('illustrator')) {
        tags.push('Adobe');
    }

    // Add channel-specific tags
    if (channelName.toLowerCase().includes('motion')) tags.push('Motion Graphics');
    if (channelName.toLowerCase().includes('blender')) tags.push('Blender');

    return { category, tags: tags.length > 0 ? tags : ['Design', 'Tutorial'] };
}

// Auto-categorize inspiration based on content with new categories
function categorizeInspiration(title: string, content: string, source: string) {
    const combined = `${title} ${content}`.toLowerCase();

    let category = 'inspiration'; // default
    const tags: string[] = [];

    // Category detection based on keywords
    if (combined.includes('packaging') || combined.includes('package') || combined.includes('label') || combined.includes('bottle')) {
        category = 'packaging-design';
        tags.push('Packaging');
    } else if (combined.includes('ui') || combined.includes('ux') || combined.includes('interface') || combined.includes('dashboard')) {
        category = 'ui-ux-design';
        tags.push('UI/UX');
    } else if (combined.includes('brand') || combined.includes('logo') || combined.includes('identity')) {
        category = 'branding-identity';
        tags.push('Branding');
    } else if (combined.includes('3d') || combined.includes('render') || combined.includes('cgi')) {
        category = '3d-digital-art';
        tags.push('3D Art');
    } else if (combined.includes('illustration') || combined.includes('character') || combined.includes('concept art')) {
        category = 'digital-illustration';
        tags.push('Illustration');
    } else if (combined.includes('typography') || combined.includes('font') || combined.includes('lettering')) {
        category = 'typography';
        tags.push('Typography');
    } else if (combined.includes('web design') || combined.includes('website')) {
        category = 'web-design';
        tags.push('Web Design');
    } else if (combined.includes('motion') || combined.includes('animation')) {
        category = 'motion-graphics';
        tags.push('Motion');
    } else if (combined.includes('architecture') || combined.includes('interior') || combined.includes('building')) {
        category = 'architecture-interior';
        tags.push('Architecture');
    } else if (combined.includes('photography') || combined.includes('photo')) {
        category = 'photography-art';
        tags.push('Photography');
    }

    // Add source-specific tags
    if (source === 'Packaging of the World') {
        category = 'packaging-design';
        tags.push('Packaging');
    } else if (source === 'ArtStation') {
        if (!tags.length) tags.push('Digital Art');
    }

    // Additional tags
    if (combined.includes('mobile') || combined.includes('app')) tags.push('Mobile');
    if (combined.includes('poster')) tags.push('Poster');
    if (combined.includes('print')) tags.push('Print');

    return { category, tags: tags.length > 0 ? tags : ['Design', 'Inspiration'] };
}

// Extract image from RSS content
function extractImage(content: string, link: string): string | null {
    // Try to extract image from content
    const imgMatch = content.match(/<img[^>]+src="([^">]+)"/i);
    if (imgMatch) return imgMatch[1];

    // Try to find direct image URL
    const urlMatch = content.match(/(https?:\/\/[^\s]+\.(jpg|jpeg|png|gif|webp))/i);
    if (urlMatch) return urlMatch[1];

    // For Dribbble/Behance, try to construct thumbnail URL from link
    if (link.includes('dribbble.com')) {
        const shotId = link.match(/\/shots\/(\d+)/);
        if (shotId) return `https://cdn.dribbble.com/users/${shotId[1]}/screenshots/${shotId[1]}/shot.png`;
    }

    return null;
}

export async function GET(request: NextRequest) {
    // Security: Only allow Vercel Cron to call this endpoint
    const cronHeader = request.headers.get('x-vercel-cron');
    if (cronHeader !== '1') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('🤖 Starting combined content fetch...');

    const results = {
        videos: { fetched: 0, inserted: 0, skipped: 0, errors: 0 },
        inspiration: { fetched: 0, inserted: 0, skipped: 0, errors: 0 },
        resources: { fetched: 0, inserted: 0, skipped: 0, errors: 0 },
    };

    try {
        // ===== FETCH YOUTUBE VIDEOS =====
        console.log('📺 Fetching YouTube videos...');

        for (const channel of YOUTUBE_CHANNELS) {
            try {
                const response = await fetch(
                    `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${channel.id}&part=snippet&order=date&maxResults=10&type=video`
                );

                if (!response.ok) {
                    console.error(`Failed to fetch from ${channel.name}`);
                    results.videos.errors++;
                    continue;
                }

                const data = await response.json();

                for (const item of data.items || []) {
                    results.videos.fetched++;

                    const videoId = item.id.videoId;
                    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

                    // Check if video already exists
                    const { data: existing } = await supabase
                        .from('resources')
                        .select('id')
                        .eq('url', videoUrl)
                        .single();

                    if (existing) {
                        results.videos.skipped++;
                        continue;
                    }

                    // Get video details for duration
                    const detailsResponse = await fetch(
                        `https://www.googleapis.com/youtube/v3/videos?key=${YOUTUBE_API_KEY}&id=${videoId}&part=contentDetails`
                    );
                    const detailsData = await detailsResponse.json();
                    const duration = detailsData.items?.[0]?.contentDetails?.duration || 'PT0S';

                    const { category, tags } = categorizeVideo(
                        item.snippet.title,
                        item.snippet.description,
                        channel.name
                    );

                    const { error } = await supabase.from('resources').insert({
                        title: item.snippet.title,
                        description: item.snippet.description?.substring(0, 500) || '',
                        url: videoUrl,
                        category,
                        tags,
                        thumbnail_url: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.default?.url,
                        channel_name: channel.name,
                        published_at: item.snippet.publishedAt,
                        duration: parseDuration(duration),
                        featured: false,
                    });

                    if (error) {
                        console.error(`Error inserting video: ${error.message}`);
                        results.videos.errors++;
                    } else {
                        results.videos.inserted++;
                    }
                }
            } catch (error: any) {
                console.error(`Error processing channel ${channel.name}:`, error.message);
                results.videos.errors++;
            }
        }

        // ===== FETCH INSPIRATION FROM RSS FEEDS =====
        console.log('🎨 Fetching inspiration from RSS feeds...');

        const Parser = (await import('rss-parser')).default;
        const parser = new Parser();

        for (const feed of INSPIRATION_SOURCES.rss) {
            try {
                const rssFeed = await parser.parseURL(feed.url);

                for (const item of rssFeed.items?.slice(0, feed.limit) || []) {
                    results.inspiration.fetched++;

                    const url = item.link || '';

                    // Check if already exists
                    const { data: existing } = await supabase
                        .from('resources')
                        .select('id')
                        .eq('url', url)
                        .single();

                    if (existing) {
                        results.inspiration.skipped++;
                        continue;
                    }

                    const imageUrl = extractImage(item.content || item.contentSnippet || '', url);
                    const { category, tags } = categorizeInspiration(
                        item.title || '',
                        item.content || item.contentSnippet || '',
                        feed.source
                    );

                    const { error } = await supabase.from('resources').insert({
                        title: item.title || 'Untitled',
                        description: (item.contentSnippet || item.content || '').substring(0, 500),
                        url,
                        category,
                        tags,
                        image_url: imageUrl,
                        source: feed.source,
                        published_at: item.pubDate || new Date().toISOString(),
                        featured: false,
                    });

                    if (error) {
                        console.error(`Error inserting inspiration from ${feed.source}: ${error.message}`);
                        results.inspiration.errors++;
                    } else {
                        console.log(`✅ Added [${category}] ${item.title?.substring(0, 50)}`);
                        results.inspiration.inserted++;
                    }
                }
            } catch (error: any) {
                console.error(`Error processing RSS feed ${feed.source}:`, error.message);
                results.inspiration.errors++;
            }
        }

        // ===== FETCH INSPIRATION FROM ARTSTATION API =====
        console.log('🎨 Fetching inspiration from ArtStation API...');

        for (const api of INSPIRATION_SOURCES.apis) {
            try {
                const response = await fetch(api.url, {
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                    }
                });

                if (!response.ok) {
                    console.error(`Failed to fetch from ${api.source}`);
                    results.inspiration.errors++;
                    continue;
                }

                const data = await response.json();

                for (const item of data.data || []) {
                    results.inspiration.fetched++;

                    const url = item.url || item.permalink;

                    // Check if already exists
                    const { data: existing } = await supabase
                        .from('resources')
                        .select('id')
                        .eq('url', url)
                        .single();

                    if (existing) {
                        results.inspiration.skipped++;
                        continue;
                    }

                    const { category, tags } = categorizeInspiration(
                        item.title || '',
                        item.description || '',
                        api.source
                    );

                    const { error } = await supabase.from('resources').insert({
                        title: item.title || 'Untitled',
                        description: item.description?.substring(0, 500) || `Artwork by ${item.user?.full_name || 'Artist'}`,
                        url,
                        category,
                        tags,
                        image_url: item.smaller_square_cover_url || item.cover_url,
                        source: api.source,
                        published_at: new Date().toISOString(),
                        featured: false,
                    });

                    if (error) {
                        console.error(`Error inserting from ${api.source}: ${error.message}`);
                        results.inspiration.errors++;
                    } else {
                        console.log(`✅ Added [${category}] ${item.title?.substring(0, 50)}`);
                        results.inspiration.inserted++;
                    }
                }
            } catch (error: any) {
                console.error(`Error processing API ${api.source}:`, error.message);
                results.inspiration.errors++;
            }
        }

        // ===== FETCH GRAPHIC DESIGN RESOURCES FROM GITHUB =====
        // DISABLED: GitHub repos are not downloadable design resources
        // Resources page should only contain:
        // - Downloadable brushes, fonts, mockups, UI kits, etc.
        // - Websites that provide downloadable design assets
        // NOT: GitHub repositories, tools, or libraries
        console.log('🎨 Skipping GitHub resources (disabled)...');

        /* DISABLED - GitHub fetching removed
        try {
            // Search for graphic design resource repositories
            const queries = [
                'topic:design-resources OR topic:brushes OR topic:textures',
                'topic:ui-kit OR topic:mockup OR topic:icons',
                'topic:fonts OR topic:typography OR topic:illustrations',
            ];

            for (const query of queries) {
                const response = await fetch(
                    `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=10`
                );

                if (!response.ok) continue;

                const data = await response.json();

                for (const repo of data.items || []) {
                    results.resources.fetched++;

                    const url = repo.html_url;

                    // Check if already exists
                    const { data: existing } = await supabase
                        .from('resources')
                        .select('id')
                        .eq('url', url)
                        .single();

                    if (existing) {
                        results.resources.skipped++;
                        continue;
                    }

                    // Auto-categorize based on repo topics and description
                    const combined = `${repo.name} ${repo.description || ''} ${(repo.topics || []).join(' ')}`.toLowerCase();
                    let category = 'templates'; // default
                    const tags: string[] = [];

                    if (combined.includes('brush') || combined.includes('procreate')) {
                        category = 'brushes';
                        tags.push('Brushes');
                    } else if (combined.includes('gradient')) {
                        category = 'gradients';
                        tags.push('Gradients');
                    } else if (combined.includes('texture')) {
                        category = 'textures';
                        tags.push('Textures');
                    } else if (combined.includes('pattern')) {
                        category = 'patterns';
                        tags.push('Patterns');
                    } else if (combined.includes('mockup')) {
                        category = 'mockups';
                        tags.push('Mockups');
                    } else if (combined.includes('ui-kit') || combined.includes('ui kit')) {
                        category = 'ui-kits';
                        tags.push('UI Kits');
                    } else if (combined.includes('icon')) {
                        category = 'icons';
                        tags.push('Icons');
                    } else if (combined.includes('font') || combined.includes('typography')) {
                        category = 'fonts';
                        tags.push('Fonts');
                    } else if (combined.includes('illustration')) {
                        category = 'illustrations';
                        tags.push('Illustrations');
                    } else if (combined.includes('3d')) {
                        category = '3d-assets';
                        tags.push('3D');
                    }

                    // Add additional tags from topics
                    const relevantTopics = (repo.topics || [])
                        .filter((t: string) => !t.includes('awesome') && !t.includes('list'))
                        .slice(0, 3);
                    tags.push(...relevantTopics);

                    const { error } = await supabase.from('resources').insert({
                        title: repo.name.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()),
                        description: repo.description || 'Open source design resource collection',
                        url,
                        category,
                        tags: tags.length > 0 ? tags : ['Design', 'Resources'],
                        image_url: repo.owner.avatar_url,
                        featured: repo.stargazers_count > 500,
                    });

                    if (error) {
                        console.error(`Error inserting resource: ${error.message}`);
                        results.resources.errors++;
                    } else {
                        results.resources.inserted++;
                    }
                }
            }
        } catch (error: any) {
            console.error('Error fetching GitHub resources:', error.message);
            results.resources.errors++;
        }
        */

        console.log('✅ Combined fetch completed:', results);

        return NextResponse.json({
            success: true,
            summary: results,
            totalFetched: results.videos.fetched + results.inspiration.fetched + results.resources.fetched,
            totalInserted: results.videos.inserted + results.inspiration.inserted + results.resources.inserted,
        });

    } catch (error: any) {
        console.error('Error in combined fetch:', error);
        return NextResponse.json(
            { success: false, error: error.message, results },
            { status: 500 }
        );
    }
}

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing required Supabase environment variables');
}

const supabase = createClient(supabaseUrl!, supabaseKey!);

// Design resources from Product Hunt
const PRODUCT_HUNT_TAG = 'design-tools';

const GRADIENTS = [
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
  'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
  'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
  'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
  'linear-gradient(135deg, #ff6e7f 0%, #bfe9ff 100%)',
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
];

// Curated list of design tools and resources
const DESIGN_RESOURCES = [
  // This will be populated from Product Hunt API or manual curation
  // For now, we'll use a simpler approach: GitHub trending for design repos
];

function categorizeResource(name: string, description: string): string[] {
  const text = (name + ' ' + description).toLowerCase();
  const tags: string[] = ['resource', 'tool'];

  // Tool categories
  if (text.match(/figma|sketch|adobe|xd/)) tags.push('design-tool', 'ui-design');
  if (text.match(/icon|svg/)) tags.push('icons');
  if (text.match(/color|palette/)) tags.push('color', 'palette');
  if (text.match(/font|typography|typeface/)) tags.push('typography', 'fonts');
  if (text.match(/illustration/)) tags.push('illustration');
  if (text.match(/photo|image|stock/)) tags.push('photography', 'stock');
  if (text.match(/ui kit|template/)) tags.push('ui-kit', 'template');
  if (text.match(/mockup/)) tags.push('mockup');
  if (text.match(/prototyp/)) tags.push('prototype', 'prototyping');
  if (text.match(/animation|motion/)) tags.push('animation', 'motion-design');
  if (text.match(/3d|blender|render/)) tags.push('3d');
  if (text.match(/ai|artificial intelligence|ml|machine learning/)) tags.push('ai', 'ai-powered');
  if (text.match(/code|developer|css|html|javascript/)) tags.push('code', 'development');
  if (text.match(/accessibility|a11y/)) tags.push('accessibility');
  if (text.match(/gradient/)) tags.push('gradient', 'color');
  if (text.match(/pattern/)) tags.push('pattern');

  if (tags.length === 2) tags.push('design', 'creative');

  return [...new Set(tags)];
}

async function fetchGitHubTrending() {
  try {
    // Fetch trending design-related repos from GitHub
    const query = 'topic:design OR topic:ui OR topic:design-system';
    const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=10`;

    const response = await fetch(url, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'DesignHub-Automation',
      },
    });

    if (!response.ok) {
      console.error('GitHub API error:', response.status);
      return [];
    }

    const data = await response.json();
    console.log(`📦 Fetched ${data.items?.length || 0} repos from GitHub`);

    return data.items?.map((repo: any) => ({
      title: repo.name,
      description: repo.description || 'No description available',
      url: repo.html_url,
      stars: repo.stargazers_count,
      language: repo.language,
      topics: repo.topics || [],
    })) || [];
  } catch (error) {
    console.error('❌ Error fetching GitHub trending:', error);
    return [];
  }
}

async function insertResourceToSupabase(resource: any, gradientIndex: number) {
  const tags = categorizeResource(resource.title, resource.description);

  // Add language tag if available
  if (resource.language) {
    tags.push(resource.language.toLowerCase());
  }

  // Add topic tags
  if (resource.topics) {
    tags.push(...resource.topics.slice(0, 3));
  }

  const dbResource = {
    title: resource.title,
    description: resource.description.slice(0, 300),
    url: resource.url,
    category: 'design-tools',
    tags: [...new Set(tags)],
    source: 'github-trending',
    gradient: GRADIENTS[gradientIndex % GRADIENTS.length],
    featured: resource.stars && resource.stars > 1000,
    image_url: null,
  };

  try {
    // Check if resource already exists
    const { data: existing } = await supabase
      .from('resources')
      .select('id')
      .eq('url', dbResource.url)
      .single();

    if (existing) {
      return { success: false, reason: 'duplicate' };
    }

    const { data, error } = await supabase
      .from('resources')
      .insert([dbResource])
      .select();

    if (error) {
      console.error(`❌ Error inserting "${resource.title}":`, error.message);
      return { success: false, reason: 'error', error };
    }

    console.log(`✅ Inserted: ${resource.title} (${resource.stars || 0} ⭐)`);
    return { success: true, data };
  } catch (err) {
    console.error(`❌ Unexpected error:`, err);
    return { success: false, reason: 'exception', error: err };
  }
}

export async function GET(request: NextRequest) {
  // Only allow requests from Vercel Cron Jobs
  const cronHeader = request.headers.get('x-vercel-cron');

  if (cronHeader !== '1') {
    return NextResponse.json({
      error: 'Unauthorized - This endpoint can only be called by Vercel Cron Jobs'
    }, { status: 401 });
  }

  console.log('🔧 Starting to fetch design resources from GitHub...\n');

  let totalFetched = 0;
  let totalInserted = 0;
  let totalSkipped = 0;
  let totalErrors = 0;
  let gradientIndex = 0;

  // Fetch from GitHub
  const githubRepos = await fetchGitHubTrending();
  totalFetched += githubRepos.length;

  for (const repo of githubRepos) {
    const result = await insertResourceToSupabase(repo, gradientIndex++);

    if (result.success) {
      totalInserted++;
    } else if (result.reason === 'duplicate') {
      totalSkipped++;
    } else {
      totalErrors++;
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 Summary:');
  console.log('='.repeat(60));
  console.log(`🔧 Total resources fetched: ${totalFetched}`);
  console.log(`✅ Successfully inserted: ${totalInserted}`);
  console.log(`⏭️  Skipped (duplicates): ${totalSkipped}`);
  console.log(`❌ Errors: ${totalErrors}`);
  console.log('='.repeat(60));

  return NextResponse.json({
    success: true,
    summary: {
      totalFetched,
      totalInserted,
      totalSkipped,
      totalErrors,
    },
  });
}

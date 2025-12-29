import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { DOMParser } from 'https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts';

const GRADIENTS = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
    'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
];

interface AIClassification {
    category: string;
    tags: string[];
    emoji: string;
    description: string;
}

async function classifyWithAI(title: string, url: string): Promise<AIClassification> {
    const openaiKey = Deno.env.get('OPENAI_API_KEY');

    if (!openaiKey) {
        // Fallback classification
        return {
            category: 'Design',
            tags: ['Design', 'Resource'],
            emoji: '🎨',
            description: `Design resource: ${title}`,
        };
    }

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${openaiKey}`,
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a design resource classifier. Classify design tools and resources into categories with relevant tags, emoji, and description. Return valid JSON only.',
                    },
                    {
                        role: 'user',
                        content: `Classify this design resource:\nTitle: ${title}\nURL: ${url}\n\nReturn JSON with: category (string), tags (array of 2-4 strings), emoji (single emoji), description (short 1-2 sentence description)`,
                    },
                ],
                response_format: { type: 'json_object' },
                temperature: 0.7,
            }),
        });

        const data = await response.json();
        const content = data.choices[0].message.content;
        return JSON.parse(content);
    } catch (error) {
        console.error('AI classification error:', error);
        return {
            category: 'Design',
            tags: ['Design', 'Resource'],
            emoji: '🎨',
            description: `Design resource: ${title}`,
        };
    }
}

function normalizeUrl(url: string): string {
    try {
        const urlObj = new URL(url);
        // Remove trailing slash, www, and convert to lowercase
        return urlObj.href.toLowerCase().replace(/\/$/, '').replace(/^https?:\/\/www\./, 'https://');
    } catch {
        return url.toLowerCase();
    }
}

function getRandomGradient(): string {
    return GRADIENTS[Math.floor(Math.random() * GRADIENTS.length)];
}

serve(async (req) => {
    try {
        const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
        const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
        const supabase = createClient(supabaseUrl, supabaseKey);

        // Fetch HTML from bookmarks.design
        const response = await fetch('https://www.bookmarks.design/');
        const html = await response.text();

        // Parse HTML
        const doc = new DOMParser().parseFromString(html, 'text/html');
        if (!doc) {
            throw new Error('Failed to parse HTML');
        }

        // Extract resources
        const resources: Array<{ title: string; url: string }> = [];
        const links = doc.querySelectorAll('a[href]');

        for (const link of links) {
            const url = link.getAttribute('href');
            const title = link.textContent?.trim();

            if (url && title && url.startsWith('http')) {
                resources.push({
                    title,
                    url: normalizeUrl(url),
                });
            }
        }

        // Remove duplicates from scraped data
        const uniqueResources = Array.from(
            new Map(resources.map(r => [r.url, r])).values()
        );

        // Process and insert with AI classification
        const inserted: any[] = [];
        const skipped: string[] = [];
        const errors: Array<{ url: string; error: string }> = [];

        for (const resource of uniqueResources) {
            try {
                // Check if URL already exists
                const { data: existing } = await supabase
                    .from('resources')
                    .select('id')
                    .eq('url', resource.url)
                    .maybeSingle();

                if (existing) {
                    skipped.push(resource.url);
                    continue;
                }

                // Classify with AI
                const classification = await classifyWithAI(resource.title, resource.url);

                // Insert new resource using upsert for additional safety
                const { data, error } = await supabase
                    .from('resources')
                    .upsert({
                        title: resource.title,
                        url: resource.url,
                        description: classification.description,
                        tags: classification.tags,
                        emoji: classification.emoji,
                        category: classification.category,
                        gradient: getRandomGradient(),
                    }, {
                        onConflict: 'url',
                        ignoreDuplicates: true,
                    })
                    .select()
                    .maybeSingle();

                if (error) {
                    console.error('Insert error:', error);
                    errors.push({ url: resource.url, error: error.message });
                } else if (data) {
                    inserted.push(data);
                } else {
                    skipped.push(resource.url);
                }

                // Rate limit AI calls
                await new Promise(resolve => setTimeout(resolve, 500));
            } catch (err: any) {
                errors.push({ url: resource.url, error: err.message });
            }
        }

        return new Response(
            JSON.stringify({
                success: true,
                totalFound: uniqueResources.length,
                inserted: inserted.length,
                skipped: skipped.length,
                errors: errors.length,
                data: inserted.slice(0, 10), // Return first 10 for preview
            }),
            {
                headers: { 'Content-Type': 'application/json' },
                status: 200,
            }
        );
    } catch (error: any) {
        return new Response(
            JSON.stringify({
                success: false,
                error: error.message,
            }),
            {
                headers: { 'Content-Type': 'application/json' },
                status: 500,
            }
        );
    }
});

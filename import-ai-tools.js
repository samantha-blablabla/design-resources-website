require('dotenv').config({ path: '.env.local' });

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const AI_TOOLS = [
    {
        title: "Midjourney",
        description: "AI-powered platform for creating stunning digital art",
        url: "https://midjourney.com/?via=toools",
        category: "ai-tools",
        tags: ["AI", "Image Generation", "Digital Art"],
        image_url: "https://cdn.prod.website-files.com/5ce10a4d0b5f0b560c22e756/63da37784207259ae5332fb7_midjourney.gif",
        source: "Toools.design",
        featured: true,
    },
    {
        title: "DALL·E",
        description: "Easily translate your ideas into exceptionally accurate images",
        url: "https://openai.com/index/dall-e-3/?via=toools",
        category: "ai-tools",
        tags: ["AI", "Image Generation", "OpenAI"],
        image_url: "https://cdn.prod.website-files.com/5ce10a4d0b5f0b560c22e756/636ac1cd91e958af818b91bc_dall-e-2.svg",
        source: "Toools.design",
        featured: true,
    },
    {
        title: "Adobe Firefly",
        description: "A suite of generative AI models and tools by Adobe",
        url: "https://firefly.adobe.com/?via=toools",
        category: "ai-tools",
        tags: ["AI", "Adobe", "Generative AI"],
        image_url: "https://cdn.prod.website-files.com/5ce10a4d0b5f0b560c22e756/68f9e95a857d167eec6d2b2c_adobe-firefly-generative-ai.svg",
        source: "Toools.design",
        featured: true,
    },
    {
        title: "Leonardo.Ai",
        description: "A unique suite of tools to leverage generative AI",
        url: "https://leonardo.ai/?via=toools",
        category: "ai-tools",
        tags: ["AI", "Image Generation", "Generative AI"],
        image_url: "https://cdn.prod.website-files.com/5ce10a4d0b5f0b560c22e756/6741a95680cda86f89b15098_leonardo-generative-ai-tools.svg",
        source: "Toools.design",
        featured: true,
    },
    {
        title: "Flux AI",
        description: "Next-generation image and video generator rivaling MidJourney",
        url: "https://flux-ai.io/?via=toools",
        category: "ai-tools",
        tags: ["AI", "Image Generation", "Video Generation"],
        image_url: "https://cdn.prod.website-files.com/5ce10a4d0b5f0b560c22e756/678cd370ac1c0e0346cabebf_flux-ai-image-video-generator.svg",
        source: "Toools.design",
        featured: true,
    },
    {
        title: "Runway",
        description: "An applied research company building the next era of art, entertainment and human creativity",
        url: "https://runwayml.com/?via=toools",
        category: "ai-tools",
        tags: ["AI", "Video Generation", "Creative Tools"],
        image_url: "https://cdn.prod.website-files.com/5ce10a4d0b5f0b560c22e756/6435236315d33e570b259f92_runway.svg",
        source: "Toools.design",
        featured: true,
    },
    {
        title: "Figma AI",
        description: "Your creativity, unblocked with Figma AI",
        url: "https://www.figma.com/ai/?via=toools",
        category: "ai-tools",
        tags: ["AI", "UI Design", "Figma"],
        image_url: "https://cdn.prod.website-files.com/5ce10a4d0b5f0b560c22e756/667e9c8b1a0e176b69c02923_figma-ai.svg",
        source: "Toools.design",
        featured: false,
    },
    {
        title: "ChatGPT",
        description: "AI-powered conversational assistant by OpenAI for various tasks",
        url: "https://chatgpt.com/?via=toools",
        category: "ai-tools",
        tags: ["AI", "Chatbot", "OpenAI", "Productivity"],
        image_url: "https://cdn.prod.website-files.com/5ce10a4d0b5f0b560c22e756/65c4b5a91ec22f7fa4f13bfd_chatgpt.svg",
        source: "Toools.design",
        featured: true,
    },
    {
        title: "Playground AI",
        description: "Create and edit images like a pro with the help of AI",
        url: "https://playgroundai.com/?via=toools",
        category: "ai-tools",
        tags: ["AI", "Image Generation", "Image Editing"],
        image_url: "https://cdn.prod.website-files.com/5ce10a4d0b5f0b560c22e756/64a3e2dbe20bb4386dc19da9_playground-ai.jpg",
        source: "Toools.design",
        featured: false,
    },
    {
        title: "Topaz Labs",
        description: "Professional-grade photo and video editing powered by AI",
        url: "https://www.topazlabs.com/?via=toools",
        category: "ai-tools",
        tags: ["AI", "Photo Editing", "Video Editing"],
        image_url: "https://cdn.prod.website-files.com/5ce10a4d0b5f0b560c22e756/6810a26082aa2f89fb6c2cb0_topaz-labs-ai-photo-video-editing.svg",
        source: "Toools.design",
        featured: false,
    },
    {
        title: "Krea",
        description: "An easy way to generate images, video and sound with AI",
        url: "https://www.krea.ai/?via=toools",
        category: "ai-tools",
        tags: ["AI", "Image Generation", "Video Generation", "Audio"],
        image_url: "https://cdn.prod.website-files.com/5ce10a4d0b5f0b560c22e756/6654a6d3ae3e7daa575c2424_krea.svg",
        source: "Toools.design",
        featured: false,
    },
    {
        title: "Webflow AI",
        description: "Build websites even faster with Webflow's new AI tools",
        url: "https://try.webflow.com/ai-features/?via=toools",
        category: "ai-tools",
        tags: ["AI", "Website Builder", "Webflow"],
        image_url: "https://cdn.prod.website-files.com/5ce10a4d0b5f0b560c22e756/670fa64ef970ac4eb109f976_webflow-ai-features.webp",
        source: "Toools.design",
        featured: false,
    },
    {
        title: "Framer AI",
        description: "Design better sites with AI. Start for free",
        url: "https://framer.link/ai-features_via_toools",
        category: "ai-tools",
        tags: ["AI", "Website Builder", "Framer"],
        image_url: "https://cdn.prod.website-files.com/5ce10a4d0b5f0b560c22e756/6660403095ca29e654b22ec3_framer-ai-features.svg",
        source: "Toools.design",
        featured: false,
    },
    {
        title: "Lovable",
        description: "Create apps and websites by chatting with AI",
        url: "https://lovable.dev/?via=toools",
        category: "ai-tools",
        tags: ["AI", "Website Builder", "App Builder", "No-Code"],
        image_url: "https://cdn.prod.website-files.com/5ce10a4d0b5f0b560c22e756/686524b3517396c273cd8dc7_lovable-vibe-coding-apps-websites.svg",
        source: "Toools.design",
        featured: false,
    },
    {
        title: "Looka",
        description: "AI-powered platform to design a logo and brand you love",
        url: "https://looka.grsm.io/toools",
        category: "ai-tools",
        tags: ["AI", "Logo Design", "Branding"],
        image_url: "https://cdn.prod.website-files.com/5ce10a4d0b5f0b560c22e756/635f979570620b9b91e25b00_looka.svg",
        source: "Toools.design",
        featured: false,
    },
    {
        title: "OpenArt",
        description: "Turns imagination into visual stories—from idea to final frame",
        url: "https://openart.ai/home/?via=toools",
        category: "ai-tools",
        tags: ["AI", "Image Generation", "Art"],
        image_url: "https://cdn.prod.website-files.com/5ce10a4d0b5f0b560c22e756/69345f6c0dd086d5fb823708_openart-ai-art-generator-and-editor.svg",
        source: "Toools.design",
        featured: false,
    },
    {
        title: "Uizard Autodesigner",
        description: "Generate multi screen mockups for apps and websites from simple text prompts",
        url: "https://uizard.io/autodesigner/?via=toools",
        category: "ai-tools",
        tags: ["AI", "UI Design", "Mockups"],
        image_url: "https://cdn.prod.website-files.com/5ce10a4d0b5f0b560c22e756/649af4eb1cf2bf9d0e5f2418_uizard.svg",
        source: "Toools.design",
        featured: false,
    },
    {
        title: "Visily",
        description: "Generate UI designs for apps and websites",
        url: "https://www.visily.ai/ai-ui-design-generator/?via=toools",
        category: "ai-tools",
        tags: ["AI", "UI Design", "Mockups"],
        image_url: "https://cdn.prod.website-files.com/5ce10a4d0b5f0b560c22e756/68f9f8fcdae95d58d11612a0_visily-ai-ui-design-generator.svg",
        source: "Toools.design",
        featured: false,
    },
    {
        title: "Fliki",
        description: "Easy to use Text to Video editor featuring lifelike voiceovers, dynamic AI video clips",
        url: "https://fliki.ai/?via=toools",
        category: "ai-tools",
        tags: ["AI", "Video Generation", "Text-to-Video", "Voiceover"],
        image_url: "https://cdn.prod.website-files.com/5ce10a4d0b5f0b560c22e756/68274e7022761d37c6caab06_fliki-ai-voices-text-to-video.webp",
        source: "Toools.design",
        featured: false,
    },
    {
        title: "Descript",
        description: "An AI-powered, fully featured, end-to-end video editor",
        url: "https://get.descript.com/os9eucsjt4dv",
        category: "ai-tools",
        tags: ["AI", "Video Editing", "Transcription"],
        image_url: "https://cdn.prod.website-files.com/5ce10a4d0b5f0b560c22e756/66604a296a25e6e3781ff67d_descript.svg",
        source: "Toools.design",
        featured: false,
    },
];

async function importAITools() {
    console.log('🤖 Importing AI Tools to Supabase...\n');
    console.log('='.repeat(60));

    let inserted = 0;
    let skipped = 0;
    let errors = 0;

    for (const tool of AI_TOOLS) {
        // Check if already exists
        const { data: existing } = await supabase
            .from('resources')
            .select('id')
            .eq('url', tool.url)
            .single();

        if (existing) {
            console.log(`⏭️  Skipped (exists): ${tool.title}`);
            skipped++;
            continue;
        }

        const { error } = await supabase.from('resources').insert(tool);

        if (error) {
            console.error(`❌ Error inserting ${tool.title}: ${error.message}`);
            errors++;
        } else {
            console.log(`✅ Inserted: ${tool.title}${tool.featured ? ' (Featured)' : ''}`);
            inserted++;
        }
    }

    console.log('\n' + '='.repeat(60));
    console.log('📊 Import Summary:');
    console.log('='.repeat(60));
    console.log(`Total tools: ${AI_TOOLS.length}`);
    console.log(`Inserted: ${inserted}`);
    console.log(`Skipped (exists): ${skipped}`);
    console.log(`Errors: ${errors}`);
    console.log(`Featured tools: ${AI_TOOLS.filter(t => t.featured).length}`);
    console.log('='.repeat(60));
}

importAITools();

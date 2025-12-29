// AI Categorizer - Using Groq API (FREE)
import axios from 'axios';

export interface CategorizationResult {
  category: string;
  tags: string[];
  emoji: string;
  gradient: string;
}

/**
 * Categorize content using Groq AI (FREE, fast)
 */
export async function categorizeWithAI(
  title: string,
  description: string,
  type: 'resource' | 'inspiration' | 'video' | 'article'
): Promise<CategorizationResult> {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    console.warn('⚠️  GROQ_API_KEY not found, using rule-based categorization');
    return categorizeByKeywords(title, description, type);
  }

  try {
    const categories = getCategoriesForType(type);
    const prompt = `Categorize this ${type} into ONE category from the list below.

Available categories: ${categories.join(', ')}

Title: ${title}
Description: ${description}

Return ONLY a valid JSON object in this exact format (no markdown, no extra text):
{"category": "category-name", "tags": ["tag1", "tag2", "tag3"]}`;

    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: 'You are a design categorization expert. Return only valid JSON.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.3,
        max_tokens: 100,
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const content = response.data.choices[0].message.content.trim();
    const parsed = JSON.parse(content);

    const category = parsed.category || 'design-tools';
    const tags = parsed.tags || [];

    return {
      category,
      tags,
      ...getEmojiAndGradient(category),
    };
  } catch (error: any) {
    console.error('❌ Groq AI error:', error.response?.data || error.message);
    console.log('⚠️  Falling back to keyword-based categorization');
    return categorizeByKeywords(title, description, type);
  }
}

/**
 * Get available categories for each content type
 */
function getCategoriesForType(type: string): string[] {
  switch (type) {
    case 'resource':
      return [
        'ui-kits',
        'icons',
        'illustrations',
        'photos',
        'typography',
        'colors',
        'design-tools',
        'ai',
        'accessibility',
        'prototyping',
        'patterns',
        'courses',
      ];
    case 'inspiration':
      return ['web', 'mobile', 'dashboard', 'branding', 'illustration'];
    case 'video':
      return ['fundamentals', 'tools', 'ui-ux', 'web', 'advanced'];
    case 'article':
      return ['ui-ux', 'web', 'typography', 'colors', 'tools', 'general'];
    default:
      return ['design-tools'];
  }
}

/**
 * Generate hashtags from content
 */
export function generateHashtags(
  title: string,
  description: string,
  category: string
): string[] {
  const text = `${title} ${description}`.toLowerCase();
  const hashtags = new Set<string>();

  // 1. Add category as hashtag
  hashtags.add(category.replace(/_/g, '-'));

  // 2. Extract tools
  if (text.match(/figma/)) hashtags.add('figma');
  if (text.match(/sketch/)) hashtags.add('sketch');
  if (text.match(/adobe[\s-]?xd|xd/)) hashtags.add('adobe-xd');
  if (text.match(/framer/)) hashtags.add('framer');
  if (text.match(/canva/)) hashtags.add('canva');
  if (text.match(/photoshop|ps/)) hashtags.add('photoshop');
  if (text.match(/illustrator|ai/)) hashtags.add('illustrator');
  if (text.match(/after[\s-]?effects/)) hashtags.add('after-effects');

  // 3. Extract pricing
  if (text.match(/\bfree\b/i)) hashtags.add('free');
  if (text.match(/premium|paid/i)) hashtags.add('premium');
  if (text.match(/freemium/i)) hashtags.add('freemium');
  if (text.match(/open.?source/i)) hashtags.add('open-source');

  // 4. Extract type/topic
  if (text.match(/ui|user interface/)) hashtags.add('ui-design');
  if (text.match(/ux|user experience/)) hashtags.add('ux-design');
  if (text.match(/prototype/)) hashtags.add('prototyping');
  if (text.match(/brand|logo|identity/)) hashtags.add('branding');
  if (text.match(/illustration|artwork/)) hashtags.add('illustration');
  if (text.match(/animation|motion/)) hashtags.add('animation');
  if (text.match(/3d/)) hashtags.add('3d');
  if (text.match(/typography|font|typeface/)) hashtags.add('typography');
  if (text.match(/color|palette/)) hashtags.add('color');
  if (text.match(/icon/)) hashtags.add('icons');
  if (text.match(/template/)) hashtags.add('template');

  // 5. Extract platform
  if (text.match(/web|website/)) hashtags.add('web');
  if (text.match(/mobile|app\b/)) hashtags.add('mobile');
  if (text.match(/ios|iphone|ipad/)) hashtags.add('ios');
  if (text.match(/android/)) hashtags.add('android');
  if (text.match(/desktop/)) hashtags.add('desktop');

  // 6. Extract level
  if (text.match(/beginner|basic|intro/)) hashtags.add('beginner');
  if (text.match(/advanced|expert|pro/)) hashtags.add('advanced');
  if (text.match(/tutorial|guide|how.?to/)) hashtags.add('tutorial');

  // 7. Extract special topics
  if (text.match(/accessibility|a11y|wcag/)) hashtags.add('accessibility');
  if (text.match(/responsive/)) hashtags.add('responsive');
  if (text.match(/landing.?page/)) hashtags.add('landing-page');
  if (text.match(/dashboard/)) hashtags.add('dashboard');
  if (text.match(/\bai\b|artificial intelligence/)) hashtags.add('ai');

  // Limit to 10 most relevant hashtags
  return Array.from(hashtags).slice(0, 10);
}

/**
 * Rule-based categorization (fallback, 100% free)
 */
export function categorizeByKeywords(
  title: string,
  description: string,
  type: string
): CategorizationResult {
  const text = `${title} ${description}`.toLowerCase();
  let category = 'design-tools'; // default
  let tags: string[] = [];

  // Resource categorization
  if (type === 'resource') {
    if (text.match(/icon|iconset|icon pack|svg icon/)) {
      category = 'icons';
      tags = ['Icons', 'SVG'];
    } else if (text.match(/ui kit|component|design system|template/)) {
      category = 'ui-kits';
      tags = ['UI Kit', 'Components'];
    } else if (text.match(/illustration|artwork|graphic|vector/)) {
      category = 'illustrations';
      tags = ['Illustrations', 'Graphics'];
    } else if (text.match(/photo|image|stock|picture/)) {
      category = 'photos';
      tags = ['Photos', 'Stock'];
    } else if (text.match(/font|typeface|typography/)) {
      category = 'typography';
      tags = ['Typography', 'Fonts'];
    } else if (text.match(/color|palette|gradient/)) {
      category = 'colors';
      tags = ['Colors', 'Palette'];
    } else if (text.match(/ai|artificial intelligence|gpt|machine learning/)) {
      category = 'ai';
      tags = ['AI', 'Tools'];
    } else if (text.match(/accessibility|a11y|wcag/)) {
      category = 'accessibility';
      tags = ['Accessibility', 'A11y'];
    } else if (text.match(/prototype|prototyping|mockup/)) {
      category = 'prototyping';
      tags = ['Prototyping', 'Mockups'];
    } else if (text.match(/course|tutorial|learning|education/)) {
      category = 'courses';
      tags = ['Course', 'Learning'];
    } else if (text.match(/figma|sketch|adobe|framer|tool/)) {
      category = 'design-tools';
      tags = ['Design Tools'];
    }
  }

  // Inspiration categorization
  else if (type === 'inspiration') {
    if (text.match(/web|website|landing page|homepage/)) {
      category = 'web';
      tags = ['Web Design'];
    } else if (text.match(/mobile|app|ios|android|iphone/)) {
      category = 'mobile';
      tags = ['Mobile', 'App Design'];
    } else if (text.match(/dashboard|data|analytics|chart/)) {
      category = 'dashboard';
      tags = ['Dashboard', 'Data Viz'];
    } else if (text.match(/brand|logo|identity|visual identity/)) {
      category = 'branding';
      tags = ['Branding', 'Identity'];
    } else if (text.match(/illustration|art|drawing/)) {
      category = 'illustration';
      tags = ['Illustration', 'Art'];
    }
  }

  // Video categorization
  else if (type === 'video') {
    if (text.match(/figma|sketch|adobe|framer|tool/)) {
      category = 'tools';
      tags = ['Tools', 'Software'];
    } else if (text.match(/ui|ux|user interface|user experience/)) {
      category = 'ui-ux';
      tags = ['UI/UX', 'Design'];
    } else if (text.match(/css|html|javascript|web|frontend/)) {
      category = 'web';
      tags = ['Web Design', 'Frontend'];
    } else if (text.match(/color|typography|layout|composition|principle/)) {
      category = 'fundamentals';
      tags = ['Fundamentals', 'Basics'];
    } else if (text.match(/design system|advanced|workflow|process/)) {
      category = 'advanced';
      tags = ['Advanced'];
    }
  }

  // Article categorization
  else if (type === 'article') {
    if (text.match(/ui|ux|user interface|user experience/)) {
      category = 'ui-ux';
      tags = ['UI/UX'];
    } else if (text.match(/css|html|javascript|web|frontend/)) {
      category = 'web';
      tags = ['Web Design'];
    } else if (text.match(/typography|font|typeface/)) {
      category = 'typography';
      tags = ['Typography'];
    } else if (text.match(/color|palette|gradient/)) {
      category = 'colors';
      tags = ['Colors'];
    } else if (text.match(/tool|software|app/)) {
      category = 'tools';
      tags = ['Tools'];
    } else {
      category = 'general';
      tags = ['Design'];
    }
  }

  // Generate hashtags based on category and content
  const hashtags = generateHashtags(title, description, category);

  return {
    category,
    tags: hashtags, // Use generated hashtags instead of generic tags
    ...getEmojiAndGradient(category),
  };
}

/**
 * Get emoji and gradient for category
 */
export function getEmojiAndGradient(category: string): { emoji: string; gradient: string } {
  const mappings: Record<string, { emoji: string; gradient: string }> = {
    // Resources
    'ui-kits': {
      emoji: '🎨',
      gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    },
    icons: {
      emoji: '⭐',
      gradient: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)',
    },
    illustrations: {
      emoji: '🎭',
      gradient: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)',
    },
    photos: {
      emoji: '📸',
      gradient: 'linear-gradient(135deg, #c1dfc4 0%, #deecdd 100%)',
    },
    typography: {
      emoji: '📝',
      gradient: 'linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%)',
    },
    colors: {
      emoji: '🌈',
      gradient: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
    },
    'design-tools': {
      emoji: '🔧',
      gradient: 'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)',
    },
    ai: {
      emoji: '🤖',
      gradient: 'linear-gradient(135deg, #cfd9df 0%, #e2ebf0 100%)',
    },
    accessibility: {
      emoji: '♿',
      gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    },
    prototyping: {
      emoji: '🔨',
      gradient: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
    },
    patterns: {
      emoji: '🧩',
      gradient: 'linear-gradient(135deg, #fdcbf1 0%, #e6dee9 100%)',
    },
    courses: {
      emoji: '🎓',
      gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    },

    // Inspiration
    web: {
      emoji: '🚀',
      gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    },
    mobile: {
      emoji: '📱',
      gradient: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)',
    },
    dashboard: {
      emoji: '📊',
      gradient: 'linear-gradient(135deg, #c1dfc4 0%, #deecdd 100%)',
    },
    branding: {
      emoji: '🎯',
      gradient: 'linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%)',
    },
    illustration: {
      emoji: '🎨',
      gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    },

    // Videos
    fundamentals: {
      emoji: '🎓',
      gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    },
    tools: {
      emoji: '⚡',
      gradient: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)',
    },
    'ui-ux': {
      emoji: '🎨',
      gradient: 'linear-gradient(135deg, #c1dfc4 0%, #deecdd 100%)',
    },
    advanced: {
      emoji: '🚀',
      gradient: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
    },

    // Articles
    general: {
      emoji: '📰',
      gradient: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
    },
  };

  return (
    mappings[category] || {
      emoji: '✨',
      gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    }
  );
}

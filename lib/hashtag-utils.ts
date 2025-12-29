/**
 * Hashtag utilities for display formatting
 */

/**
 * Convert hashtag to display name with proper capitalization
 * Examples:
 * - "ui-design" → "UI Design"
 * - "figma" → "Figma"
 * - "photoshop-tutorial" → "Photoshop Tutorial"
 * - "open-source" → "Open Source"
 * - "web-design" → "Web Design"
 */
export function formatHashtagDisplay(tag: string): string {
  // Replace dashes with spaces
  const withSpaces = tag.replace(/-/g, ' ');

  // Capitalize first letter of each word
  return withSpaces
    .split(' ')
    .map(word => {
      // Special cases for acronyms
      const upperWord = word.toUpperCase();
      if (['UI', 'UX', 'API', 'CSS', 'HTML', 'JS', 'AI', '3D', 'VR', 'AR'].includes(upperWord)) {
        return upperWord;
      }
      // Normal words: capitalize first letter
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
}

/**
 * Get color category for a hashtag
 */
export function getHashtagCategory(tag: string): string {
  // Pricing categories
  const freeKeywords = ['free', 'open-source'];
  const premiumKeywords = ['premium', 'paid', 'freemium'];

  // Tool categories
  const toolKeywords = ['figma', 'sketch', 'adobe-xd', 'framer', 'canva', 'design-tools', 'blender', 'after-effects', 'cinema-4d'];

  // Technology categories
  const aiKeywords = ['ai', 'ai-tools'];
  const codeKeywords = ['html', 'css', 'javascript', 'js', 'code', 'frontend', 'backend'];

  // Design categories
  const uiuxKeywords = ['ui-design', 'ux-design', 'ui-kits', 'prototyping', 'ui', 'ux', 'interface', 'user-experience'];
  const webKeywords = ['web-design', 'web', 'website', 'responsive'];
  const mobileKeywords = ['mobile', 'mobile-design', 'app-design', 'ios', 'android'];
  const brandingKeywords = ['branding', 'brand-identity', 'logo', 'identity'];
  const motionKeywords = ['motion-design', 'animation', 'motion-graphics', 'motion', 'kinetic-typography'];
  const threeDKeywords = ['3d', '3d-modeling', 'rendering', 'modeling'];

  // Content categories
  const iconsKeywords = ['icons', 'icon', 'svg'];
  const illustrationKeywords = ['illustration', 'illustrations', 'graphics'];
  const colorsKeywords = ['colors', 'color-theory', 'palette', 'gradients'];
  const typographyKeywords = ['typography', 'fonts', 'font', 'type'];

  // Learning categories
  const learningKeywords = ['tutorial', 'beginner', 'advanced', 'guide', 'learning', 'course', 'video'];

  // Special categories
  const accessibilityKeywords = ['accessibility', 'a11y', 'inclusive-design', 'wcag'];
  const systemKeywords = ['design-system', 'design-systems', 'tokens'];

  // Check categories
  if (freeKeywords.includes(tag)) return 'free';
  if (premiumKeywords.includes(tag)) return 'premium';
  if (toolKeywords.includes(tag)) return 'tool';
  if (aiKeywords.includes(tag)) return 'ai';
  if (codeKeywords.includes(tag)) return 'code';
  if (uiuxKeywords.includes(tag)) return 'design';
  if (webKeywords.includes(tag)) return 'web';
  if (mobileKeywords.includes(tag)) return 'mobile';
  if (brandingKeywords.includes(tag)) return 'branding';
  if (motionKeywords.includes(tag)) return 'motion';
  if (threeDKeywords.includes(tag)) return 'threed';
  if (iconsKeywords.includes(tag)) return 'icons';
  if (illustrationKeywords.includes(tag)) return 'illustration';
  if (colorsKeywords.includes(tag)) return 'colors';
  if (typographyKeywords.includes(tag)) return 'typography';
  if (learningKeywords.includes(tag)) return 'learning';
  if (accessibilityKeywords.includes(tag)) return 'accessibility';
  if (systemKeywords.includes(tag)) return 'system';

  return 'default';
}

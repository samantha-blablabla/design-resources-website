/**
 * Hashtag utilities for display formatting
 */

/**
 * Convert hashtag to display name
 * Examples:
 * - "ui-design" → "Ui design"
 * - "figma" → "Figma"
 * - "photoshop-tutorial" → "Photoshop tutorial"
 * - "open-source" → "Open source"
 */
export function formatHashtagDisplay(tag: string): string {
  // Replace dashes with spaces and capitalize first letter only
  const withSpaces = tag.replace(/-/g, ' ');
  return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1).toLowerCase();
}

/**
 * Get color category for a hashtag
 */
export function getHashtagCategory(tag: string): string {
  const freeKeywords = ['free', 'open-source'];
  const premiumKeywords = ['premium', 'paid', 'freemium'];
  const toolKeywords = ['figma', 'sketch', 'adobe-xd', 'framer', 'canva', 'design-tools'];
  const aiKeywords = ['ai', 'ai-tools'];
  const designKeywords = ['ui-design', 'ux-design', 'ui-kits', 'prototyping', 'ui', 'ux'];
  const learningKeywords = ['tutorial', 'beginner', 'advanced', 'guide', 'learning'];

  if (freeKeywords.includes(tag)) return 'free';
  if (premiumKeywords.includes(tag)) return 'premium';
  if (toolKeywords.includes(tag)) return 'tool';
  if (aiKeywords.includes(tag)) return 'ai';
  if (designKeywords.includes(tag)) return 'design';
  if (learningKeywords.includes(tag)) return 'learning';

  return 'default';
}

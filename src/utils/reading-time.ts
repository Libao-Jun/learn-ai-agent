/**
 * Estimate reading time for blog content.
 * Chinese text: ~400 chars/min (slower for technical content).
 * English text: ~200 words/min.
 */
export function getReadingTime(body: string): number {
  if (!body) return 1;

  // Strip markdown syntax: code blocks, images, links
  const clean = body
    .replace(/```[\s\S]*?```/g, '')
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/\[([^\]]*)\]\(.*?\)/g, '$1')
    .replace(/[#*_~>`\-|]/g, '')
    .replace(/<[^>]*>/g, '');

  // Count Chinese characters
  const chineseChars = (
    clean.match(/[一-鿿㐀-䶿]/g) || []
  ).length;

  // Count English words (non-Chinese text)
  const englishWords = clean
    .replace(/[一-鿿㐀-䶿]/g, '')
    .split(/\s+/)
    .filter(Boolean).length;

  const minutes = Math.ceil(chineseChars / 400 + englishWords / 200);
  return Math.max(1, minutes);
}

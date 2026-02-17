/**
 * Resolves a question image value to a displayable URL.
 * - data: URLs (base64) are returned as-is
 * - relative paths are resolved against public/questions/images/
 */
export function resolveImageUrl(image: string): string {
  if (image.startsWith('data:')) return image
  return `${import.meta.env.BASE_URL}questions/${image}`
}

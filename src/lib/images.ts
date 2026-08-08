export function isPreoptimizedImage(src: string) {
  return src.toLowerCase().endsWith('.webp')
}

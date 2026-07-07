/**
 * Cloudinary already serves CDN-optimized images; routing them through
 * Next's image optimizer just adds a second hop that can exceed the
 * optimizer's 7s upstream timeout on slow networks (observed locally as
 * intermittent 500s from /_next/image). Serve those directly instead.
 * Backend-hosted uploads (org logos, banners) stay optimized.
 */
export function skipOptimizer(src: string): boolean {
  return src.includes("res.cloudinary.com");
}

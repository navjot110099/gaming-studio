"use client";

type LoaderArgs = { src: string; width: number; quality?: number };

/**
 * Serves imagery straight from the Unsplash CDN (imgix), which resizes and
 * re-encodes on the fly. Keeps responsive srcsets without spending Vercel
 * image-optimisation quota.
 */
export default function unsplashLoader({ src, width, quality }: LoaderArgs) {
  const id = src.startsWith("photo-") ? src : `photo-${src}`;
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=${quality ?? 72}`;
}

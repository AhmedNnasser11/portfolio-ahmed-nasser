// Poster stills made by scripts/media.sh (exact clip frames, graded to #08090B).
// <picture> with art direction instead of next/image: the AVIFs are already
// encoded and next/image would re-encode them (docs/PLAN.md §3).
const SIZES = {
  d: { width: 1600, height: 892 },
  m: { width: 720, height: 606 },
} as const;

export type PosterName = "k1" | "k3" | "k5";

type Props = {
  name: PosterName;
  alt: string;
  className?: string;
  loading?: "eager" | "lazy";
};

export function Poster({ name, alt, className = "", loading = "lazy" }: Props) {
  return (
    <picture>
      <source
        media="(min-width: 48rem)"
        srcSet={`/media/posters/${name}-d.avif`}
        type="image/avif"
        width={SIZES.d.width}
        height={SIZES.d.height}
      />
      <img
        src={`/media/posters/${name}-m.avif`}
        width={SIZES.m.width}
        height={SIZES.m.height}
        alt={alt}
        loading={loading}
        decoding="async"
        className={`h-auto w-full ${className}`}
      />
    </picture>
  );
}

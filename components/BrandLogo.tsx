import Image from 'next/image';

export type BrandLogoProps = {
  /**
   * Choose a variant based on the background. Currently only the dark
   * variant is supplied by the client. Both variants fallback to the
   * dark version to avoid broken links.
   */
  variant?: 'light' | 'dark';
  /** Additional Tailwind classes applied to the wrapper */
  className?: string;
};

/**
 * Reusable logo component which loads the appropriate SVG based on the
 * variant prop. When no light variant exists the dark version is used.
 */
export default function BrandLogo({ variant = 'dark', className }: BrandLogoProps) {
  // Both variants point to the same file because the client only provided
  // a dark SVG. If a light variant becomes available, update the path
  // accordingly (e.g. '/assets/logos/vividreach-logo-light.svg').
  const src = '/assets/logos/vividreach-logo-dark.svg';
  const classes = ['h-auto', 'w-auto', className].filter(Boolean).join(' ');
  return (
    <Image
      src={src}
      alt="VividReach logo"
      width={280}
      height={80}
      className={classes}
      priority
    />
  );
}
import { cn } from '@/lib/utils';

// Brand icons are loaded by URL (Iconify – Font Awesome brand set), not bundled
// locally. Served as a black glyph; `dark:invert` flips it to white in dark mode.
const ICON_BASE = 'https://api.iconify.design/fa6-brands';

const ICONS = {
  github: 'github',
  linkedin: 'linkedin',
  x: 'x-twitter',
  stackoverflow: 'stack-overflow',
} as const;

export type SocialBrand = keyof typeof ICONS;

export function SocialIcon({
  brand,
  className,
}: {
  brand: SocialBrand;
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`${ICON_BASE}/${ICONS[brand]}.svg?color=%23000000`}
      alt=""
      aria-hidden="true"
      loading="lazy"
      className={cn('dark:invert', className)}
    />
  );
}

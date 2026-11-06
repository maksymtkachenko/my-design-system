import { assets } from '@mds/icons';

/** Exact Figma Icon/Plus/24 export; intentionally fixed at its authored size. */
export function PlusIcon({ label }: { label?: string }) {
  return <img src={`data:image/svg+xml,${encodeURIComponent(assets['plus-24'])}`}
    width={24} height={24} alt={label ?? ''} aria-hidden={label ? undefined : true} />;
}

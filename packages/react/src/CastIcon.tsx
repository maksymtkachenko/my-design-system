import { assets } from '@mds/icons';

export function CastIcon() {
  return <img src={`data:image/svg+xml,${encodeURIComponent(assets['cast-24'])}`}
    width={24} height={24} alt="" aria-hidden="true" />;
}

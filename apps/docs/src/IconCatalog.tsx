import { useState } from 'react';
import { iconCatalog, type CatalogIcon } from '@mds/icons/library';

export function iconLabel(icon: CatalogIcon) {
  return icon.name.split('/').slice(1, -1).join(' / ');
}

export const iconOptions = [...iconCatalog].sort((a, b) =>
  a.name.localeCompare(b.name) || a.id.localeCompare(b.id),
);

export function iconUrl(svg: string) {
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

export function PreviewIcon({ icon, light }: { icon: CatalogIcon; light: boolean }) {
  const ink = light ? '#000' : '#fff';
  const contrast = light ? '#fff' : '#000';
  const isStatus = icon.name.startsWith('Icon/Status/');
  const svg = icon.svg.replace(/<defs\b[^>]*>[\s\S]*?<\/defs>|\b(fill|stroke)="([^"]+)"/g, (attribute, property, paint) => {
    if (!property || !/^(#[\da-f]+|white|black)$/i.test(paint)) return attribute;
    const isDetail = isStatus && /^(white|#fff|#ffffff)$/i.test(paint);
    return `${property}="${isDetail ? contrast : ink}"`;
  });

  return <img className="testing-preview-icon" src={iconUrl(svg)} width={icon.size} height={icon.size}
    alt="" aria-hidden="true" />;
}

const pageSize = 60;

export function IconCatalog() {
  const [query, setQuery] = useState('');
  const [limit, setLimit] = useState(pageSize);
  const matches = iconOptions.filter(icon => icon.name.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <section className="reference-content reference-tokens" aria-labelledby="reference-icons">
      <h2 id="reference-icons">Iconography</h2>
      <p>Browse the FDS icon library at its authored sizes. All {iconCatalog.length} entries are available in the Icon Button picker.</p>
      <p>The library includes adaptations of <a href="https://feathericons.com/">Feather Icons</a> by Cole Bemis. <a href="./licenses/feather.txt">Feather license</a></p>
      <label className="reference-icon-search">
        Search icons
        <input type="search" value={query} onChange={event => {
          setQuery(event.target.value);
          setLimit(pageSize);
        }} placeholder="Try Cast or Status" />
      </label>
      <p aria-live="polite">{matches.length} matching icons</p>
      <ul className="reference-icon-grid">
        {matches.slice(0, limit).map(icon => (
          <li key={icon.id}>
            <img src={iconUrl(icon.svg)} alt="" width={icon.size} height={icon.size} loading="lazy" />
            <span>{iconLabel(icon)}</span>
            <small>{icon.size} px</small>
          </li>
        ))}
      </ul>
      {matches.length > limit && <button type="button" className="testing-motion"
        onClick={() => setLimit(value => value + pageSize)}>Show more icons</button>}
    </section>
  );
}

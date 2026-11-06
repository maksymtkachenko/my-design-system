import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Button, PlusIcon } from '@mds/react';
import '@fontsource/inter/600.css';
import '@mds/react/styles.css';
import './styles.css';

function App() {
  const [clicks, setClicks] = useState(0);
  return <main>
    <header><p className="eyebrow">PERSONAL DESIGN SYSTEM · 0.1.0</p><h1>Built from a shared foundation.</h1>
      <p>React for web. React Native for mobile. Tokens and assets shared across both.</p></header>
    <section><h2>Buttons</h2><p>Use Tab to inspect focus, hover for feedback, and click to test interaction.</p>
      <div className="grid">{(['primary', 'secondary', 'tertiary', 'tertiary-mono'] as const).map(variant =>
        <article key={variant}><h3>{variant.replace('-', ' ')}</h3>
          <div className="row"><Button variant={variant} label="Button" onClick={() => setClicks(c => c + 1)} /><Button variant={variant} size="small" label="Button" /></div>
          <div className="row"><Button variant={variant} label="Loading" loading /><Button variant={variant} size="small" label="Loading" loading /><Button variant={variant} label="Disabled" disabled /></div>
        </article>)}</div><p role="status">Button clicks: {clicks}</p>
    </section>
    <section><h2>Iconography</h2><p>The first exported asset: Plus, authored at 24px. Original SVG geometry and colors are preserved.</p><PlusIcon label="Plus" /></section>
    <section><h2>Connection status</h2><p>All four Figma library references are registered in the repository. Initial coverage: Button on web and mobile, Button tokens, Plus/24, and spinner assets. Other components and themes remain in the migration inventory.</p></section>
  </main>;
}
createRoot(document.getElementById('root')!).render(<App />);

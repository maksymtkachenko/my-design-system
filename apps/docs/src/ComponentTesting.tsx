import { useState } from 'react';
import { Button, CastIcon, IconButton, PlusIcon } from '@mds/react';
import { ComponentGuidelines, TokenReference } from './Reference';

const states = [
  ['interactive', 'Interactive'],
  ['default', 'Default'],
  ['pressed', 'Pressed'],
  ['focus', 'Keyboard focus'],
  ['disabled', 'Disabled'],
] as const;

const components = [
  { id: 'button', label: 'Button' },
  { id: 'icon-button', label: 'Icon Button' },
] as const;

export function ComponentTesting() {
  const [component, setComponent] = useState<(typeof components)[number]['id']>('icon-button');
  const [showTokens, setShowTokens] = useState(false);
  const [state, setState] = useState('interactive');
  const [background, setBackground] = useState('black');
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState('normal');
  const [icon, setIcon] = useState('cast');
  const [activations, setActivations] = useState(0);
  const isIconButton = component === 'icon-button';
  const activate = () => setActivations(count => count + 1);

  return (
    <div className="component-testing" id="component-testing">
      <aside className="testing-sidebar">
        <header className="testing-brand">
          <span className="testing-mark" aria-hidden="true">M</span>
          <div><strong>Maksym UI</strong><span>Design System Reference</span></div>
        </header>
        <nav className="testing-foundations" aria-labelledby="testing-foundations-title">
          <h2 id="testing-foundations-title">Foundations</h2>
          <button type="button" aria-pressed={showTokens} onClick={() => setShowTokens(true)}>
            <span className="testing-component-icon" aria-hidden="true" /> Design tokens
          </button>
        </nav>
        <nav aria-labelledby="testing-components-title">
          <h2 id="testing-components-title">Components</h2>
          <ul>
            {components.map(({ id, label }) => (
              <li key={id}>
                <button type="button" aria-pressed={!showTokens && component === id} onClick={() => {
                  setShowTokens(false);
                  if (component === id) return;
                  setComponent(id);
                  setState('interactive');
                  setActivations(0);
                }}>
                  <span className="testing-component-icon" aria-hidden="true" />
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <main className="testing-workspace">
        <header className="testing-toolbar">
          <span className="testing-canvas-label">{showTokens ? 'Foundations' : 'Canvas'}</span>
          <h1>{showTokens ? 'Design tokens' : isIconButton ? 'Icon Button' : 'Button'}</h1>
        </header>
        {showTokens ? <TokenReference /> : <>
          <div className="testing-display">
            <div className="testing-stage" role="region" aria-label="Component preview"
              data-background={background} data-playing={playing} data-preview-state={state} data-speed={speed}>
              {background === 'pattern' && <div className="testing-pattern" aria-hidden="true" />}
              <div className="testing-target">
                {isIconButton ? <IconButton label={icon === 'cast' ? 'Cast' : 'Add'}
                  icon={icon === 'cast' ? <CastIcon /> : <PlusIcon />}
                  disabled={state === 'disabled'} onClick={activate} /> :
                  <Button label="Test action" disabled={state === 'disabled'} loading={state === 'loading'} onClick={activate} />}
              </div>
            </div>
            <div className="testing-readout">
              <span>{background === 'pattern' && playing ? 'Background moving' : 'Background still'}</span>
              <span aria-live="polite">Activations: {activations}</span>
            </div>
          </div>
          <section className="testing-panel" aria-labelledby="testing-controls-title">
            <h2 id="testing-controls-title">Controls</h2>
            <div className="testing-controls">
              {isIconButton && <label>Icon
                <select value={icon} onChange={event => setIcon(event.target.value)}>
                  <option value="cast">Cast</option>
                  <option value="plus">Plus</option>
                </select>
              </label>}
              <label>State
                <select value={state} onChange={event => setState(event.target.value)}>
                  {states.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                  {!isIconButton && <option value="loading">Loading</option>}
                </select>
              </label>
              <label>Background
                <select value={background} onChange={event => {
                  setBackground(event.target.value);
                  setPlaying(false);
                }}>
                  <option value="pattern">Motion pattern</option>
                  <option value="black">Solid Black</option>
                  <option value="light">Solid light</option>
                </select>
              </label>
              {isIconButton && <label>Transition speed
                <select value={speed} onChange={event => setSpeed(event.target.value)}>
                  <option value="normal">Normal</option>
                  <option value="slow">Slow motion</option>
                </select>
              </label>}
              <button className="testing-motion" type="button" disabled={background !== 'pattern'}
                onClick={() => setPlaying(current => !current)}>
                {playing ? 'Pause background' : 'Play background'}
              </button>
            </div>
          </section>
          <ComponentGuidelines component={component} />
        </>}
      </main>
    </div>
  );
}

import { tokens } from '@mds/tokens';

const buttonExample = `import { Button } from '@mds/react';
import '@mds/react/styles.css';

export function SaveButton({ save, saving }: { save: () => void; saving: boolean }) {
  return (
    <Button
      label="Save changes"
      variant="primary"
      loading={saving}
      onClick={save}
    />
  );
}`;

const iconButtonExample = `import { CastIcon, IconButton } from '@mds/react';
import '@mds/react/styles.css';

export function CastButton({ openDevicePicker }: { openDevicePicker: () => void }) {
  return (
    <IconButton
      label="Cast"
      icon={<CastIcon />}
      onClick={openDevicePicker}
    />
  );
}`;

export function ComponentGuidelines({ component }: { component: 'button' | 'icon-button' }) {
  const isIconButton = component === 'icon-button';
  return (
    <section className="reference-content" aria-labelledby="reference-usage">
      <h2 id="reference-usage">Usage guidelines</h2>
      {isIconButton ? (
        <>
          <p>Use Icon Button for familiar actions in compact spaces, such as Cast in a video player.</p>
          <ul>
            <li>Give each button an accessible action label such as “Cast” or “Add”.</li>
            <li>Use a recognizable icon inside the 44 px touch target. Start with 24 px and compare the authored sizes and contrast in the playground.</li>
            <li>Use <code>aria-pressed</code> for actions that toggle a persistent state. The pressed fill fades in over 100 ms and out over 150 ms.</li>
          </ul>
        </>
      ) : (
        <>
          <p>Use Button for an action that benefits from a visible text label, such as saving a form.</p>
          <ul>
            <li>Start labels with a verb. Use Primary for the main action and Secondary or Tertiary for supporting actions.</li>
            <li>Use Loading during an in-progress action to prevent repeat activation. Use Disabled when the action is unavailable.</li>
            <li>Use <code>type="submit"</code> when the button submits a form.</li>
          </ul>
        </>
      )}
      <h2>React example</h2>
      <p>Import the component and shared stylesheet in a project that has access to the workspace package.</p>
      <pre><code>{isIconButton ? iconButtonExample : buttonExample}</code></pre>
    </section>
  );
}

function tokenName(group: string, key: string) {
  return `--mds-${group}-${key.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)}`;
}

export function TokenReference() {
  return (
    <section className="reference-content reference-tokens" aria-labelledby="reference-tokens">
      <h2 id="reference-tokens">Design tokens</h2>
      <p>Use semantic tokens to keep color, spacing, and typography consistent. The values below come directly from the shared token package.</p>
      <h3>Color</h3>
      <div className="reference-token-grid">
        {Object.entries(tokens.color).map(([name, value]) => (
          <div className="reference-token" key={name}>
            <span className="reference-swatch" aria-hidden="true"><span style={{ background: value }} /></span>
            <div><code>{tokenName('color', name)}</code><small>{value}</small></div>
          </div>
        ))}
      </div>
      <h3>Spacing and radius</h3>
      <div className="reference-token-grid">
        {Object.entries({ space: tokens.space, radius: tokens.radius }).flatMap(([group, scale]) =>
          Object.entries(scale).map(([name, value]) => (
            <div className="reference-token" key={tokenName(group, name)}>
              <div><code>{tokenName(group, name)}</code><small>{value} px</small></div>
            </div>
          )),
        )}
      </div>
      <h3>Typography</h3>
      <div className="reference-token-grid">
        {Object.entries(tokens.text).flatMap(([scale, values]) =>
          Object.entries(values).map(([name, value]) => (
            <div className="reference-token" key={tokenName(`text-${scale}`, name)}>
              <div><code>{tokenName(`text-${scale}`, name)}</code><small>{value}{name === 'weight' ? '' : ' px'}</small></div>
            </div>
          )),
        )}
        {Object.entries(tokens.font).map(([platform, family]) => (
          <div className="reference-token" key={platform}>
            <div><code>{tokenName('font', platform)}</code><small>{family}</small></div>
          </div>
        ))}
      </div>
      <h3>Using tokens</h3>
      <pre><code>{`/* Load @mds/tokens/styles.css in your app. */
.example {
  color: var(--mds-color-content-primary);
  padding: var(--mds-space-m);
  border-radius: var(--mds-radius-m);
}`}</code></pre>
    </section>
  );
}

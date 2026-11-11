import { useGlobals } from 'storybook/preview-api';
import type { Preview } from '@storybook/react-vite';
import '@fontsource/inter/600.css';
import '@mds/react/styles.css';
import '../apps/docs/src/styles.css';
const preview: Preview = {
  initialGlobals: { surface: 'black' },
  globalTypes: {
    surface: { description: 'Preview background', toolbar: { title: 'Background', icon: 'photo', dynamicTitle: true,
      items: [{ value: 'black', title: 'Black' }, { value: 'white', title: 'White' },
        { value: 'colorful', title: 'Colorful' }, { value: 'moving', title: 'Colorful (moving)' }] } },
  },
  parameters: {
    layout: 'fullscreen',
    controls: { expanded: true },
    options: { storySort: { order: ['Foundations', ['Design tokens', 'Icons'], 'Components'] } },
    backgrounds: { disable: true },
  },
  decorators: [(Story, context) => {
    const [globals, updateGlobals] = useGlobals();
    if (context.parameters.foundation) return <Story />;
    return <div>
    <label className="preview-background-control">Preview background
      <select aria-label="Preview background" value={globals.surface} onChange={event => updateGlobals({ surface: event.target.value })}>
        <option value="black">Black</option><option value="white">White</option>
        <option value="colorful">Colorful</option><option value="moving">Colorful (moving)</option>
      </select>
    </label>
    <div className="testing-stage" role="region" aria-label="Component preview"
      data-background={['moving', 'colorful'].includes(globals.surface) ? 'pattern' : globals.surface}
      data-playing={globals.surface === 'moving'}>
      {['pattern','colorful','moving'].includes(globals.surface) && <div className="testing-pattern" aria-hidden="true" />}
      <div className="testing-target"><Story /></div>
    </div></div>;
  }],
};
export default preview;


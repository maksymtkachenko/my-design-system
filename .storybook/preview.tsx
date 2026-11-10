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
  decorators: [(Story, context) => context.parameters.foundation ? <Story /> :
    <div className="testing-stage" role="region" aria-label="Component preview"
      data-background={['moving', 'colorful'].includes(context.globals.surface) ? 'pattern' : context.globals.surface}
      data-playing={context.globals.surface === 'moving'}>
      {['pattern','colorful','moving'].includes(context.globals.surface) && <div className="testing-pattern" aria-hidden="true" />}
      <div className="testing-target"><Story /></div>
    </div>],
};
export default preview;

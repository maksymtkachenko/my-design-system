import type { Preview } from '@storybook/react-vite';
import '@fontsource/inter/600.css';
import '@mds/react/styles.css';
import '../apps/docs/src/styles.css';
const preview: Preview = {
  initialGlobals: { surface: 'black' },
  globalTypes: {
    surface: { description: 'Preview background', toolbar: { title: 'Background', icon: 'photo', dynamicTitle: true,
      items: [{ value: 'black', title: 'Solid Black' }, { value: 'light', title: 'Solid light' },
        { value: 'pattern', title: 'Still pattern' }, { value: 'moving', title: 'Moving pattern' }] } },
  },
  parameters: {
    layout: 'fullscreen',
    controls: { expanded: true },
    options: { storySort: { order: ['Foundations', ['Design tokens', 'Icons'], 'Components'] } },
    backgrounds: { disable: true },
  },
  decorators: [(Story, context) => context.parameters.foundation ? <Story /> :
    <div className="testing-stage" role="region" aria-label="Component preview"
      data-background={context.globals.surface === 'moving' ? 'pattern' : context.globals.surface}
      data-playing={context.globals.surface === 'moving'}>
      {['pattern','moving'].includes(context.globals.surface) && <div className="testing-pattern" aria-hidden="true" />}
      <div className="testing-target"><Story /></div>
    </div>],
};
export default preview;

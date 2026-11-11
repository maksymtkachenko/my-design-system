import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';
addons.setConfig({ theme: create({ base: 'light', brandTitle: 'Maksym Design System', brandUrl: 'https://github.com/maksymtkachenko/my-design-system', colorPrimary: '#3355ff', colorSecondary: '#3355ff' }), sidebar: { showRoots: true } });

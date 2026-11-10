import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconCatalog } from './IconCatalog';
const meta = { title: 'Foundations/Icons', component: IconCatalog, parameters: { foundation: true, controls: { disable: true } } } satisfies Meta<typeof IconCatalog>;
export default meta;
export const Catalog: StoryObj<typeof meta> = {};

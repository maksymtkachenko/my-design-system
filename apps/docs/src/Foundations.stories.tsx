import type { Meta, StoryObj } from '@storybook/react-vite';
import { TokenReference } from './Reference';
const meta = { title: 'Foundations/Design tokens', component: TokenReference, parameters: { foundation: true, controls: { disable: true } } } satisfies Meta<typeof TokenReference>;
export default meta;
export const Reference: StoryObj<typeof meta> = {};

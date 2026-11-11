import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Rewind } from '@mds/react';

const meta = {
  title: 'Components/Rewind',
  component: Rewind,
  tags: ['autodocs'],
  args: { direction: 'forward', size: 'small', disabled: false, onClick: fn() },
  argTypes: {
    direction: { control: 'select', options: ['forward', 'backward'] },
    size: { control: 'select', options: ['small', 'large'] },
  },
  parameters: {
    docs: {
      description: {
        component: 'Skip forward or backward by a fixed interval. Bind onClick to the seek action and include the interval in the accessible label when known. Each activation plays a 400 ms turn and background pulse. Choose a colorful preview background to see the 6 px blur.',
      },
    },
  },
} satisfies Meta<typeof Rewind>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Forward: Story = {};
export const Backward: Story = { args: { direction: 'backward' } };
export const ForwardLarge: Story = { args: { size: 'large' } };
export const BackwardLarge: Story = { args: { direction: 'backward', size: 'large' } };
export const Disabled: Story = { args: { disabled: true } };

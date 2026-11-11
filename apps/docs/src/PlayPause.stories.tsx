import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import { PlayPause } from '@mds/react';
import { ComponentGuidelines } from './Reference';
const meta = {
  title: 'Components/Play Pause', component: PlayPause, tags: ['autodocs'],
  args: { onPlayingChange: fn(), playing: false, size: 'small', disabled: false },
  argTypes: { playing: { control: 'boolean' }, size: { control: 'select', options: ['x-small','small','large'] }, onPlayingChange: { action: 'playback requested' } },
  render: function Playback(args) {
    const [, updateArgs] = useArgs();
    return <PlayPause {...args} onPlayingChange={playing => { updateArgs({ playing }); args.onPlayingChange?.(playing); }} />;
  },
  parameters: { docs: { description: { component: 'Playback control from Figma, with a 200 ms reversible scale-and-crossfade and background pulse. Background blur is 6 px across all sizes and states, matching Figma component 6526:510. Reduced motion switches immediately. Bind playing to your media state.' } } },
} satisfies Meta<typeof PlayPause>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Playing: Story = { args: { playing: true } };
export const XSmall: Story = { args: { size: 'x-small' } };
export const Large: Story = { args: { size: 'large' } };
export const Disabled: Story = { args: { disabled: true } };
export const Guidelines: Story = { render: () => <ComponentGuidelines component="play-pause" />, parameters: { foundation: true, controls: { disable: true } } };

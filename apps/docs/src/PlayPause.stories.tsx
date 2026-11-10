import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import { PlayPause } from '@mds/react';
import { ComponentGuidelines } from './Reference';
const meta = {
  title: 'Components/Play Pause', component: PlayPause, tags: ['autodocs'],
  args: { onPlayingChange: fn(), playing: false, backgroundBlur: 6, size: 'small', disabled: false },
  argTypes: { backgroundBlur: { name: 'Background blur (px)', control: { type: 'range', min: 0, max: 24, step: 1 }, description: 'Blur behind the translucent circle. Figma default: 6 px; preview on Colorful to see the effect.' }, playing: { control: 'boolean' }, size: { control: 'select', options: ['x-small','small','large'] }, onPlayingChange: { action: 'playback requested' } },
  render: function Playback({ backgroundBlur, ...args }) {
    const [, updateArgs] = useArgs();
    return <PlayPause {...args} style={{ '--mds-playback-blur': `${backgroundBlur}px` } as CSSProperties} onPlayingChange={playing => { updateArgs({ playing }); args.onPlayingChange?.(playing); }} />;
  },
  parameters: { docs: { description: { component: 'Playback control from Figma, with a 200 ms reversible scale-and-crossfade and background pulse. Reduced motion switches immediately. Bind playing to your media state.' } } },
} satisfies Meta<React.ComponentProps<typeof PlayPause> & { backgroundBlur: number }>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Playing: Story = { args: { playing: true } };
export const XSmall: Story = { args: { size: 'x-small' } };
export const Large: Story = { args: { size: 'large' } };
export const Disabled: Story = { args: { disabled: true } };
export const Guidelines: Story = { render: () => <ComponentGuidelines component="play-pause" />, parameters: { foundation: true, controls: { disable: true } } };

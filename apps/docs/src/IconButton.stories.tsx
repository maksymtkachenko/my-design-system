import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconButton } from '@mds/react';
import { iconOptions, iconLabel, PreviewIcon } from './IconCatalog';
import { ComponentGuidelines } from './Reference';
const meta = {
  title: 'Components/Icon Button', component: IconButton, tags: ['autodocs'],
  args: { label: 'Cast', disabled: false, icon: null, iconId: '444-6376' },
  argTypes: { icon: { control: false }, iconId: { control: { type: 'select', labels: Object.fromEntries(iconOptions.map(icon => [icon.id, `${iconLabel(icon)} (${icon.size} px) · ${icon.id}`])) }, options: iconOptions.map(icon => icon.id), description: 'All 870 authored icons; color adapts to the preview background.' }, onClick: { action: 'activated' } },
  render: ({ iconId, ...args }, context) => {
    const icon = iconOptions.find(icon => icon.id === iconId)!;
    return <IconButton {...args} label={args.label === 'Cast' ? iconLabel(icon) : args.label}
      icon={<PreviewIcon icon={icon} light={context.globals.surface === 'light'} />} />;
  },
  parameters: { docs: { description: { component: 'A 44 px icon action without background blur. Press: 100 ms; release: 150 ms. Give every action an accessible label.' } } },
} satisfies Meta<React.ComponentProps<typeof IconButton> & { iconId: string }>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Disabled: Story = { args: { disabled: true } };
export const Pressed: Story = { decorators: [(Story) => <div className="testing-stage" data-preview-state="pressed" style={{ minHeight: 80, background: 'transparent' }}><Story /></div>] };
export const Guidelines: Story = { render: () => <ComponentGuidelines component="icon-button" />, parameters: { foundation: true, controls: { disable: true } } };

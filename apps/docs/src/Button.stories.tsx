import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@mds/react';
import { ComponentGuidelines } from './Reference';
const meta = {
  title: 'Components/Button', component: Button, tags: ['autodocs'],
  args: { label: 'Test action', variant: 'primary', size: 'large', loading: false, disabled: false },
  argTypes: { variant: { control: 'select', options: ['primary','secondary','tertiary','tertiary-mono'] },
    size: { control: 'select', options: ['large','small'] },
    leadingIcon: { control: false }, trailingIcon: { control: false }, onClick: { action: 'activated' } },
  parameters: { docs: { description: { component: 'Text actions with four variants, two sizes, and loading feedback. Use a verb for the label and one primary action per task.' } } },
} satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Small: Story = { args: { size: 'small' } };
export const Secondary: Story = { args: { variant: 'secondary' } };
export const Tertiary: Story = { args: { variant: 'tertiary' } };
export const TertiaryMono: Story = { args: { variant: 'tertiary-mono' } };
export const Loading: Story = { args: { loading: true } };
export const Disabled: Story = { args: { disabled: true } };
export const Guidelines: Story = { render: () => <ComponentGuidelines component="button" />, parameters: { foundation: true, controls: { disable: true } } };

import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { KCheckbox } from '../components/FormControls';

const meta: Meta<typeof KCheckbox> = {
  title: 'Components/KCheckbox',
  component: KCheckbox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text displayed next to the checkbox',
    },
    checked: {
      control: 'boolean',
      description: 'Whether the checkbox is checked (controlled)',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the checkbox',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Whether the checkbox is in an indeterminate state',
    },
    error: {
      control: 'text',
      description: 'Error message',
    },
    hint: {
      control: 'text',
      description: 'Hint text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof KCheckbox>;

export const Default: Story = {
  args: {
    label: 'I agree to the terms and conditions',
  },
};

export const Checked: Story = {
  args: {
    label: 'Subscribe to newsletter',
    checked: true,
  },
};

export const Uncontrolled: Story = {
  args: {
    label: 'Remember me',
    defaultChecked: true,
  },
};

export const WithError: Story = {
  args: {
    label: 'I agree',
    error: 'You must agree to continue',
  },
};

export const WithHint: Story = {
  args: {
    label: 'Subscribe to newsletter',
    hint: 'You can unsubscribe at any time',
  },
};

export const Indeterminate: Story = {
  args: {
    label: 'Select all',
    indeterminate: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled checkbox',
    disabled: true,
  },
};

export const WithoutLabel: Story = {
  args: {},
};

export const FullWidth: Story = {
  args: {
    label: 'Full width checkbox',
    fullWidth: true,
  },
};

export const Interactive: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <KCheckbox
        label="Click me to toggle"
        checked={checked}
        onChange={(e) => setChecked(e.value)}
      />
    );
  },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <KCheckbox label="Unchecked" />
      <KCheckbox label="Checked" checked />
      <KCheckbox label="Indeterminate" indeterminate />
      <KCheckbox label="Disabled" disabled />
      <KCheckbox label="Disabled Checked" disabled checked />
      <KCheckbox label="With Error" error="This field is required" />
      <KCheckbox label="With Hint" hint="This is a helpful hint" />
    </div>
  ),
};

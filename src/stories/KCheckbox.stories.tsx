import type { Meta, StoryObj } from '@storybook/react';
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


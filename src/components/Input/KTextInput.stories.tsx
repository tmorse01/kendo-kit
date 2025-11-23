import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { KTextInput } from './KTextInput';

const meta: Meta<typeof KTextInput> = {
  title: 'Components/Input/KTextInput',
  component: KTextInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof KTextInput>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'you@example.com',
  },
};

export const WithLabelAndHint: Story = {
  args: {
    label: 'Email Address',
    hint: 'We will never share your email with anyone else.',
    placeholder: 'you@example.com',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email Address',
    error: 'Please enter a valid email address',
    placeholder: 'you@example.com',
  },
};

export const Required: Story = {
  args: {
    label: 'Full Name',
    required: true,
    placeholder: 'John Doe',
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Full Width Input',
    fullWidth: true,
    placeholder: 'This input takes full width',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    value: 'Cannot edit this',
    disabled: true,
  },
};

export const Types: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <KTextInput label="Text" type="text" placeholder="Text input" />
      <KTextInput label="Email" type="email" placeholder="email@example.com" />
      <KTextInput label="Password" type="password" placeholder="Enter password" />
      <KTextInput label="Tel" type="tel" placeholder="+1 (555) 123-4567" />
      <KTextInput label="URL" type="url" placeholder="https://example.com" />
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <KTextInput
        label="Controlled Input"
        value={value}
        onChange={(e) => setValue(e.value || '')}
        placeholder="Type something..."
        hint={`Current value: "${value}"`}
      />
    );
  },
};

export const Uncontrolled: Story = {
  args: {
    label: 'Uncontrolled Input',
    defaultValue: 'Initial value',
    placeholder: 'This has a default value',
  },
};


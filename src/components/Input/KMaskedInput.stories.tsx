import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { KMaskedInput } from './KMaskedInput';

const meta: Meta<typeof KMaskedInput> = {
  title: 'Components/Input/KMaskedInput',
  component: KMaskedInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof KMaskedInput>;

export const Default: Story = {
  args: {
    label: 'Phone Number',
    mask: '000-000-0000',
    placeholder: '123-456-7890',
  },
};

export const Phone: Story = {
  args: {
    label: 'Phone Number',
    mask: '(000) 000-0000',
    placeholder: '(555) 123-4567',
    hint: 'Enter your phone number',
  },
};

export const CreditCard: Story = {
  args: {
    label: 'Credit Card',
    mask: '0000-0000-0000-0000',
    placeholder: '1234-5678-9012-3456',
    includeLiterals: false,
  },
};

export const Date: Story = {
  args: {
    label: 'Date',
    mask: '00/00/0000',
    placeholder: 'MM/DD/YYYY',
  },
};

export const WithError: Story = {
  args: {
    label: 'Phone Number',
    mask: '000-000-0000',
    error: 'Please enter a valid phone number',
    placeholder: '123-456-7890',
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <KMaskedInput
        label="Controlled Masked Input"
        mask="000-000-0000"
        value={value}
        onChange={(e) => setValue(e.value || '')}
        placeholder="123-456-7890"
        hint={`Current value: "${value}"`}
      />
    );
  },
};

export const Required: Story = {
  args: {
    label: 'Phone Number',
    mask: '000-000-0000',
    required: true,
    placeholder: '123-456-7890',
  },
};

export const WithLabelAndHint: Story = {
  args: {
    label: 'Phone Number',
    mask: '000-000-0000',
    hint: 'Format: XXX-XXX-XXXX',
    placeholder: '123-456-7890',
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Phone Number',
    mask: '000-000-0000',
    fullWidth: true,
    placeholder: '123-456-7890',
  },
};


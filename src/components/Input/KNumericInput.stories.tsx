import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { KNumericInput } from './KNumericInput';

const meta: Meta<typeof KNumericInput> = {
  title: 'Components/Input/KNumericInput',
  component: KNumericInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof KNumericInput>;

export const Default: Story = {
  args: {
    placeholder: 'Enter number...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Price',
    placeholder: '0.00',
  },
};

export const WithConstraints: Story = {
  args: {
    label: 'Quantity',
    min: 1,
    max: 100,
    step: 1,
    defaultValue: 1,
  },
};

export const Currency: Story = {
  args: {
    label: 'Price',
    format: 'c2',
    min: 0,
    placeholder: '0.00',
    hint: 'Enter price in USD',
  },
};

export const Percentage: Story = {
  args: {
    label: 'Discount',
    format: 'p0',
    min: 0,
    max: 100,
    placeholder: '0',
    hint: 'Enter discount percentage',
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<number | null>(0);
    return (
      <KNumericInput
        label="Controlled Numeric"
        value={value}
        onChange={(e) => setValue(e.value)}
        min={0}
        max={1000}
        hint={`Current value: ${value}`}
      />
    );
  },
};

export const NoSpinners: Story = {
  args: {
    label: 'Number without spinners',
    spinners: false,
    placeholder: 'Enter number',
  },
};

export const WithError: Story = {
  args: {
    label: 'Price',
    error: 'Price must be between $0 and $1000',
    min: 0,
    max: 1000,
  },
};

export const Required: Story = {
  args: {
    label: 'Quantity',
    required: true,
    min: 1,
    defaultValue: 1,
  },
};


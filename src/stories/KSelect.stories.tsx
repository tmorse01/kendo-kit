import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { KSelect } from '../components/Select';
import type { KOption } from '../types';

const meta: Meta<typeof KSelect> = {
  title: 'Components/KSelect',
  component: KSelect,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof KSelect>;

const basicOptions: KOption[] = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
  { label: 'Option 4', value: '4' },
];

const countryOptions: KOption[] = [
  { label: 'United States', value: 'us' },
  { label: 'Canada', value: 'ca' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'Germany', value: 'de' },
  { label: 'France', value: 'fr' },
  { label: 'Japan', value: 'jp' },
];

export const Default: Story = {
  args: {
    options: basicOptions,
    placeholder: 'Select an option',
  },
};

export const WithLabel: Story = {
  args: {
    options: basicOptions,
    label: 'Choose an option',
    placeholder: 'Select an option',
  },
};

export const WithLabelAndHint: Story = {
  args: {
    options: basicOptions,
    label: 'Country',
    hint: 'Select your country of residence',
    placeholder: 'Select a country',
  },
};

export const WithError: Story = {
  args: {
    options: basicOptions,
    label: 'Country',
    error: 'Please select a valid country',
    placeholder: 'Select a country',
  },
};

export const Required: Story = {
  args: {
    options: basicOptions,
    label: 'Required Field',
    required: true,
    placeholder: 'Select an option',
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<string | number | null>('2');
    return (
      <div style={{ maxWidth: '300px' }}>
        <KSelect
          options={basicOptions}
          label="Controlled Select"
          value={value ?? undefined}
          onChange={(newValue) => setValue(newValue)}
        />
        <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#666' }}>
          Selected value: {value ?? 'none'}
        </p>
      </div>
    );
  },
};

export const Loading: Story = {
  args: {
    options: basicOptions,
    label: 'Loading State',
    isLoading: true,
    placeholder: 'Loading...',
  },
};

export const Disabled: Story = {
  args: {
    options: basicOptions,
    label: 'Disabled Select',
    disabled: true,
    value: '2',
  },
};

export const FullWidth: Story = {
  args: {
    options: countryOptions,
    label: 'Country (Full Width)',
    fullWidth: true,
    placeholder: 'Select a country',
  },
};

export const WithManyOptions: Story = {
  args: {
    options: Array.from({ length: 50 }, (_, i) => ({
      label: `Option ${i + 1}`,
      value: `${i + 1}`,
    })),
    label: 'Select from many options',
    placeholder: 'Choose an option',
  },
};


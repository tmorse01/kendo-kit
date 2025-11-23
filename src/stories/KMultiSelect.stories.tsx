import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { KMultiSelect } from '../components/Select';
import type { KOption } from '../types';

const meta: Meta<typeof KMultiSelect> = {
  title: 'Components/KMultiSelect',
  component: KMultiSelect,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof KMultiSelect>;

const basicOptions: KOption[] = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
  { label: 'Option 4', value: '4' },
  { label: 'Option 5', value: '5' },
];

const tagOptions: KOption[] = [
  { label: 'React', value: 'react' },
  { label: 'TypeScript', value: 'typescript' },
  { label: 'JavaScript', value: 'javascript' },
  { label: 'Vue', value: 'vue' },
  { label: 'Angular', value: 'angular' },
  { label: 'Svelte', value: 'svelte' },
];

export const Default: Story = {
  args: {
    options: basicOptions,
    placeholder: 'Select options',
  },
};

export const WithLabel: Story = {
  args: {
    options: basicOptions,
    label: 'Choose multiple options',
    placeholder: 'Select options',
  },
};

export const WithLabelAndHint: Story = {
  args: {
    options: tagOptions,
    label: 'Skills',
    hint: 'Select all skills that apply',
    placeholder: 'Select skills',
  },
};

export const WithError: Story = {
  args: {
    options: basicOptions,
    label: 'Required Selection',
    error: 'Please select at least one option',
    placeholder: 'Select options',
  },
};

export const Required: Story = {
  args: {
    options: basicOptions,
    label: 'Required Multi-Select',
    required: true,
    placeholder: 'Select at least one option',
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<(string | number)[]>(['1', '3']);
    return (
      <div style={{ maxWidth: '400px' }}>
        <KMultiSelect
          options={basicOptions}
          label="Controlled Multi-Select"
          value={value}
          onChange={(newValue) => setValue(newValue)}
        />
        <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#666' }}>
          Selected values: {value.length > 0 ? value.join(', ') : 'none'}
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
    label: 'Disabled Multi-Select',
    disabled: true,
    value: ['1', '2'],
  },
};

export const FullWidth: Story = {
  args: {
    options: tagOptions,
    label: 'Skills (Full Width)',
    fullWidth: true,
    placeholder: 'Select skills',
  },
};

export const WithPreselectedValues: Story = {
  args: {
    options: tagOptions,
    label: 'Preselected Skills',
    value: ['react', 'typescript'],
    placeholder: 'Select skills',
  },
};


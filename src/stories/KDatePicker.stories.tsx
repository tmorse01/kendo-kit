import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { KDatePicker } from '../components/DatePicker';

const meta: Meta<typeof KDatePicker> = {
  title: 'Components/KDatePicker',
  component: KDatePicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text displayed above the date picker',
    },
    error: {
      control: 'text',
      description: 'Error message',
    },
    hint: {
      control: 'text',
      description: 'Hint text',
    },
    format: {
      control: 'text',
      description: 'Date format string',
    },
  },
};

export default meta;
type Story = StoryObj<typeof KDatePicker>;

export const Default: Story = {
  args: {
    label: 'Birth Date',
  },
};

export const WithValue: Story = {
  args: {
    label: 'Start Date',
    value: new Date(2024, 0, 1),
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<Date | null>(new Date());
    return (
      <KDatePicker
        label="Controlled Date Picker"
        value={value}
        onChange={(e) => setValue(e.value)}
      />
    );
  },
};

export const WithError: Story = {
  args: {
    label: 'Date',
    error: 'Please select a valid date',
  },
};

export const WithHint: Story = {
  args: {
    label: 'Date',
    hint: 'Select a date from the calendar',
  },
};

export const Required: Story = {
  args: {
    label: 'Date',
    required: true,
  },
};

export const WithMinMax: Story = {
  args: {
    label: 'Date',
    min: new Date(2020, 0, 1),
    max: new Date(2030, 11, 31),
    hint: 'Select a date between 2020 and 2030',
  },
};

export const CustomFormat: Story = {
  args: {
    label: 'Date',
    format: 'dd/MM/yyyy',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Date',
    disabled: true,
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Date',
    fullWidth: true,
  },
};


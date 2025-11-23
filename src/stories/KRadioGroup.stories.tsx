import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { KRadioGroup } from '../components/FormControls';
import { KRadio } from '../components/FormControls';

const meta: Meta<typeof KRadioGroup> = {
  title: 'Components/KRadioGroup',
  component: KRadioGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    name: {
      control: 'text',
      description: 'Name attribute for all radio buttons',
    },
    label: {
      control: 'text',
      description: 'Label text displayed above the group',
    },
    error: {
      control: 'text',
      description: 'Error message',
    },
    hint: {
      control: 'text',
      description: 'Hint text',
    },
    direction: {
      control: 'select',
      options: ['row', 'column'],
      description: 'Layout direction',
    },
  },
};

export default meta;
type Story = StoryObj<typeof KRadioGroup>;

const options = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
];

export const Default: Story = {
  args: {
    name: 'group1',
    options,
  },
};

export const WithLabel: Story = {
  args: {
    name: 'group1',
    label: 'Choose an option',
    options,
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('1');
    return (
      <KRadioGroup
        name="group1"
        label="Controlled Radio Group"
        options={options}
        value={value}
        onChange={(val) => setValue(val)}
      />
    );
  },
};

export const WithError: Story = {
  args: {
    name: 'group1',
    label: 'Choose an option',
    options,
    error: 'Please select an option',
  },
};

export const WithHint: Story = {
  args: {
    name: 'group1',
    label: 'Choose an option',
    options,
    hint: 'Select one option from the list',
  },
};

export const Required: Story = {
  args: {
    name: 'group1',
    label: 'Choose an option',
    options,
    required: true,
  },
};

export const Horizontal: Story = {
  args: {
    name: 'group1',
    label: 'Choose an option',
    options,
    direction: 'row',
    gap: '1rem',
  },
};

export const Disabled: Story = {
  args: {
    name: 'group1',
    label: 'Choose an option',
    options,
    disabled: true,
  },
};

export const WithCustomChildren: Story = {
  render: () => (
    <KRadioGroup name="group1" label="Custom Radio Group">
      <KRadio label="Custom Option 1" value="1" name="group1" />
      <KRadio label="Custom Option 2" value="2" name="group1" />
      <KRadio label="Custom Option 3" value="3" name="group1" />
    </KRadioGroup>
  ),
};


import type { Meta, StoryObj } from '@storybook/react';
import { KRadio } from '../components/FormControls';

const meta: Meta<typeof KRadio> = {
  title: 'Components/KRadio',
  component: KRadio,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text displayed next to the radio button',
    },
    value: {
      control: 'text',
      description: 'Value of this radio button',
    },
    name: {
      control: 'text',
      description: 'Name attribute for grouping',
    },
    checked: {
      control: 'boolean',
      description: 'Whether the radio button is checked (controlled)',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the radio button',
    },
  },
};

export default meta;
type Story = StoryObj<typeof KRadio>;

export const Default: Story = {
  args: {
    label: 'Option 1',
    value: '1',
    name: 'group1',
  },
};

export const Checked: Story = {
  args: {
    label: 'Selected option',
    value: '1',
    name: 'group1',
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled option',
    value: '1',
    name: 'group1',
    disabled: true,
  },
};

export const Group: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <KRadio label="Option 1" value="1" name="group1" />
      <KRadio label="Option 2" value="2" name="group1" />
      <KRadio label="Option 3" value="3" name="group1" />
    </div>
  ),
};


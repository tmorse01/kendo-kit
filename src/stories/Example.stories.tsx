import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Example/HelloWorld',
  component: () => <div>Hello, Storybook!</div>,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};


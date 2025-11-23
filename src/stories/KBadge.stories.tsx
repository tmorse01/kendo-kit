import type { Meta, StoryObj } from '@storybook/react';
import { KBadge } from '../components/DataDisplay';

const meta: Meta<typeof KBadge> = {
  title: 'Components/KBadge',
  component: KBadge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error'],
      description: 'Badge variant style',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Badge size',
    },
    children: {
      control: 'text',
      description: 'Badge content',
    },
  },
};

export default meta;
type Story = StoryObj<typeof KBadge>;

export const Default: Story = {
  args: {
    children: 'Badge',
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <KBadge variant="primary">Primary</KBadge>
      <KBadge variant="secondary">Secondary</KBadge>
      <KBadge variant="success">Success</KBadge>
      <KBadge variant="warning">Warning</KBadge>
      <KBadge variant="error">Error</KBadge>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <KBadge size="sm">Small</KBadge>
      <KBadge size="md">Medium</KBadge>
      <KBadge size="lg">Large</KBadge>
    </div>
  ),
};

export const WithNumbers: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <KBadge variant="primary">5</KBadge>
      <KBadge variant="success">12</KBadge>
      <KBadge variant="error">99+</KBadge>
    </div>
  ),
};

export const WithText: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <KBadge variant="primary">New</KBadge>
      <KBadge variant="success">Active</KBadge>
      <KBadge variant="warning">Pending</KBadge>
      <KBadge variant="error">Failed</KBadge>
    </div>
  ),
};

export const AllVariations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h3 style={{ marginBottom: '1rem' }}>All Variants</h3>
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <KBadge variant="primary">Primary</KBadge>
          <KBadge variant="secondary">Secondary</KBadge>
          <KBadge variant="success">Success</KBadge>
          <KBadge variant="warning">Warning</KBadge>
          <KBadge variant="error">Error</KBadge>
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: '1rem' }}>All Sizes</h3>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <KBadge size="sm">Small</KBadge>
          <KBadge size="md">Medium</KBadge>
          <KBadge size="lg">Large</KBadge>
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: '1rem' }}>Combinations</h3>
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <KBadge variant="success" size="sm">
            Small Success
          </KBadge>
          <KBadge variant="error" size="lg">
            Large Error
          </KBadge>
          <KBadge variant="warning" size="md">
            Medium Warning
          </KBadge>
        </div>
      </div>
    </div>
  ),
};

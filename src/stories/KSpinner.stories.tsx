import type { Meta, StoryObj } from '@storybook/react';
import { KSpinner } from '../components/Feedback';

const meta: Meta<typeof KSpinner> = {
  title: 'Components/KSpinner',
  component: KSpinner,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the spinner',
    },
    themeColor: {
      control: 'select',
      options: ['primary', 'secondary', 'base'],
      description: 'Theme color of the spinner',
    },
    overlay: {
      control: 'boolean',
      description: 'Whether to show overlay background',
    },
  },
};

export default meta;
type Story = StoryObj<typeof KSpinner>;

export const Default: Story = {
  args: {},
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <div>
        <KSpinner size="sm" />
        <div style={{ marginTop: '0.5rem', textAlign: 'center' }}>Small</div>
      </div>
      <div>
        <KSpinner size="md" />
        <div style={{ marginTop: '0.5rem', textAlign: 'center' }}>Medium</div>
      </div>
      <div>
        <KSpinner size="lg" />
        <div style={{ marginTop: '0.5rem', textAlign: 'center' }}>Large</div>
      </div>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <div>
        <KSpinner themeColor="primary" />
        <div style={{ marginTop: '0.5rem', textAlign: 'center' }}>Primary</div>
      </div>
      <div>
        <KSpinner themeColor="secondary" />
        <div style={{ marginTop: '0.5rem', textAlign: 'center' }}>
          Secondary
        </div>
      </div>
      <div>
        <KSpinner themeColor="base" />
        <div style={{ marginTop: '0.5rem', textAlign: 'center' }}>Base</div>
      </div>
    </div>
  ),
};

export const WithOverlay: Story = {
  args: {
    overlay: true,
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const AllVariations: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        alignItems: 'center',
      }}
    >
      <div>
        <h3 style={{ marginBottom: '1rem' }}>Sizes</h3>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <KSpinner size="sm" />
          <KSpinner size="md" />
          <KSpinner size="lg" />
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: '1rem' }}>Colors</h3>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <KSpinner themeColor="primary" />
          <KSpinner themeColor="secondary" />
          <KSpinner themeColor="base" />
        </div>
      </div>
    </div>
  ),
};

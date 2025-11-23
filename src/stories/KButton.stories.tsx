import type { Meta, StoryObj } from '@storybook/react';
import { KButton } from '../components/Button';

const meta: Meta<typeof KButton> = {
  title: 'Components/KButton',
  component: KButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger'],
      description: 'Button variant style',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Button size',
    },
    isLoading: {
      control: 'boolean',
      description: 'Show loading state',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the button',
    },
    iconLeft: {
      control: false,
      description: 'Icon to display on the left side',
    },
    iconRight: {
      control: false,
      description: 'Icon to display on the right side',
    },
  },
};

export default meta;
type Story = StoryObj<typeof KButton>;

export const Default: Story = {
  args: {
    children: 'Click me',
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <KButton variant="primary">Primary</KButton>
      <KButton variant="secondary">Secondary</KButton>
      <KButton variant="ghost">Ghost</KButton>
      <KButton variant="danger">Danger</KButton>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <KButton size="sm">Small</KButton>
      <KButton size="md">Medium</KButton>
      <KButton size="lg">Large</KButton>
    </div>
  ),
};

export const Loading: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <KButton isLoading>Loading...</KButton>
      <KButton variant="secondary" isLoading>
        Loading Secondary
      </KButton>
      <KButton variant="danger" isLoading>
        Loading Danger
      </KButton>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <KButton iconLeft={<span>←</span>}>Back</KButton>
      <KButton iconRight={<span>→</span>}>Next</KButton>
      <KButton
        iconLeft={<span>✓</span>}
        iconRight={<span>→</span>}
      >
        Submit
      </KButton>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <KButton disabled>Disabled Primary</KButton>
      <KButton variant="secondary" disabled>
        Disabled Secondary
      </KButton>
      <KButton variant="ghost" disabled>
        Disabled Ghost
      </KButton>
      <KButton variant="danger" disabled>
        Disabled Danger
      </KButton>
    </div>
  ),
};

export const Interactive: Story = {
  args: {
    children: 'Click me',
    onClick: () => alert('Button clicked!'),
  },
};


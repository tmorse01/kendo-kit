import type { Meta, StoryObj } from '@storybook/react';
import { KCard } from '../components/DataDisplay';
import { KButton } from '../components/Button';

const meta: Meta<typeof KCard> = {
  title: 'Components/KCard',
  component: KCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Card title',
    },
    elevated: {
      control: 'boolean',
      description: 'Whether the card has elevated shadow',
    },
    padding: {
      control: 'text',
      description: 'Card padding',
    },
  },
};

export default meta;
type Story = StoryObj<typeof KCard>;

export const Default: Story = {
  args: {
    children: 'Card content goes here',
  },
};

export const WithTitle: Story = {
  args: {
    title: 'Card Title',
    children: 'Card content goes here',
  },
};

export const WithFooter: Story = {
  args: {
    children: 'Card content goes here',
    footer: (
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <KButton variant="secondary" size="sm">
          Cancel
        </KButton>
        <KButton variant="primary" size="sm">
          Save
        </KButton>
      </div>
    ),
  },
};

export const WithTitleAndFooter: Story = {
  args: {
    title: 'Card Title',
    children: 'Card content goes here',
    footer: (
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <KButton variant="secondary" size="sm">
          Cancel
        </KButton>
        <KButton variant="primary" size="sm">
          Save
        </KButton>
      </div>
    ),
  },
};

export const Elevated: Story = {
  args: {
    title: 'Elevated Card',
    children: 'This card has an elevated shadow',
    elevated: true,
  },
};

export const CustomPadding: Story = {
  args: {
    title: 'Card with Custom Padding',
    children: 'This card has custom padding',
    padding: '2rem',
  },
};

export const ComplexContent: Story = {
  args: {
    title: 'User Profile',
    children: (
      <div>
        <p style={{ margin: 0, marginBottom: '1rem' }}>
          <strong>Name:</strong> John Doe
        </p>
        <p style={{ margin: 0, marginBottom: '1rem' }}>
          <strong>Email:</strong> john.doe@example.com
        </p>
        <p style={{ margin: 0 }}>
          <strong>Role:</strong> Administrator
        </p>
      </div>
    ),
    footer: (
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <KButton variant="ghost" size="sm">
          Edit
        </KButton>
        <KButton variant="danger" size="sm">
          Delete
        </KButton>
      </div>
    ),
  },
};

export const AllVariations: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        width: '400px',
      }}
    >
      <KCard>Simple card with just content</KCard>
      <KCard title="Card with Title">Card content goes here</KCard>
      <KCard footer={<KButton size="sm">Action</KButton>}>
        Card with footer
      </KCard>
      <KCard title="Complete Card" footer={<KButton size="sm">Save</KButton>}>
        Card with both title and footer
      </KCard>
      <KCard elevated title="Elevated Card">
        This card has a shadow
      </KCard>
      <KCard padding="2rem" title="Custom Padding">
        This card has custom padding
      </KCard>
    </div>
  ),
};

import type { Meta, StoryObj } from '@storybook/react';
import { KStack } from '../components/Layout';
import { KButton } from '../components/Button';

const meta: Meta<typeof KStack> = {
  title: 'Components/KStack',
  component: KStack,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    direction: {
      control: 'select',
      options: ['row', 'column'],
      description: 'Flex direction',
    },
    gap: {
      control: 'text',
      description: 'Gap between items (number in px or CSS string)',
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: 'Cross-axis alignment',
    },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end', 'space-between'],
      description: 'Main-axis alignment',
    },
  },
};

export default meta;
type Story = StoryObj<typeof KStack>;

export const Default: Story = {
  render: () => (
    <KStack>
      <div style={{ padding: '1rem', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
        Item 1
      </div>
      <div style={{ padding: '1rem', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
        Item 2
      </div>
      <div style={{ padding: '1rem', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
        Item 3
      </div>
    </KStack>
  ),
};

export const HorizontalWithGap: Story = {
  render: () => (
    <KStack direction="row" gap={16}>
      <KButton>Button 1</KButton>
      <KButton variant="secondary">Button 2</KButton>
      <KButton variant="ghost">Button 3</KButton>
    </KStack>
  ),
};

export const VerticalWithGap: Story = {
  render: () => (
    <KStack direction="column" gap="1rem">
      <div style={{ padding: '1rem', backgroundColor: '#e3f2fd', borderRadius: '4px' }}>
        Item 1
      </div>
      <div style={{ padding: '1rem', backgroundColor: '#e3f2fd', borderRadius: '4px' }}>
        Item 2
      </div>
      <div style={{ padding: '1rem', backgroundColor: '#e3f2fd', borderRadius: '4px' }}>
        Item 3
      </div>
    </KStack>
  ),
};

export const Alignment: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h3>Align Start (default)</h3>
        <KStack direction="row" gap={8} align="start" style={{ height: '100px', border: '1px solid #ccc' }}>
          <div style={{ padding: '1rem', backgroundColor: '#f0f0f0' }}>Item 1</div>
          <div style={{ padding: '2rem', backgroundColor: '#f0f0f0' }}>Item 2</div>
        </KStack>
      </div>
      <div>
        <h3>Align Center</h3>
        <KStack direction="row" gap={8} align="center" style={{ height: '100px', border: '1px solid #ccc' }}>
          <div style={{ padding: '1rem', backgroundColor: '#f0f0f0' }}>Item 1</div>
          <div style={{ padding: '2rem', backgroundColor: '#f0f0f0' }}>Item 2</div>
        </KStack>
      </div>
      <div>
        <h3>Align End</h3>
        <KStack direction="row" gap={8} align="end" style={{ height: '100px', border: '1px solid #ccc' }}>
          <div style={{ padding: '1rem', backgroundColor: '#f0f0f0' }}>Item 1</div>
          <div style={{ padding: '2rem', backgroundColor: '#f0f0f0' }}>Item 2</div>
        </KStack>
      </div>
    </div>
  ),
};

export const JustifyContent: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h3>Justify Start (default)</h3>
        <KStack direction="row" gap={8} justify="start" style={{ border: '1px solid #ccc', padding: '8px' }}>
          <KButton size="sm">Button 1</KButton>
          <KButton size="sm">Button 2</KButton>
        </KStack>
      </div>
      <div>
        <h3>Justify Center</h3>
        <KStack direction="row" gap={8} justify="center" style={{ border: '1px solid #ccc', padding: '8px' }}>
          <KButton size="sm">Button 1</KButton>
          <KButton size="sm">Button 2</KButton>
        </KStack>
      </div>
      <div>
        <h3>Justify End</h3>
        <KStack direction="row" gap={8} justify="end" style={{ border: '1px solid #ccc', padding: '8px' }}>
          <KButton size="sm">Button 1</KButton>
          <KButton size="sm">Button 2</KButton>
        </KStack>
      </div>
      <div>
        <h3>Justify Space Between</h3>
        <KStack direction="row" gap={8} justify="space-between" style={{ border: '1px solid #ccc', padding: '8px' }}>
          <KButton size="sm">Button 1</KButton>
          <KButton size="sm">Button 2</KButton>
        </KStack>
      </div>
    </div>
  ),
};

export const FormLayout: Story = {
  render: () => (
    <KStack direction="column" gap="1.5rem" style={{ maxWidth: '400px' }}>
      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </div>
      <KStack direction="row" gap={8} justify="end">
        <KButton variant="secondary">Cancel</KButton>
        <KButton variant="primary">Submit</KButton>
      </KStack>
    </KStack>
  ),
};

export const CardGrid: Story = {
  render: () => (
    <KStack direction="row" gap="1rem" style={{ flexWrap: 'wrap' }}>
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          style={{
            padding: '1.5rem',
            backgroundColor: '#fff',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            minWidth: '200px',
            flex: '1 1 200px',
          }}
        >
          <h3 style={{ marginTop: 0 }}>Card {i}</h3>
          <p>This is card content {i}</p>
        </div>
      ))}
    </KStack>
  ),
};


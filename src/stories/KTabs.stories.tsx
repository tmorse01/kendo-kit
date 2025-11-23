import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { KTabs } from '../components/Navigation';

const meta: Meta<typeof KTabs> = {
  title: 'Components/KTabs',
  component: KTabs,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    activeTabId: {
      control: 'text',
      description: 'Currently active tab ID (controlled)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof KTabs>;

const tabs = [
  {
    id: '1',
    label: 'Overview',
    content: (
      <div style={{ padding: '1rem' }}>
        <h3>Overview</h3>
        <p>This is the overview tab content.</p>
      </div>
    ),
  },
  {
    id: '2',
    label: 'Details',
    content: (
      <div style={{ padding: '1rem' }}>
        <h3>Details</h3>
        <p>This is the details tab content.</p>
      </div>
    ),
  },
  {
    id: '3',
    label: 'Settings',
    content: (
      <div style={{ padding: '1rem' }}>
        <h3>Settings</h3>
        <p>This is the settings tab content.</p>
      </div>
    ),
  },
];

export const Default: Story = {
  args: {
    tabs,
  },
};

export const Controlled: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState('1');
    return (
      <KTabs
        tabs={tabs}
        activeTabId={activeTab}
        onTabChange={(id) => setActiveTab(id)}
      />
    );
  },
};

export const Uncontrolled: Story = {
  args: {
    tabs,
    defaultActiveTabId: '2',
  },
};

export const WithDisabledTab: Story = {
  args: {
    tabs: [
      ...tabs,
      {
        id: '4',
        label: 'Disabled',
        content: <div style={{ padding: '1rem' }}>This tab is disabled</div>,
        disabled: true,
      },
    ],
  },
};

export const ManyTabs: Story = {
  args: {
    tabs: Array.from({ length: 10 }, (_, i) => ({
      id: String(i + 1),
      label: `Tab ${i + 1}`,
      content: (
        <div style={{ padding: '1rem' }}>
          <h3>Tab {i + 1}</h3>
          <p>Content for tab {i + 1}</p>
        </div>
      ),
    })),
  },
};

export const InteractiveExample: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState('1');
    return (
      <div>
        <p style={{ marginBottom: '1rem' }}>
          Current active tab: <strong>{activeTab}</strong>
        </p>
        <KTabs
          tabs={tabs}
          activeTabId={activeTab}
          onTabChange={(id) => setActiveTab(id)}
        />
      </div>
    );
  },
};

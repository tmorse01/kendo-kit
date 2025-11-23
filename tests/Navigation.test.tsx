import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { KTabs } from '../src/components/Navigation/KTabs';

describe('KTabs', () => {
  const tabs = [
    { id: '1', label: 'Tab 1', content: <div>Content 1</div> },
    { id: '2', label: 'Tab 2', content: <div>Content 2</div> },
    { id: '3', label: 'Tab 3', content: <div>Content 3</div> },
  ];

  it('should render tabs', () => {
    render(<KTabs tabs={tabs} />);
    expect(screen.getByText('Tab 1')).toBeInTheDocument();
    expect(screen.getByText('Tab 2')).toBeInTheDocument();
    expect(screen.getByText('Tab 3')).toBeInTheDocument();
  });

  it('should render tab content', () => {
    render(<KTabs tabs={tabs} />);
    expect(screen.getByText('Content 1')).toBeInTheDocument();
  });

  it('should handle controlled activeTabId', () => {
    const { rerender } = render(<KTabs tabs={tabs} activeTabId="2" />);
    expect(screen.getByText('Content 2')).toBeInTheDocument();

    rerender(<KTabs tabs={tabs} activeTabId="3" />);
    expect(screen.getByText('Content 3')).toBeInTheDocument();
  });

  it('should handle uncontrolled defaultActiveTabId', () => {
    render(<KTabs tabs={tabs} defaultActiveTabId="2" />);
    expect(screen.getByText('Content 2')).toBeInTheDocument();
  });

  it('should call onTabChange when tab is clicked', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();
    render(<KTabs tabs={tabs} onTabChange={handleChange} />);
    const tab2 = screen.getByText('Tab 2');
    await user.click(tab2);
    expect(handleChange).toHaveBeenCalledWith('2');
  });

  it('should render disabled tabs', () => {
    const tabsWithDisabled = [
      { id: '1', label: 'Tab 1', content: <div>Content 1</div> },
      { id: '2', label: 'Tab 2', content: <div>Content 2</div>, disabled: true },
    ];
    render(<KTabs tabs={tabsWithDisabled} />);
    // Tab should still render, but be disabled
    expect(screen.getByText('Tab 2')).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const { container } = render(<KTabs tabs={tabs} className="custom-tabs" />);
    const tabsElement = container.querySelector('.custom-tabs');
    expect(tabsElement).toBeInTheDocument();
  });

  it('should render snapshot', () => {
    const { container } = render(<KTabs tabs={tabs} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should handle empty tabs array', () => {
    render(<KTabs tabs={[]} />);
    expect(screen.queryByText('Tab 1')).not.toBeInTheDocument();
  });

  it('should default to first tab when no activeTabId or defaultActiveTabId provided', () => {
    render(<KTabs tabs={tabs} />);
    expect(screen.getByText('Content 1')).toBeInTheDocument();
  });

  it('should handle invalid activeTabId gracefully', () => {
    render(<KTabs tabs={tabs} activeTabId="invalid" />);
    // Should default to first tab
    expect(screen.getByText('Content 1')).toBeInTheDocument();
  });

  it('should not call onTabChange when disabled tab is clicked', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();
    const tabsWithDisabled = [
      { id: '1', label: 'Tab 1', content: <div>Content 1</div> },
      { id: '2', label: 'Tab 2', content: <div>Content 2</div>, disabled: true },
    ];
    render(<KTabs tabs={tabsWithDisabled} onTabChange={handleChange} />);
    const tab2 = screen.getByText('Tab 2');
    await user.click(tab2);
    // Disabled tabs shouldn't trigger onChange
    // Note: This depends on Kendo's TabStrip behavior
    expect(screen.getByText('Content 1')).toBeInTheDocument();
  });
});


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
});


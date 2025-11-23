import React from 'react';
import { TabStrip, TabStripProps, TabStripTab } from '@progress/kendo-react-layouts';

export interface KTab {
  /**
   * Unique identifier for the tab
   */
  id: string;
  /**
   * Tab label text
   */
  label: string;
  /**
   * Tab content
   */
  content: React.ReactNode;
  /**
   * Whether the tab is disabled
   */
  disabled?: boolean;
}

export interface KTabsProps extends Omit<TabStripProps, 'selected' | 'onSelect'> {
  /**
   * Array of tab definitions
   */
  tabs: KTab[];
  /**
   * Currently active tab ID (controlled)
   */
  activeTabId?: string;
  /**
   * Default active tab ID (uncontrolled)
   */
  defaultActiveTabId?: string;
  /**
   * Callback fired when tab changes
   */
  onTabChange?: (tabId: string) => void;
}

/**
 * KTabs - A wrapper around KendoReact TabStrip with a consistent API
 *
 * Supports both controlled and uncontrolled usage:
 * - Controlled: Provide `activeTabId` and `onTabChange`
 * - Uncontrolled: Provide `defaultActiveTabId` (optional)
 *
 * @example
 * ```tsx
 * // Controlled
 * <KTabs
 *   tabs={[
 *     { id: '1', label: 'Tab 1', content: <div>Content 1</div> },
 *     { id: '2', label: 'Tab 2', content: <div>Content 2</div> }
 *   ]}
 *   activeTabId={activeTab}
 *   onTabChange={(id) => setActiveTab(id)}
 * />
 *
 * // Uncontrolled
 * <KTabs
 *   tabs={tabs}
 *   defaultActiveTabId="1"
 *   onTabChange={(id) => console.log(id)}
 * />
 * ```
 */
export function KTabs(props: KTabsProps) {
  const {
    tabs,
    activeTabId,
    defaultActiveTabId,
    onTabChange,
    className,
    ...restProps
  } = props;

  const isControlled = activeTabId !== undefined;
  const selected = isControlled ? activeTabId : defaultActiveTabId;

  const handleSelect = (event: { selected: number }) => {
    const selectedTab = tabs[event.selected];
    if (selectedTab && onTabChange) {
      onTabChange(selectedTab.id);
    }
  };

  const selectedIndex = tabs.findIndex((tab) => tab.id === selected);

  return (
    <TabStrip
      selected={selectedIndex >= 0 ? selectedIndex : 0}
      onSelect={handleSelect}
      className={className}
      {...restProps}
    >
      {tabs.map((tab) => (
        <TabStripTab
          key={tab.id}
          title={tab.label}
          disabled={tab.disabled}
        >
          {tab.content}
        </TabStripTab>
      ))}
    </TabStrip>
  );
}


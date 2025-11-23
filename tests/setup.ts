import '@testing-library/jest-dom/vitest';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Import Kendo theme CSS for story tests
// This ensures stories render with proper styling when tested
// Using dynamic import to avoid breaking if theme is not available
import('@progress/kendo-theme-default/dist/all.css').catch(() => {
  // If theme is not available, continue without it (for regular unit tests)
});

// Mock Kendo useUnstyled hook to prevent fillMode errors in tests
// Kendo components require theme context via useUnstyled hook
vi.mock('@progress/kendo-react-common', async () => {
  const actual = await vi.importActual('@progress/kendo-react-common');
  return {
    ...actual,
    useUnstyled: () => ({
      size: 'medium',
      rounded: 'medium',
      fillMode: 'solid',
      themeColor: 'base',
    }),
  };
});

// Mock Kendo theme context to prevent fillMode errors in tests
// Kendo components require theme context, but for unit tests we can provide a minimal mock
if (typeof window !== 'undefined') {
  // Create a minimal CSS animation for spinner if needed
  const style = document.createElement('style');
  style.textContent = `
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
}

// Cleanup after each test
afterEach(() => {
  cleanup();
});

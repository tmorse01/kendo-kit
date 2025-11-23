import '@testing-library/jest-dom/vitest';
import { afterEach, vi, beforeEach } from 'vitest';
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

// Mock Math.random() to generate deterministic IDs for snapshot tests
// This ensures snapshots remain stable across test runs
// We use a counter that produces predictable base36 strings when converted
let randomCounter = 0;
beforeEach(() => {
  randomCounter = 0;
  vi.spyOn(Math, 'random').mockImplementation(() => {
    randomCounter += 1;
    // Generate deterministic base36 strings without leading zeros
    // Start from a large number (36^8) to ensure we get base36 strings without leading zeros
    // Each call gets a unique but deterministic value
    // We use 36^8 = 2,821,109,907,456 as base to ensure 9-character base36 strings
    const baseValue = Math.pow(36, 8); // Ensures 9-character base36 strings without leading zeros
    const deterministicValue = baseValue + randomCounter;
    const base36String = deterministicValue.toString(36);
    // Convert back to a decimal between 0 and 1
    // When Math.random().toString(36) is called, JavaScript converts decimal to base36
    // To produce a specific base36 string, we need: parseInt(base36String, 36) / 36^9
    const numericValue = parseInt(base36String, 36);
    const desiredLength = 9;
    const divisor = Math.pow(36, desiredLength);
    return numericValue / divisor;
  });
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

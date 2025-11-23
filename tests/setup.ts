import '@testing-library/jest-dom';
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

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


import { useContext } from 'react';
import { ThemeContext } from './KThemeProvider';
import type { ThemeContextValue } from './types';

/**
 * Hook to access the current theme context
 *
 * @throws {Error} If used outside of KThemeProvider
 * @returns The current theme context value
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { theme } = useTheme();
 *   const primaryColor = theme.colors?.primary;
 *   return <div>Primary color: {primaryColor}</div>;
 * }
 * ```
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a KThemeProvider');
  }

  return context;
}


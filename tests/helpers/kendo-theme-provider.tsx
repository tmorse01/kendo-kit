import React from 'react';
import { KThemeProvider } from '../../src/components/Theme';
import type { ThemeTokens } from '../../src/components/Theme';

/**
 * Default theme for testing - provides minimal theme tokens
 */
const defaultTestTheme: ThemeTokens = {
  colors: {
    primary: '#ff6358',
    secondary: '#666666',
  },
};

/**
 * Helper component to wrap components with KendoThemeProvider for testing
 */
export function KendoThemeProvider({
  children,
  theme = defaultTestTheme,
}: {
  children: React.ReactNode;
  theme?: ThemeTokens;
}) {
  return <KThemeProvider theme={theme}>{children}</KThemeProvider>;
}

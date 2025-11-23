import React from 'react';

/**
 * Kendo Theme Provider wrapper for tests
 * 
 * If you encounter "Cannot read properties of undefined (reading 'fillMode')" errors,
 * wrap your component renders with this provider.
 * 
 * Note: You may need to install @progress/kendo-react-common:
 * pnpm add -D @progress/kendo-react-common
 * 
 * Then use:
 * import { ThemeProvider } from '@progress/kendo-react-common';
 * 
 * render(
 *   <ThemeProvider theme="default">
 *     <YourComponent />
 *   </ThemeProvider>
 * );
 */

// For now, this is a pass-through component
// If ThemeProvider is needed, install @progress/kendo-react-common and use it here
export const KendoThemeProvider: React.FC<{ children: React.ReactNode; theme?: string }> = ({ 
  children 
}) => {
  return <>{children}</>;
};


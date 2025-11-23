import React from 'react';

/**
 * Mock theme context provider for tests
 * Kendo components require theme context, but for unit tests we can provide a minimal mock
 * This prevents "Cannot read properties of undefined (reading 'fillMode')" errors
 */
const ThemeContext = React.createContext<any>({
  theme: 'default',
  options: {
    fillMode: 'solid',
    rounded: 'medium',
  },
});

export const KendoThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ThemeContext.Provider
      value={{
        theme: 'default',
        options: {
          fillMode: 'solid',
          rounded: 'medium',
        },
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

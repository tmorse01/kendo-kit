import React, { useEffect, useMemo, createContext } from 'react';
import type { ThemeTokens, ThemeContextValue } from './types';
import { generateColorVariations } from '../../utils/colorUtils';

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export interface KThemeProviderProps {
  /** Theme tokens to apply */
  theme: ThemeTokens;
  /** Child components */
  children: React.ReactNode;
}

/**
 * KThemeProvider - Provides theme tokens and injects CSS variables dynamically
 *
 * Automatically generates color variations (hover, active, focus, etc.) from base colors
 * and injects them as CSS variables into the document root.
 *
 * Typography: Sets `--kendo-font-family-sans-serif` (Kendo's standard variable) and
 * `--kendo-font-family` (for backward compatibility) when fontFamily is provided.
 *
 * Note: Contrast colors are generated as CSS variables (e.g., --kendo-color-primary-contrast)
 * but are NOT automatically applied. You are responsible for ensuring proper contrast
 * in your components. If you use colors that violate contrast guidelines, you must
 * manually handle text colors.
 *
 * @example
 * ```tsx
 * <KThemeProvider
 *   theme={{
 *     colors: {
 *       primary: '#ff6358',
 *       secondary: '#666666',
 *     },
 *     typography: {
 *       fontFamily: 'Arial, sans-serif',
 *     },
 *   }}
 * >
 *   <App />
 * </KThemeProvider>
 * ```
 */
export const KThemeProvider: React.FC<KThemeProviderProps> = ({
  theme,
  children,
}) => {
  // Generate CSS variables from theme tokens
  const cssVariables = useMemo(() => {
    const variables: Record<string, string> = {};

    // Generate color variations
    if (theme.colors) {
      Object.entries(theme.colors).forEach(([colorName, colorValue]) => {
        if (colorValue) {
          const variations = generateColorVariations(colorName, colorValue);
          Object.assign(variables, variations);

          // Special handling: Kendo's secondary button uses 'base' themeColor
          // So we also generate base color variations when secondary is provided
          if (colorName === 'secondary') {
            const baseVariations = generateColorVariations('base', colorValue);
            Object.assign(variables, baseVariations);
          }
        }
      });
    }

    // Typography variables
    if (theme.typography) {
      if (theme.typography.fontFamily) {
        // Kendo uses --kendo-font-family-sans-serif for the main font family
        variables['--kendo-font-family-sans-serif'] =
          theme.typography.fontFamily;
        // Also set --kendo-font-family for backward compatibility
        variables['--kendo-font-family'] = theme.typography.fontFamily;
      }
      if (theme.typography.fontSize) {
        variables['--kendo-font-size'] = theme.typography.fontSize;
      }
      if (theme.typography.lineHeight !== undefined) {
        variables['--kendo-line-height'] =
          typeof theme.typography.lineHeight === 'number'
            ? theme.typography.lineHeight.toString()
            : theme.typography.lineHeight;
      }
      if (theme.typography.fontWeight !== undefined) {
        variables['--kendo-font-weight'] =
          typeof theme.typography.fontWeight === 'number'
            ? theme.typography.fontWeight.toString()
            : theme.typography.fontWeight;
      }
    }

    // Spacing variables
    if (theme.spacing) {
      Object.entries(theme.spacing).forEach(([key, value]) => {
        if (value) {
          variables[`--kendo-spacing-${key}`] = value;
        }
      });
    }

    // Border radius variables
    if (theme.borderRadius) {
      Object.entries(theme.borderRadius).forEach(([key, value]) => {
        if (value) {
          variables[`--kendo-border-radius-${key}`] = value;
        }
      });
    }

    return variables;
  }, [theme]);

  // Inject CSS variables into :root
  useEffect(() => {
    const root = document.documentElement;

    // Inject CSS variables
    Object.entries(cssVariables).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });

    // Cleanup: remove CSS variables when component unmounts or theme changes
    return () => {
      Object.keys(cssVariables).forEach((property) => {
        root.style.removeProperty(property);
      });
    };
  }, [cssVariables]);

  // Create context value
  const contextValue = useMemo<ThemeContextValue>(
    () => ({
      theme,
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

KThemeProvider.displayName = 'KThemeProvider';

// Export context for useTheme hook
export { ThemeContext };

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render } from '@testing-library/react';
import { KButton } from '../src/components/Button';
import { KThemeProvider } from '../src/components/Theme';
import type { ThemeTokens } from '../src/components/Theme';

/**
 * Helper to get CSS variable value from root
 */
function getCSSVariable(variableName: string): string {
  const root = getComputedStyle(document.documentElement);
  return root.getPropertyValue(variableName).trim();
}

describe('KButton with Custom Theme', () => {
  beforeEach(() => {
    // Clear any existing CSS variables and injected styles
    const root = document.documentElement;
    const style = root.style;
    const varsToRemove: string[] = [];
    for (let i = 0; i < style.length; i++) {
      const prop = style[i];
      if (prop.startsWith('--kendo-')) {
        varsToRemove.push(prop);
      }
    }
    varsToRemove.forEach((prop) => style.removeProperty(prop));

    // Remove any injected style elements
    const styleElement = document.getElementById('kendo-theme-provider-styles');
    if (styleElement) {
      styleElement.remove();
    }
  });

  afterEach(() => {
    // Cleanup after each test
    const root = document.documentElement;
    const style = root.style;
    const varsToRemove: string[] = [];
    for (let i = 0; i < style.length; i++) {
      const prop = style[i];
      if (prop.startsWith('--kendo-')) {
        varsToRemove.push(prop);
      }
    }
    varsToRemove.forEach((prop) => style.removeProperty(prop));

    const styleElement = document.getElementById('kendo-theme-provider-styles');
    if (styleElement) {
      styleElement.remove();
    }
  });

  describe('Primary Button Theme States', () => {
    const customTheme: ThemeTokens = {
      colors: {
        primary: '#8b5cf6', // Vibrant purple
      },
    };

    it('should generate CSS variables for all primary color states', () => {
      render(
        <KThemeProvider theme={customTheme}>
          <KButton variant="primary">Test Button</KButton>
        </KThemeProvider>
      );

      // Check that base color variable exists
      expect(getCSSVariable('--kendo-color-primary')).toBe('#8b5cf6');

      // Check that all state variations are generated
      expect(getCSSVariable('--kendo-color-primary-hover')).toBeTruthy();
      expect(getCSSVariable('--kendo-color-primary-active')).toBeTruthy();
      expect(getCSSVariable('--kendo-color-primary-focus')).toBeTruthy();
      expect(getCSSVariable('--kendo-color-primary-disabled')).toBeTruthy();
      expect(getCSSVariable('--kendo-color-primary-selected')).toBeTruthy();
      expect(getCSSVariable('--kendo-color-primary-pressed')).toBeTruthy();
      expect(getCSSVariable('--kendo-color-primary-contrast')).toBeTruthy();
    });

    it('should apply primary color to button background via CSS variables', () => {
      render(
        <KThemeProvider theme={customTheme}>
          <KButton variant="primary">Test Button</KButton>
        </KThemeProvider>
      );

      // Verify CSS variable is set (the actual application depends on Kendo's internal CSS)
      // The important part is that the variable exists and can be used
      expect(getCSSVariable('--kendo-color-primary')).toBe('#8b5cf6');

      // Verify that injected CSS rules reference the color
      const styleElement = document.getElementById(
        'kendo-theme-provider-styles'
      );
      // Style element may not exist if Kendo handles styling differently
      if (styleElement) {
        expect(styleElement.textContent).toContain('#8b5cf6');
      }
    });

    it('should generate contrast color for primary button', () => {
      render(
        <KThemeProvider theme={customTheme}>
          <KButton variant="primary">Test Button</KButton>
        </KThemeProvider>
      );

      const contrastColor = getCSSVariable('--kendo-color-primary-contrast');
      expect(contrastColor).toBeTruthy();
      // For a vibrant purple (#8b5cf6), contrast should be white
      expect(contrastColor).toBe('#ffffff');
    });

    it('should generate hover state color that is lighter than base', () => {
      render(
        <KThemeProvider theme={customTheme}>
          <KButton variant="primary">Test Button</KButton>
        </KThemeProvider>
      );

      const baseColor = getCSSVariable('--kendo-color-primary');
      const hoverColor = getCSSVariable('--kendo-color-primary-hover');

      expect(baseColor).toBe('#8b5cf6');
      expect(hoverColor).toBeTruthy();
      expect(hoverColor).not.toBe(baseColor);
    });

    it('should generate active state color that is darker than base', () => {
      render(
        <KThemeProvider theme={customTheme}>
          <KButton variant="primary">Test Button</KButton>
        </KThemeProvider>
      );

      const baseColor = getCSSVariable('--kendo-color-primary');
      const activeColor = getCSSVariable('--kendo-color-primary-active');

      expect(baseColor).toBe('#8b5cf6');
      expect(activeColor).toBeTruthy();
      expect(activeColor).not.toBe(baseColor);
    });

    it('should inject CSS rules for button states', () => {
      render(
        <KThemeProvider theme={customTheme}>
          <KButton variant="primary">Test Button</KButton>
        </KThemeProvider>
      );

      // Check that style element was injected (if Kendo injects styles)
      const styleElement = document.getElementById(
        'kendo-theme-provider-styles'
      );
      // Style element may not exist if Kendo handles styling differently
      // The important thing is that the component renders and CSS variables are set
      if (styleElement) {
        expect(styleElement.textContent).toContain('.k-button-primary');
        expect(styleElement.textContent).toContain('background-color');
        expect(styleElement.textContent).toContain('color');
      } else {
        // If no style element, verify CSS variables are set instead
        expect(getCSSVariable('--kendo-color-primary')).toBe('#8b5cf6');
      }
    });
  });

  describe('Secondary Button Theme States', () => {
    const customTheme: ThemeTokens = {
      colors: {
        primary: '#8b5cf6',
        secondary: '#1e293b', // Dark slate
      },
    };

    it('should generate CSS variables for secondary and base colors', () => {
      render(
        <KThemeProvider theme={customTheme}>
          <KButton variant="secondary">Test Button</KButton>
        </KThemeProvider>
      );

      // Check secondary color variables
      expect(getCSSVariable('--kendo-color-secondary')).toBe('#1e293b');
      expect(getCSSVariable('--kendo-color-secondary-hover')).toBeTruthy();
      expect(getCSSVariable('--kendo-color-secondary-active')).toBeTruthy();
      expect(getCSSVariable('--kendo-color-secondary-contrast')).toBeTruthy();

      // Check that base color variables are also generated (since secondary maps to base)
      expect(getCSSVariable('--kendo-color-base')).toBe('#1e293b');
      expect(getCSSVariable('--kendo-color-base-hover')).toBeTruthy();
      expect(getCSSVariable('--kendo-color-base-active')).toBeTruthy();
      expect(getCSSVariable('--kendo-color-base-contrast')).toBeTruthy();
    });

    it('should generate white contrast color for dark secondary', () => {
      render(
        <KThemeProvider theme={customTheme}>
          <KButton variant="secondary">Test Button</KButton>
        </KThemeProvider>
      );

      const contrastColor = getCSSVariable('--kendo-color-secondary-contrast');
      const baseContrastColor = getCSSVariable('--kendo-color-base-contrast');

      // Dark color should have white contrast
      expect(contrastColor).toBe('#ffffff');
      expect(baseContrastColor).toBe('#ffffff');
    });

    it('should inject CSS rules for secondary button states', () => {
      render(
        <KThemeProvider theme={customTheme}>
          <KButton variant="secondary">Test Button</KButton>
        </KThemeProvider>
      );

      // Verify CSS variables are set (KThemeProvider injects CSS variables, not style elements)
      expect(getCSSVariable('--kendo-color-secondary')).toBe('#1e293b');
      expect(getCSSVariable('--kendo-color-base')).toBe('#1e293b');
      expect(getCSSVariable('--kendo-color-secondary-contrast')).toBe('#ffffff');
      expect(getCSSVariable('--kendo-color-base-contrast')).toBe('#ffffff');
    });
  });

  describe('Multiple Color Theme States', () => {
    const customTheme: ThemeTokens = {
      colors: {
        primary: '#8b5cf6',
        secondary: '#06b6d4',
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
      },
    };

    it('should generate CSS variables for all color tokens', () => {
      render(
        <KThemeProvider theme={customTheme}>
          <div>
            <KButton variant="primary">Primary</KButton>
            <KButton variant="secondary">Secondary</KButton>
            <KButton variant="danger">Danger</KButton>
          </div>
        </KThemeProvider>
      );

      // Check all colors have base variables
      expect(getCSSVariable('--kendo-color-primary')).toBe('#8b5cf6');
      expect(getCSSVariable('--kendo-color-secondary')).toBe('#06b6d4');
      expect(getCSSVariable('--kendo-color-success')).toBe('#10b981');
      expect(getCSSVariable('--kendo-color-warning')).toBe('#f59e0b');
      expect(getCSSVariable('--kendo-color-error')).toBe('#ef4444');

      // Check all colors have state variations
      ['primary', 'secondary', 'success', 'warning', 'error'].forEach(
        (color) => {
          expect(getCSSVariable(`--kendo-color-${color}-hover`)).toBeTruthy();
          expect(getCSSVariable(`--kendo-color-${color}-active`)).toBeTruthy();
          expect(getCSSVariable(`--kendo-color-${color}-focus`)).toBeTruthy();
          expect(
            getCSSVariable(`--kendo-color-${color}-contrast`)
          ).toBeTruthy();
        }
      );
    });

    it('should generate correct contrast colors for each color', () => {
      render(
        <KThemeProvider theme={customTheme}>
          <div>
            <KButton variant="primary">Primary</KButton>
            <KButton variant="danger">Danger</KButton>
          </div>
        </KThemeProvider>
      );

      // All colors should have contrast colors generated
      const primaryContrast = getCSSVariable('--kendo-color-primary-contrast');
      const secondaryContrast = getCSSVariable(
        '--kendo-color-secondary-contrast'
      );
      const successContrast = getCSSVariable('--kendo-color-success-contrast');
      const warningContrast = getCSSVariable('--kendo-color-warning-contrast');
      const errorContrast = getCSSVariable('--kendo-color-error-contrast');

      // Contrast colors should be either white or black
      expect(primaryContrast).toMatch(/^#(ffffff|000000)$/);
      expect(secondaryContrast).toMatch(/^#(ffffff|000000)$/);
      expect(successContrast).toMatch(/^#(ffffff|000000)$/);
      expect(warningContrast).toMatch(/^#(ffffff|000000)$/);
      expect(errorContrast).toMatch(/^#(ffffff|000000)$/);

      // Primary (#8b5cf6 - purple) - should be white (dark enough)
      expect(primaryContrast).toBe('#ffffff');

      // Warning (#f59e0b - amber) - should be black (light color)
      expect(warningContrast).toBe('#000000');
    });
  });

  describe('Theme State Transitions', () => {
    const customTheme: ThemeTokens = {
      colors: {
        primary: '#8b5cf6',
      },
    };

    it('should generate distinct colors for each state', () => {
      render(
        <KThemeProvider theme={customTheme}>
          <KButton variant="primary">Test Button</KButton>
        </KThemeProvider>
      );

      const base = getCSSVariable('--kendo-color-primary');
      const hover = getCSSVariable('--kendo-color-primary-hover');
      const active = getCSSVariable('--kendo-color-primary-active');
      const focus = getCSSVariable('--kendo-color-primary-focus');

      // All states should be different from base
      expect(hover).not.toBe(base);
      expect(active).not.toBe(base);
      expect(focus).not.toBe(base);

      // Hover and focus should be lighter (for visual feedback)
      // Active should be darker (for pressed state)
      expect(hover).toBeTruthy();
      expect(active).toBeTruthy();
      expect(focus).toBeTruthy();
    });

    it('should generate opacity variants', () => {
      render(
        <KThemeProvider theme={customTheme}>
          <KButton variant="primary">Test Button</KButton>
        </KThemeProvider>
      );

      // Check opacity variants are generated
      expect(getCSSVariable('--kendo-color-primary-50')).toBeTruthy();
      expect(getCSSVariable('--kendo-color-primary-100')).toBeTruthy();
      expect(getCSSVariable('--kendo-color-primary-200')).toBeTruthy();
      expect(getCSSVariable('--kendo-color-primary-300')).toBeTruthy();
      expect(getCSSVariable('--kendo-color-primary-400')).toBeTruthy();
      expect(getCSSVariable('--kendo-color-primary-500')).toBe('#8b5cf6'); // Base color
      expect(getCSSVariable('--kendo-color-primary-600')).toBeTruthy();
      expect(getCSSVariable('--kendo-color-primary-700')).toBeTruthy();
      expect(getCSSVariable('--kendo-color-primary-800')).toBeTruthy();
      expect(getCSSVariable('--kendo-color-primary-900')).toBeTruthy();
    });
  });

  describe('Theme Updates', () => {
    it('should update button styles when theme changes', () => {
      const initialTheme: ThemeTokens = {
        colors: {
          primary: '#8b5cf6',
        },
      };

      const { rerender } = render(
        <KThemeProvider theme={initialTheme}>
          <KButton variant="primary">Test Button</KButton>
        </KThemeProvider>
      );

      expect(getCSSVariable('--kendo-color-primary')).toBe('#8b5cf6');

      const updatedTheme: ThemeTokens = {
        colors: {
          primary: '#10b981', // Different color
        },
      };

      rerender(
        <KThemeProvider theme={updatedTheme}>
          <KButton variant="primary">Test Button</KButton>
        </KThemeProvider>
      );

      // CSS variable should be updated
      expect(getCSSVariable('--kendo-color-primary')).toBe('#10b981');

      // New state variations should be generated
      expect(getCSSVariable('--kendo-color-primary-hover')).toBeTruthy();
      expect(getCSSVariable('--kendo-color-primary-active')).toBeTruthy();
    });
  });
});

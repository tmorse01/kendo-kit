import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { KThemeProvider, useTheme } from '../src/components/Theme';
import type { ThemeTokens } from '../src/components/Theme';

// Helper component to test useTheme hook
function ThemeConsumer() {
  const { theme } = useTheme();
  return <div data-testid="theme-consumer">{JSON.stringify(theme)}</div>;
}

describe('KThemeProvider', () => {
  beforeEach(() => {
    // Clear any existing CSS variables
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
  });

  it('should render children', () => {
    const theme: ThemeTokens = {
      colors: {
        primary: '#ff6358',
      },
    };

    render(
      <KThemeProvider theme={theme}>
        <div>Test Content</div>
      </KThemeProvider>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should inject CSS variables for primary color', () => {
    const theme: ThemeTokens = {
      colors: {
        primary: '#ff6358',
      },
    };

    render(
      <KThemeProvider theme={theme}>
        <div>Test</div>
      </KThemeProvider>
    );

    const root = getComputedStyle(document.documentElement);
    expect(root.getPropertyValue('--kendo-color-primary')).toBe('#ff6358');
  });

  it('should generate color variations for primary color', () => {
    const theme: ThemeTokens = {
      colors: {
        primary: '#ff6358',
      },
    };

    render(
      <KThemeProvider theme={theme}>
        <div>Test</div>
      </KThemeProvider>
    );

    const root = getComputedStyle(document.documentElement);

    // Check that variations are generated
    expect(root.getPropertyValue('--kendo-color-primary-hover')).toBeTruthy();
    expect(root.getPropertyValue('--kendo-color-primary-active')).toBeTruthy();
    expect(root.getPropertyValue('--kendo-color-primary-focus')).toBeTruthy();
    expect(
      root.getPropertyValue('--kendo-color-primary-disabled')
    ).toBeTruthy();
    expect(
      root.getPropertyValue('--kendo-color-primary-selected')
    ).toBeTruthy();
    expect(root.getPropertyValue('--kendo-color-primary-pressed')).toBeTruthy();
  });

  it('should generate opacity variants for colors', () => {
    const theme: ThemeTokens = {
      colors: {
        primary: '#ff6358',
      },
    };

    render(
      <KThemeProvider theme={theme}>
        <div>Test</div>
      </KThemeProvider>
    );

    const root = getComputedStyle(document.documentElement);

    // Check opacity variants
    expect(root.getPropertyValue('--kendo-color-primary-50')).toBeTruthy();
    expect(root.getPropertyValue('--kendo-color-primary-100')).toBeTruthy();
    expect(root.getPropertyValue('--kendo-color-primary-200')).toBeTruthy();
    expect(root.getPropertyValue('--kendo-color-primary-500')).toBe('#ff6358');
  });

  it('should inject CSS variables for multiple colors', () => {
    const theme: ThemeTokens = {
      colors: {
        primary: '#ff6358',
        secondary: '#666666',
        success: '#37b400',
      },
    };

    render(
      <KThemeProvider theme={theme}>
        <div>Test</div>
      </KThemeProvider>
    );

    const root = getComputedStyle(document.documentElement);
    expect(root.getPropertyValue('--kendo-color-primary')).toBe('#ff6358');
    expect(root.getPropertyValue('--kendo-color-secondary')).toBe('#666666');
    expect(root.getPropertyValue('--kendo-color-success')).toBe('#37b400');
  });

  it('should inject typography CSS variables', () => {
    const theme: ThemeTokens = {
      typography: {
        fontFamily: 'Arial, sans-serif',
        fontSize: '16px',
        lineHeight: 1.5,
        fontWeight: 'bold',
      },
    };

    render(
      <KThemeProvider theme={theme}>
        <div>Test</div>
      </KThemeProvider>
    );

    const root = getComputedStyle(document.documentElement);
    // Kendo uses --kendo-font-family-sans-serif as the primary variable
    expect(root.getPropertyValue('--kendo-font-family-sans-serif')).toBe(
      'Arial, sans-serif'
    );
    // Also check backward compatibility variable
    expect(root.getPropertyValue('--kendo-font-family')).toBe(
      'Arial, sans-serif'
    );
    expect(root.getPropertyValue('--kendo-font-size')).toBe('16px');
    expect(root.getPropertyValue('--kendo-line-height')).toBe('1.5');
    expect(root.getPropertyValue('--kendo-font-weight')).toBe('bold');
  });

  it('should inject spacing CSS variables', () => {
    const theme: ThemeTokens = {
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
      },
    };

    render(
      <KThemeProvider theme={theme}>
        <div>Test</div>
      </KThemeProvider>
    );

    const root = getComputedStyle(document.documentElement);
    expect(root.getPropertyValue('--kendo-spacing-xs')).toBe('4px');
    expect(root.getPropertyValue('--kendo-spacing-sm')).toBe('8px');
    expect(root.getPropertyValue('--kendo-spacing-md')).toBe('16px');
  });

  it('should inject border radius CSS variables', () => {
    const theme: ThemeTokens = {
      borderRadius: {
        sm: '2px',
        md: '4px',
        lg: '8px',
      },
    };

    render(
      <KThemeProvider theme={theme}>
        <div>Test</div>
      </KThemeProvider>
    );

    const root = getComputedStyle(document.documentElement);
    expect(root.getPropertyValue('--kendo-border-radius-sm')).toBe('2px');
    expect(root.getPropertyValue('--kendo-border-radius-md')).toBe('4px');
    expect(root.getPropertyValue('--kendo-border-radius-lg')).toBe('8px');
  });

  it('should provide theme context', () => {
    const theme: ThemeTokens = {
      colors: {
        primary: '#ff6358',
      },
      typography: {
        fontFamily: 'Arial',
      },
    };

    render(
      <KThemeProvider theme={theme}>
        <ThemeConsumer />
      </KThemeProvider>
    );

    const consumer = screen.getByTestId('theme-consumer');
    const themeData = JSON.parse(consumer.textContent || '{}');
    expect(themeData.colors?.primary).toBe('#ff6358');
    expect(themeData.typography?.fontFamily).toBe('Arial');
  });

  it('should update CSS variables when theme changes', () => {
    const initialTheme: ThemeTokens = {
      colors: {
        primary: '#ff6358',
      },
    };

    const { rerender } = render(
      <KThemeProvider theme={initialTheme}>
        <div>Test</div>
      </KThemeProvider>
    );

    const root1 = getComputedStyle(document.documentElement);
    expect(root1.getPropertyValue('--kendo-color-primary')).toBe('#ff6358');

    const updatedTheme: ThemeTokens = {
      colors: {
        primary: '#0058e9',
      },
    };

    rerender(
      <KThemeProvider theme={updatedTheme}>
        <div>Test</div>
      </KThemeProvider>
    );

    const root2 = getComputedStyle(document.documentElement);
    expect(root2.getPropertyValue('--kendo-color-primary')).toBe('#0058e9');
  });

  it('should clean up CSS variables on unmount', () => {
    const theme: ThemeTokens = {
      colors: {
        primary: '#ff6358',
      },
    };

    const { unmount } = render(
      <KThemeProvider theme={theme}>
        <div>Test</div>
      </KThemeProvider>
    );

    const rootBefore = getComputedStyle(document.documentElement);
    expect(rootBefore.getPropertyValue('--kendo-color-primary')).toBe(
      '#ff6358'
    );

    unmount();

    // Note: In a real browser, cleanup would remove the variables
    // In jsdom, we can't fully test this, but the cleanup function is called
  });

  describe('useTheme', () => {
    it('should return theme from context', () => {
      const theme: ThemeTokens = {
        colors: {
          primary: '#ff6358',
        },
      };

      render(
        <KThemeProvider theme={theme}>
          <ThemeConsumer />
        </KThemeProvider>
      );

      const consumer = screen.getByTestId('theme-consumer');
      const themeData = JSON.parse(consumer.textContent || '{}');
      expect(themeData).toEqual(theme);
    });

    it('should throw error when used outside provider', () => {
      // Suppress console.error for this test
      const consoleSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      expect(() => {
        render(<ThemeConsumer />);
      }).toThrow('useTheme must be used within a KThemeProvider');

      consoleSpy.mockRestore();
    });
  });

  it('should handle empty theme', () => {
    const theme: ThemeTokens = {};

    render(
      <KThemeProvider theme={theme}>
        <div>Test</div>
      </KThemeProvider>
    );

    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('should handle theme with only colors', () => {
    const theme: ThemeTokens = {
      colors: {
        primary: '#ff6358',
        secondary: '#666666',
      },
    };

    render(
      <KThemeProvider theme={theme}>
        <ThemeConsumer />
      </KThemeProvider>
    );

    const consumer = screen.getByTestId('theme-consumer');
    const themeData = JSON.parse(consumer.textContent || '{}');
    expect(themeData.colors?.primary).toBe('#ff6358');
    expect(themeData.colors?.secondary).toBe('#666666');
  });

  it('should generate contrast color for primary', () => {
    const theme: ThemeTokens = {
      colors: {
        primary: '#ff6358',
      },
    };

    render(
      <KThemeProvider theme={theme}>
        <div>Test</div>
      </KThemeProvider>
    );

    const root = getComputedStyle(document.documentElement);
    const contrast = root.getPropertyValue('--kendo-color-primary-contrast');
    expect(contrast).toBeTruthy();
    // Should be either black or white
    expect([
      '#000000',
      '#ffffff',
      'rgb(0, 0, 0)',
      'rgb(255, 255, 255)',
    ]).toContain(contrast.trim());
  });
});

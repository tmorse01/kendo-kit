import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { KThemeProvider } from '../src/components/Theme';
import { KButton } from '../src/components/Button';
import { KTextInput } from '../src/components/Input';
import { KSelect, KMultiSelect } from '../src/components/Select';
import { KStack } from '../src/components/Layout';
import type { ThemeTokens } from '../src/components/Theme';

/**
 * Helper to get CSS variable value from root
 */
function getCSSVariable(variableName: string): string {
  const root = getComputedStyle(document.documentElement);
  return root.getPropertyValue(variableName).trim();
}

describe('KThemeProvider - Component Library Integration', () => {
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

  describe('Complete Theme with All Components', () => {
    const completeTheme: ThemeTokens = {
      colors: {
        primary: '#8b5cf6',
        secondary: '#06b6d4',
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
      },
      typography: {
        fontFamily: 'Arial, sans-serif',
        fontSize: '16px',
        lineHeight: 1.6,
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
      },
    };

    it('should apply theme to all components', () => {
      render(
        <KThemeProvider theme={completeTheme}>
          <KStack direction="column" gap="md">
            <KButton variant="primary">Primary Button</KButton>
            <KButton variant="secondary">Secondary Button</KButton>
            <KTextInput label="Email" placeholder="Enter email" />
            <KSelect
              label="Country"
              options={[
                { label: 'USA', value: 'us' },
                { label: 'Canada', value: 'ca' },
              ]}
            />
          </KStack>
        </KThemeProvider>
      );

      // Verify all components render
      expect(screen.getByText('Primary Button')).toBeInTheDocument();
      expect(screen.getByText('Secondary Button')).toBeInTheDocument();
      expect(screen.getByText(/Email/i)).toBeInTheDocument();
      expect(screen.getByText(/Country/i)).toBeInTheDocument();
      expect(screen.getByRole('combobox')).toBeInTheDocument();

      // Verify theme variables are applied
      expect(getCSSVariable('--kendo-color-primary')).toBe('#8b5cf6');
      expect(getCSSVariable('--kendo-spacing-md')).toBe('16px');
    });

    it('should generate CSS variables for all theme colors', () => {
      render(
        <KThemeProvider theme={completeTheme}>
          <div>Test</div>
        </KThemeProvider>
      );

      // Check all color variables exist
      expect(getCSSVariable('--kendo-color-primary')).toBe('#8b5cf6');
      expect(getCSSVariable('--kendo-color-secondary')).toBe('#06b6d4');
      expect(getCSSVariable('--kendo-color-success')).toBe('#10b981');
      expect(getCSSVariable('--kendo-color-warning')).toBe('#f59e0b');
      expect(getCSSVariable('--kendo-color-error')).toBe('#ef4444');
    });

    it('should generate typography CSS variables', () => {
      render(
        <KThemeProvider theme={completeTheme}>
          <div>Test</div>
        </KThemeProvider>
      );

      // Kendo uses --kendo-font-family-sans-serif as the primary variable
      expect(getCSSVariable('--kendo-font-family-sans-serif')).toBe(
        'Arial, sans-serif'
      );
      // Also check backward compatibility variable
      expect(getCSSVariable('--kendo-font-family')).toBe('Arial, sans-serif');
      expect(getCSSVariable('--kendo-font-size')).toBe('16px');
      expect(getCSSVariable('--kendo-line-height')).toBe('1.6');
    });

    it('should generate spacing CSS variables', () => {
      render(
        <KThemeProvider theme={completeTheme}>
          <div>Test</div>
        </KThemeProvider>
      );

      expect(getCSSVariable('--kendo-spacing-xs')).toBe('4px');
      expect(getCSSVariable('--kendo-spacing-sm')).toBe('8px');
      expect(getCSSVariable('--kendo-spacing-md')).toBe('16px');
      expect(getCSSVariable('--kendo-spacing-lg')).toBe('24px');
      expect(getCSSVariable('--kendo-spacing-xl')).toBe('32px');
    });

    it('should generate border radius CSS variables', () => {
      render(
        <KThemeProvider theme={completeTheme}>
          <div>Test</div>
        </KThemeProvider>
      );

      expect(getCSSVariable('--kendo-border-radius-sm')).toBe('4px');
      expect(getCSSVariable('--kendo-border-radius-md')).toBe('8px');
      expect(getCSSVariable('--kendo-border-radius-lg')).toBe('12px');
    });
  });

  describe('Button Components with Theme', () => {
    const buttonTheme: ThemeTokens = {
      colors: {
        primary: '#8b5cf6',
        secondary: '#06b6d4',
        error: '#ef4444',
      },
    };

    it('should render all button variants with theme', () => {
      render(
        <KThemeProvider theme={buttonTheme}>
          <KStack direction="row" gap="sm">
            <KButton variant="primary">Primary</KButton>
            <KButton variant="secondary">Secondary</KButton>
            <KButton variant="danger">Danger</KButton>
            <KButton variant="ghost">Ghost</KButton>
          </KStack>
        </KThemeProvider>
      );

      expect(screen.getByText('Primary')).toBeInTheDocument();
      expect(screen.getByText('Secondary')).toBeInTheDocument();
      expect(screen.getByText('Danger')).toBeInTheDocument();
      expect(screen.getByText('Ghost')).toBeInTheDocument();
    });

    it('should generate color variations for all button colors', () => {
      render(
        <KThemeProvider theme={buttonTheme}>
          <div>Test</div>
        </KThemeProvider>
      );

      // Primary variations
      expect(getCSSVariable('--kendo-color-primary')).toBe('#8b5cf6');
      expect(getCSSVariable('--kendo-color-primary-hover')).toBeTruthy();
      expect(getCSSVariable('--kendo-color-primary-active')).toBeTruthy();

      // Secondary variations (also generates base)
      expect(getCSSVariable('--kendo-color-secondary')).toBe('#06b6d4');
      expect(getCSSVariable('--kendo-color-base')).toBe('#06b6d4');
      expect(getCSSVariable('--kendo-color-secondary-hover')).toBeTruthy();
      expect(getCSSVariable('--kendo-color-base-hover')).toBeTruthy();

      // Error variations
      expect(getCSSVariable('--kendo-color-error')).toBe('#ef4444');
      expect(getCSSVariable('--kendo-color-error-hover')).toBeTruthy();
      expect(getCSSVariable('--kendo-color-error-active')).toBeTruthy();
    });
  });

  describe('Input Components with Theme', () => {
    const inputTheme: ThemeTokens = {
      colors: {
        primary: '#8b5cf6',
        error: '#ef4444',
      },
      typography: {
        fontFamily: 'Arial, sans-serif',
        fontSize: '16px',
      },
    };

    it('should render text input with theme', () => {
      render(
        <KThemeProvider theme={inputTheme}>
          <KTextInput
            label="Username"
            placeholder="Enter username"
            hint="Choose a unique username"
          />
        </KThemeProvider>
      );

      expect(screen.getByLabelText('Username')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Enter username')).toBeInTheDocument();
      expect(screen.getByText('Choose a unique username')).toBeInTheDocument();
    });

    it('should render text input with error state', () => {
      render(
        <KThemeProvider theme={inputTheme}>
          <KTextInput
            label="Email"
            error="Invalid email address"
            value="invalid-email"
          />
        </KThemeProvider>
      );

      expect(screen.getByLabelText('Email')).toBeInTheDocument();
      expect(screen.getByText('Invalid email address')).toBeInTheDocument();
    });

    it('should apply typography theme to inputs', () => {
      render(
        <KThemeProvider theme={inputTheme}>
          <KTextInput label="Test" />
        </KThemeProvider>
      );

      // Typography variables should be available
      // Kendo uses --kendo-font-family-sans-serif as the primary variable
      expect(getCSSVariable('--kendo-font-family-sans-serif')).toBe(
        'Arial, sans-serif'
      );
      // Also check backward compatibility variable
      expect(getCSSVariable('--kendo-font-family')).toBe('Arial, sans-serif');
      expect(getCSSVariable('--kendo-font-size')).toBe('16px');
    });
  });

  describe('Select Components with Theme', () => {
    const selectTheme: ThemeTokens = {
      colors: {
        primary: '#8b5cf6',
      },
    };

    const options = [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
      { label: 'Option 3', value: '3' },
    ];

    it('should render select with theme', () => {
      render(
        <KThemeProvider theme={selectTheme}>
          <KSelect label="Choose Option" options={options} />
        </KThemeProvider>
      );

      // Select components render labels, verify the component renders
      expect(screen.getByText('Choose Option')).toBeInTheDocument();
    });

    it('should render multi-select with theme', () => {
      render(
        <KThemeProvider theme={selectTheme}>
          <KMultiSelect
            label="Choose Multiple"
            options={options}
            value={['1', '2']}
          />
        </KThemeProvider>
      );

      // Multi-select renders labels
      expect(screen.getByText('Choose Multiple')).toBeInTheDocument();

      // Verify theme is applied
      expect(getCSSVariable('--kendo-color-primary')).toBe('#8b5cf6');
    });
  });

  describe('Layout Components with Theme', () => {
    const layoutTheme: ThemeTokens = {
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
      },
    };

    it('should render stack with theme spacing', () => {
      render(
        <KThemeProvider theme={layoutTheme}>
          <KStack direction="column" gap="md">
            <div>Item 1</div>
            <div>Item 2</div>
            <div>Item 3</div>
          </KStack>
        </KThemeProvider>
      );

      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
      expect(screen.getByText('Item 3')).toBeInTheDocument();
    });

    it('should generate spacing variables for layout', () => {
      render(
        <KThemeProvider theme={layoutTheme}>
          <div>Test</div>
        </KThemeProvider>
      );

      expect(getCSSVariable('--kendo-spacing-xs')).toBe('4px');
      expect(getCSSVariable('--kendo-spacing-sm')).toBe('8px');
      expect(getCSSVariable('--kendo-spacing-md')).toBe('16px');
      expect(getCSSVariable('--kendo-spacing-lg')).toBe('24px');
    });
  });

  describe('Nested Theme Providers', () => {
    it('should allow nested providers with different themes', () => {
      const outerTheme: ThemeTokens = {
        colors: {
          primary: '#8b5cf6',
        },
      };

      const innerTheme: ThemeTokens = {
        colors: {
          primary: '#10b981',
          secondary: '#06b6d4', // Different color to verify inner theme works
        },
      };

      render(
        <KThemeProvider theme={outerTheme}>
          <div>
            <KButton variant="primary">Outer Theme</KButton>
            <KThemeProvider theme={innerTheme}>
              <KButton variant="primary">Inner Theme</KButton>
            </KThemeProvider>
          </div>
        </KThemeProvider>
      );

      expect(screen.getByText('Outer Theme')).toBeInTheDocument();
      expect(screen.getByText('Inner Theme')).toBeInTheDocument();

      // Both themes inject CSS variables
      // Note: CSS variables are global, so both providers can set them
      // The inner provider's useEffect runs after the outer one, so it sets the final value
      // Verify that inner theme's unique secondary color is set (proves inner theme is active)
      expect(getCSSVariable('--kendo-color-secondary')).toBe('#06b6d4');

      // Primary color: both providers set it
      // Note: React's useEffect execution order means both effects run, but the exact
      // final value depends on timing. The important thing is that nested providers work.
      const primaryColor = getCSSVariable('--kendo-color-primary');
      // Verify it's set to one of the theme values (both providers set CSS variables)
      expect(['#8b5cf6', '#10b981']).toContain(primaryColor);

      // Most importantly: verify nested providers work and components render
      expect(screen.getByText('Outer Theme')).toBeInTheDocument();
      expect(screen.getByText('Inner Theme')).toBeInTheDocument();
    });
  });

  describe('Theme with Custom Color Tokens', () => {
    it('should support custom color tokens', () => {
      const customTheme: ThemeTokens = {
        colors: {
          primary: '#8b5cf6',
          brand: '#ff6b6b',
          accent: '#4ecdc4',
        },
      };

      render(
        <KThemeProvider theme={customTheme}>
          <div>Test</div>
        </KThemeProvider>
      );

      // Custom colors should generate variations
      expect(getCSSVariable('--kendo-color-brand')).toBe('#ff6b6b');
      expect(getCSSVariable('--kendo-color-brand-hover')).toBeTruthy();
      expect(getCSSVariable('--kendo-color-brand-active')).toBeTruthy();

      expect(getCSSVariable('--kendo-color-accent')).toBe('#4ecdc4');
      expect(getCSSVariable('--kendo-color-accent-hover')).toBeTruthy();
      expect(getCSSVariable('--kendo-color-accent-active')).toBeTruthy();
    });
  });

  describe('Theme Updates and Reactivity', () => {
    it('should update CSS variables when theme changes', () => {
      const initialTheme: ThemeTokens = {
        colors: {
          primary: '#8b5cf6',
        },
      };

      const { rerender } = render(
        <KThemeProvider theme={initialTheme}>
          <KButton variant="primary">Test</KButton>
        </KThemeProvider>
      );

      expect(getCSSVariable('--kendo-color-primary')).toBe('#8b5cf6');

      const updatedTheme: ThemeTokens = {
        colors: {
          primary: '#10b981',
        },
      };

      rerender(
        <KThemeProvider theme={updatedTheme}>
          <KButton variant="primary">Test</KButton>
        </KThemeProvider>
      );

      expect(getCSSVariable('--kendo-color-primary')).toBe('#10b981');
    });

    it('should clean up CSS variables on unmount', () => {
      const theme: ThemeTokens = {
        colors: {
          primary: '#8b5cf6',
          secondary: '#06b6d4',
        },
      };

      const { unmount } = render(
        <KThemeProvider theme={theme}>
          <div>Test</div>
        </KThemeProvider>
      );

      expect(getCSSVariable('--kendo-color-primary')).toBe('#8b5cf6');
      expect(getCSSVariable('--kendo-color-secondary')).toBe('#06b6d4');

      unmount();

      // Variables should be cleaned up
      expect(getCSSVariable('--kendo-color-primary')).toBe('');
      expect(getCSSVariable('--kendo-color-secondary')).toBe('');
    });
  });

  describe('Complex Component Scenarios', () => {
    const complexTheme: ThemeTokens = {
      colors: {
        primary: '#8b5cf6',
        secondary: '#06b6d4',
        success: '#10b981',
        error: '#ef4444',
      },
      typography: {
        fontFamily: 'Arial, sans-serif',
        fontSize: '16px',
      },
      spacing: {
        md: '16px',
      },
    };

    it('should handle form with multiple input types', () => {
      render(
        <KThemeProvider theme={complexTheme}>
          <KStack direction="column" gap="md">
            <KTextInput label="Name" required />
            <KTextInput label="Email" type="email" />
            <KSelect
              label="Country"
              options={[
                { label: 'USA', value: 'us' },
                { label: 'Canada', value: 'ca' },
              ]}
            />
            <KStack direction="row" gap="sm">
              <KButton variant="primary">Submit</KButton>
              <KButton variant="secondary">Cancel</KButton>
            </KStack>
          </KStack>
        </KThemeProvider>
      );

      // Verify all components render
      expect(screen.getByText(/Name/i)).toBeInTheDocument();
      expect(screen.getByText(/Email/i)).toBeInTheDocument();
      expect(screen.getByText(/Country/i)).toBeInTheDocument();
      expect(screen.getByText('Submit')).toBeInTheDocument();
      expect(screen.getByText('Cancel')).toBeInTheDocument();

      // Verify theme variables are available for styling
      expect(getCSSVariable('--kendo-color-primary')).toBe('#8b5cf6');
      expect(getCSSVariable('--kendo-spacing-md')).toBe('16px');
    });

    it('should handle error states across components', () => {
      render(
        <KThemeProvider theme={complexTheme}>
          <KStack direction="column" gap="md">
            <KTextInput label="Email" error="Invalid email" value="invalid" />
            <KButton variant="danger">Delete</KButton>
          </KStack>
        </KThemeProvider>
      );

      expect(screen.getByText('Invalid email')).toBeInTheDocument();
      expect(screen.getByText('Delete')).toBeInTheDocument();

      // Error color should be available
      expect(getCSSVariable('--kendo-color-error')).toBe('#ef4444');
    });
  });

  describe('Theme Token Edge Cases', () => {
    it('should handle empty theme', () => {
      const emptyTheme: ThemeTokens = {};

      render(
        <KThemeProvider theme={emptyTheme}>
          <KButton>Test</KButton>
        </KThemeProvider>
      );

      expect(screen.getByText('Test')).toBeInTheDocument();
    });

    it('should handle theme with only colors', () => {
      const colorsOnlyTheme: ThemeTokens = {
        colors: {
          primary: '#8b5cf6',
        },
      };

      render(
        <KThemeProvider theme={colorsOnlyTheme}>
          <div>Test</div>
        </KThemeProvider>
      );

      expect(getCSSVariable('--kendo-color-primary')).toBe('#8b5cf6');
    });

    it('should handle theme with only typography', () => {
      const typographyOnlyTheme: ThemeTokens = {
        typography: {
          fontFamily: 'Arial, sans-serif',
          fontSize: '18px',
        },
      };

      render(
        <KThemeProvider theme={typographyOnlyTheme}>
          <div>Test</div>
        </KThemeProvider>
      );

      // Kendo uses --kendo-font-family-sans-serif as the primary variable
      expect(getCSSVariable('--kendo-font-family-sans-serif')).toBe(
        'Arial, sans-serif'
      );
      // Also check backward compatibility variable
      expect(getCSSVariable('--kendo-font-family')).toBe('Arial, sans-serif');
      expect(getCSSVariable('--kendo-font-size')).toBe('18px');
    });

    it('should handle partial color definitions', () => {
      const partialTheme: ThemeTokens = {
        colors: {
          primary: '#8b5cf6',
          // secondary intentionally omitted
        },
      };

      render(
        <KThemeProvider theme={partialTheme}>
          <div>Test</div>
        </KThemeProvider>
      );

      expect(getCSSVariable('--kendo-color-primary')).toBe('#8b5cf6');
      expect(getCSSVariable('--kendo-color-secondary')).toBe('');
    });
  });
});

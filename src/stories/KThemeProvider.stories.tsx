import type { Meta, StoryObj } from '@storybook/react';
import { useState, useEffect } from 'react';
import { KThemeProvider, useTheme } from '../components/Theme';
import { KButton } from '../components/Button';
import { KTextInput, KNumericInput } from '../components/Input';
import { KSelect, KMultiSelect } from '../components/Select';
import { KStack } from '../components/Layout';
import type { ThemeTokens } from '../components/Theme';

const meta: Meta<typeof KThemeProvider> = {
  title: 'Components/KThemeProvider',
  component: KThemeProvider,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof KThemeProvider>;

// Component to display current theme
function ThemeDisplay() {
  const { theme } = useTheme();
  return (
    <div
      style={{
        padding: '1rem',
        border: '1px solid #ddd',
        borderRadius: '4px',
        backgroundColor: '#f9f9f9',
        marginBottom: '1rem',
      }}
    >
      <h3 style={{ marginTop: 0 }}>Current Theme</h3>
      <pre style={{ fontSize: '12px', overflow: 'auto' }}>
        {JSON.stringify(theme, null, 2)}
      </pre>
    </div>
  );
}

// Component to display CSS variables
function CSSVariablesDisplay() {
  const [variables, setVariables] = useState<Record<string, string>>({});

  useEffect(() => {
    const root = getComputedStyle(document.documentElement);
    const kendoVars: Record<string, string> = {};
    for (let i = 0; i < root.length; i++) {
      const prop = root[i];
      if (prop.startsWith('--kendo-')) {
        kendoVars[prop] = root.getPropertyValue(prop).trim();
      }
    }
    setVariables(kendoVars);
  }, []);

  return (
    <div
      style={{
        padding: '1rem',
        border: '1px solid #ddd',
        borderRadius: '4px',
        backgroundColor: '#f9f9f9',
        marginBottom: '1rem',
        maxHeight: '300px',
        overflow: 'auto',
      }}
    >
      <h3 style={{ marginTop: 0 }}>Generated CSS Variables</h3>
      <pre style={{ fontSize: '11px', margin: 0 }}>
        {Object.entries(variables)
          .filter(([key]) => key.includes('color-primary'))
          .map(([key, value]) => `${key}: ${value};`)
          .join('\n')}
      </pre>
    </div>
  );
}

export const Basic: Story = {
  render: () => (
    <KThemeProvider
      theme={{
        colors: {
          primary: '#8b5cf6', // Vibrant purple
        },
      }}
    >
      <div>
        <h2>Basic Theme with Primary Color</h2>
        <p style={{ color: '#666', marginBottom: '1rem' }}>
          A single primary color automatically generates all variations (hover,
          active, focus, etc.)
        </p>
        <ThemeDisplay />
        <CSSVariablesDisplay />
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <KButton variant="primary">Primary Button</KButton>
          <KButton variant="secondary">Secondary Button</KButton>
        </div>
      </div>
    </KThemeProvider>
  ),
};

export const MultipleColors: Story = {
  render: () => (
    <KThemeProvider
      theme={{
        colors: {
          primary: '#8b5cf6', // Vibrant purple
          secondary: '#06b6d4', // Cyan
          tertiary: '#ec4899', // Pink
          success: '#10b981', // Emerald green
          warning: '#f59e0b', // Amber
          error: '#ef4444', // Red
        },
      }}
    >
      <div>
        <h2>Theme with Multiple Colors</h2>
        <ThemeDisplay />
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <KButton variant="primary">Primary</KButton>
          <KButton variant="secondary">Secondary</KButton>
          <KButton variant="danger">Danger</KButton>
        </div>
        <div
          style={{
            marginTop: '1rem',
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
          }}
        >
          <div
            style={{
              width: '100px',
              height: '100px',
              backgroundColor: 'var(--kendo-color-success)',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            Success
          </div>
          <div
            style={{
              width: '100px',
              height: '100px',
              backgroundColor: 'var(--kendo-color-warning)',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            Warning
          </div>
          <div
            style={{
              width: '100px',
              height: '100px',
              backgroundColor: 'var(--kendo-color-error)',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            Error
          </div>
        </div>
      </div>
    </KThemeProvider>
  ),
};

export const WithTypography: Story = {
  render: () => (
    <KThemeProvider
      theme={{
        colors: {
          primary: '#ff6358',
        },
        typography: {
          fontFamily: 'Georgia, serif',
          fontSize: '18px',
          lineHeight: 1.6,
        },
      }}
    >
      <div>
        <h2>Theme with Typography</h2>
        <ThemeDisplay />
        <div style={{ fontFamily: 'var(--kendo-font-family)' }}>
          <p style={{ fontSize: 'var(--kendo-font-size)' }}>
            This text uses the custom font family and font size from the theme.
            The line height is also customized.
          </p>
          <KButton variant="primary">Styled Button</KButton>
        </div>
      </div>
    </KThemeProvider>
  ),
};

export const ColorVariations: Story = {
  render: () => (
    <KThemeProvider
      theme={{
        colors: {
          primary: '#8b5cf6', // Vibrant purple
        },
      }}
    >
      <div>
        <h2>Color Variations (Auto-generated)</h2>
        <p>
          When you provide a base color, the ThemeProvider automatically
          generates hover, active, focus, disabled, and other variations.
        </p>
        <CSSVariablesDisplay />
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div
            style={{
              padding: '1rem',
              backgroundColor: 'var(--kendo-color-primary)',
              color: 'white',
              borderRadius: '4px',
            }}
          >
            Base
          </div>
          <div
            style={{
              padding: '1rem',
              backgroundColor: 'var(--kendo-color-primary-hover)',
              color: 'white',
              borderRadius: '4px',
            }}
          >
            Hover
          </div>
          <div
            style={{
              padding: '1rem',
              backgroundColor: 'var(--kendo-color-primary-active)',
              color: 'white',
              borderRadius: '4px',
            }}
          >
            Active
          </div>
          <div
            style={{
              padding: '1rem',
              backgroundColor: 'var(--kendo-color-primary-focus)',
              color: 'white',
              borderRadius: '4px',
            }}
          >
            Focus
          </div>
          <div
            style={{
              padding: '1rem',
              backgroundColor: 'var(--kendo-color-primary-disabled)',
              color: 'white',
              borderRadius: '4px',
            }}
          >
            Disabled
          </div>
        </div>
      </div>
    </KThemeProvider>
  ),
};

export const InteractiveThemeSwitching: Story = {
  render: () => {
    const themes: Record<string, ThemeTokens> = {
      'purple-cyan': {
        colors: {
          primary: '#8b5cf6', // Vibrant purple
          secondary: '#06b6d4', // Cyan
        },
      },
      'emerald-teal': {
        colors: {
          primary: '#10b981', // Emerald
          secondary: '#14b8a6', // Teal
        },
      },
      'rose-orange': {
        colors: {
          primary: '#f43f5e', // Rose
          secondary: '#f97316', // Orange
        },
      },
      'indigo-violet': {
        colors: {
          primary: '#6366f1', // Indigo
          secondary: '#a855f7', // Violet
        },
      },
    };

    const ThemeSwitcher = () => {
      const [currentTheme, setCurrentTheme] =
        useState<keyof typeof themes>('purple-cyan');

      return (
        <KThemeProvider theme={themes[currentTheme]}>
          <div>
            <h2>Interactive Theme Switching</h2>
            <p style={{ color: '#666', marginBottom: '1rem' }}>
              Switch between themes to see how components update instantly with
              new colors
            </p>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ marginRight: '1rem', fontWeight: '500' }}>
                Select Theme:
              </label>
              <select
                value={currentTheme}
                onChange={(e) =>
                  setCurrentTheme(e.target.value as keyof typeof themes)
                }
                style={{
                  padding: '0.5rem 1rem',
                  fontSize: '16px',
                  borderRadius: '6px',
                  border: '2px solid #e5e7eb',
                  cursor: 'pointer',
                }}
              >
                <option value="purple-cyan">Purple & Cyan</option>
                <option value="emerald-teal">Emerald & Teal</option>
                <option value="rose-orange">Rose & Orange</option>
                <option value="indigo-violet">Indigo & Violet</option>
              </select>
            </div>
            <ThemeDisplay />
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <KButton variant="primary">Primary Button</KButton>
              <KButton variant="secondary">Secondary Button</KButton>
            </div>
          </div>
        </KThemeProvider>
      );
    };

    return <ThemeSwitcher />;
  },
};

export const SecondaryColorGuidelines: Story = {
  render: () => (
    <KThemeProvider
      theme={{
        colors: {
          primary: '#8b5cf6', // Vibrant purple
          secondary: '#06b6d4', // Cyan - lighter secondary (recommended)
        },
      }}
    >
      <div>
        <h2>Secondary Color Guidelines</h2>
        <div
          style={{
            padding: '1rem',
            backgroundColor: '#fef3c7',
            border: '1px solid #fbbf24',
            borderRadius: '6px',
            marginBottom: '1rem',
          }}
        >
          <p style={{ margin: 0, color: '#92400e', fontWeight: '500' }}>
            ⚠️ <strong>Best Practice:</strong> Use lighter secondary colors
            (luminance &gt; 0.5) that work with dark text. Avoid dark secondary
            colors as they can cause contrast issues. See{' '}
            <code>THEMING_GUIDELINES.md</code> for details.
          </p>
        </div>
        <p style={{ color: '#666', marginBottom: '1rem' }}>
          The recommended approach is to use a{' '}
          <strong>lighter secondary color</strong> (
          <code
            style={{
              backgroundColor: '#f0f0f0',
              padding: '2px 6px',
              borderRadius: '3px',
            }}
          >
            #06b6d4
          </code>
          ) that complements your primary color. This follows Material Design
          principles and ensures good contrast with dark text.
        </p>

        <ThemeDisplay />

        <div
          style={{
            padding: '1rem',
            border: '1px solid #ddd',
            borderRadius: '4px',
            backgroundColor: '#f9f9f9',
            marginBottom: '1rem',
          }}
        >
          <h3 style={{ marginTop: 0, marginBottom: '0.5rem' }}>
            Contrast Color Calculation
          </h3>
          <div style={{ fontSize: '13px', color: '#555' }}>
            <p style={{ margin: '0.5rem 0' }}>
              <strong>Secondary Color:</strong> <code>#06b6d4</code> (Cyan -
              lighter color)
            </p>
            <p style={{ margin: '0.5rem 0' }}>
              <strong>Calculated Contrast:</strong> <code>#000000</code> (Black)
            </p>
            <p style={{ margin: '0.5rem 0', fontSize: '12px', color: '#777' }}>
              The contrast color is automatically determined by calculating the
              luminance of the background color. Light colors (luminance &gt;
              0.5) get black text, dark colors get white text. Using lighter
              secondary colors ensures better compatibility with Kendo's styling
              system.
            </p>
          </div>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <h3 style={{ marginBottom: '0.75rem' }}>Button Examples</h3>
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap',
              alignItems: 'center',
            }}
          >
            <div>
              <KButton variant="primary">Primary Button</KButton>
            </div>
            <div>
              <KButton variant="secondary">Secondary Button</KButton>
              <p
                style={{
                  fontSize: '12px',
                  color: '#666',
                  marginTop: '0.25rem',
                  marginBottom: 0,
                }}
              >
                Light background with dark text (recommended)
              </p>
            </div>
          </div>
        </div>

        <div
          style={{
            padding: '1rem',
            border: '1px solid #ddd',
            borderRadius: '4px',
            backgroundColor: '#fff',
            marginBottom: '1rem',
          }}
        >
          <h3 style={{ marginTop: 0, marginBottom: '0.75rem' }}>
            Visual Comparison
          </h3>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <div
              style={{
                padding: '1rem',
                backgroundColor: 'var(--kendo-color-secondary)',
                borderRadius: '6px',
                color: 'var(--kendo-color-secondary-contrast)',
                fontWeight: '600',
                minWidth: '150px',
                textAlign: 'center',
              }}
            >
              Secondary Color
              <div
                style={{ fontSize: '11px', marginTop: '0.5rem', opacity: 0.9 }}
              >
                Light color with dark text ✓
              </div>
            </div>
            <div
              style={{
                padding: '1rem',
                backgroundColor: '#1e293b',
                borderRadius: '6px',
                color: '#ffffff',
                fontWeight: '600',
                minWidth: '150px',
                textAlign: 'center',
                border: '2px dashed #ef4444',
              }}
            >
              Dark Secondary (Avoid)
              <div
                style={{ fontSize: '11px', marginTop: '0.5rem', opacity: 0.9 }}
              >
                Requires white text ✗
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            padding: '1rem',
            border: '1px solid #e2e8f0',
            borderRadius: '4px',
            backgroundColor: '#f8fafc',
          }}
        >
          <h4
            style={{ marginTop: 0, marginBottom: '0.5rem', fontSize: '14px' }}
          >
            Best Practices:
          </h4>
          <ul
            style={{
              fontSize: '13px',
              color: '#475569',
              paddingLeft: '1.5rem',
              margin: 0,
            }}
          >
            <li>
              <strong>Use lighter secondary colors</strong> - Secondary should
              be lighter than primary
            </li>
            <li>
              <strong>Aim for luminance &gt; 0.5</strong> - Ensures dark text
              works well
            </li>
            <li>
              <strong>Follow Material Design</strong> - Secondary colors should
              be less prominent
            </li>
            <li>
              <strong>Avoid dark secondary colors</strong> - They can cause
              contrast and styling issues
            </li>
            <li>
              See <code>docs/THEMING_GUIDELINES.md</code> for complete
              guidelines
            </li>
          </ul>
        </div>
      </div>
    </KThemeProvider>
  ),
};

export const FormWithTheme: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      age: '',
      country: '',
      interests: [] as string[],
    });

    return (
      <KThemeProvider
        theme={{
          colors: {
            primary: '#8b5cf6',
            secondary: '#06b6d4',
            error: '#ef4444',
          },
          typography: {
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: '16px',
          },
          spacing: {
            md: '16px',
          },
        }}
      >
        <div style={{ maxWidth: '600px' }}>
          <h2 style={{ marginBottom: '1.5rem' }}>Complete Form Example</h2>
          <p style={{ color: '#666', marginBottom: '2rem' }}>
            This form demonstrates how ThemeProvider applies to multiple
            component types: buttons, text inputs, numeric inputs, and selects.
          </p>

          <KStack direction="column" gap="md">
            <KTextInput
              label="Full Name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.value || '' })
              }
              required
            />

            <KTextInput
              label="Email"
              type="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.value || '' })
              }
              hint="We'll never share your email"
              required
            />

            <KNumericInput
              label="Age"
              placeholder="Enter your age"
              value={formData.age ? Number(formData.age) : undefined}
              onChange={(e) =>
                setFormData({ ...formData, age: e.value?.toString() || '' })
              }
              min={18}
              max={100}
            />

            <KSelect
              label="Country"
              placeholder="Select a country"
              options={[
                { label: 'United States', value: 'us' },
                { label: 'Canada', value: 'ca' },
                { label: 'United Kingdom', value: 'uk' },
                { label: 'Australia', value: 'au' },
              ]}
              value={formData.country}
              onChange={(value) =>
                setFormData({ ...formData, country: value?.toString() || '' })
              }
            />

            <KMultiSelect
              label="Interests"
              placeholder="Select your interests"
              options={[
                { label: 'Technology', value: 'tech' },
                { label: 'Design', value: 'design' },
                { label: 'Music', value: 'music' },
                { label: 'Sports', value: 'sports' },
                { label: 'Travel', value: 'travel' },
              ]}
              value={formData.interests}
              onChange={(value) =>
                setFormData({
                  ...formData,
                  interests: (value as string[]) || [],
                })
              }
            />

            <KStack direction="row" gap="sm" style={{ marginTop: '1rem' }}>
              <KButton variant="primary">Submit</KButton>
              <KButton variant="secondary">Cancel</KButton>
            </KStack>
          </KStack>
        </div>
      </KThemeProvider>
    );
  },
};

export const CompleteTheme: Story = {
  render: () => (
    <KThemeProvider
      theme={{
        colors: {
          primary: '#8b5cf6', // Vibrant purple - main brand color
          secondary: '#06b6d4', // Cyan - lighter secondary (follows Material Design)
          tertiary: '#ec4899', // Pink - accent color
          success: '#10b981', // Emerald green - success states
          warning: '#f59e0b', // Amber - warnings
          error: '#ef4444', // Red - errors
          info: '#3b82f6', // Blue - informational
          base: '#64748b', // Slate - neutral base
        },
        typography: {
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          fontSize: '16px',
          lineHeight: 1.6,
          fontWeight: 400,
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
      }}
    >
      <div>
        <h2
          style={{
            background: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '0.5rem',
          }}
        >
          Complete Custom Theme
        </h2>
        <p style={{ color: '#64748b', marginBottom: '2rem', fontSize: '15px' }}>
          This theme showcases a modern purple-cyan color palette with custom
          typography, spacing, and border radius. All colors automatically
          generate hover, active, focus, and disabled variations.
        </p>
        <ThemeDisplay />
        <div style={{ marginTop: '2rem' }}>
          <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>
            Color Palette
          </h3>
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap',
              marginBottom: '2rem',
            }}
          >
            <div
              style={{
                padding: '1.5rem',
                backgroundColor: 'var(--kendo-color-primary)',
                borderRadius: 'var(--kendo-border-radius-md)',
                color: 'white',
                fontWeight: '600',
                minWidth: '120px',
                textAlign: 'center',
                boxShadow: '0 4px 6px -1px rgba(139, 92, 246, 0.3)',
              }}
            >
              Primary
            </div>
            <div
              style={{
                padding: '1.5rem',
                backgroundColor: 'var(--kendo-color-secondary)',
                borderRadius: 'var(--kendo-border-radius-md)',
                color: 'white',
                fontWeight: '600',
                minWidth: '120px',
                textAlign: 'center',
                boxShadow: '0 4px 6px -1px rgba(6, 182, 212, 0.3)',
              }}
            >
              Secondary
            </div>
            <div
              style={{
                padding: '1.5rem',
                backgroundColor: 'var(--kendo-color-success)',
                borderRadius: 'var(--kendo-border-radius-md)',
                color: 'white',
                fontWeight: '600',
                minWidth: '120px',
                textAlign: 'center',
                boxShadow: '0 4px 6px -1px rgba(16, 185, 129, 0.3)',
              }}
            >
              Success
            </div>
            <div
              style={{
                padding: '1.5rem',
                backgroundColor: 'var(--kendo-color-warning)',
                borderRadius: 'var(--kendo-border-radius-md)',
                color: 'white',
                fontWeight: '600',
                minWidth: '120px',
                textAlign: 'center',
                boxShadow: '0 4px 6px -1px rgba(245, 158, 11, 0.3)',
              }}
            >
              Warning
            </div>
            <div
              style={{
                padding: '1.5rem',
                backgroundColor: 'var(--kendo-color-error)',
                borderRadius: 'var(--kendo-border-radius-md)',
                color: 'white',
                fontWeight: '600',
                minWidth: '120px',
                textAlign: 'center',
                boxShadow: '0 4px 6px -1px rgba(239, 68, 68, 0.3)',
              }}
            >
              Error
            </div>
          </div>

          <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>Buttons</h3>
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap',
              marginBottom: '2rem',
            }}
          >
            <KButton variant="primary">Primary Action</KButton>
            <KButton variant="secondary">Secondary Action</KButton>
            <KButton variant="danger">Danger Action</KButton>
            <KButton variant="ghost">Ghost Button</KButton>
          </div>

          <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>Typography</h3>
          <div
            style={{
              fontFamily: 'var(--kendo-font-family)',
              fontSize: 'var(--kendo-font-size)',
              lineHeight: 'var(--kendo-line-height)',
              color: '#334155',
              marginBottom: '2rem',
            }}
          >
            <p>
              This text uses the custom font family, size, and line height from
              the theme. The typography settings are applied globally and can be
              used throughout your application.
            </p>
          </div>

          <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>
            Color Variations
          </h3>
          <p
            style={{ color: '#64748b', marginBottom: '1rem', fontSize: '14px' }}
          >
            Each color automatically generates multiple variations for different
            states:
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <div
              style={{
                padding: '0.75rem 1rem',
                backgroundColor: 'var(--kendo-color-primary)',
                borderRadius: 'var(--kendo-border-radius-sm)',
                color: 'white',
                fontSize: '13px',
                fontWeight: '500',
              }}
            >
              Base
            </div>
            <div
              style={{
                padding: '0.75rem 1rem',
                backgroundColor: 'var(--kendo-color-primary-hover)',
                borderRadius: 'var(--kendo-border-radius-sm)',
                color: 'white',
                fontSize: '13px',
                fontWeight: '500',
              }}
            >
              Hover
            </div>
            <div
              style={{
                padding: '0.75rem 1rem',
                backgroundColor: 'var(--kendo-color-primary-active)',
                borderRadius: 'var(--kendo-border-radius-sm)',
                color: 'white',
                fontSize: '13px',
                fontWeight: '500',
              }}
            >
              Active
            </div>
            <div
              style={{
                padding: '0.75rem 1rem',
                backgroundColor: 'var(--kendo-color-primary-focus)',
                borderRadius: 'var(--kendo-border-radius-sm)',
                color: 'white',
                fontSize: '13px',
                fontWeight: '500',
              }}
            >
              Focus
            </div>
            <div
              style={{
                padding: '0.75rem 1rem',
                backgroundColor: 'var(--kendo-color-primary-disabled)',
                borderRadius: 'var(--kendo-border-radius-sm)',
                color: 'white',
                fontSize: '13px',
                fontWeight: '500',
              }}
            >
              Disabled
            </div>
          </div>
        </div>
      </div>
    </KThemeProvider>
  ),
};

export const ErrorStatesWithTheme: Story = {
  render: () => (
    <KThemeProvider
      theme={{
        colors: {
          primary: '#8b5cf6',
          secondary: '#06b6d4',
          error: '#ef4444',
        },
      }}
    >
      <div style={{ maxWidth: '600px' }}>
        <h2 style={{ marginBottom: '1.5rem' }}>
          Error States Across Components
        </h2>
        <p style={{ color: '#666', marginBottom: '2rem' }}>
          Demonstrates how error colors from the theme are available for use
          across different components.
        </p>

        <KStack direction="column" gap="md">
          <KTextInput
            label="Email"
            value="invalid-email"
            error="Please enter a valid email address"
            required
          />

          <KSelect
            label="Country"
            error="Please select a country"
            options={[
              { label: 'United States', value: 'us' },
              { label: 'Canada', value: 'ca' },
            ]}
          />

          <KStack direction="row" gap="sm">
            <KButton variant="danger">Delete Account</KButton>
            <KButton variant="primary">Save Changes</KButton>
          </KStack>

          <div
            style={{
              padding: '1rem',
              backgroundColor: 'var(--kendo-color-error)',
              borderRadius: '8px',
              color: 'var(--kendo-color-error-contrast)',
              fontWeight: '600',
            }}
          >
            Error: This action cannot be undone
          </div>
        </KStack>
      </div>
    </KThemeProvider>
  ),
};

export const CustomColorTokens: Story = {
  render: () => (
    <KThemeProvider
      theme={{
        colors: {
          primary: '#8b5cf6',
          secondary: '#06b6d4',
          brand: '#ff6b6b',
          accent: '#4ecdc4',
          success: '#10b981',
        },
      }}
    >
      <div>
        <h2 style={{ marginBottom: '1.5rem' }}>Custom Color Tokens</h2>
        <p style={{ color: '#666', marginBottom: '2rem' }}>
          You can define custom color tokens beyond the standard ones. All
          variations (hover, active, focus, etc.) are automatically generated.
        </p>

        <ThemeDisplay />

        <div style={{ marginTop: '2rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>Custom Color Swatches</h3>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <div
              style={{
                padding: '1.5rem',
                backgroundColor: 'var(--kendo-color-brand)',
                borderRadius: '8px',
                color: 'var(--kendo-color-brand-contrast)',
                fontWeight: '600',
                minWidth: '150px',
                textAlign: 'center',
              }}
            >
              Brand Color
              <div
                style={{ fontSize: '12px', marginTop: '0.5rem', opacity: 0.9 }}
              >
                Custom token
              </div>
            </div>
            <div
              style={{
                padding: '1.5rem',
                backgroundColor: 'var(--kendo-color-accent)',
                borderRadius: '8px',
                color: 'var(--kendo-color-accent-contrast)',
                fontWeight: '600',
                minWidth: '150px',
                textAlign: 'center',
              }}
            >
              Accent Color
              <div
                style={{ fontSize: '12px', marginTop: '0.5rem', opacity: 0.9 }}
              >
                Custom token
              </div>
            </div>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>Generated Variations</h3>
            <CSSVariablesDisplay />
          </div>
        </div>
      </div>
    </KThemeProvider>
  ),
};

export const TypographyTheme: Story = {
  render: () => (
    <KThemeProvider
      theme={{
        colors: {
          primary: '#8b5cf6',
        },
        typography: {
          fontFamily: 'Georgia, "Times New Roman", serif',
          fontSize: '18px',
          lineHeight: 1.8,
          fontWeight: 400,
        },
      }}
    >
      <div style={{ maxWidth: '800px' }}>
        <h2 style={{ marginBottom: '1.5rem' }}>Typography Theme</h2>
        <p style={{ color: '#666', marginBottom: '2rem' }}>
          Typography settings from the theme are available as CSS variables and
          can be applied throughout your application.
        </p>

        <div
          style={{
            fontFamily: 'var(--kendo-font-family-sans-serif)',
            fontSize: 'var(--kendo-font-size)',
            lineHeight: 'var(--kendo-line-height)',
          }}
        >
          <h3 style={{ marginBottom: '1rem' }}>Styled Content</h3>
          <p style={{ marginBottom: '1rem' }}>
            This paragraph uses the custom font family, size, and line height
            from the theme. The typography settings create a cohesive reading
            experience across your application.
          </p>
          <p style={{ marginBottom: '1rem' }}>
            All text elements can reference these CSS variables to maintain
            consistency. You can use them in your own components or override
            them for specific cases.
          </p>

          <KStack direction="column" gap="md" style={{ marginTop: '2rem' }}>
            <KTextInput
              label="Styled Input"
              placeholder="This input inherits theme typography"
            />
            <KButton variant="primary">Styled Button</KButton>
          </KStack>
        </div>
      </div>
    </KThemeProvider>
  ),
};

export const SpacingAndLayout: Story = {
  render: () => (
    <KThemeProvider
      theme={{
        colors: {
          primary: '#8b5cf6',
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
      }}
    >
      <div>
        <h2 style={{ marginBottom: '1.5rem' }}>
          Spacing & Border Radius Theme
        </h2>
        <p style={{ color: '#666', marginBottom: '2rem' }}>
          Spacing and border radius values are available as CSS variables for
          consistent layout and styling.
        </p>

        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>Spacing Scale</h3>
          <KStack direction="column" gap="sm">
            <div
              style={{
                padding: 'var(--kendo-spacing-xs)',
                backgroundColor: '#f0f0f0',
                borderRadius: '4px',
              }}
            >
              Extra Small (xs): 4px
            </div>
            <div
              style={{
                padding: 'var(--kendo-spacing-sm)',
                backgroundColor: '#f0f0f0',
                borderRadius: '4px',
              }}
            >
              Small (sm): 8px
            </div>
            <div
              style={{
                padding: 'var(--kendo-spacing-md)',
                backgroundColor: '#f0f0f0',
                borderRadius: '4px',
              }}
            >
              Medium (md): 16px
            </div>
            <div
              style={{
                padding: 'var(--kendo-spacing-lg)',
                backgroundColor: '#f0f0f0',
                borderRadius: '4px',
              }}
            >
              Large (lg): 24px
            </div>
            <div
              style={{
                padding: 'var(--kendo-spacing-xl)',
                backgroundColor: '#f0f0f0',
                borderRadius: '4px',
              }}
            >
              Extra Large (xl): 32px
            </div>
          </KStack>
        </div>

        <div>
          <h3 style={{ marginBottom: '1rem' }}>Border Radius Examples</h3>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <div
              style={{
                padding: '1rem',
                backgroundColor: 'var(--kendo-color-primary)',
                borderRadius: 'var(--kendo-border-radius-sm)',
                color: 'white',
                fontWeight: '600',
              }}
            >
              Small Radius
            </div>
            <div
              style={{
                padding: '1rem',
                backgroundColor: 'var(--kendo-color-primary)',
                borderRadius: 'var(--kendo-border-radius-md)',
                color: 'white',
                fontWeight: '600',
              }}
            >
              Medium Radius
            </div>
            <div
              style={{
                padding: '1rem',
                backgroundColor: 'var(--kendo-color-primary)',
                borderRadius: 'var(--kendo-border-radius-lg)',
                color: 'white',
                fontWeight: '600',
              }}
            >
              Large Radius
            </div>
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>Layout with Theme Spacing</h3>
          <KStack direction="row" gap="md" style={{ flexWrap: 'wrap' }}>
            <KButton variant="primary">Button 1</KButton>
            <KButton variant="secondary">Button 2</KButton>
            <KButton variant="primary">Button 3</KButton>
          </KStack>
        </div>
      </div>
    </KThemeProvider>
  ),
};

export const RealWorldExample: Story = {
  render: () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      plan: '',
    });

    return (
      <KThemeProvider
        theme={{
          colors: {
            primary: '#8b5cf6',
            secondary: '#06b6d4',
            success: '#10b981',
            error: '#ef4444',
          },
          typography: {
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: '16px',
          },
          spacing: {
            sm: '8px',
            md: '16px',
            lg: '24px',
          },
          borderRadius: {
            md: '8px',
          },
        }}
      >
        <div style={{ maxWidth: '700px' }}>
          <h2 style={{ marginBottom: '1.5rem' }}>
            Real-World Example: Sign Up Form
          </h2>
          <p style={{ color: '#666', marginBottom: '2rem' }}>
            A complete sign-up form demonstrating ThemeProvider with multiple
            components working together.
          </p>

          <div
            style={{
              display: 'flex',
              gap: 'var(--kendo-spacing-sm)',
              marginBottom: 'var(--kendo-spacing-lg)',
            }}
          >
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                style={{
                  flex: 1,
                  padding: 'var(--kendo-spacing-sm)',
                  backgroundColor:
                    step >= s ? 'var(--kendo-color-primary)' : '#e5e7eb',
                  color: step >= s ? 'white' : '#6b7280',
                  borderRadius: 'var(--kendo-border-radius-md)',
                  textAlign: 'center',
                  fontWeight: '600',
                }}
              >
                Step {s}
              </div>
            ))}
          </div>

          <KStack direction="column" gap="md">
            {step === 1 && (
              <>
                <h3>Personal Information</h3>
                <KTextInput
                  label="Full Name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.value || '' })
                  }
                  required
                />
                <KTextInput
                  label="Email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.value || '' })
                  }
                  required
                />
              </>
            )}

            {step === 2 && (
              <>
                <h3>Choose Plan</h3>
                <KSelect
                  label="Subscription Plan"
                  placeholder="Select a plan"
                  options={[
                    { label: 'Basic - /month', value: 'basic' },
                    { label: 'Pro - /month', value: 'pro' },
                    { label: 'Enterprise - /month', value: 'enterprise' },
                  ]}
                  value={formData.plan}
                  onChange={(value) =>
                    setFormData({ ...formData, plan: value?.toString() || '' })
                  }
                  required
                />
              </>
            )}

            {step === 3 && (
              <>
                <h3>Review & Confirm</h3>
                <div
                  style={{
                    padding: 'var(--kendo-spacing-md)',
                    backgroundColor: '#f9fafb',
                    borderRadius: 'var(--kendo-border-radius-md)',
                  }}
                >
                  <p>
                    <strong>Name:</strong> {formData.name || 'Not provided'}
                  </p>
                  <p>
                    <strong>Email:</strong> {formData.email || 'Not provided'}
                  </p>
                  <p>
                    <strong>Plan:</strong> {formData.plan || 'Not selected'}
                  </p>
                </div>
              </>
            )}

            <KStack direction="row" gap="sm" style={{ marginTop: '1rem' }}>
              {step > 1 && (
                <KButton variant="secondary" onClick={() => setStep(step - 1)}>
                  Back
                </KButton>
              )}
              {step < 3 ? (
                <KButton variant="primary" onClick={() => setStep(step + 1)}>
                  Next
                </KButton>
              ) : (
                <KButton variant="primary">Complete Sign Up</KButton>
              )}
            </KStack>
          </KStack>
        </div>
      </KThemeProvider>
    );
  },
};

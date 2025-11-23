# Kendo Kit

[![CI](https://github.com/your-org/kendo-kit/actions/workflows/ci.yml/badge.svg)](https://github.com/your-org/kendo-kit/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/kendo-kit.svg)](https://www.npmjs.com/package/kendo-kit)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A TypeScript React component library wrapping KendoReact components with a consistent API, good defaults, and proper tree-shaking support.

## Overview

Kendo Kit provides a thin but opinionated wrapper layer around KendoReact components, standardizing usage across applications with:

- **Consistent API** - Unified prop names and patterns across all components
- **Good Defaults** - Sensible styling and behavior out of the box
- **Tree-shakable** - Only import what you use
- **Type-safe** - Full TypeScript support with strict types
- **Production-ready** - Tests, Storybook stories, and comprehensive documentation

## Installation

```bash
pnpm add kendo-kit
# or
npm install kendo-kit
```

### Peer Dependencies

Kendo Kit requires the following peer dependencies:

```bash
pnpm add react@>=19 react-dom@>=19 \
  @progress/kendo-react-buttons@latest \
  @progress/kendo-react-inputs@latest \
  @progress/kendo-react-dropdowns@latest \
  @progress/kendo-react-dialogs@latest \
  @progress/kendo-react-dateinputs@latest
```

**Note:** `@progress/kendo-react-dateinputs` is only required if you use `KDatePicker`.

### Kendo License

KendoReact components require a valid Telerik license. Make sure you have your license key configured:

```bash
# Set your Telerik license key as an environment variable
export TELERIK_LICENSE="your-license-key-here"
```

For more information, see the [KendoReact licensing documentation](https://www.telerik.com/kendo-react-ui/my-license/).

## Quick Start

### 1. Set up Theme Provider

Wrap your app with `KThemeProvider` to enable theming:

```tsx
import { KThemeProvider } from 'kendo-kit';

function App() {
  return (
    <KThemeProvider
      theme={{
        colors: {
          primary: '#ff6358',
          secondary: '#666666',
        },
        typography: {
          fontFamily: 'Arial, sans-serif',
        },
      }}
    >
      {/* Your app components */}
    </KThemeProvider>
  );
}
```

### 2. Use Components

```tsx
import { KButton, KTextInput, KSelect, KModal } from 'kendo-kit';

function MyForm() {
  const [email, setEmail] = useState('');
  const [selectedValue, setSelectedValue] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <KTextInput
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.value || '')}
        type="email"
        required
        hint="We'll never share your email"
      />

      <KSelect
        label="Country"
        options={[
          { label: 'United States', value: 'us' },
          { label: 'Canada', value: 'ca' },
        ]}
        value={selectedValue}
        onChange={setSelectedValue}
        placeholder="Select a country"
      />

      <KButton
        variant="primary"
        onClick={() => setIsModalOpen(true)}
      >
        Open Modal
      </KButton>

      <KModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Confirm Action"
        footer={
          <>
            <KButton onClick={() => setIsModalOpen(false)}>Cancel</KButton>
            <KButton variant="primary" onClick={handleConfirm}>
              Confirm
            </KButton>
          </>
        }
      >
        Are you sure you want to proceed?
      </KModal>
    </>
  );
}
```

## Components Overview

### Buttons

- **KButton** - Button component with variants (primary, secondary, ghost, danger) and sizes

### Inputs

- **KTextInput** - Text input with label, hint, and error support
- **KNumericInput** - Numeric input with formatting and validation
- **KMaskedInput** - Masked input for formatted data entry
- **KDatePicker** - Date picker with calendar popup

### Selects

- **KSelect** - Single-select dropdown
- **KMultiSelect** - Multi-select dropdown

### Form Controls

- **KCheckbox** - Checkbox with label, hint, and error support
- **KRadio** - Radio button component
- **KRadioGroup** - Radio button group for managing selections

### Modals

- **KModal** - Modal dialog with customizable header, body, and footer

### Layout

- **KStack** - Flex stack layout helper with gap and alignment props

### Theme

- **KThemeProvider** - Theme provider for customizing colors, typography, spacing, and more
- **useTheme** - Hook to access theme context

For detailed API documentation, see [docs/COMPONENTS.md](./docs/COMPONENTS.md).

## Theming

Kendo Kit supports comprehensive theming through `KThemeProvider`. You can customize:

- **Colors** - Primary, secondary, and semantic colors with automatic variations
- **Typography** - Font family, size, weight, and line height
- **Spacing** - Custom spacing scale
- **Border Radius** - Custom border radius values

See [docs/THEMING_GUIDELINES.md](./docs/THEMING_GUIDELINES.md) for detailed theming documentation.

## Development

### Running Storybook

```bash
pnpm storybook
```

### Running Tests

```bash
pnpm test          # Run tests once
pnpm test:watch    # Run tests in watch mode
```

### Building

```bash
pnpm build
```

### Linting and Formatting

```bash
pnpm lint              # Check for linting errors
pnpm format            # Format code
pnpm format:check      # Check formatting
```

For more information on contributing, see [docs/CONTRIBUTING.md](./docs/CONTRIBUTING.md).

## License

MIT

## Documentation

- [Component API Reference](./docs/COMPONENTS.md) - Detailed API documentation for all components
- [Theming Guidelines](./docs/THEMING_GUIDELINES.md) - Guide to customizing themes
- [Contributing Guide](./docs/CONTRIBUTING.md) - How to contribute to the project
- [Accessibility Guide](./docs/ACCESSIBILITY.md) - Accessibility features and best practices
- [Changelog](./docs/CHANGELOG.md) - Version history and changes

## Links

- [GitHub Repository](https://github.com/your-org/kendo-kit)
- [Storybook Documentation](https://your-storybook-url.com) (if hosted)
- [NPM Package](https://www.npmjs.com/package/kendo-kit) (if published)


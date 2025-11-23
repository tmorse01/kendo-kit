# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2024-01-XX

### Added

#### Components
- **KButton** - Button component with variants (primary, secondary, ghost, danger) and sizes (sm, md, lg)
  - Support for loading state with spinner
  - Icon support (left and right)
  - Full TypeScript support

- **KTextInput** - Text input component with consistent API
  - Controlled and uncontrolled usage
  - Label, hint, and error message support
  - Full width option
  - Required field indicator

- **KNumericInput** - Numeric input component
  - Number formatting support (currency, decimal, etc.)
  - Min/max/step validation
  - Spinner controls
  - Controlled and uncontrolled usage

- **KMaskedInput** - Masked input component
  - Custom mask patterns
  - Formatted data entry (phone numbers, dates, etc.)
  - Controlled and uncontrolled usage

- **KSelect** - Single-select dropdown component
  - Unified option type (`KOption`)
  - Loading state support
  - Label, hint, and error message support
  - Controlled and uncontrolled usage

- **KMultiSelect** - Multi-select dropdown component
  - Multiple selection support
  - Unified option type (`KOption`)
  - Loading state support
  - Label, hint, and error message support

- **KModal** - Modal dialog component
  - Customizable header, body, and footer
  - Size variants (sm, md, lg)
  - ESC key and overlay click to close
  - Full TypeScript support

- **KStack** - Flex stack layout helper
  - Direction (row/column)
  - Gap spacing
  - Alignment options (align, justify)
  - Full width support

- **KThemeProvider** - Theme provider component
  - Custom color tokens (primary, secondary, semantic colors)
  - Typography customization
  - Spacing scale
  - Border radius customization
  - Automatic color variation generation
  - CSS variable injection

- **useTheme** - Hook to access theme context
  - Access theme tokens in components
  - Type-safe theme access

- **KDatePicker** - Date picker component
  - Date selection with calendar popup
  - Min/max date constraints
  - Custom date formatting
  - Controlled and uncontrolled usage
  - Label, hint, and error message support

- **KCheckbox** - Checkbox component
  - Controlled and uncontrolled usage
  - Indeterminate state support
  - Label, hint, and error message support
  - Full width option

- **KRadio** - Radio button component
  - Controlled and uncontrolled usage
  - Group support via `name` prop
  - Label support
  - Full width option

- **KRadioGroup** - Radio button group component
  - Group management for radio buttons
  - Options array or custom children
  - Controlled and uncontrolled usage
  - Layout direction (row/column)
  - Label, hint, and error message support

#### Documentation
- Comprehensive README.md with installation and usage examples
- Component API reference (docs/COMPONENTS.md)
- Theming guidelines (docs/THEMING_GUIDELINES.md)
- Project setup documentation (docs/PROJECT_SETUP.md)
- Testing strategy documentation (docs/TESTING_STRATEGY.md)
- Story testing documentation (docs/STORY_TESTING.md)

#### Development
- TypeScript strict mode configuration
- ESLint and Prettier setup
- Vitest testing framework with React Testing Library
- Storybook 8+ with React/Vite builder
- Vite library mode build configuration
- ESM and CJS output support
- Tree-shakable exports
- CI/CD scripts (`ci:test`)

#### Testing
- Component unit tests
- Integration tests
- Storybook stories for all components
- Accessibility testing patterns

### Technical Details

- **React**: >=19.0.0
- **TypeScript**: Strict mode enabled
- **Build**: Vite library mode with dual ESM/CJS outputs
- **Peer Dependencies**: 
  - `@progress/kendo-react-buttons`
  - `@progress/kendo-react-inputs`
  - `@progress/kendo-react-dropdowns`
  - `@progress/kendo-react-dialogs`
  - `@progress/kendo-react-dateinputs` (for KDatePicker)

---

## [Unreleased]

### Planned
- Additional form components
- Data display components (Badge, Card)
- Navigation components (Tabs)
- Feedback components (Toast, Spinner)
- Enhanced accessibility features
- Dark mode support
- Additional theme customization options

[0.1.0]: https://github.com/your-org/kendo-kit/releases/tag/v0.1.0


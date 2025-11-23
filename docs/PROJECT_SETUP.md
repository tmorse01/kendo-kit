# Project Setup Documentation

This document describes the initial setup of the **kendo-kit** project, a TypeScript React component library that wraps KendoReact components.

## Project Structure

```
kendo-kit/
├── src/
│   ├── components/          # Component implementations
│   │   ├── Button/
│   │   ├── Input/
│   │   ├── Select/
│   │   ├── Modal/
│   │   └── Layout/
│   ├── stories/             # Storybook stories
│   └── index.ts             # Barrel export file
├── tests/                   # Test files
│   ├── setup.ts            # Test configuration
│   └── example.test.tsx    # Example test
├── .storybook/              # Storybook configuration
│   ├── main.ts
│   └── preview.ts
├── docs/                    # Documentation
│   ├── prompt.md
│   └── PROJECT_SETUP.md
├── dist/                    # Build output (generated)
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── vitest.config.ts
├── .eslintrc.cjs
├── .prettierrc
└── .gitignore
```

## Technology Stack

- **Language:** TypeScript 5.3+ with strict mode
- **React:** 19+
- **Build Tool:** Vite 5+ (library mode)
- **Testing:** Vitest + React Testing Library
- **Documentation:** Storybook 8+
- **Linting:** ESLint + Prettier
- **Package Manager:** pnpm (preferred) or npm

## Configuration Details

### TypeScript

- **Strict mode enabled** (`strict: true`)
- **JSX:** `react-jsx` (new JSX transform)
- **Module resolution:** Bundler mode
- **Target:** ES2020
- Separate config for Node.js files (`tsconfig.node.json`)

### Build Configuration (Vite)

- **Library mode** with dual output:
  - ESM: `dist/index.mjs`
  - CJS: `dist/index.cjs`
  - Types: `dist/index.d.ts`
- **External dependencies:** React, React DOM, and all KendoReact packages
- **Tree-shaking:** Enabled via `sideEffects: false` in package.json
- **Type definitions:** Generated via `vite-plugin-dts`

### Testing (Vitest)

- **Test environment:** jsdom (for DOM testing)
- **Test runner:** Vitest with React Testing Library
- **Coverage:** V8 provider with text, JSON, and HTML reports
- **Setup file:** `tests/setup.ts` (includes jest-dom matchers)

### Storybook

- **Framework:** React + Vite builder
- **Version:** 8+
- **Addons:** Essentials, Links, Interactions
- **Auto-docs:** Enabled with tag-based organization

### Linting & Formatting

- **ESLint:** TypeScript + React rules
- **Prettier:** Standard formatting rules
- **Scripts:**
  - `pnpm lint` - Run ESLint
  - `pnpm format` - Format code with Prettier
  - `pnpm format:check` - Check formatting

## Package Configuration

### Peer Dependencies

The library requires these peer dependencies (not bundled):

- `react >= 19.0.0`
- `react-dom >= 19.0.0`
- `@progress/kendo-react-buttons`
- `@progress/kendo-react-inputs`
- `@progress/kendo-react-dropdowns`
- `@progress/kendo-react-dialogs`

### Build Outputs

- **CommonJS:** `dist/index.cjs`
- **ES Modules:** `dist/index.mjs`
- **Type Definitions:** `dist/index.d.ts`

### Package Exports

The package uses the `exports` field for modern module resolution:

```json
{
  ".": {
    "import": { "types": "./dist/index.d.ts", "default": "./dist/index.mjs" },
    "require": { "types": "./dist/index.d.ts", "default": "./dist/index.cjs" }
  }
}
```

## Available Scripts

- `pnpm build` - Build the library (ESM + CJS + types)
- `pnpm test` - Run tests once
- `pnpm test:watch` - Run tests in watch mode
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier
- `pnpm format:check` - Check code formatting
- `pnpm storybook` - Start Storybook dev server
- `pnpm build-storybook` - Build static Storybook site
- `pnpm ci:test` - Run lint + test + build (CI script)

## Getting Started

1. **Install dependencies:**

   ```bash
   pnpm install
   # or
   npm install
   ```

2. **Verify setup:**

   ```bash
   # Run tests
   pnpm test

   # Build the library
   pnpm build

   # Start Storybook
   pnpm storybook
   ```

3. **Development workflow:**

   - Components go in `src/components/[ComponentName]/`
   - Tests go in `tests/` (mirror component structure)
   - Stories go alongside components or in `src/stories/`
   - Export components from `src/index.ts`

## Next Steps

After initial setup, the following tasks are ready:

- **Task 2:** Implement Button wrappers (`KButton`)
- **Task 3:** Implement Input wrappers (`KTextInput`, `KNumericInput`, etc.)
- **Task 4:** Implement Select/Dropdown wrappers (`KSelect`, `KMultiSelect`)
- **Task 5:** Implement Modal and Layout components (`KModal`, `KStack`)
- **Task 6:** Documentation and package hygiene

## Notes

- The library is designed to be **tree-shakable** - consumers can import only what they need
- All KendoReact packages are **peer dependencies** - they must be installed by the consuming application
- TypeScript strict mode ensures type safety throughout the codebase
- Storybook provides interactive documentation and visual testing
- Tests use React Testing Library for component behavior testing


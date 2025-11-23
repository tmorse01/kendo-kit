# prompt.md

## Kendo UI Wrapper Component Library — Cursor 2.0 Multi-Agent Prompt

### Project Overview

Build a **TypeScript React component library** that wraps **KendoReact** components with:

- A consistent API & naming convention
- Good defaults for styling & layout
- Proper tree-shaking & bundling
- Tests and Storybook stories
- “Production-ready” package setup (linting, CI hooks, etc.)

The resulting package should be something like:

```jsonc
{
  "name": "kendo-kit",
  "version": "0.1.0",
  "main": "dist/index.cjs",
  "module": "dist/index.mjs",
  "types": "dist/index.d.ts",
  "sideEffects": false,
  "peerDependencies": {
    "react": ">=19",
    "react-dom": ">=19",
    "@progress/kendo-react-buttons": "latest",
    "@progress/kendo-react-inputs": "latest",
    "@progress/kendo-react-dropdowns": "latest",
    "@progress/kendo-react-dialogs": "latest"
  }
}
```

We are **not** re-inventing Kendo; we’re creating a **thin but opinionated wrapper layer** that standardizes usage across an app ecosystem.

---

## Tech Stack & Conventions

Use:

- **Language:** TypeScript, React 19+
- **Package manager:** pnpm (preferred) or npm
- **Build:** Vite library mode
- **Testing:** Vitest + React Testing Library
- **Stories:** Storybook 8+ (React / Vite builder)
- **Linting:** ESLint + Prettier
- **Types:** Strict TypeScript (`"strict": true`)

General rules:

- Expose only **ESM + CJS** outputs and `.d.ts` types.
- Mark React + KendoReact packages as **peerDependencies**, not dependencies.
- Library should be **tree-shakable** (no unnecessary side effects).
- Barrel export from `src/index.ts`.

---

## Library Scope

Start with a focused but realistic set of wrappers:

1. **Buttons**

   - `<KButton />` wrapping `@progress/kendo-react-buttons`’s `Button`
   - Support:
     - `variant` prop (`"primary" | "secondary" | "ghost" | "danger"`)
     - `size` prop (`"sm" | "md" | "lg"`)
     - `isLoading` state

2. **Inputs**

   - `<KTextInput />` wrapping `Input` / `TextBox`
   - `<KNumericInput />` wrapping `NumericTextBox`
   - `<KMaskedInput />` where appropriate
   - Standard props: `label`, `hint`, `error`, `required`, `fullWidth`

3. **Selects / Dropdowns**

   - `<KSelect />` wrapping `DropDownList`
   - `<KMultiSelect />` wrapping `MultiSelect`
   - Consistent option type: `{ label: string; value: string | number; [key: string]: any }`
   - Support controlled + uncontrolled usage

4. **Modal / Dialog**

   - `<KModal />` wrapping `Dialog`
   - Props for `isOpen`, `onClose`, `title`, `footer`, `size`

5. **Layout primitives**
   - `<KStack />` for flex stack layout (thin wrapper, optional)
   - Simple spacing + alignment props

Each wrapper should:

- Hide weird Kendo prop names behind a cleaner interface where reasonable.
- Re-export any necessary Kendo enums/types where helpful.

---

## Multi-Agent Workflow

We want **multiple Cursor agents (5+)** to work **in parallel** after initial setup.

**Guideline for ALL agents:**

- Before changing anything, **inspect existing files & context**.
- Preserve existing patterns and conventions.
- Prefer **small, focused PR-sized changes**.

---

## Task 1 – Initial Project Setup (Agent 1)

**Goal:** Create a clean, modern, library-ready project.

1. **Scaffold project**

   - Initialize a new TypeScript React library repo.
   - Set up basic structure:

     ```
     /src
       /components
         /Button
         /Input
         /Select
         /Modal
         /Layout
       /stories
       index.ts
     /tests
     tsconfig.json
     vite.config.ts (or rollup.config.mjs)
     package.json
     .eslintrc.cjs
     .prettierrc
     .gitignore
     ```

2. **Configure build**

   - Use **Vite library mode** (preferred) OR Rollup with:
     - ESM & CJS outputs
     - `external` React + Kendo packages
     - Proper `build.lib` config and entry `src/index.ts`.

3. **Configure TypeScript**

   - `strict: true`
   - `jsx: "react-jsx"`
   - Proper `paths` if needed

4. **Set up ESLint + Prettier**

   - React + TypeScript rules
   - Scripts in `package.json`:
     - `"lint"`, `"format"`, `"build"`, `"test"`, `"storybook"`

5. **Set up Storybook**

   - React + Vite builder
   - Basic Storybook config with a sample story to confirm it works.

6. **Set up Vitest**
   - Working test config for React
   - Example test file that passes.

When done, document the setup in `docs/PROJECT_SETUP.md`.

---

## Task 2 – Button Wrappers (Agent 2)

**Goal:** Implement the `KButton` wrapper with tests + stories.

1. Implement `<KButton />` component:

   - Wrap Kendo `Button`
   - Props:
     - `variant?: "primary" | "secondary" | "ghost" | "danger"`
     - `size?: "sm" | "md" | "lg"`
     - `isLoading?: boolean`
     - `iconLeft?`, `iconRight?` (optional)
   - Map props to underlying Kendo props & classes.

2. Tests:

   - Snapshot basic render
   - Behavior tests:
     - click handler calls
     - disabled state
     - loading state visually distinct (e.g., aria-busy, spinner, etc.)

3. Storybook stories:

   - Default
   - Variants
   - Sizes
   - Loading
   - With icons

4. Export from `src/index.ts`.

---

## Task 3 – Input Wrappers (Agent 3)

**Goal:** Implement `KTextInput`, `KNumericInput`, `KMaskedInput` wrappers.

1. Shared input API:

   - Props for all:
     - `label?: string`
     - `hint?: string`
     - `error?: string`
     - `required?: boolean`
     - `fullWidth?: boolean`
     - `value`, `onChange` in standard React style

2. Implement:

   - `<KTextInput />` – text input wrapper
   - `<KNumericInput />` – numeric wrapper
   - `<KMaskedInput />` – if supported / needed

3. Ensure proper controlled vs uncontrolled support.

4. Tests:

   - Controlled value updates
   - Error state applied
   - Label/aria associations

5. Stories:

   - Default
   - With label + hint
   - With error
   - Required
   - Numeric and currency example

6. Export from `src/index.ts`.

---

## Task 4 – Select / Dropdown Wrappers (Agent 4)

**Goal:** Implement `KSelect` and `KMultiSelect` with a unified option model.

1. Define a shared option type:

   ```ts
   export type KOption = {
     label: string;
     value: string | number;
     [key: string]: any;
   };
   ```

2. Implement:

   - `<KSelect />`
   - `<KMultiSelect />`

   Props:

   - `options: KOption[]`
   - `value: string | number | (string | number)[]`
   - `onChange(value: ...)`
   - `label`, `hint`, `error`, `required`, `fullWidth`
   - Optional `isLoading` and `placeholder`

3. Correctly map to Kendo `DropDownList` and `MultiSelect`.

4. Tests:

   - Correct option rendering
   - Handling controlled value
   - Empty state & placeholder

5. Stories:

   - Simple select
   - Multi-select
   - With error/hint
   - Loading

6. Export from `src/index.ts`.

---

## Task 5 – Modal / Layout + DX Polish (Agent 5)

**Goal:** Implement `KModal` and some simple layout helpers and polish DX.

1. Implement `<KModal />`:

   - Wrap Kendo `Dialog`
   - Props:
     - `isOpen: boolean`
     - `onClose: () => void`
     - `title?: ReactNode`
     - `children: ReactNode`
     - `footer?: ReactNode`
     - `size?: "sm" | "md" | "lg"`
   - Handle ESC / overlay close where appropriate.

2. Implement `<KStack />`:

   - Simple flex stack helper:
     - `direction?: "row" | "column"`
     - `gap?: number | string`
     - `align?: "start" | "center" | "end"`
     - `justify?: "start" | "center" | "end" | "space-between"`

3. Tests:

   - Modal open/close behavior
   - Stack applies spacing / direction

4. Stories:
   - Simple modal
   - Confirm dialog
   - Stack layout examples

---

## Task 6 – Docs, Readme, and Package Hygiene (Agent 6)

**Goal:** Make this package look and feel production-ready.

1. **README.md**

   - Project description
   - Installation & peerDeps notes
   - Basic usage example for Button/Input/Select/Modal
   - Notes on Kendo license (TELERIK_LICENSE etc. without exposing secrets)

2. **API Documentation**

   - Add `docs/COMPONENTS.md` describing each component’s props.
   - Optionally set up Storybook docs pages.

3. **NPM / Publishing Prep**

   - Verify `package.json` fields:
     - `name`, `version`, `description`
     - `main`, `module`, `types`
     - `files` array or `exports` config
     - `sideEffects: false`
   - Add `build` check to `test` or `ci` script.

4. **CI-friendly Scripts**
   - `"ci:test"` (lint + test + build)
   - Document in `docs/CONTRIBUTING.md` how to run everything.

---

## Task 7 – Additional Component Wrappers (Agent 7)

**Goal:** Expand the component library with commonly-used form and UI components.

1. **Form Controls**

   - `<KCheckbox />` wrapping `Checkbox` from `@progress/kendo-react-inputs`
     - Props: `label`, `checked`, `onChange`, `disabled`, `indeterminate?`, `error?`
     - Support controlled + uncontrolled usage
   - `<KRadio />` wrapping `RadioButton` from `@progress/kendo-react-buttons`
     - Props: `label`, `value`, `checked`, `onChange`, `disabled`, `name` (for groups)
     - Support radio groups via `name` prop
   - `<KRadioGroup />` wrapper component for managing radio groups
     - Props: `name`, `value`, `onChange`, `options?: KOption[]`, `children?`

2. **Date & Time Inputs**

   - `<KDatePicker />` wrapping `DatePicker` from `@progress/kendo-react-dateinputs`
     - Props: `label`, `hint`, `error`, `value`, `onChange`, `min?`, `max?`, `format?`, `required`, `fullWidth`
     - Consistent with other input components (label/hint/error pattern)
   - Add `@progress/kendo-react-dateinputs` to peerDependencies

3. **Feedback Components**

   - `<KToast />` or `<KNotification />` wrapper (if Kendo provides notification components)
     - Or create a simple toast system using Kendo styling
     - Props: `message`, `type?: "success" | "error" | "info" | "warning"`, `duration?`, `onClose?`
   - `<KSpinner />` or `<KLoader />` wrapping `Loader` from `@progress/kendo-react-indicators`
     - Props: `size?: "sm" | "md" | "lg"`, `themeColor?: "primary" | "secondary"`, `overlay?`
     - Add `@progress/kendo-react-indicators` to peerDependencies if needed

4. **Data Display**

   - `<KBadge />` simple badge component (may need custom implementation or Kendo equivalent)
     - Props: `variant?: "primary" | "secondary" | "success" | "warning" | "error"`, `size?`, `children`
   - `<KCard />` simple card container component
     - Props: `title?`, `footer?`, `children`, `elevated?`, `padding?`

5. **Navigation Components**

   - `<KTabs />` wrapping `TabStrip` from `@progress/kendo-react-layouts` (if available)
     - Props: `tabs: Array<{ id: string; label: string; content: ReactNode }>`, `activeTabId`, `onTabChange`
     - Or implement using Kendo styling patterns
   - Add `@progress/kendo-react-layouts` to peerDependencies if used

6. **Tests for each component:**

   - Basic rendering
   - Controlled/uncontrolled behavior (where applicable)
   - Accessibility (ARIA attributes, keyboard navigation)
   - Error states and validation

7. **Storybook stories:**

   - Default usage
   - Variants/states
   - Form integration examples
   - Accessibility examples

8. **Export all new components from `src/index.ts`**

9. **Update `vite.config.ts`** to externalize any new Kendo peer dependencies

**Note:** Prioritize components based on common usage patterns. If a Kendo component doesn't exist for a feature, consider whether a thin custom wrapper using Kendo styling is appropriate, or skip it.

---

## Task 8 – CI/CD with GitHub Actions (Agent 8)

**Goal:** Set up automated CI/CD pipeline for quality assurance and automated testing.

1. **Create `.github/workflows/ci.yml`**

   - **Trigger:** On push to `main`/`master` and on pull requests
   - **Jobs:**
     - **Lint & Format Check**
       - Run `pnpm lint`
       - Run `pnpm format:check`
       - Fail if code doesn't meet standards
     - **Test**
       - Run `pnpm test`
       - Generate coverage reports (optional but recommended)
       - Upload coverage to codecov or similar (optional)
     - **Build**
       - Run `pnpm build`
       - Verify `dist/` outputs exist (ESM, CJS, types)
       - Optionally cache `node_modules` and `dist` for faster runs
     - **Type Check**
       - Run `tsc --noEmit` to catch type errors
     - **Storybook Build** (optional)
       - Run `pnpm build-storybook`
       - Verify Storybook builds successfully

2. **Create `.github/workflows/release.yml`** (optional but recommended)

   - **Trigger:** On tags matching `v*` (e.g., `v1.0.0`)
   - **Jobs:**
     - Run full CI suite (lint, test, build)
     - **Publish to NPM** (if configured)
       - Use `NODE_AUTH_TOKEN` secret
       - Only publish if tag matches version pattern
       - Use `--dry-run` first to validate

3. **Add GitHub-specific files:**

   - `.github/PULL_REQUEST_TEMPLATE.md` – PR template with checklist
   - `.github/ISSUE_TEMPLATE/` – Bug report and feature request templates (optional)

4. **Configure branch protection** (documentation only, not code):

   - Document in `docs/CONTRIBUTING.md` that `main` branch requires:
     - Passing CI checks
     - At least one approval (if team workflow)
     - Up-to-date with base branch

5. **Add status badges to README.md** (will be created in Task 9):

   - CI status badge
   - Test coverage badge (if using coverage service)
   - NPM version badge (if published)

6. **Optimize workflow performance:**

   - Use `pnpm` caching
   - Cache `node_modules` between runs
   - Run jobs in parallel where possible
   - Use matrix strategy for multiple Node versions (optional: test on Node 18, 20, 22)

7. **Add workflow status checks:**

   - Ensure workflows fail fast on errors
   - Add helpful error messages
   - Consider adding a "check" workflow that runs on schedule (weekly) to catch dependency issues

**Note:** Keep workflows simple and focused. Avoid over-engineering. The goal is automated quality checks, not complex deployment pipelines (unless specifically needed).

---

## Task 9 – Comprehensive Documentation (Agent 9)

**Goal:** Create production-ready documentation for users and contributors.

1. **README.md** (root level)

   - **Header:** Project name, description, badges (CI, coverage, version)
   - **Installation:**
     - `pnpm add kendo-kit` or `npm install kendo-kit`
     - List all peer dependencies with versions
     - Note about Kendo license requirements (TELERIK_LICENSE environment variable)
   - **Quick Start:**
     - Basic example showing `KThemeProvider` setup
     - Example using `KButton`, `KTextInput`, `KSelect`
   - **Components Overview:**
     - Table or list linking to detailed docs
     - Brief description of each component category
   - **Theming:**
     - Link to `docs/THEMING_GUIDELINES.md`
     - Quick example of custom theme
   - **Development:**
     - Link to `docs/CONTRIBUTING.md`
     - Link to Storybook (if hosted)
   - **License:** MIT (or as specified)
   - **Links:** GitHub, Storybook, NPM (if published)

2. **docs/COMPONENTS.md** – API Reference

   - **Structure:** One section per component category
   - **For each component:**
     - Component name and description
     - Import statement
     - Props table with:
       - Prop name
       - Type
       - Default
       - Required?
       - Description
     - Usage examples (code blocks)
     - Related components
   - **Sections:**
     - Buttons (`KButton`)
     - Inputs (`KTextInput`, `KNumericInput`, `KMaskedInput`)
     - Selects (`KSelect`, `KMultiSelect`)
     - Form Controls (`KCheckbox`, `KRadio`, `KRadioGroup` – if implemented)
     - Date & Time (`KDatePicker` – if implemented)
     - Modals (`KModal`)
     - Layout (`KStack`)
     - Theme (`KThemeProvider`, `useTheme`)
     - Other components (as added)

3. **docs/CONTRIBUTING.md** – Contributor Guide

   - **Getting Started:**
     - Prerequisites (Node, pnpm)
     - Setup instructions (`pnpm install`)
     - Running dev commands (`pnpm storybook`, `pnpm test:watch`)
   - **Development Workflow:**
     - Branch naming conventions
     - Commit message guidelines
     - PR process
     - Testing requirements
   - **Code Style:**
     - ESLint and Prettier usage
     - TypeScript conventions
     - Component structure patterns
   - **Adding New Components:**
     - Step-by-step guide
     - Required files (component, types, tests, stories)
     - Export requirements
   - **Testing:**
     - How to write tests
     - Running tests
     - Test coverage expectations
   - **Storybook:**
     - How to add stories
     - Story conventions
   - **CI/CD:**
     - What runs on PR
     - How to check CI status
   - **Questions:** Where to ask (GitHub Issues, etc.)

4. **docs/CHANGELOG.md** – Version History

   - Follow [Keep a Changelog](https://keepachangelog.com/) format
   - Sections: `Added`, `Changed`, `Deprecated`, `Removed`, `Fixed`, `Security`
   - Start with current version (0.1.0)
   - Document all existing components as "Added" in initial version

5. **LICENSE** file

   - Add MIT License text (matching `package.json` license field)
   - Or update `package.json` if different license is needed

6. **docs/MIGRATION.md** (optional, for future versions)

   - Template for migration guides between major versions
   - Can be empty initially but structure it for future use

7. **docs/ACCESSIBILITY.md** (optional but recommended)

   - Document accessibility features
   - Keyboard navigation patterns
   - ARIA attribute usage
   - Screen reader compatibility notes
   - Testing with assistive technologies

8. **Update existing documentation:**

   - Ensure `docs/PROJECT_SETUP.md` is still accurate
   - Update `docs/THEMING_GUIDELINES.md` if needed
   - Cross-reference between docs

9. **Storybook Documentation** (enhancement):

   - Ensure all stories have good descriptions
   - Add JSDoc comments to components (if not already present)
   - Configure Storybook to generate docs automatically
   - Add "Overview" page in Storybook

10. **Code Examples:**

    - Create `examples/` directory (optional)
    - Add a simple example app showing library usage
    - Or link to CodeSandbox/StackBlitz examples

**Note:** Documentation should be clear, concise, and example-driven. Prioritize user-facing docs (README, COMPONENTS.md) over contributor docs, but both are important for a healthy open-source project.

---

## Definition of Done (for the whole project)

- `pnpm install` (or `npm install`) works with no errors.
- `pnpm build` succeeds.
- `pnpm test` runs and passes basic tests.
- `pnpm storybook` runs and shows working stories for all components.
- `dist/` contains ESM + CJS + `.d.ts` outputs.
- All components are exported from `src/index.ts`.
- README and docs explain usage and installation clearly.

---

## Notes to Cursor / Agents

- If you are not the first agent, **inspect the repo and existing files first**.
- Do not undo or radically change another agent’s work unless it’s clearly broken.
- Prefer incremental edits with clear structure, comments, and file organization.
- Keep the library **small, composable, and conventional** – don’t over-customize Kendo.

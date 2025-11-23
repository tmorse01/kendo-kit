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

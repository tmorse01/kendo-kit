# Contributing to Kendo Kit

Thank you for your interest in contributing to Kendo Kit! This document provides guidelines and instructions for contributing to the project.

## Getting Started

### Prerequisites

- **Node.js**: 18.x or higher
- **Package Manager**: pnpm (preferred) or npm
- **Git**: For version control

### Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-org/kendo-kit.git
   cd kendo-kit
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Verify setup:**

   ```bash
   # Run tests
   pnpm test

   # Build the library
   pnpm build

   # Start Storybook
   pnpm storybook
   ```

If all commands succeed, you're ready to start contributing!

## Development Workflow

### Branch Naming Conventions

- **Feature branches**: `feature/component-name` or `feature/description`
- **Bug fixes**: `fix/issue-description` or `fix/component-name`
- **Documentation**: `docs/topic`
- **Refactoring**: `refactor/description`

Examples:
- `feature/add-kdatepicker`
- `fix/kbutton-loading-state`
- `docs/update-contributing-guide`

### Commit Message Guidelines

Follow conventional commit format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(Button): add loading state with spinner

Add isLoading prop to KButton component that shows a spinner
and disables the button when true.

Closes #123
```

```
fix(Input): correct error message display

Fix issue where error messages were not properly associated
with input fields via aria-describedby.
```

### Pull Request Process

1. **Create a branch** from `main`:
   ```bash
   git checkout -b feature/my-feature
   ```

2. **Make your changes** following the code style guidelines below

3. **Write tests** for your changes (see Testing section)

4. **Add Storybook stories** if adding a new component or significant feature

5. **Run the CI checks locally**:
   ```bash
   pnpm ci:test
   ```

6. **Commit your changes** with clear commit messages

7. **Push to your fork**:
   ```bash
   git push origin feature/my-feature
   ```

8. **Create a Pull Request** on GitHub with:
   - Clear title and description
   - Reference to related issues (if any)
   - Screenshots or examples (for UI changes)
   - Checklist of what was done

9. **Ensure CI passes** - All checks must pass before merge

### PR Checklist

Before submitting a PR, ensure:

- [ ] Code follows the style guidelines
- [ ] Tests are added/updated and passing
- [ ] Storybook stories are added/updated (if applicable)
- [ ] Documentation is updated (if needed)
- [ ] `pnpm ci:test` passes locally
- [ ] No linting errors
- [ ] TypeScript compiles without errors
- [ ] Changes are backward compatible (or migration guide is provided)

## Code Style

### TypeScript Conventions

- Use **strict TypeScript** (`strict: true`)
- Prefer `interface` over `type` for component props
- Use explicit return types for exported functions
- Avoid `any` - use `unknown` if necessary
- Use JSDoc comments for public APIs

**Example:**
```typescript
/**
 * Props for KButton component
 */
export interface KButtonProps {
  /**
   * Button variant style
   * @default 'primary'
   */
  variant?: KButtonVariant;
  /**
   * Button size
   * @default 'md'
   */
  size?: KButtonSize;
  children: React.ReactNode;
}
```

### Component Structure

Each component should follow this structure:

```
src/components/ComponentName/
├── ComponentName.tsx      # Main component
├── index.ts              # Exports
└── ComponentName.stories.tsx  # Storybook stories (optional, can be in src/stories/)
```

**Component Template:**
```typescript
import React from 'react';
import { BaseComponent, BaseComponentProps } from '@progress/kendo-react-...';

export interface KComponentProps extends Omit<BaseComponentProps, '...'> {
  /**
   * Description of prop
   */
  propName?: string;
}

/**
 * KComponent - Description of component
 *
 * @example
 * ```tsx
 * <KComponent propName="value" />
 * ```
 */
export function KComponent(props: KComponentProps) {
  const { propName, ...restProps } = props;
  
  return (
    <BaseComponent {...restProps}>
      {/* Component implementation */}
    </BaseComponent>
  );
}
```

### File Naming

- **Components**: PascalCase (e.g., `KButton.tsx`)
- **Utilities**: camelCase (e.g., `utils.tsx`)
- **Types**: camelCase with `Props` suffix (e.g., `KButtonProps`)
- **Tests**: `ComponentName.test.tsx`
- **Stories**: `ComponentName.stories.tsx`

### Import Organization

1. React imports
2. Third-party imports (Kendo, etc.)
3. Local component imports
4. Type imports (use `import type`)

```typescript
import React from 'react';
import { Button, ButtonProps } from '@progress/kendo-react-buttons';
import { InputWrapper } from '../Input/utils';
import type { KOption } from '../../types';
```

## Adding New Components

### Step-by-Step Guide

1. **Create component directory:**
   ```bash
   mkdir -p src/components/ComponentName
   ```

2. **Create component file** (`ComponentName.tsx`):
   - Define props interface
   - Implement component
   - Add JSDoc comments
   - Export component

3. **Create index file** (`index.ts`):
   ```typescript
   export { KComponent } from './KComponent';
   export type { KComponentProps } from './KComponent';
   ```

4. **Export from main index** (`src/index.ts`):
   ```typescript
   export { KComponent } from './components/ComponentName';
   export type { KComponentProps } from './components/ComponentName';
   ```

5. **Write tests** (`tests/KComponent.test.tsx`):
   - Basic rendering
   - Props handling
   - User interactions
   - Edge cases

6. **Add Storybook stories** (`src/stories/KComponent.stories.tsx` or alongside component):
   - Default story
   - Variants/states
   - Interactive examples

7. **Update documentation:**
   - Add to `docs/COMPONENTS.md`
   - Update README.md if needed

8. **Update peer dependencies** in `package.json` if new Kendo package is needed

9. **Update `vite.config.ts`** to externalize new peer dependencies

### Component Requirements

- ✅ Support controlled and uncontrolled usage (where applicable)
- ✅ Consistent prop naming (label, hint, error, required, fullWidth)
- ✅ Proper TypeScript types
- ✅ Accessibility (ARIA attributes, keyboard navigation)
- ✅ Error handling
- ✅ Tests covering main functionality
- ✅ Storybook stories

## Testing

### Running Tests

```bash
# Run all tests once
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test -- --coverage
```

### Writing Tests

Use **Vitest** and **React Testing Library**:

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { KButton } from '../src/components/Button';

describe('KButton', () => {
  it('renders with children', () => {
    render(<KButton>Click me</KButton>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<KButton onClick={handleClick}>Click</KButton>);
    
    screen.getByText('Click').click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Test Coverage Expectations

- **Minimum**: 80% coverage for new components
- **Critical paths**: 100% coverage
- **Edge cases**: Test error states, disabled states, etc.

### Testing Patterns

- Use `@testing-library/react` for component rendering
- Use `@testing-library/user-event` for user interactions
- Test accessibility with `@testing-library/jest-dom` matchers
- Use `vi.fn()` for mocking callbacks
- Test both controlled and uncontrolled usage

## Storybook

### Running Storybook

```bash
# Development server
pnpm storybook

# Build static site
pnpm build-storybook
```

### Adding Stories

Stories should be in `src/stories/` or alongside components:

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { KButton } from '../components/Button';

const meta: Meta<typeof KButton> = {
  title: 'Components/KButton',
  component: KButton,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof KButton>;

export const Default: Story = {
  args: {
    children: 'Click me',
  },
};

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};
```

### Story Conventions

- Use `Meta` and `StoryObj` types
- Group related components (e.g., `Components/KButton`)
- Include `tags: ['autodocs']` for auto-generated docs
- Provide clear, realistic examples
- Show different variants and states

## Linting and Formatting

### Running Linters

```bash
# Check for linting errors
pnpm lint

# Format code
pnpm format

# Check formatting
pnpm format:check
```

### ESLint Rules

- React hooks rules enabled
- TypeScript rules enabled
- No unused variables
- No console.log in production code

### Prettier Configuration

- Single quotes
- Trailing commas
- 2-space indentation
- Semicolons

## CI/CD

### What Runs on PR

When you create a Pull Request, the following checks run automatically:

1. **Lint & Format Check**
   - ESLint validation
   - Prettier formatting check

2. **Type Check**
   - TypeScript compilation (`tsc --noEmit`)

3. **Tests**
   - All unit tests
   - Integration tests

4. **Build**
   - Verify library builds successfully
   - Check ESM and CJS outputs

### Checking CI Status

- View CI status on the PR page
- All checks must pass before merge
- Fix any failing checks locally before requesting review

## Documentation

### Updating Documentation

- **Component API**: Update `docs/COMPONENTS.md`
- **Theming**: Update `docs/THEMING_GUIDELINES.md`
- **Setup**: Update `docs/PROJECT_SETUP.md`
- **Changelog**: Update `docs/CHANGELOG.md` for user-facing changes

### Documentation Style

- Use clear, concise language
- Include code examples
- Link to related documentation
- Keep examples up-to-date

## Questions?

- **GitHub Issues**: Open an issue for bugs or feature requests
- **Discussions**: Use GitHub Discussions for questions
- **Pull Requests**: Ask questions in PR comments

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Follow the project's coding standards

Thank you for contributing to Kendo Kit! 🎉

# Testing Strategy: Component Tests vs Story Tests

## TL;DR

**Focus on component tests.** Story tests are optional and mainly useful for:
- Smoke tests to ensure stories don't break
- Catching Storybook-specific integration issues
- Verifying documentation examples work

## Component Tests (Primary)

**What:** Test components directly using their API

**Example:**
```tsx
// tests/KButton.test.tsx
import { KButton } from '../src/components/Button';

it('should call onClick when clicked', async () => {
  const handleClick = vi.fn();
  render(<KButton onClick={handleClick}>Click me</KButton>);
  // ... test behavior
});
```

**Pros:**
- ✅ Tests component behavior directly
- ✅ Faster execution
- ✅ Easier to test edge cases
- ✅ Standard unit testing practice
- ✅ Tests the actual API consumers will use
- ✅ Better for TDD workflow

**Cons:**
- ❌ Doesn't verify stories/documentation work
- ❌ Might miss Storybook-specific issues

## Story Tests (Secondary/Optional)

**What:** Test stories using `composeStories`

**Example:**
```tsx
// tests/KButton.stories.test.tsx
import { composeStories } from '@storybook/react';
import * as stories from '../src/stories/KButton.stories';

const { Default } = composeStories(stories);

it('renders default story without errors', () => {
  render(<Default />);
  // ... assertions
});
```

**Pros:**
- ✅ Ensures stories/documentation actually work
- ✅ Catches Storybook integration issues (like missing ThemeProvider)
- ✅ Verifies examples users see are correct
- ✅ Can catch decorator/parameter issues

**Cons:**
- ❌ Mostly redundant if you have good component tests
- ❌ Slower (more setup, Storybook dependencies)
- ❌ Tests Storybook-specific behavior, not component behavior
- ❌ Stories are meant for documentation, not unit testing

## Recommended Approach

### 1. **Write Comprehensive Component Tests** (Primary)

Test all component behavior, props, states, and interactions:

```tsx
// tests/KButton.test.tsx
describe('KButton', () => {
  it('renders with default props', () => { ... });
  it('handles onClick', () => { ... });
  it('disables when isLoading', () => { ... });
  it('applies correct variant styles', () => { ... });
  // ... comprehensive coverage
});
```

### 2. **Add Minimal Story Smoke Tests** (Optional)

Only if you want to catch Storybook-specific issues:

```tsx
// tests/KButton.stories.test.tsx
describe('KButton Stories', () => {
  // Just smoke tests - ensure stories render without errors
  it('renders all stories without errors', () => {
    expect(() => render(<Default />)).not.toThrow();
    expect(() => render(<Variants />)).not.toThrow();
    expect(() => render(<Loading />)).not.toThrow();
  });
});
```

### 3. **Use Storybook Interaction Tests** (Alternative)

Instead of separate story test files, add interaction tests directly in stories:

```tsx
// src/stories/KButton.stories.tsx
import { expect, within } from '@storybook/test';

export const Variants: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole('button');
    expect(buttons).toHaveLength(4);
  },
};
```

## When Story Tests Make Sense

✅ **Use story tests when:**
- You want to ensure documentation examples work
- You've had Storybook-specific integration issues (like ThemeProvider)
- You want smoke tests for all stories
- Stories have complex decorators/parameters that need verification

❌ **Skip story tests when:**
- You have comprehensive component tests
- Stories are simple and just show component usage
- You want faster test execution
- You're doing TDD (test-driven development)

## Current Project Recommendation

Looking at your codebase:

1. **Keep `tests/KButton.test.tsx`** - This is your primary test suite ✅
2. **Consider removing `tests/KButton.stories.test.tsx`** - It's mostly redundant
3. **Or simplify it** to just smoke tests:

```tsx
// Minimal smoke test
describe('KButton Stories', () => {
  it('all stories render without errors', () => {
    const { Default, Variants, Loading } = composeStories(stories);
    expect(() => render(<Default />)).not.toThrow();
    expect(() => render(<Variants />)).not.toThrow();
    expect(() => render(<Loading />)).not.toThrow();
  });
});
```

## Best Practice Summary

| Test Type | When to Use | Coverage |
|-----------|-------------|----------|
| **Component Tests** | Always | Component behavior, props, states, interactions |
| **Story Tests** | Optional | Smoke tests, Storybook integration |
| **Storybook Interactions** | Optional | User interactions within Storybook |

**Rule of thumb:** If your component tests are comprehensive, story tests are usually redundant. Use them sparingly for smoke tests or when you've had Storybook-specific issues.


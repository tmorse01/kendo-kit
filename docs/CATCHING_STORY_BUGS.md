# How to Catch Story Bugs Before They Surface

This document explains how you could have caught the `fillMode` error that surfaced in the Variants button story.

## The Bug

**Error:** `TypeError: Cannot read properties of undefined (reading 'fillMode')`

**Root Cause:** Kendo React components require a theme context provider to function properly. Without it, components throw errors when trying to access theme properties.

## How to Catch This Bug

### 1. **Story Tests (Most Important!)**

Writing tests for your stories would have caught this immediately. The test would fail when trying to render the story:

```tsx
// tests/KButton.stories.test.tsx
import { composeStories } from '@storybook/react';
import * as stories from '../src/stories/KButton.stories';

const { Variants } = composeStories(stories);

it('renders variants story without errors - catches fillMode bug', () => {
  // This test would catch the bug!
  // If theme provider is missing, this will throw:
  // "Cannot read properties of undefined (reading 'fillMode')"
  expect(() => {
    render(<Variants />);
  }).not.toThrow();

  // ... rest of assertions
});
```

**Why this works:**

- Story tests actually render the components, triggering the error
- The test would fail immediately, alerting you to the missing theme provider
- You can run tests in CI/CD to catch issues before they reach production

### 2. **Storybook Interaction Testing**

Using Storybook's interaction testing addon would also catch this:

```tsx
// In your story file
import { expect, within } from '@storybook/test';
import { userEvent, waitFor } from '@storybook/testing-library';

export const Variants: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // This interaction would trigger the error if theme provider is missing
    const buttons = canvas.getAllByRole('button');
    expect(buttons).toHaveLength(4);
  },
};
```

### 3. **Visual Regression Testing**

Tools like Chromatic or Percy would catch visual issues, but might not catch runtime errors. However, they're still valuable for catching styling issues.

### 4. **Manual Testing Checklist**

Create a checklist for manual testing:

- [ ] All stories render without console errors
- [ ] All variants render correctly
- [ ] Interactive stories respond to user input
- [ ] No runtime errors in browser console

## The Fix

### For Storybook

Add a Kendo theme provider wrapper in `.storybook/preview.tsx`:

```tsx
import { ThemeProvider } from '@progress/kendo-react-common';

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider theme="material">
        <Story />
      </ThemeProvider>
    ),
  ],
};
```

### For Tests

Wrap your story renders in a theme provider:

```tsx
import { ThemeProvider } from '@progress/kendo-react-common';

it('renders variants story', () => {
  render(
    <ThemeProvider theme="default">
      <Variants />
    </ThemeProvider>
  );
  // ... assertions
});
```

## Best Practices

1. **Always write story tests** - They catch runtime errors that visual inspection might miss
2. **Test all story variants** - Don't just test the default story
3. **Use interaction testing** - Test user interactions, not just rendering
4. **Run tests in CI/CD** - Automate catching these issues
5. **Check browser console** - Manual testing should always include console checks

## Example: Complete Story Test

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import { ThemeProvider } from '@progress/kendo-react-common';
import * as stories from '../src/stories/KButton.stories';

const { Variants } = composeStories(stories);

describe('KButton Stories', () => {
  it('renders variants story without errors', () => {
    // Wrap in ThemeProvider to match Storybook setup
    expect(() => {
      render(
        <ThemeProvider theme="default">
          <Variants />
        </ThemeProvider>
      );
    }).not.toThrow();

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(4);
  });
});
```

## Summary

**To catch this bug:**

1. ✅ Write story tests that actually render the stories
2. ✅ Use `expect(() => render(...)).not.toThrow()` to catch rendering errors
3. ✅ Test all story variants, not just the default
4. ✅ Run tests in CI/CD pipeline
5. ✅ Always check browser console during manual testing

The key is **automated testing** - manual testing might catch it, but automated tests ensure it's caught every time.

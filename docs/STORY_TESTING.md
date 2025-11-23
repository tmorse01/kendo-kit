# Testing Storybook Stories

This project supports testing Storybook stories using `@storybook/test`'s `composeStories` utility. This allows you to test your stories with Vitest and React Testing Library, ensuring that your stories render correctly and behave as expected.

## Setup

The necessary dependencies are already installed:
- `@storybook/test` - Provides `composeStories` utility
- `vitest` - Test runner
- `@testing-library/react` - React component testing utilities

## How to Test Stories

### Basic Example

Create a test file for your stories (e.g., `tests/KButton.stories.test.tsx`):

```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import * as stories from '../src/stories/KButton.stories';
import userEvent from '@testing-library/user-event';

// Compose all stories from the stories file
const { Default, Loading, Disabled, Interactive } = composeStories(stories);

describe('KButton Stories', () => {
  it('renders the default story', () => {
    render(<Default />);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  it('renders loading state correctly', () => {
    render(<Loading />);
    const buttons = screen.getAllByRole('button');
    buttons.forEach((button) => {
      expect(button).toHaveAttribute('aria-busy', 'true');
      expect(button).toBeDisabled();
    });
  });

  it('handles click events', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    
    render(<Interactive onClick={handleClick} />);
    const button = screen.getByRole('button', { name: /click me/i });
    
    await user.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

## Key Concepts

### `composeStories`

The `composeStories` function takes your stories file and returns React components for each story:

```tsx
import { composeStories } from '@storybook/react';
import * as stories from '../src/stories/MyComponent.stories';

const { Story1, Story2 } = composeStories(stories);
```

### Overriding Story Args

You can override story args when testing:

```tsx
const { Default } = composeStories(stories);

// Override the onClick handler for testing
render(<Default onClick={handleClick} />);
```

### Testing All Stories

You can also test stories directly without composing:

```tsx
import * as stories from '../src/stories/KButton.stories';

it('renders variants story', () => {
  render(<stories.Variants />);
  // ... assertions
});
```

## Running Story Tests

Run all tests (including story tests):
```bash
pnpm test
```

Run tests in watch mode:
```bash
pnpm test:watch
```

Run a specific story test file:
```bash
pnpm exec vitest run tests/KButton.stories.test.tsx
```

## Best Practices

1. **Test Story Rendering**: Ensure stories render without errors
2. **Test Interactions**: Use `userEvent` to test user interactions in stories
3. **Test States**: Verify different states (loading, disabled, etc.) render correctly
4. **Override Props**: Use story composition to override props for testing specific scenarios
5. **Keep Tests Focused**: Test one aspect per test case

## Example Test File

See `tests/KButton.stories.test.tsx` for a complete example of testing stories.

## Notes

- Story tests use the same test setup as regular component tests (`tests/setup.ts`)
- Kendo theme CSS is automatically imported in the test setup for proper styling
- Story tests are excluded from coverage reports (see `vitest.config.ts`)


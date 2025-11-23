import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import * as stories from '../src/stories/KButton.stories';
import userEvent from '@testing-library/user-event';

// Compose all stories from the stories file
const { Default, Loading, Disabled, Interactive, Variants, Sizes } =
  composeStories(stories);

describe('KButton Stories', () => {
  it('renders the default story without errors', () => {
    // This test would catch the fillMode error if theme provider is missing
    expect(() => {
      render(<Default />);
    }).not.toThrow();

    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  it('renders variants story without errors - catches fillMode bug', () => {
    // This is the test that would catch the bug you encountered!
    // If theme provider is missing, this will throw: "Cannot read properties of undefined (reading 'fillMode')"
    //
    // HOW TO CATCH THIS BUG:
    // 1. Run this test: pnpm test tests/KButton.stories.test.tsx
    // 2. If it fails with fillMode error, you need to add ThemeProvider to Storybook preview
    // 3. The test will fail immediately, alerting you to the issue

    expect(() => {
      render(<Variants />);
    }).not.toThrow('fillMode');

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(4);
    expect(buttons[0]).toHaveTextContent('Primary');
    expect(buttons[1]).toHaveTextContent('Secondary');
    expect(buttons[2]).toHaveTextContent('Ghost');
    expect(buttons[3]).toHaveTextContent('Danger');
  });

  it('renders loading state correctly', () => {
    expect(() => {
      render(<Loading />);
    }).not.toThrow();

    const buttons = screen.getAllByRole('button');
    buttons.forEach((button) => {
      expect(button).toHaveAttribute('aria-busy', 'true');
      expect(button).toBeDisabled();
    });
  });

  it('renders disabled buttons correctly', () => {
    expect(() => {
      render(<Disabled />);
    }).not.toThrow();

    const buttons = screen.getAllByRole('button');
    buttons.forEach((button) => {
      expect(button).toBeDisabled();
    });
  });

  it('handles click events in interactive story', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    // Override the onClick for testing
    expect(() => {
      render(<Interactive onClick={handleClick} />);
    }).not.toThrow();

    const button = screen.getByRole('button', { name: /click me/i });

    await user.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders all sizes correctly', () => {
    expect(() => {
      render(<Sizes />);
    }).not.toThrow();

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(3);
    expect(buttons[0]).toHaveTextContent('Small');
    expect(buttons[1]).toHaveTextContent('Medium');
    expect(buttons[2]).toHaveTextContent('Large');
  });
});

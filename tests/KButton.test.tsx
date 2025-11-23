import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { KButton } from '../src/components/Button';
import { KendoThemeProvider } from './helpers/kendo-theme-provider';

// Helper to render with theme provider
const renderWithTheme = (ui: React.ReactElement) => {
  return render(<KendoThemeProvider>{ui}</KendoThemeProvider>);
};

describe('KButton', () => {
  it('should render with default props', () => {
    const { container } = renderWithTheme(<KButton>Click me</KButton>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should render snapshot', () => {
    const { container } = renderWithTheme(<KButton>Click me</KButton>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should call onClick handler when clicked', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(<KButton onClick={handleClick}>Click me</KButton>);

    const button = screen.getByRole('button', { name: /click me/i });
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should not call onClick when disabled', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(
      <KButton onClick={handleClick} disabled>
        Click me
      </KButton>
    );

    const button = screen.getByRole('button', { name: /click me/i });
    await user.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });

  it('should not call onClick when loading', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(
      <KButton onClick={handleClick} isLoading>
        Click me
      </KButton>
    );

    const button = screen.getByRole('button', { name: /click me/i });
    await user.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });

  it('should be disabled when isLoading is true', () => {
    renderWithTheme(<KButton isLoading>Click me</KButton>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeDisabled();
  });

  it('should have aria-busy when isLoading is true', () => {
    renderWithTheme(<KButton isLoading>Click me</KButton>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toHaveAttribute('aria-busy', 'true');
  });

  it('should render with primary variant', () => {
    renderWithTheme(<KButton variant="primary">Primary</KButton>);
    expect(
      screen.getByRole('button', { name: /primary/i })
    ).toBeInTheDocument();
  });

  it('should render with secondary variant', () => {
    renderWithTheme(<KButton variant="secondary">Secondary</KButton>);
    expect(
      screen.getByRole('button', { name: /secondary/i })
    ).toBeInTheDocument();
  });

  it('should render with ghost variant', () => {
    renderWithTheme(<KButton variant="ghost">Ghost</KButton>);
    expect(screen.getByRole('button', { name: /ghost/i })).toBeInTheDocument();
  });

  it('should render with danger variant', () => {
    renderWithTheme(<KButton variant="danger">Danger</KButton>);
    expect(screen.getByRole('button', { name: /danger/i })).toBeInTheDocument();
  });

  it('should render with different sizes', () => {
    const { rerender } = renderWithTheme(<KButton size="sm">Small</KButton>);
    expect(screen.getByRole('button', { name: /small/i })).toBeInTheDocument();

    rerender(
      <KendoThemeProvider>
        <KButton size="md">Medium</KButton>
      </KendoThemeProvider>
    );
    expect(screen.getByRole('button', { name: /medium/i })).toBeInTheDocument();

    rerender(
      <KendoThemeProvider>
        <KButton size="lg">Large</KButton>
      </KendoThemeProvider>
    );
    expect(screen.getByRole('button', { name: /large/i })).toBeInTheDocument();
  });

  it('should render with iconLeft', () => {
    renderWithTheme(
      <KButton iconLeft={<span data-testid="icon-left">←</span>}>
        With Icon
      </KButton>
    );
    expect(screen.getByTestId('icon-left')).toBeInTheDocument();
    expect(screen.getByText('With Icon')).toBeInTheDocument();
  });

  it('should render with iconRight', () => {
    renderWithTheme(
      <KButton iconRight={<span data-testid="icon-right">→</span>}>
        With Icon
      </KButton>
    );
    expect(screen.getByTestId('icon-right')).toBeInTheDocument();
    expect(screen.getByText('With Icon')).toBeInTheDocument();
  });

  it('should render with both iconLeft and iconRight', () => {
    renderWithTheme(
      <KButton
        iconLeft={<span data-testid="icon-left">←</span>}
        iconRight={<span data-testid="icon-right">→</span>}
      >
        With Icons
      </KButton>
    );
    expect(screen.getByTestId('icon-left')).toBeInTheDocument();
    expect(screen.getByTestId('icon-right')).toBeInTheDocument();
    expect(screen.getByText('With Icons')).toBeInTheDocument();
  });

  it('should show loading spinner when isLoading is true', () => {
    const { container } = renderWithTheme(<KButton isLoading>Loading</KButton>);
    const spinner = container.querySelector('[aria-hidden="true"]');
    expect(spinner).toBeInTheDocument();
    expect(screen.getByText('Loading')).toBeInTheDocument();
  });
});

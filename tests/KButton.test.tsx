import { describe, it, expect, vi } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { KButton } from '../src/components/Button';

describe('KButton', () => {
  it('should render with default props', () => {
    const { container } = render(<KButton>Click me</KButton>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should render snapshot', () => {
    const { container } = render(<KButton>Click me</KButton>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should call onClick handler when clicked', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    render(<KButton onClick={handleClick}>Click me</KButton>);

    const button = screen.getByRole('button', { name: /click me/i });
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should not call onClick when disabled', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    render(
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
    render(
      <KButton onClick={handleClick} isLoading>
        Click me
      </KButton>
    );

    const button = screen.getByRole('button', { name: /click me/i });
    await user.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });

  it('should be disabled when isLoading is true', () => {
    render(<KButton isLoading>Click me</KButton>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeDisabled();
  });

  it('should have aria-busy when isLoading is true', () => {
    render(<KButton isLoading>Click me</KButton>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toHaveAttribute('aria-busy', 'true');
  });

  it('should render with different variants', () => {
    const { unmount } = render(<KButton variant="primary">Primary</KButton>);
    expect(
      screen.getByRole('button', { name: /primary/i })
    ).toBeInTheDocument();
    unmount();

    render(<KButton variant="secondary">Secondary</KButton>);
    expect(
      screen.getByRole('button', { name: /secondary/i })
    ).toBeInTheDocument();
    cleanup();

    render(<KButton variant="ghost">Ghost</KButton>);
    expect(screen.getByRole('button', { name: /ghost/i })).toBeInTheDocument();
    cleanup();

    render(<KButton variant="danger">Danger</KButton>);
    expect(screen.getByRole('button', { name: /danger/i })).toBeInTheDocument();
  });

  it('should render with different sizes', () => {
    const { rerender } = render(<KButton size="sm">Small</KButton>);
    expect(screen.getByRole('button', { name: /small/i })).toBeInTheDocument();

    rerender(<KButton size="md">Medium</KButton>);
    expect(screen.getByRole('button', { name: /medium/i })).toBeInTheDocument();

    rerender(<KButton size="lg">Large</KButton>);
    expect(screen.getByRole('button', { name: /large/i })).toBeInTheDocument();
  });

  it('should render with iconLeft', () => {
    render(
      <KButton iconLeft={<span data-testid="icon-left">←</span>}>
        With Icon
      </KButton>
    );
    expect(screen.getByTestId('icon-left')).toBeInTheDocument();
    expect(screen.getByText('With Icon')).toBeInTheDocument();
  });

  it('should render with iconRight', () => {
    render(
      <KButton iconRight={<span data-testid="icon-right">→</span>}>
        With Icon
      </KButton>
    );
    expect(screen.getByTestId('icon-right')).toBeInTheDocument();
    expect(screen.getByText('With Icon')).toBeInTheDocument();
  });

  it('should render with both iconLeft and iconRight', () => {
    render(
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
    const { container } = render(<KButton isLoading>Loading</KButton>);
    const spinner = container.querySelector('[aria-hidden="true"]');
    expect(spinner).toBeInTheDocument();
    expect(screen.getByText('Loading')).toBeInTheDocument();
  });
});

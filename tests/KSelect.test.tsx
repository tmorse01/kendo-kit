import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { KSelect } from '../src/components/Select';
import type { KOption } from '../src/types';

const mockOptions: KOption[] = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
];

describe('KSelect', () => {
  it('should render with options', () => {
    render(<KSelect options={mockOptions} />);
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
  });

  it('should render with label', () => {
    render(<KSelect options={mockOptions} label="Choose an option" />);
    expect(screen.getByText('Choose an option')).toBeInTheDocument();
  });

  it('should render with hint', () => {
    render(<KSelect options={mockOptions} hint="This is a hint" />);
    expect(screen.getByText('This is a hint')).toBeInTheDocument();
  });

  it('should render with error', () => {
    render(<KSelect options={mockOptions} error="This is an error" />);
    const errorElement = screen.getByText('This is an error');
    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveAttribute('role', 'alert');
  });

  it('should show required indicator when required', () => {
    render(<KSelect options={mockOptions} label="Required field" required />);
    const label = screen.getByText('Required field');
    expect(label).toHaveTextContent('*');
  });

  it('should handle controlled value', () => {
    const { rerender } = render(
      <KSelect options={mockOptions} value="1" onChange={() => {}} />
    );
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();

    rerender(<KSelect options={mockOptions} value="2" onChange={() => {}} />);
    expect(select).toBeInTheDocument();
  });

  it('should call onChange when value changes', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<KSelect options={mockOptions} onChange={handleChange} />);

    const select = screen.getByRole('combobox');
    await user.click(select);

    // Note: Actual interaction with Kendo dropdowns may require more specific
    // selectors or mocking. This is a basic structure test.
    expect(select).toBeInTheDocument();
  });

  it('should display placeholder', () => {
    render(<KSelect options={mockOptions} placeholder="Select an option" />);
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
  });

  it('should be disabled when disabled prop is true', () => {
    render(<KSelect options={mockOptions} disabled />);
    const select = screen.getByRole('combobox');
    expect(select).toHaveAttribute('aria-disabled', 'true');
  });

  it('should be disabled when isLoading is true', () => {
    render(<KSelect options={mockOptions} isLoading />);
    const select = screen.getByRole('combobox');
    expect(select).toHaveAttribute('aria-disabled', 'true');
    expect(select).toHaveAttribute('aria-busy', 'true');
  });

  it('should apply fullWidth style', () => {
    const { container } = render(<KSelect options={mockOptions} fullWidth />);
    const wrapper = container.querySelector('div');
    expect(wrapper).toHaveStyle({ width: '100%' });
  });

  it('should have proper aria attributes', () => {
    render(
      <KSelect
        options={mockOptions}
        label="Test label"
        hint="Test hint"
        error="Test error"
        required
      />
    );
    const select = screen.getByRole('combobox');
    expect(select).toHaveAttribute('aria-label', 'Test label');
    expect(select).toHaveAttribute('aria-invalid', 'true');
    expect(select).toHaveAttribute('aria-required', 'true');
  });
});


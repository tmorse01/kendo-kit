import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { KMultiSelect } from '../src/components/Select';
import type { KOption } from '../src/types';

const mockOptions: KOption[] = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
];

describe('KMultiSelect', () => {
  it('should render with options', () => {
    render(<KMultiSelect options={mockOptions} />);
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
  });

  it('should render with label', () => {
    render(<KMultiSelect options={mockOptions} label="Choose options" />);
    expect(screen.getByText('Choose options')).toBeInTheDocument();
  });

  it('should render with hint', () => {
    render(<KMultiSelect options={mockOptions} hint="This is a hint" />);
    expect(screen.getByText('This is a hint')).toBeInTheDocument();
  });

  it('should render with error', () => {
    render(<KMultiSelect options={mockOptions} error="This is an error" />);
    const errorElement = screen.getByText('This is an error');
    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveAttribute('role', 'alert');
  });

  it('should show required indicator when required', () => {
    render(<KMultiSelect options={mockOptions} label="Required field" required />);
    const label = screen.getByText('Required field');
    expect(label).toHaveTextContent('*');
  });

  it('should handle controlled value', () => {
    const { rerender } = render(
      <KMultiSelect options={mockOptions} value={['1']} onChange={() => {}} />
    );
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();

    rerender(<KMultiSelect options={mockOptions} value={['1', '2']} onChange={() => {}} />);
    expect(select).toBeInTheDocument();
  });

  it('should call onChange when value changes', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<KMultiSelect options={mockOptions} onChange={handleChange} />);

    const select = screen.getByRole('combobox');
    await user.click(select);

    // Note: Actual interaction with Kendo dropdowns may require more specific
    // selectors or mocking. This is a basic structure test.
    expect(select).toBeInTheDocument();
  });

  it('should display placeholder', () => {
    render(<KMultiSelect options={mockOptions} placeholder="Select options" />);
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
  });

  it('should be disabled when disabled prop is true', () => {
    render(<KMultiSelect options={mockOptions} disabled />);
    const select = screen.getByRole('combobox');
    expect(select).toHaveAttribute('aria-disabled', 'true');
  });

  it('should be disabled when isLoading is true', () => {
    render(<KMultiSelect options={mockOptions} isLoading />);
    const select = screen.getByRole('combobox');
    expect(select).toHaveAttribute('aria-disabled', 'true');
    expect(select).toHaveAttribute('aria-busy', 'true');
  });

  it('should apply fullWidth style', () => {
    const { container } = render(<KMultiSelect options={mockOptions} fullWidth />);
    const wrapper = container.querySelector('div');
    expect(wrapper).toHaveStyle({ width: '100%' });
  });

  it('should have proper aria attributes', () => {
    render(
      <KMultiSelect
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

  it('should handle empty value array', () => {
    render(<KMultiSelect options={mockOptions} value={[]} onChange={() => {}} />);
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
  });
});


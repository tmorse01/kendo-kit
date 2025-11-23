import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { KDatePicker } from '../src/components/DatePicker/KDatePicker';

describe('KDatePicker', () => {
  it('should render with label', () => {
    render(<KDatePicker label="Birth Date" />);
    expect(screen.getByLabelText(/Birth Date/i)).toBeInTheDocument();
  });

  it('should display error message', () => {
    render(<KDatePicker label="Date" error="Invalid date" />);
    expect(screen.getByText('Invalid date')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('should display hint when no error', () => {
    render(<KDatePicker label="Date" hint="Select a date" />);
    expect(screen.getByText('Select a date')).toBeInTheDocument();
  });

  it('should not display hint when error is present', () => {
    render(<KDatePicker label="Date" hint="Hint" error="Error" />);
    expect(screen.queryByText('Hint')).not.toBeInTheDocument();
    expect(screen.getByText('Error')).toBeInTheDocument();
  });

  it('should show required indicator', () => {
    render(<KDatePicker label="Date" required />);
    const label = screen.getByText(/Date/i);
    expect(label.querySelector('.k-required-indicator')).toBeInTheDocument();
  });

  it('should handle controlled value', () => {
    const date = new Date(2024, 0, 1);
    render(<KDatePicker label="Date" value={date} onChange={vi.fn()} />);
    const input = screen.getByLabelText(/Date/i);
    expect(input).toBeInTheDocument();
  });

  it('should handle uncontrolled defaultValue', () => {
    const date = new Date(2024, 0, 1);
    render(<KDatePicker label="Date" defaultValue={date} />);
    const input = screen.getByLabelText(/Date/i);
    expect(input).toBeInTheDocument();
  });

  it('should be disabled when disabled prop is true', () => {
    render(<KDatePicker label="Date" disabled />);
    const input = screen.getByLabelText(/Date/i);
    expect(input).toBeDisabled();
  });

  it('should apply fullWidth style', () => {
    const { container } = render(<KDatePicker label="Date" fullWidth />);
    const wrapper = container.querySelector('.k-input-wrapper-fullwidth');
    expect(wrapper).toBeInTheDocument();
  });

  it('should associate label with input via id', () => {
    render(<KDatePicker id="test-date" label="Date" />);
    const input = screen.getByLabelText(/Date/i);
    expect(input).toHaveAttribute('id', 'test-date');
  });
});


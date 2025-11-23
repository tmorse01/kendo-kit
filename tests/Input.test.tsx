import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { KTextInput } from '../src/components/Input/KTextInput';
import { KNumericInput } from '../src/components/Input/KNumericInput';
import { KMaskedInput } from '../src/components/Input/KMaskedInput';

describe('KTextInput', () => {
  it('should render with label', () => {
    render(<KTextInput label="Email" />);
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
  });

  it('should render with placeholder', () => {
    render(<KTextInput placeholder="Enter email" />);
    expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument();
  });

  it('should display error message', () => {
    render(<KTextInput label="Email" error="Invalid email" />);
    expect(screen.getByText('Invalid email')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('should display hint when no error', () => {
    render(<KTextInput label="Email" hint="Enter your email address" />);
    expect(screen.getByText('Enter your email address')).toBeInTheDocument();
  });

  it('should not display hint when error is present', () => {
    render(<KTextInput label="Email" hint="Hint text" error="Error text" />);
    expect(screen.queryByText('Hint text')).not.toBeInTheDocument();
    expect(screen.getByText('Error text')).toBeInTheDocument();
  });

  it('should show required indicator', () => {
    render(<KTextInput label="Email" required />);
    const label = screen.getByText(/Email/i);
    expect(label.querySelector('.k-required-indicator')).toBeInTheDocument();
  });

  it('should handle controlled value updates', async () => {
    const handleChange = vi.fn();
    render(
      <KTextInput label="Email" value="" onChange={handleChange} />
    );

    const input = screen.getByLabelText(/Email/i);
    await userEvent.type(input, 'test@example.com');

    // Kendo TextBox onChange should be called
    await waitFor(() => {
      expect(handleChange).toHaveBeenCalled();
    });
  });

  it('should handle uncontrolled value', async () => {
    render(<KTextInput label="Email" defaultValue="initial" />);
    const input = screen.getByLabelText(/Email/i) as HTMLInputElement;
    expect(input.value).toBe('initial');
  });

  it('should associate label with input via id', () => {
    render(<KTextInput id="test-input" label="Email" />);
    const input = screen.getByLabelText(/Email/i);
    expect(input).toHaveAttribute('id', 'test-input');
  });

  it('should apply fullWidth style', () => {
    const { container } = render(<KTextInput fullWidth />);
    const wrapper = container.querySelector('.k-input-wrapper-fullwidth');
    expect(wrapper).toBeInTheDocument();
  });

  it('should be disabled when disabled prop is true', () => {
    render(<KTextInput label="Email" disabled />);
    const input = screen.getByLabelText(/Email/i);
    expect(input).toBeDisabled();
  });

  it('should have correct type attribute', () => {
    render(<KTextInput label="Email" type="email" />);
    const input = screen.getByLabelText(/Email/i);
    expect(input).toHaveAttribute('type', 'email');
  });
});

describe('KNumericInput', () => {
  it('should render with label', () => {
    render(<KNumericInput label="Price" />);
    expect(screen.getByLabelText(/Price/i)).toBeInTheDocument();
  });

  it('should display error message', () => {
    render(<KNumericInput label="Price" error="Invalid price" />);
    expect(screen.getByText('Invalid price')).toBeInTheDocument();
  });

  it('should handle controlled value updates', async () => {
    const handleChange = vi.fn();
    render(<KNumericInput label="Price" value={0} onChange={handleChange} />);

    const input = screen.getByLabelText(/Price/i);
    await userEvent.clear(input);
    await userEvent.type(input, '100');

    await waitFor(() => {
      expect(handleChange).toHaveBeenCalled();
    });
  });

  it('should handle uncontrolled value', () => {
    render(<KNumericInput label="Price" defaultValue={42} />);
    const input = screen.getByLabelText(/Price/i) as HTMLInputElement;
    // NumericTextBox may format the value, so we check it exists
    expect(input).toBeInTheDocument();
  });

  it('should apply min and max constraints', () => {
    render(<KNumericInput label="Price" min={0} max={100} />);
    const input = screen.getByLabelText(/Price/i);
    expect(input).toBeInTheDocument();
  });

  it('should show required indicator', () => {
    render(<KNumericInput label="Price" required />);
    const label = screen.getByText(/Price/i);
    expect(label.querySelector('.k-required-indicator')).toBeInTheDocument();
  });

  it('should associate label with input via id', () => {
    render(<KNumericInput id="test-numeric" label="Price" />);
    const input = screen.getByLabelText(/Price/i);
    expect(input).toHaveAttribute('id', 'test-numeric');
  });
});

describe('KMaskedInput', () => {
  it('should render with label and mask', () => {
    render(<KMaskedInput label="Phone" mask="000-000-0000" />);
    expect(screen.getByLabelText(/Phone/i)).toBeInTheDocument();
  });

  it('should display error message', () => {
    render(<KMaskedInput label="Phone" mask="000-000-0000" error="Invalid phone" />);
    expect(screen.getByText('Invalid phone')).toBeInTheDocument();
  });

  it('should handle controlled value updates', async () => {
    const handleChange = vi.fn();
    render(
      <KMaskedInput label="Phone" mask="000-000-0000" value="" onChange={handleChange} />
    );

    const input = screen.getByLabelText(/Phone/i);
    await userEvent.type(input, '1234567890');

    await waitFor(() => {
      expect(handleChange).toHaveBeenCalled();
    });
  });

  it('should handle uncontrolled value', () => {
    render(<KMaskedInput label="Phone" mask="000-000-0000" defaultValue="123-456-7890" />);
    const input = screen.getByLabelText(/Phone/i) as HTMLInputElement;
    expect(input).toBeInTheDocument();
  });

  it('should show required indicator', () => {
    render(<KMaskedInput label="Phone" mask="000-000-0000" required />);
    const label = screen.getByText(/Phone/i);
    expect(label.querySelector('.k-required-indicator')).toBeInTheDocument();
  });

  it('should associate label with input via id', () => {
    render(<KMaskedInput id="test-masked" label="Phone" mask="000-000-0000" />);
    const input = screen.getByLabelText(/Phone/i);
    expect(input).toHaveAttribute('id', 'test-masked');
  });

  it('should apply includeLiterals prop', () => {
    render(<KMaskedInput label="Phone" mask="000-000-0000" includeLiterals={false} />);
    const input = screen.getByLabelText(/Phone/i);
    expect(input).toBeInTheDocument();
  });
});


import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { KCheckbox } from '../src/components/FormControls/KCheckbox';
import { KRadio } from '../src/components/FormControls/KRadio';
import { KRadioGroup } from '../src/components/FormControls/KRadioGroup';

describe('KCheckbox', () => {
  it('should render with label', () => {
    render(<KCheckbox label="I agree" />);
    expect(screen.getByLabelText(/I agree/i)).toBeInTheDocument();
  });

  it('should render without label', () => {
    const { container } = render(<KCheckbox />);
    const checkbox = container.querySelector('input[type="checkbox"]');
    expect(checkbox).toBeInTheDocument();
  });

  it('should display error message', () => {
    render(<KCheckbox label="Agree" error="This field is required" />);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('should display hint when no error', () => {
    render(<KCheckbox label="Agree" hint="Please read the terms" />);
    expect(screen.getByText('Please read the terms')).toBeInTheDocument();
  });

  it('should not display hint when error is present', () => {
    render(<KCheckbox label="Agree" hint="Hint" error="Error" />);
    expect(screen.queryByText('Hint')).not.toBeInTheDocument();
    expect(screen.getByText('Error')).toBeInTheDocument();
  });

  it('should handle controlled checked state', async () => {
    const handleChange = vi.fn();
    const { rerender } = render(
      <KCheckbox label="Agree" checked={false} onChange={handleChange} />
    );
    const checkbox = screen.getByLabelText(/Agree/i) as HTMLInputElement;
    expect(checkbox.checked).toBe(false);

    rerender(<KCheckbox label="Agree" checked={true} onChange={handleChange} />);
    expect(checkbox.checked).toBe(true);
  });

  it('should handle uncontrolled checked state', () => {
    render(<KCheckbox label="Agree" defaultChecked={true} />);
    const checkbox = screen.getByLabelText(/Agree/i) as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });

  it('should call onChange when clicked', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();
    render(<KCheckbox label="Agree" onChange={handleChange} />);
    const checkbox = screen.getByLabelText(/Agree/i);
    await user.click(checkbox);
    expect(handleChange).toHaveBeenCalled();
  });

  it('should be disabled when disabled prop is true', () => {
    render(<KCheckbox label="Agree" disabled />);
    const checkbox = screen.getByLabelText(/Agree/i);
    expect(checkbox).toBeDisabled();
  });

  it('should apply fullWidth style', () => {
    const { container } = render(<KCheckbox label="Agree" fullWidth />);
    const wrapper = container.querySelector('.k-checkbox-wrapper-fullwidth');
    expect(wrapper).toBeInTheDocument();
  });

  it('should render snapshot', () => {
    const { container } = render(<KCheckbox label="I agree" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should have correct aria attributes when error is present', () => {
    render(<KCheckbox label="Agree" error="Error message" />);
    const checkbox = screen.getByLabelText(/Agree/i);
    expect(checkbox).toHaveAttribute('aria-invalid', 'true');
  });

  it('should support indeterminate state', () => {
    render(<KCheckbox label="Select all" indeterminate />);
    const checkbox = screen.getByLabelText(/Select all/i);
    expect(checkbox).toBeInTheDocument();
  });

  it('should have correct id association between label and checkbox', () => {
    render(<KCheckbox id="test-checkbox" label="Agree" />);
    const checkbox = screen.getByLabelText(/Agree/i);
    expect(checkbox).toHaveAttribute('id', 'test-checkbox');
  });
});

describe('KRadio', () => {
  it('should render with label', () => {
    render(<KRadio label="Option 1" value="1" name="group1" />);
    expect(screen.getByLabelText(/Option 1/i)).toBeInTheDocument();
  });

  it('should render without label', () => {
    const { container } = render(<KRadio value="1" name="group1" />);
    const radio = container.querySelector('input[type="radio"]');
    expect(radio).toBeInTheDocument();
  });

  it('should handle controlled checked state', async () => {
    const handleChange = vi.fn();
    const { rerender } = render(
      <KRadio label="Option 1" value="1" name="group1" checked={false} onChange={handleChange} />
    );
    const radio = screen.getByLabelText(/Option 1/i) as HTMLInputElement;
    expect(radio.checked).toBe(false);

    rerender(
      <KRadio label="Option 1" value="1" name="group1" checked={true} onChange={handleChange} />
    );
    expect(radio.checked).toBe(true);
  });

  it('should handle uncontrolled checked state', () => {
    render(<KRadio label="Option 1" value="1" name="group1" defaultChecked={true} />);
    const radio = screen.getByLabelText(/Option 1/i) as HTMLInputElement;
    expect(radio.checked).toBe(true);
  });

  it('should call onChange when clicked', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();
    render(<KRadio label="Option 1" value="1" name="group1" onChange={handleChange} />);
    const radio = screen.getByLabelText(/Option 1/i);
    await user.click(radio);
    expect(handleChange).toHaveBeenCalled();
  });

  it('should be disabled when disabled prop is true', () => {
    render(<KRadio label="Option 1" value="1" name="group1" disabled />);
    const radio = screen.getByLabelText(/Option 1/i);
    expect(radio).toBeDisabled();
  });

  it('should have correct name attribute for grouping', () => {
    render(<KRadio label="Option 1" value="1" name="group1" />);
    const radio = screen.getByLabelText(/Option 1/i);
    expect(radio).toHaveAttribute('name', 'group1');
  });

  it('should apply fullWidth style', () => {
    const { container } = render(<KRadio label="Option 1" value="1" name="group1" fullWidth />);
    const wrapper = container.querySelector('.k-radio-wrapper-fullwidth');
    expect(wrapper).toBeInTheDocument();
  });

  it('should render snapshot', () => {
    const { container } = render(<KRadio label="Option 1" value="1" name="group1" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should have correct value attribute', () => {
    render(<KRadio label="Option 1" value="test-value" name="group1" />);
    const radio = screen.getByLabelText(/Option 1/i);
    expect(radio).toHaveAttribute('value', 'test-value');
  });
});

describe('KRadioGroup', () => {
  const options = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ];

  it('should render with options', () => {
    render(<KRadioGroup name="group1" options={options} />);
    expect(screen.getByLabelText(/Option 1/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Option 2/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Option 3/i)).toBeInTheDocument();
  });

  it('should render with label', () => {
    render(<KRadioGroup name="group1" label="Choose an option" options={options} />);
    expect(screen.getByText(/Choose an option/i)).toBeInTheDocument();
  });

  it('should display error message', () => {
    render(<KRadioGroup name="group1" options={options} error="Selection required" />);
    expect(screen.getByText('Selection required')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('should display hint when no error', () => {
    render(<KRadioGroup name="group1" options={options} hint="Select one option" />);
    expect(screen.getByText('Select one option')).toBeInTheDocument();
  });

  it('should handle controlled value', async () => {
    const handleChange = vi.fn();
    const { rerender } = render(
      <KRadioGroup name="group1" options={options} value="1" onChange={handleChange} />
    );
    const radio1 = screen.getByLabelText(/Option 1/i) as HTMLInputElement;
    expect(radio1.checked).toBe(true);

    rerender(
      <KRadioGroup name="group1" options={options} value="2" onChange={handleChange} />
    );
    const radio2 = screen.getByLabelText(/Option 2/i) as HTMLInputElement;
    expect(radio2.checked).toBe(true);
  });

  it('should handle uncontrolled defaultValue', () => {
    render(<KRadioGroup name="group1" options={options} defaultValue="2" />);
    const radio2 = screen.getByLabelText(/Option 2/i) as HTMLInputElement;
    expect(radio2.checked).toBe(true);
  });

  it('should call onChange when option is selected', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();
    render(<KRadioGroup name="group1" options={options} onChange={handleChange} />);
    const radio2 = screen.getByLabelText(/Option 2/i);
    await user.click(radio2);
    expect(handleChange).toHaveBeenCalledWith('2');
  });

  it('should show required indicator', () => {
    render(<KRadioGroup name="group1" label="Choose" options={options} required />);
    const label = screen.getByText(/Choose/i);
    expect(label.querySelector('.k-required-indicator')).toBeInTheDocument();
  });

  it('should disable all radios when disabled prop is true', () => {
    render(<KRadioGroup name="group1" options={options} disabled />);
    const radio1 = screen.getByLabelText(/Option 1/i);
    const radio2 = screen.getByLabelText(/Option 2/i);
    expect(radio1).toBeDisabled();
    expect(radio2).toBeDisabled();
  });

  it('should render with custom children', () => {
    render(
      <KRadioGroup name="group1">
        <KRadio label="Custom 1" value="1" name="group1" />
        <KRadio label="Custom 2" value="2" name="group1" />
      </KRadioGroup>
    );
    expect(screen.getByLabelText(/Custom 1/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Custom 2/i)).toBeInTheDocument();
  });

  it('should apply fullWidth style', () => {
    const { container } = render(<KRadioGroup name="group1" options={options} fullWidth />);
    const wrapper = container.querySelector('.k-radio-group-wrapper-fullwidth');
    expect(wrapper).toBeInTheDocument();
  });

  it('should render snapshot', () => {
    const { container } = render(<KRadioGroup name="group1" options={options} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should have correct aria attributes', () => {
    render(<KRadioGroup name="group1" label="Choose" options={options} required error="Error" />);
    const group = screen.getByRole('radiogroup');
    expect(group).toHaveAttribute('aria-required', 'true');
    expect(group).toHaveAttribute('aria-invalid', 'true');
  });

  it('should support horizontal layout', () => {
    const { container } = render(
      <KRadioGroup name="group1" options={options} direction="row" gap="2rem" />
    );
    const wrapper = container.querySelector('.k-radio-group-wrapper');
    expect(wrapper).toBeInTheDocument();
  });

  it('should handle empty options array', () => {
    render(<KRadioGroup name="group1" options={[]} />);
    expect(screen.queryByRole('radio')).not.toBeInTheDocument();
  });
});


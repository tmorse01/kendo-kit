import React from 'react';
import { DatePicker, DatePickerProps } from '@progress/kendo-react-dateinputs';
import { InputWrapper } from '../Input/utils';

export interface KDatePickerProps
  extends Omit<DatePickerProps, 'value' | 'onChange' | 'format'> {
  /**
   * Label text displayed above the date picker
   */
  label?: string;
  /**
   * Hint text displayed below the date picker
   */
  hint?: string;
  /**
   * Error message displayed below the date picker
   */
  error?: string;
  /**
   * Whether the field is required
   */
  required?: boolean;
  /**
   * Whether the date picker should take full width
   */
  fullWidth?: boolean;
  /**
   * Selected date value (controlled)
   */
  value?: Date | null;
  /**
   * Default selected date (uncontrolled)
   */
  defaultValue?: Date | null;
  /**
   * Change handler - receives Kendo DatePickerChangeEvent
   */
  onChange?: (event: {
    value: Date | null;
    syntheticEvent: React.SyntheticEvent;
  }) => void;
  /**
   * Minimum selectable date
   */
  min?: Date;
  /**
   * Maximum selectable date
   */
  max?: Date;
  /**
   * Date format string (e.g., "MM/dd/yyyy")
   */
  format?: string;
}

/**
 * KDatePicker - A wrapper around KendoReact DatePicker with a consistent API
 *
 * Supports both controlled and uncontrolled usage:
 * - Controlled: Provide `value` and `onChange`
 * - Uncontrolled: Provide `defaultValue` (optional)
 *
 * @example
 * ```tsx
 * // Controlled
 * <KDatePicker
 *   label="Birth Date"
 *   value={birthDate}
 *   onChange={(e) => setBirthDate(e.value)}
 *   min={new Date(1900, 0, 1)}
 *   max={new Date()}
 *   required
 * />
 *
 * // Uncontrolled
 * <KDatePicker
 *   label="Start Date"
 *   defaultValue={new Date()}
 *   format="MM/dd/yyyy"
 * />
 * ```
 */
export function KDatePicker(props: KDatePickerProps) {
  const {
    label,
    hint,
    error,
    required,
    fullWidth,
    id,
    name,
    placeholder,
    disabled,
    className,
    value,
    defaultValue,
    onChange,
    min,
    max,
    format = 'MM/dd/yyyy',
    ...restProps
  } = props;

  // Determine if controlled or uncontrolled
  const isControlled = value !== undefined;
  const dateValue = isControlled ? value : undefined;
  const dateDefaultValue = !isControlled ? defaultValue : undefined;

  const datePickerId =
    id || `date-picker-${Math.random().toString(36).slice(2, 11)}`;
  const hintId = hint ? `${datePickerId}-hint` : undefined;
  const errorId = error ? `${datePickerId}-error` : undefined;
  const ariaDescribedBy =
    [hintId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <InputWrapper
      label={label}
      hint={hint}
      error={error}
      required={required}
      fullWidth={fullWidth}
      id={datePickerId}
      className={className}
    >
      <DatePicker
        id={datePickerId}
        name={name}
        value={dateValue}
        defaultValue={dateDefaultValue}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        min={min}
        max={max}
        format={format}
        required={required}
        className={className}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={ariaDescribedBy}
        valid={!error}
        style={{ width: fullWidth ? '100%' : undefined }}
        {...restProps}
      />
    </InputWrapper>
  );
}

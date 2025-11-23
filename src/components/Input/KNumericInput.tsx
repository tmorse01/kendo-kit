import { NumericTextBox } from '@progress/kendo-react-inputs';
import type { KNumericInputProps } from './types';
import { InputWrapper } from './utils';

/**
 * KNumericInput - A wrapper around KendoReact NumericTextBox with a consistent API
 *
 * Supports both controlled and uncontrolled usage:
 * - Controlled: Provide `value` and `onChange`
 * - Uncontrolled: Provide `defaultValue` (optional)
 *
 * @example
 * ```tsx
 * // Controlled
 * <KNumericInput
 *   label="Price"
 *   value={price}
 *   onChange={(e) => setPrice(e.value)}
 *   min={0}
 *   max={1000}
 *   format="c2"
 *   required
 * />
 *
 * // Uncontrolled
 * <KNumericInput
 *   label="Quantity"
 *   defaultValue={1}
 *   min={1}
 *   step={1}
 * />
 * ```
 */
export function KNumericInput(props: KNumericInputProps) {
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
    min,
    max,
    step,
    format,
    spinners = true,
    ...restProps
  } = props;

  // Determine if controlled or uncontrolled
  const isControlled = 'value' in props && props.value !== undefined;
  const value = isControlled ? props.value : undefined;
  const defaultValue = !isControlled && 'defaultValue' in props ? props.defaultValue : undefined;
  const onChange = isControlled ? props.onChange : undefined;

  const inputId = id || `numeric-input-${Math.random().toString(36).slice(2, 11)}`;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const ariaDescribedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <InputWrapper
      label={label}
      hint={hint}
      error={error}
      required={required}
      fullWidth={fullWidth}
      id={inputId}
      className={className}
    >
      <NumericTextBox
        id={inputId}
        name={name}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        min={min}
        max={max}
        step={step}
        format={format}
        spinners={spinners}
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


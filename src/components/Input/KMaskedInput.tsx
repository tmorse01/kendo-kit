import { MaskedTextBox } from '@progress/kendo-react-inputs';
import type { KMaskedInputProps } from './types';
import { InputWrapper } from './utils';

/**
 * KMaskedInput - A wrapper around KendoReact MaskedTextBox with a consistent API
 *
 * Supports both controlled and uncontrolled usage:
 * - Controlled: Provide `value` and `onChange`
 * - Uncontrolled: Provide `defaultValue` (optional)
 *
 * @example
 * ```tsx
 * // Controlled - Phone number
 * <KMaskedInput
 *   label="Phone"
 *   mask="000-000-0000"
 *   value={phone}
 *   onChange={(e) => setPhone(e.value || '')}
 *   required
 * />
 *
 * // Uncontrolled - Credit card
 * <KMaskedInput
 *   label="Credit Card"
 *   mask="0000-0000-0000-0000"
 *   includeLiterals={false}
 * />
 * ```
 */
export function KMaskedInput(props: KMaskedInputProps) {
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
    mask,
    includeLiterals = false,
    ...restProps
  } = props;

  // Determine if controlled or uncontrolled
  const isControlled = 'value' in props && props.value !== undefined;
  const value = isControlled ? props.value : undefined;
  const defaultValue = !isControlled && 'defaultValue' in props ? props.defaultValue : undefined;
  const onChange = isControlled ? props.onChange : undefined;

  const inputId = id || `masked-input-${Math.random().toString(36).slice(2, 11)}`;
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
      <MaskedTextBox
        id={inputId}
        name={name}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        mask={mask}
        includeLiterals={includeLiterals}
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


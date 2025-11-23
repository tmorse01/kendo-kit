import { TextBox } from '@progress/kendo-react-inputs';
import type { KTextInputProps } from './types';
import { InputWrapper } from './utils';

/**
 * KTextInput - A wrapper around KendoReact TextBox with a consistent API
 *
 * Supports both controlled and uncontrolled usage:
 * - Controlled: Provide `value` and `onChange`
 * - Uncontrolled: Provide `defaultValue` (optional)
 *
 * @example
 * ```tsx
 * // Controlled
 * <KTextInput
 *   label="Email"
 *   value={email}
 *   onChange={(e) => setEmail(e.value || '')}
 *   type="email"
 *   required
 * />
 *
 * // Uncontrolled
 * <KTextInput
 *   label="Name"
 *   defaultValue="John Doe"
 *   placeholder="Enter your name"
 * />
 * ```
 */
export function KTextInput(props: KTextInputProps) {
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
    type = 'text',
    ...restProps
  } = props;

  // Determine if controlled or uncontrolled
  const isControlled = 'value' in props && props.value !== undefined;
  const value = isControlled ? props.value : undefined;
  const defaultValue = !isControlled && 'defaultValue' in props ? props.defaultValue : undefined;
  const onChange = isControlled ? props.onChange : undefined;

  const inputId = id || `text-input-${Math.random().toString(36).slice(2, 11)}`;
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
      <TextBox
        id={inputId}
        name={name}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        type={type}
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


import React from 'react';
import { Checkbox, CheckboxProps } from '@progress/kendo-react-inputs';

export interface KCheckboxProps
  extends Omit<CheckboxProps, 'checked' | 'onChange' | 'indeterminate'> {
  /**
   * Label text displayed next to the checkbox
   */
  label?: string;
  /**
   * Hint text displayed below the checkbox
   */
  hint?: string;
  /**
   * Error message displayed below the checkbox
   */
  error?: string;
  /**
   * Whether the checkbox is checked (controlled)
   */
  checked?: boolean;
  /**
   * Default checked state (uncontrolled)
   */
  defaultChecked?: boolean;
  /**
   * Change handler - receives Kendo CheckboxChangeEvent
   */
  onChange?: (event: { value: boolean; syntheticEvent: React.SyntheticEvent }) => void;
  /**
   * Whether the checkbox is in an indeterminate state
   */
  indeterminate?: boolean;
  /**
   * Whether the checkbox should take full width
   */
  fullWidth?: boolean;
}

/**
 * KCheckbox - A wrapper around KendoReact Checkbox with a consistent API
 *
 * Supports both controlled and uncontrolled usage:
 * - Controlled: Provide `checked` and `onChange`
 * - Uncontrolled: Provide `defaultChecked` (optional)
 *
 * @example
 * ```tsx
 * // Controlled
 * <KCheckbox
 *   label="I agree to the terms"
 *   checked={agreed}
 *   onChange={(e) => setAgreed(e.value)}
 *   required
 * />
 *
 * // Uncontrolled
 * <KCheckbox
 *   label="Subscribe to newsletter"
 *   defaultChecked={true}
 * />
 * ```
 */
export function KCheckbox(props: KCheckboxProps) {
  const {
    label,
    hint,
    error,
    fullWidth,
    id,
    name,
    disabled,
    className,
    indeterminate,
    ...restProps
  } = props;

  // Determine if controlled or uncontrolled
  const isControlled = 'checked' in props && props.checked !== undefined;
  const checked = isControlled ? props.checked : undefined;
  const defaultChecked =
    !isControlled && 'defaultChecked' in props ? props.defaultChecked : undefined;
  const onChange = isControlled ? props.onChange : undefined;

  const checkboxId =
    id || `checkbox-${Math.random().toString(36).slice(2, 11)}`;
  const hintId = hint ? `${checkboxId}-hint` : undefined;
  const errorId = error ? `${checkboxId}-error` : undefined;
  const ariaDescribedBy =
    [hintId, errorId].filter(Boolean).join(' ') || undefined;

  const checkboxElement = (
    <Checkbox
      id={checkboxId}
      name={name}
      checked={checked}
      defaultChecked={defaultChecked}
      onChange={onChange}
      disabled={disabled}
      indeterminate={indeterminate}
      className={className}
      aria-invalid={error ? 'true' : undefined}
      aria-describedby={ariaDescribedBy}
      valid={!error}
      {...restProps}
    />
  );

  // If no label, just return the checkbox
  if (!label) {
    return (
      <div
        className={fullWidth ? 'k-checkbox-wrapper k-checkbox-wrapper-fullwidth' : 'k-checkbox-wrapper'}
        style={{ width: fullWidth ? '100%' : undefined }}
      >
        {checkboxElement}
        {hint && !error && (
          <div id={hintId} className="k-hint">
            {hint}
          </div>
        )}
        {error && (
          <div id={errorId} className="k-error" role="alert">
            {error}
          </div>
        )}
      </div>
    );
  }

  // With label, wrap it properly
  return (
    <div
      className={fullWidth ? 'k-checkbox-wrapper k-checkbox-wrapper-fullwidth' : 'k-checkbox-wrapper'}
      style={{ width: fullWidth ? '100%' : undefined }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
        {checkboxElement}
        <label htmlFor={checkboxId} className="k-label" style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}>
          {label}
        </label>
      </div>
      {hint && !error && (
        <div id={hintId} className="k-hint" style={{ marginLeft: '1.5rem' }}>
          {hint}
        </div>
      )}
      {error && (
        <div id={errorId} className="k-error" role="alert" style={{ marginLeft: '1.5rem' }}>
          {error}
        </div>
      )}
    </div>
  );
}


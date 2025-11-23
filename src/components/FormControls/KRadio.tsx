import React from 'react';
import { RadioButton, RadioButtonProps } from '@progress/kendo-react-inputs';

export interface KRadioProps extends Omit<RadioButtonProps, 'checked' | 'onChange'> {
  /**
   * Label text displayed next to the radio button
   */
  label?: string;
  /**
   * Value of this radio button (used for group management)
   */
  value: string | number;
  /**
   * Whether this radio button is checked (controlled)
   */
  checked?: boolean;
  /**
   * Default checked state (uncontrolled)
   */
  defaultChecked?: boolean;
  /**
   * Change handler - receives Kendo RadioButtonChangeEvent
   */
  onChange?: (event: { value: boolean; syntheticEvent: React.SyntheticEvent }) => void;
  /**
   * Name attribute for grouping radio buttons
   */
  name?: string;
  /**
   * Whether the radio button should take full width
   */
  fullWidth?: boolean;
}

/**
 * KRadio - A wrapper around KendoReact RadioButton with a consistent API
 *
 * Supports both controlled and uncontrolled usage:
 * - Controlled: Provide `checked` and `onChange`
 * - Uncontrolled: Provide `defaultChecked` (optional)
 *
 * Use `name` prop to group radio buttons together.
 *
 * @example
 * ```tsx
 * // Controlled - Single radio
 * <KRadio
 *   label="Option 1"
 *   value="option1"
 *   name="group1"
 *   checked={selected === 'option1'}
 *   onChange={(e) => e.value && setSelected('option1')}
 * />
 *
 * // Uncontrolled
 * <KRadio
 *   label="Option 2"
 *   value="option2"
 *   name="group1"
 *   defaultChecked={true}
 * />
 * ```
 */
export function KRadio(props: KRadioProps) {
  const {
    label,
    value,
    name,
    disabled,
    className,
    fullWidth,
    ...restProps
  } = props;

  // Determine if controlled or uncontrolled
  const isControlled = 'checked' in props && props.checked !== undefined;
  const checked = isControlled ? props.checked : undefined;
  const defaultChecked =
    !isControlled && 'defaultChecked' in props ? props.defaultChecked : undefined;
  const onChange = isControlled ? props.onChange : undefined;

  const radioId = `radio-${name || 'group'}-${value}-${Math.random().toString(36).slice(2, 11)}`;

  const radioElement = (
    <RadioButton
      id={radioId}
      name={name}
      value={value}
      checked={checked}
      defaultChecked={defaultChecked}
      onChange={onChange}
      disabled={disabled}
      className={className}
      {...restProps}
    />
  );

  // If no label, just return the radio button
  if (!label) {
    return (
      <div
        className={fullWidth ? 'k-radio-wrapper k-radio-wrapper-fullwidth' : 'k-radio-wrapper'}
        style={{ width: fullWidth ? '100%' : undefined }}
      >
        {radioElement}
      </div>
    );
  }

  // With label, wrap it properly
  return (
    <div
      className={fullWidth ? 'k-radio-wrapper k-radio-wrapper-fullwidth' : 'k-radio-wrapper'}
      style={{ width: fullWidth ? '100%' : undefined }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
        {radioElement}
        <label htmlFor={radioId} className="k-label" style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}>
          {label}
        </label>
      </div>
    </div>
  );
}


import React from 'react';
import { KRadio } from './KRadio';
import type { KOption } from '../../types';

export interface KRadioGroupProps {
  /**
   * Name attribute for all radio buttons in the group
   */
  name: string;
  /**
   * Selected value (controlled)
   */
  value?: string | number;
  /**
   * Default selected value (uncontrolled)
   */
  defaultValue?: string | number;
  /**
   * Callback fired when selection changes
   */
  onChange?: (value: string | number) => void;
  /**
   * Array of options to render as radio buttons
   */
  options?: KOption[];
  /**
   * Custom radio button children (alternative to options)
   */
  children?: React.ReactNode;
  /**
   * Label text displayed above the radio group
   */
  label?: string;
  /**
   * Hint text displayed below the radio group
   */
  hint?: string;
  /**
   * Error message displayed below the radio group
   */
  error?: string;
  /**
   * Whether the field is required
   */
  required?: boolean;
  /**
   * Whether the radio group should take full width
   */
  fullWidth?: boolean;
  /**
   * Layout direction
   */
  direction?: 'row' | 'column';
  /**
   * Gap between radio buttons
   */
  gap?: number | string;
  /**
   * Whether all radio buttons are disabled
   */
  disabled?: boolean;
}

/**
 * KRadioGroup - A wrapper component for managing radio button groups
 *
 * Supports both controlled and uncontrolled usage:
 * - Controlled: Provide `value` and `onChange`
 * - Uncontrolled: Provide `defaultValue` (optional)
 *
 * Can render from `options` array or custom `children`.
 *
 * @example
 * ```tsx
 * // Controlled with options
 * <KRadioGroup
 *   name="choice"
 *   label="Select an option"
 *   options={[
 *     { label: 'Option 1', value: '1' },
 *     { label: 'Option 2', value: '2' }
 *   ]}
 *   value={selected}
 *   onChange={(value) => setSelected(value)}
 * />
 *
 * // Uncontrolled with children
 * <KRadioGroup
 *   name="choice"
 *   defaultValue="1"
 *   onChange={(value) => console.log(value)}
 * >
 *   <KRadio label="Option 1" value="1" name="choice" />
 *   <KRadio label="Option 2" value="2" name="choice" />
 * </KRadioGroup>
 * ```
 */
export function KRadioGroup(props: KRadioGroupProps) {
  const {
    name,
    value,
    defaultValue,
    onChange,
    options,
    children,
    label,
    hint,
    error,
    required,
    fullWidth,
    direction = 'column',
    gap = direction === 'row' ? '1rem' : '0.5rem',
    disabled,
  } = props;

  const groupId = `radio-group-${name}-${Math.random().toString(36).slice(2, 11)}`;
  const hintId = hint ? `${groupId}-hint` : undefined;
  const errorId = error ? `${groupId}-error` : undefined;
  const ariaDescribedBy =
    [hintId, errorId].filter(Boolean).join(' ') || undefined;

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : defaultValue;

  const handleChange = (radioValue: string | number) => {
    if (onChange) {
      onChange(radioValue);
    }
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: direction,
    gap: typeof gap === 'number' ? `${gap}px` : gap,
    width: fullWidth ? '100%' : undefined,
  };

  return (
    <div
      className={fullWidth ? 'k-radio-group-wrapper k-radio-group-wrapper-fullwidth' : 'k-radio-group-wrapper'}
      style={{ width: fullWidth ? '100%' : undefined }}
      role="radiogroup"
      aria-labelledby={label ? `${groupId}-label` : undefined}
      aria-describedby={ariaDescribedBy}
      aria-invalid={error ? 'true' : undefined}
      aria-required={required}
    >
      {label && (
        <label id={`${groupId}-label`} className="k-label" style={{ marginBottom: '0.5rem', display: 'block' }}>
          {label}
          {required && <span className="k-required-indicator" aria-label="required">*</span>}
        </label>
      )}
      <div style={containerStyle}>
        {options
          ? options.map((option) => (
              <KRadio
                key={option.value}
                name={name}
                value={option.value}
                label={option.label}
                checked={isControlled ? currentValue === option.value : undefined}
                defaultChecked={!isControlled && defaultValue === option.value}
                onChange={(e) => {
                  if (e.value) {
                    handleChange(option.value);
                  }
                }}
                disabled={disabled}
              />
            ))
          : children}
      </div>
      {hint && !error && (
        <div id={hintId} className="k-hint" style={{ marginTop: '0.5rem' }}>
          {hint}
        </div>
      )}
      {error && (
        <div id={errorId} className="k-error" role="alert" style={{ marginTop: '0.5rem' }}>
          {error}
        </div>
      )}
    </div>
  );
}


import React from 'react';
import {
  DropDownList,
  DropDownListProps,
  DropDownListHandle,
} from '@progress/kendo-react-dropdowns';
import type { KOption } from '../../types';

export interface KSelectProps
  extends Omit<DropDownListProps, 'data' | 'value' | 'onChange' | 'textField' | 'dataItemKey'> {
  /**
   * Array of options to display
   */
  options: KOption[];
  /**
   * Selected value (controlled)
   */
  value?: string | number;
  /**
   * Default value (uncontrolled)
   */
  defaultValue?: string | number;
  /**
   * Callback fired when selection changes
   */
  onChange?: (value: string | number | null) => void;
  /**
   * Label text displayed above the select
   */
  label?: string;
  /**
   * Hint text displayed below the select
   */
  hint?: string;
  /**
   * Error message displayed below the select
   */
  error?: string;
  /**
   * Whether the field is required
   */
  required?: boolean;
  /**
   * Whether the select should take full width
   */
  fullWidth?: boolean;
  /**
   * Whether the select is in loading state
   */
  isLoading?: boolean;
  /**
   * Placeholder text when no option is selected
   */
  placeholder?: string;
}

/**
 * KSelect - A wrapper around KendoReact DropDownList with a consistent API
 *
 * @example
 * ```tsx
 * <KSelect
 *   label="Choose an option"
 *   options={[
 *     { label: 'Option 1', value: '1' },
 *     { label: 'Option 2', value: '2' }
 *   ]}
 *   value={selectedValue}
 *   onChange={(value) => setSelectedValue(value)}
 * />
 * ```
 */
export const KSelect = React.forwardRef<DropDownListHandle, KSelectProps>(
  (
    {
      options,
      value,
      defaultValue,
      onChange,
      label,
      hint,
      error,
      required,
      fullWidth,
      isLoading,
      placeholder,
      disabled,
      className,
      id,
      ...restProps
    },
    ref
  ) => {
    const generatedId = React.useId();
    const selectId = id || `kselect-${generatedId}`;
    const hintId = `${selectId}-hint`;
    const errorId = `${selectId}-error`;

    const handleChange = React.useCallback(
      (event: { value: KOption | null }) => {
        if (onChange) {
          onChange(event.value?.value ?? null);
        }
      },
      [onChange]
    );

    // Find the selected option object
    const selectedItem = React.useMemo(() => {
      if (value === undefined) return undefined;
      return options.find((opt) => opt.value === value) ?? null;
    }, [options, value]);

    const selectElement = (
      <DropDownList
        ref={ref}
        data={options}
        value={selectedItem}
        defaultValue={
          defaultValue !== undefined
            ? options.find((opt) => opt.value === defaultValue) ?? null
            : undefined
        }
        onChange={handleChange}
        textField="label"
        dataItemKey="value"
        disabled={disabled || isLoading}
        defaultItem={placeholder ? { label: placeholder, value: '' } : undefined}
        className={className}
        style={fullWidth ? { width: '100%' } : undefined}
        aria-label={label}
        aria-describedby={[hint ? hintId : undefined, error ? errorId : undefined]
          .filter(Boolean)
          .join(' ')}
        aria-invalid={error ? 'true' : undefined}
        aria-required={required ? 'true' : undefined}
        aria-busy={isLoading ? 'true' : undefined}
        {...restProps}
      />
    );

    if (!label && !hint && !error) {
      return selectElement;
    }

    return (
      <div style={{ width: fullWidth ? '100%' : undefined }}>
        {label && (
          <label
            htmlFor={selectId}
            style={{
              display: 'block',
              marginBottom: '0.25rem',
              fontWeight: 500,
            }}
          >
            {label}
            {required && (
              <span style={{ color: 'var(--kendo-color-error, #dc3545)', marginLeft: '0.25rem' }}>
                *
              </span>
            )}
          </label>
        )}
        {selectElement}
        {hint && !error && (
          <div
            id={hintId}
            style={{
              marginTop: '0.25rem',
              fontSize: '0.875rem',
              color: 'var(--kendo-color-text-secondary, #6c757d)',
            }}
          >
            {hint}
          </div>
        )}
        {error && (
          <div
            id={errorId}
            role="alert"
            style={{
              marginTop: '0.25rem',
              fontSize: '0.875rem',
              color: 'var(--kendo-color-error, #dc3545)',
            }}
          >
            {error}
          </div>
        )}
      </div>
    );
  }
);

KSelect.displayName = 'KSelect';


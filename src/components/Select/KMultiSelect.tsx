import React from 'react';
import {
  MultiSelect,
  MultiSelectProps,
  MultiSelectHandle,
} from '@progress/kendo-react-dropdowns';
import type { KOption } from '../../types';

export interface KMultiSelectProps
  extends Omit<
    MultiSelectProps,
    'data' | 'value' | 'onChange' | 'textField' | 'dataItemKey'
  > {
  /**
   * Array of options to display
   */
  options: KOption[];
  /**
   * Selected values (controlled)
   */
  value?: (string | number)[];
  /**
   * Default values (uncontrolled)
   */
  defaultValue?: (string | number)[];
  /**
   * Callback fired when selection changes
   */
  onChange?: (value: (string | number)[]) => void;
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
 * KMultiSelect - A wrapper around KendoReact MultiSelect with a consistent API
 *
 * @example
 * ```tsx
 * <KMultiSelect
 *   label="Choose options"
 *   options={[
 *     { label: 'Option 1', value: '1' },
 *     { label: 'Option 2', value: '2' }
 *   ]}
 *   value={selectedValues}
 *   onChange={(values) => setSelectedValues(values)}
 * />
 * ```
 */
export const KMultiSelect = React.forwardRef<
  MultiSelectHandle,
  KMultiSelectProps
>(
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
    const selectId = id || `kmultiselect-${generatedId}`;
    const hintId = `${selectId}-hint`;
    const errorId = `${selectId}-error`;

    const handleChange = React.useCallback(
      (event: { value: KOption[] }) => {
        if (onChange) {
          onChange(event.value.map((item) => item.value));
        }
      },
      [onChange]
    );

    // Find the selected option objects
    const selectedItems = React.useMemo(() => {
      if (value === undefined) return undefined;
      return options.filter((opt) => value.includes(opt.value));
    }, [options, value]);

    const defaultItems = React.useMemo(() => {
      if (defaultValue === undefined) return undefined;
      return options.filter((opt) => defaultValue.includes(opt.value));
    }, [options, defaultValue]);

    const selectElement = (
      <MultiSelect
        ref={ref}
        data={options}
        value={selectedItems}
        defaultValue={defaultItems}
        onChange={handleChange}
        textField="label"
        dataItemKey="value"
        disabled={disabled || isLoading}
        placeholder={placeholder}
        className={className}
        style={fullWidth ? { width: '100%' } : undefined}
        aria-label={label}
        aria-describedby={
          [hint ? hintId : undefined, error ? errorId : undefined]
            .filter(Boolean)
            .join(' ') || undefined
        }
        aria-invalid={error ? 'true' : undefined}
        aria-required={required ? 'true' : undefined}
        aria-busy={isLoading ? 'true' : undefined}
        {...restProps}
      />
    );

    // Always wrap when fullWidth is true or when there's label/hint/error
    const needsWrapper = fullWidth || label || hint || error;

    if (!needsWrapper) {
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
              <span
                style={{
                  color: 'var(--kendo-color-error, #dc3545)',
                  marginLeft: '0.25rem',
                }}
              >
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

KMultiSelect.displayName = 'KMultiSelect';

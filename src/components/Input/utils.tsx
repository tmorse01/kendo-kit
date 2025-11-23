import type { ReactElement } from 'react';
import type { BaseInputProps } from './types';

/**
 * Helper component to render input label, hint, and error messages
 */
export function InputWrapper({
  label,
  hint,
  error,
  required,
  fullWidth,
  id,
  children,
}: BaseInputProps & { children: ReactElement }) {
  const inputId = id || `input-${Math.random().toString(36).slice(2, 11)}`;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;

  return (
    <div className={fullWidth ? 'k-input-wrapper k-input-wrapper-fullwidth' : 'k-input-wrapper'} style={{ width: fullWidth ? '100%' : undefined }}>
      {label && (
        <label htmlFor={inputId} className="k-label">
          {label}
          {required && <span className="k-required-indicator" aria-label="required">*</span>}
        </label>
      )}
      <div className="k-input-container">
        {children}
      </div>
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


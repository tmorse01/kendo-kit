
/**
 * Shared props for all input components
 */
export interface BaseInputProps {
  /** Label text displayed above the input */
  label?: string;
  /** Hint text displayed below the input */
  hint?: string;
  /** Error message displayed below the input */
  error?: string;
  /** Whether the input is required */
  required?: boolean;
  /** Whether the input should take full width */
  fullWidth?: boolean;
  /** Standard HTML input id */
  id?: string;
  /** Standard HTML input name */
  name?: string;
  /** Standard HTML input placeholder */
  placeholder?: string;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Standard HTML input className */
  className?: string;
}

/**
 * Props for text input components (controlled)
 */
export interface TextInputProps extends BaseInputProps {
  /** Controlled value */
  value?: string;
  /** Change handler - receives Kendo TextBoxChangeEvent */
  onChange?: (event: any) => void;
  /** Standard HTML input type */
  type?: 'text' | 'email' | 'password' | 'tel' | 'url';
}

/**
 * Props for text input components (uncontrolled)
 */
export interface TextInputUncontrolledProps extends BaseInputProps {
  /** Uncontrolled default value */
  defaultValue?: string;
  /** Standard HTML input type */
  type?: 'text' | 'email' | 'password' | 'tel' | 'url';
}

/**
 * Combined props for text input (supports both controlled and uncontrolled)
 */
export type KTextInputProps = TextInputProps | TextInputUncontrolledProps;

/**
 * Props for numeric input components (controlled)
 */
export interface NumericInputProps extends BaseInputProps {
  /** Controlled numeric value */
  value?: number | null;
  /** Change handler - receives Kendo NumericTextBoxChangeEvent */
  onChange?: (event: any) => void;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step value for increment/decrement */
  step?: number;
  /** Number format string (e.g., "n2" for 2 decimal places) */
  format?: string;
  /** Whether to show spinner buttons */
  spinners?: boolean;
}

/**
 * Props for numeric input components (uncontrolled)
 */
export interface NumericInputUncontrolledProps extends BaseInputProps {
  /** Uncontrolled default value */
  defaultValue?: number | null;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step value for increment/decrement */
  step?: number;
  /** Number format string (e.g., "n2" for 2 decimal places) */
  format?: string;
  /** Whether to show spinner buttons */
  spinners?: boolean;
}

/**
 * Combined props for numeric input (supports both controlled and uncontrolled)
 */
export type KNumericInputProps = NumericInputProps | NumericInputUncontrolledProps;

/**
 * Props for masked input components (controlled)
 */
export interface MaskedInputProps extends BaseInputProps {
  /** Controlled value */
  value?: string;
  /** Change handler - receives Kendo MaskedTextBoxChangeEvent */
  onChange?: (event: any) => void;
  /** Mask pattern (e.g., "000-000-0000" for phone) */
  mask: string;
  /** Whether to include literal characters in the value */
  includeLiterals?: boolean;
}

/**
 * Props for masked input components (uncontrolled)
 */
export interface MaskedInputUncontrolledProps extends BaseInputProps {
  /** Uncontrolled default value */
  defaultValue?: string;
  /** Mask pattern (e.g., "000-000-0000" for phone) */
  mask: string;
  /** Whether to include literal characters in the value */
  includeLiterals?: boolean;
}

/**
 * Combined props for masked input (supports both controlled and uncontrolled)
 */
export type KMaskedInputProps = MaskedInputProps | MaskedInputUncontrolledProps;


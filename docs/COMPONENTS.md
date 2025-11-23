# Component API Reference

This document provides detailed API documentation for all components in Kendo Kit.

## Table of Contents

- [Buttons](#buttons)
  - [KButton](#kbutton)
- [Inputs](#inputs)
  - [KTextInput](#ktextinput)
  - [KNumericInput](#knumericinput)
  - [KMaskedInput](#kmaskedinput)
  - [KDatePicker](#kdatepicker)
- [Selects](#selects)
  - [KSelect](#kselect)
  - [KMultiSelect](#kmultiselect)
- [Form Controls](#form-controls)
  - [KCheckbox](#kcheckbox)
  - [KRadio](#kradio)
  - [KRadioGroup](#kradiogroup)
- [Modals](#modals)
  - [KModal](#kmodal)
- [Layout](#layout)
  - [KStack](#kstack)
- [Theme](#theme)
  - [KThemeProvider](#kthemeprovider)
  - [useTheme](#usetheme)

---

## Buttons

### KButton

A button component with consistent variants and sizes.

**Import:**

```tsx
import { KButton } from 'kendo-kit';
```

**Props:**

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'danger'` | `'primary'` | No | Button variant style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | No | Button size |
| `isLoading` | `boolean` | `false` | No | Show loading state (disables button and shows spinner) |
| `iconLeft` | `React.ReactNode` | - | No | Icon to display on the left side |
| `iconRight` | `React.ReactNode` | - | No | Icon to display on the right side |
| `disabled` | `boolean` | - | No | Whether the button is disabled |
| `onClick` | `(event: React.MouseEvent) => void` | - | No | Click handler |
| `children` | `React.ReactNode` | - | Yes | Button content |
| `className` | `string` | - | No | Additional CSS class name |
| `...restProps` | `ButtonProps` | - | No | All other Kendo Button props |

**Usage:**

```tsx
// Basic button
<KButton onClick={handleClick}>Click me</KButton>

// Variants
<KButton variant="primary">Primary</KButton>
<KButton variant="secondary">Secondary</KButton>
<KButton variant="ghost">Ghost</KButton>
<KButton variant="danger">Danger</KButton>

// Sizes
<KButton size="sm">Small</KButton>
<KButton size="md">Medium</KButton>
<KButton size="lg">Large</KButton>

// Loading state
<KButton isLoading={isSubmitting}>Submit</KButton>

// With icons
<KButton iconLeft={<Icon />}>With Left Icon</KButton>
<KButton iconRight={<Icon />}>With Right Icon</KButton>
```

**Related Components:** None

---

## Inputs

All input components share common props for consistent behavior:

**Common Props:**

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `label` | `string` | - | No | Label text displayed above the input |
| `hint` | `string` | - | No | Hint text displayed below the input |
| `error` | `string` | - | No | Error message displayed below the input |
| `required` | `boolean` | - | No | Whether the input is required |
| `fullWidth` | `boolean` | - | No | Whether the input should take full width |
| `id` | `string` | - | No | HTML input id (auto-generated if not provided) |
| `name` | `string` | - | No | HTML input name |
| `placeholder` | `string` | - | No | Placeholder text |
| `disabled` | `boolean` | - | No | Whether the input is disabled |
| `className` | `string` | - | No | Additional CSS class name |

### KTextInput

Text input component supporting both controlled and uncontrolled usage.

**Import:**

```tsx
import { KTextInput } from 'kendo-kit';
```

**Props:**

Extends common input props with:

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `value` | `string` | - | No | Controlled value (use with `onChange`) |
| `defaultValue` | `string` | - | No | Uncontrolled default value |
| `onChange` | `(event: TextBoxChangeEvent) => void` | - | No | Change handler (receives Kendo TextBoxChangeEvent) |
| `type` | `'text' \| 'email' \| 'password' \| 'tel' \| 'url'` | `'text'` | No | HTML input type |

**Usage:**

```tsx
// Controlled
const [email, setEmail] = useState('');
<KTextInput
  label="Email"
  value={email}
  onChange={(e) => setEmail(e.value || '')}
  type="email"
  required
  hint="We'll never share your email"
/>

// Uncontrolled
<KTextInput
  label="Name"
  defaultValue="John Doe"
  placeholder="Enter your name"
/>

// With error
<KTextInput
  label="Email"
  value={email}
  onChange={(e) => setEmail(e.value || '')}
  error="Please enter a valid email address"
/>
```

**Related Components:** `KNumericInput`, `KMaskedInput`

### KNumericInput

Numeric input component with formatting and validation support.

**Import:**

```tsx
import { KNumericInput } from 'kendo-kit';
```

**Props:**

Extends common input props with:

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `value` | `number \| null` | - | No | Controlled numeric value |
| `defaultValue` | `number \| null` | - | No | Uncontrolled default value |
| `onChange` | `(event: { value?: number \| null }) => void` | - | No | Change handler |
| `min` | `number` | - | No | Minimum value |
| `max` | `number` | - | No | Maximum value |
| `step` | `number` | - | No | Step value for increment/decrement |
| `format` | `string` | - | No | Number format string (e.g., "n2" for 2 decimals, "c2" for currency) |
| `spinners` | `boolean` | `true` | No | Whether to show spinner buttons |

**Usage:**

```tsx
// Controlled with formatting
const [price, setPrice] = useState<number | null>(null);
<KNumericInput
  label="Price"
  value={price}
  onChange={(e) => setPrice(e.value ?? null)}
  min={0}
  max={1000}
  format="c2"
  required
/>

// Uncontrolled
<KNumericInput
  label="Quantity"
  defaultValue={1}
  min={1}
  step={1}
  spinners={true}
/>
```

**Related Components:** `KTextInput`, `KMaskedInput`

### KMaskedInput

Masked input component for formatted data entry (e.g., phone numbers, dates).

**Import:**

```tsx
import { KMaskedInput } from 'kendo-kit';
```

**Props:**

Extends common input props with:

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `value` | `string` | - | No | Controlled value |
| `defaultValue` | `string` | - | No | Uncontrolled default value |
| `onChange` | `(event: { value?: string \| null }) => void` | - | No | Change handler |
| `mask` | `string` | - | **Yes** | Mask pattern (e.g., "000-000-0000" for phone) |
| `includeLiterals` | `boolean` | - | No | Whether to include literal characters in the value |

**Usage:**

```tsx
// Phone number mask
const [phone, setPhone] = useState('');
<KMaskedInput
  label="Phone Number"
  value={phone}
  onChange={(e) => setPhone(e.value || '')}
  mask="000-000-0000"
  placeholder="123-456-7890"
/>

// Credit card mask
<KMaskedInput
  label="Credit Card"
  mask="0000-0000-0000-0000"
  includeLiterals={false}
/>
```

**Related Components:** `KTextInput`, `KNumericInput`

### KDatePicker

Date picker component with calendar popup.

**Import:**

```tsx
import { KDatePicker } from 'kendo-kit';
```

**Props:**

Extends common input props with:

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `value` | `Date \| null` | - | No | Selected date value (controlled) |
| `defaultValue` | `Date \| null` | - | No | Default selected date (uncontrolled) |
| `onChange` | `(event: { value: Date \| null; syntheticEvent: React.SyntheticEvent }) => void` | - | No | Change handler - receives Kendo DatePickerChangeEvent |
| `min` | `Date` | - | No | Minimum selectable date |
| `max` | `Date` | - | No | Maximum selectable date |
| `format` | `string` | `'MM/dd/yyyy'` | No | Date format string (e.g., "MM/dd/yyyy") |

**Usage:**

```tsx
// Controlled
const [birthDate, setBirthDate] = useState<Date | null>(null);
<KDatePicker
  label="Birth Date"
  value={birthDate}
  onChange={(e) => setBirthDate(e.value)}
  min={new Date(1900, 0, 1)}
  max={new Date()}
  format="MM/dd/yyyy"
  required
/>

// Uncontrolled
<KDatePicker
  label="Start Date"
  defaultValue={new Date()}
  format="yyyy-MM-dd"
  hint="Select a start date"
/>
```

**Related Components:** `KTextInput`, `KNumericInput`

---

## Selects

Both select components use a unified option type:

```tsx
type KOption = {
  label: string;
  value: string | number;
  [key: string]: unknown; // Additional properties allowed
};
```

### KSelect

Single-select dropdown component.

**Import:**

```tsx
import { KSelect } from 'kendo-kit';
```

**Props:**

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `options` | `KOption[]` | - | **Yes** | Array of options to display |
| `value` | `string \| number` | - | No | Selected value (controlled) |
| `defaultValue` | `string \| number` | - | No | Default value (uncontrolled) |
| `onChange` | `(value: string \| number \| null) => void` | - | No | Callback fired when selection changes |
| `label` | `string` | - | No | Label text displayed above the select |
| `hint` | `string` | - | No | Hint text displayed below the select |
| `error` | `string` | - | No | Error message displayed below the select |
| `required` | `boolean` | - | No | Whether the field is required |
| `fullWidth` | `boolean` | - | No | Whether the select should take full width |
| `isLoading` | `boolean` | - | No | Whether the select is in loading state |
| `placeholder` | `string` | - | No | Placeholder text when no option is selected |
| `disabled` | `boolean` | - | No | Whether the select is disabled |
| `className` | `string` | - | No | Additional CSS class name |
| `id` | `string` | - | No | HTML id (auto-generated if not provided) |

**Usage:**

```tsx
const [selectedValue, setSelectedValue] = useState<string | number | null>(null);

<KSelect
  label="Choose an option"
  options={[
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ]}
  value={selectedValue}
  onChange={setSelectedValue}
  placeholder="Select an option"
  required
/>

// With error
<KSelect
  label="Country"
  options={countries}
  value={country}
  onChange={setCountry}
  error="Please select a country"
/>
```

**Related Components:** `KMultiSelect`

### KMultiSelect

Multi-select dropdown component.

**Import:**

```tsx
import { KMultiSelect } from 'kendo-kit';
```

**Props:**

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `options` | `KOption[]` | - | **Yes** | Array of options to display |
| `value` | `(string \| number)[]` | - | No | Selected values (controlled) |
| `defaultValue` | `(string \| number)[]` | - | No | Default values (uncontrolled) |
| `onChange` | `(value: (string \| number)[]) => void` | - | No | Callback fired when selection changes |
| `label` | `string` | - | No | Label text displayed above the select |
| `hint` | `string` | - | No | Hint text displayed below the select |
| `error` | `string` | - | No | Error message displayed below the select |
| `required` | `boolean` | - | No | Whether the field is required |
| `fullWidth` | `boolean` | - | No | Whether the select should take full width |
| `isLoading` | `boolean` | - | No | Whether the select is in loading state |
| `placeholder` | `string` | - | No | Placeholder text when no option is selected |
| `disabled` | `boolean` | - | No | Whether the select is disabled |
| `className` | `string` | - | No | Additional CSS class name |
| `id` | `string` | - | No | HTML id (auto-generated if not provided) |

**Usage:**

```tsx
const [selectedValues, setSelectedValues] = useState<(string | number)[]>([]);

<KMultiSelect
  label="Choose options"
  options={[
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ]}
  value={selectedValues}
  onChange={setSelectedValues}
  placeholder="Select multiple options"
/>
```

**Related Components:** `KSelect`

---

## Form Controls

### KCheckbox

Checkbox component supporting controlled and uncontrolled usage.

**Import:**

```tsx
import { KCheckbox } from 'kendo-kit';
```

**Props:**

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `label` | `string` | - | No | Label text displayed next to the checkbox |
| `hint` | `string` | - | No | Hint text displayed below the checkbox |
| `error` | `string` | - | No | Error message displayed below the checkbox |
| `checked` | `boolean` | - | No | Whether the checkbox is checked (controlled) |
| `defaultChecked` | `boolean` | - | No | Default checked state (uncontrolled) |
| `onChange` | `(event: { value: boolean; syntheticEvent: React.SyntheticEvent }) => void` | - | No | Change handler - receives Kendo CheckboxChangeEvent |
| `indeterminate` | `boolean` | - | No | Whether the checkbox is in an indeterminate state |
| `required` | `boolean` | - | No | Whether the checkbox is required |
| `fullWidth` | `boolean` | - | No | Whether the checkbox should take full width |
| `disabled` | `boolean` | - | No | Whether the checkbox is disabled |
| `id` | `string` | - | No | HTML id (auto-generated if not provided) |
| `name` | `string` | - | No | HTML input name |
| `className` | `string` | - | No | Additional CSS class name |

**Usage:**

```tsx
// Controlled
const [agreed, setAgreed] = useState(false);
<KCheckbox
  label="I agree to the terms and conditions"
  checked={agreed}
  onChange={(e) => setAgreed(e.value)}
  required
/>

// Uncontrolled
<KCheckbox
  label="Subscribe to newsletter"
  defaultChecked={true}
/>

// Indeterminate state
<KCheckbox
  label="Select all"
  indeterminate={someSelected}
  checked={allSelected}
  onChange={handleSelectAll}
/>

// With error
<KCheckbox
  label="Accept terms"
  checked={accepted}
  onChange={(e) => setAccepted(e.value)}
  error="You must accept the terms"
  required
/>
```

**Related Components:** `KRadio`, `KRadioGroup`

### KRadio

Radio button component for single selection within a group.

**Import:**

```tsx
import { KRadio } from 'kendo-kit';
```

**Props:**

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `label` | `string` | - | No | Label text displayed next to the radio button |
| `value` | `string \| number` | - | **Yes** | Value of this radio button (used for group management) |
| `checked` | `boolean` | - | No | Whether this radio button is checked (controlled) |
| `defaultChecked` | `boolean` | - | No | Default checked state (uncontrolled) |
| `onChange` | `(event: { value: boolean; syntheticEvent: React.SyntheticEvent }) => void` | - | No | Change handler - receives Kendo RadioButtonChangeEvent |
| `name` | `string` | - | No | Name attribute for grouping radio buttons |
| `fullWidth` | `boolean` | - | No | Whether the radio button should take full width |
| `disabled` | `boolean` | - | No | Whether the radio button is disabled |
| `id` | `string` | - | No | HTML id (auto-generated if not provided) |
| `className` | `string` | - | No | Additional CSS class name |

**Usage:**

```tsx
// Controlled - Single radio
const [selected, setSelected] = useState('option1');
<KRadio
  label="Option 1"
  value="option1"
  name="group1"
  checked={selected === 'option1'}
  onChange={(e) => e.value && setSelected('option1')}
/>

// Uncontrolled
<KRadio
  label="Option 2"
  value="option2"
  name="group1"
  defaultChecked={true}
/>

// Use KRadioGroup for easier group management
```

**Related Components:** `KRadioGroup`, `KCheckbox`

### KRadioGroup

Radio button group component for managing multiple radio buttons together.

**Import:**

```tsx
import { KRadioGroup } from 'kendo-kit';
```

**Props:**

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `name` | `string` | - | **Yes** | Name attribute for all radio buttons in the group |
| `value` | `string \| number` | - | No | Selected value (controlled) |
| `defaultValue` | `string \| number` | - | No | Default selected value (uncontrolled) |
| `onChange` | `(value: string \| number) => void` | - | No | Callback fired when selection changes |
| `options` | `KOption[]` | - | No | Array of options to render as radio buttons |
| `children` | `React.ReactNode` | - | No | Custom radio button children (alternative to options) |
| `label` | `string` | - | No | Label text displayed above the radio group |
| `hint` | `string` | - | No | Hint text displayed below the radio group |
| `error` | `string` | - | No | Error message displayed below the radio group |
| `required` | `boolean` | - | No | Whether the field is required |
| `fullWidth` | `boolean` | - | No | Whether the radio group should take full width |
| `direction` | `'row' \| 'column'` | `'column'` | No | Layout direction |
| `gap` | `number \| string` | `'0.5rem'` (column) or `'1rem'` (row) | No | Gap between radio buttons |
| `disabled` | `boolean` | - | No | Whether all radio buttons are disabled |

**Usage:**

```tsx
// Controlled with options
const [paymentMethod, setPaymentMethod] = useState<string | number>('card');
<KRadioGroup
  name="payment"
  label="Payment Method"
  options={[
    { label: 'Credit Card', value: 'card' },
    { label: 'PayPal', value: 'paypal' },
    { label: 'Bank Transfer', value: 'bank' },
  ]}
  value={paymentMethod}
  onChange={setPaymentMethod}
  required
  hint="Select your preferred payment method"
/>

// Uncontrolled with children
<KRadioGroup
  name="size"
  label="Size"
  defaultValue="medium"
  onChange={(value) => console.log(value)}
>
  <KRadio label="Small" value="small" name="size" />
  <KRadio label="Medium" value="medium" name="size" />
  <KRadio label="Large" value="large" name="size" />
</KRadioGroup>

// Horizontal layout
<KRadioGroup
  name="theme"
  label="Theme"
  options={themeOptions}
  value={theme}
  onChange={setTheme}
  direction="row"
  gap="2rem"
/>

// With error
<KRadioGroup
  name="choice"
  label="Make a choice"
  options={options}
  value={choice}
  onChange={setChoice}
  error="Please select an option"
  required
/>
```

**Related Components:** `KRadio`, `KCheckbox`

---

## Modals

### KModal

Modal dialog component with customizable header, body, and footer.

**Import:**

```tsx
import { KModal } from 'kendo-kit';
```

**Props:**

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `isOpen` | `boolean` | - | **Yes** | Whether the modal is open |
| `onClose` | `() => void` | - | **Yes** | Callback fired when the modal requests to be closed |
| `title` | `string \| React.ReactElement` | - | No | Modal title (rendered in header) |
| `children` | `React.ReactNode` | - | **Yes** | Modal content |
| `footer` | `React.ReactNode` | - | No | Footer content (e.g., action buttons) |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | No | Modal size |
| `closeOnEscape` | `boolean` | `true` | No | Whether to close modal on ESC key press |
| `closeOnOverlayClick` | `boolean` | `true` | No | Whether to close modal on overlay click |
| `className` | `string` | - | No | Additional CSS class name |

**Usage:**

```tsx
const [isOpen, setIsOpen] = useState(false);

<KModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirm Action"
  size="md"
  footer={
    <>
      <KButton onClick={() => setIsOpen(false)}>Cancel</KButton>
      <KButton variant="primary" onClick={handleConfirm}>
        Confirm
      </KButton>
    </>
  }
>
  Are you sure you want to proceed?
</KModal>

// Small modal
<KModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Alert"
  size="sm"
>
  This is a small modal.
</KModal>
```

**Related Components:** `KButton`

---

## Layout

### KStack

Simple flex stack layout helper with gap and alignment props.

**Import:**

```tsx
import { KStack } from 'kendo-kit';
```

**Props:**

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `direction` | `'row' \| 'column'` | `'row'` | No | Flex direction |
| `gap` | `number \| string` | `0` | No | Gap between items (number in px or CSS string) |
| `align` | `'start' \| 'center' \| 'end'` | `'start'` | No | Cross-axis alignment (align-items) |
| `justify` | `'start' \| 'center' \| 'end' \| 'space-between'` | `'start'` | No | Main-axis alignment (justify-content) |
| `children` | `React.ReactNode` | - | **Yes** | Stack content |
| `className` | `string` | - | No | Additional CSS class name |
| `style` | `React.CSSProperties` | - | No | Additional inline styles |

**Usage:**

```tsx
// Horizontal stack with gap
<KStack direction="row" gap={16}>
  <KButton>Button 1</KButton>
  <KButton>Button 2</KButton>
  <KButton>Button 3</KButton>
</KStack>

// Vertical stack with alignment
<KStack direction="column" gap="1rem" align="center">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</KStack>

// Space between items
<KStack direction="row" justify="space-between" gap={8}>
  <span>Left</span>
  <span>Right</span>
</KStack>
```

**Related Components:** None

---

## Theme

### KThemeProvider

Theme provider component that injects CSS variables and provides theme context.

**Import:**

```tsx
import { KThemeProvider } from 'kendo-kit';
```

**Props:**

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `theme` | `ThemeTokens` | - | **Yes** | Theme tokens to apply |
| `children` | `React.ReactNode` | - | **Yes** | Child components |

**ThemeTokens Type:**

```tsx
type ThemeTokens = {
  colors?: {
    primary?: string;
    secondary?: string;
    // Additional semantic colors can be added
  };
  typography?: {
    fontFamily?: string;
    fontSize?: string;
    fontWeight?: string | number;
    lineHeight?: string | number;
  };
  spacing?: {
    [key: string]: string;
  };
  borderRadius?: {
    [key: string]: string;
  };
};
```

**Usage:**

```tsx
<KThemeProvider
  theme={{
    colors: {
      primary: '#ff6358',
      secondary: '#666666',
    },
    typography: {
      fontFamily: 'Arial, sans-serif',
      fontSize: '16px',
    },
    spacing: {
      sm: '8px',
      md: '16px',
      lg: '24px',
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
    },
  }}
>
  <App />
</KThemeProvider>
```

**Related Components:** `useTheme`

**See Also:** [THEMING_GUIDELINES.md](./THEMING_GUIDELINES.md)

### useTheme

Hook to access the current theme context.

**Import:**

```tsx
import { useTheme } from 'kendo-kit';
```

**Returns:**

```tsx
{
  theme: ThemeTokens;
}
```

**Throws:**

- `Error` - If used outside of `KThemeProvider`

**Usage:**

```tsx
function MyComponent() {
  const { theme } = useTheme();
  const primaryColor = theme.colors?.primary;

  return <div style={{ color: primaryColor }}>Themed content</div>;
}
```

**Related Components:** `KThemeProvider`

---

## Type Exports

All component prop types are exported for use in your own components:

```tsx
import type {
  KButtonProps,
  KButtonVariant,
  KButtonSize,
  KTextInputProps,
  KNumericInputProps,
  KMaskedInputProps,
  KDatePickerProps,
  KSelectProps,
  KMultiSelectProps,
  KCheckboxProps,
  KRadioProps,
  KRadioGroupProps,
  KModalProps,
  KModalSize,
  KStackProps,
  KStackDirection,
  KStackAlign,
  KStackJustify,
  KThemeProviderProps,
  ThemeTokens,
  KOption,
} from 'kendo-kit';
```


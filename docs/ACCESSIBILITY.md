# Accessibility Guidelines

Kendo Kit is committed to providing accessible components that work for all users, including those using assistive technologies. This document outlines the accessibility features implemented in the library and provides guidance for using components accessibly.

## Overview

All components in Kendo Kit are built on top of KendoReact components, which provide foundational accessibility features. We enhance these with consistent patterns and additional ARIA attributes to ensure a cohesive accessible experience.

## WCAG Compliance

Kendo Kit components aim to meet **WCAG 2.1 Level AA** standards, including:

- **Perceivable**: Information and UI components are presentable to users in ways they can perceive
- **Operable**: UI components and navigation must be operable
- **Understandable**: Information and UI operation must be understandable
- **Robust**: Content must be robust enough to be interpreted by assistive technologies

## Component Accessibility Features

### Form Inputs (KTextInput, KNumericInput, KMaskedInput, KDatePicker)

#### Label Association
- All inputs support `label` prop that creates proper `<label>` elements
- Labels are automatically associated with inputs via `htmlFor` and `id` attributes
- Auto-generated IDs ensure unique associations when `id` is not provided

#### Error Handling
- Error messages are associated with inputs via `aria-describedby`
- `aria-invalid="true"` is set when an error is present
- Error messages use `role="alert"` for immediate screen reader announcements
- Visual error indicators are paired with accessible text

#### Hint Text
- Hint text is associated with inputs via `aria-describedby`
- Hints provide additional context without cluttering the label

#### Required Fields
- Required inputs are marked with `required` attribute
- Visual indicators (asterisk) include `aria-label="required"` for screen readers
- `aria-required` is set on form controls

**Example:**
```tsx
<KTextInput
  label="Email"
  hint="We'll never share your email"
  error={errors.email}
  required
  value={email}
  onChange={(e) => setEmail(e.value || '')}
/>
```

### Select Components (KSelect, KMultiSelect)

- Proper label association
- Error and hint text association via `aria-describedby`
- Keyboard navigation inherited from KendoReact DropDownList/MultiSelect
- Screen reader announcements for selections
- Loading state announcements

**Example:**
```tsx
<KSelect
  label="Country"
  options={countries}
  value={selectedCountry}
  onChange={setSelectedCountry}
  error={errors.country}
  required
/>
```

### Form Controls (KCheckbox, KRadio, KRadioGroup)

#### Checkbox
- Label association via `htmlFor` and `id`
- Support for `indeterminate` state
- Error and hint text association
- Keyboard accessible (Space to toggle)

#### Radio Buttons
- Proper grouping via `name` attribute
- Label association for each radio button
- Keyboard navigation between radio buttons in a group
- Arrow keys navigate between options

#### Radio Group
- `role="radiogroup"` for proper semantic grouping
- `aria-labelledby` for group label
- `aria-describedby` for hints and errors
- `aria-required` for required groups
- `aria-invalid` for error states

**Example:**
```tsx
<KRadioGroup
  name="payment"
  label="Payment Method"
  options={[
    { label: 'Credit Card', value: 'card' },
    { label: 'PayPal', value: 'paypal' }
  ]}
  value={paymentMethod}
  onChange={setPaymentMethod}
  required
  error={errors.payment}
/>
```

### Buttons (KButton)

- Proper button semantics (`<button>` element)
- Loading state uses `aria-busy="true"` when `isLoading` is true
- Disabled state properly communicated to assistive technologies
- Keyboard accessible (Enter/Space to activate)
- Focus indicators visible

**Example:**
```tsx
<KButton
  variant="primary"
  isLoading={isSubmitting}
  onClick={handleSubmit}
>
  Submit
</KButton>
```

### Modal (KModal)

- Focus management (focus trapped within modal when open)
- ESC key support for closing (configurable)
- Overlay click to close (configurable)
- Proper ARIA attributes for modal dialog
- Focus returns to trigger element when closed
- Screen reader announcements

**Example:**
```tsx
<KModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirm Action"
  closeOnEscape={true}
  closeOnOverlayClick={true}
>
  Are you sure you want to proceed?
</KModal>
```

### Layout (KStack)

- Semantic HTML structure
- No accessibility concerns for layout components
- Proper use of flexbox for responsive layouts

## Keyboard Navigation

All interactive components support keyboard navigation:

### Form Controls
- **Tab**: Move between form fields
- **Shift+Tab**: Move backwards
- **Enter/Space**: Activate buttons, submit forms
- **Arrow Keys**: Navigate radio button groups, select options

### Modals
- **Tab**: Navigate within modal (focus trapped)
- **Shift+Tab**: Navigate backwards within modal
- **ESC**: Close modal (if `closeOnEscape` is true)

### Dropdowns/Selects
- **Arrow Keys**: Navigate options
- **Enter**: Select option
- **ESC**: Close dropdown
- **Space**: Open/close dropdown

## Screen Reader Support

### Announcements

- **Error messages**: Announced immediately when displayed (`role="alert"`)
- **Required fields**: Announced as "required" by screen readers
- **Loading states**: Announced as "busy" when `isLoading` is true
- **Form validation**: Errors are associated with inputs and announced

### Semantic HTML

- Proper use of semantic HTML elements (`<button>`, `<input>`, `<label>`, etc.)
- ARIA roles used appropriately (`role="radiogroup"`, `role="alert"`)
- ARIA attributes for state (`aria-invalid`, `aria-required`, `aria-busy`)

## Best Practices

### 1. Always Provide Labels

```tsx
// ✅ Good
<KTextInput label="Email" value={email} onChange={setEmail} />

// ❌ Bad - No label
<KTextInput value={email} onChange={setEmail} />
```

### 2. Provide Error Messages

```tsx
// ✅ Good
<KTextInput
  label="Email"
  value={email}
  onChange={setEmail}
  error={errors.email || "Please enter a valid email"}
/>

// ❌ Bad - Visual error only
<KTextInput
  label="Email"
  value={email}
  onChange={setEmail}
  className={errors.email ? "error" : ""}
/>
```

### 3. Use Required Indicators

```tsx
// ✅ Good
<KTextInput
  label="Email"
  required
  value={email}
  onChange={setEmail}
/>

// ❌ Bad - No indication of required field
<KTextInput
  label="Email"
  value={email}
  onChange={setEmail}
/>
```

### 4. Group Related Controls

```tsx
// ✅ Good - Radio group
<KRadioGroup
  name="payment"
  label="Payment Method"
  options={options}
  value={value}
  onChange={setValue}
/>

// ❌ Bad - Individual radios without grouping
<KRadio name="payment" value="card" label="Credit Card" />
<KRadio name="payment" value="paypal" label="PayPal" />
```

### 5. Provide Hint Text for Complex Inputs

```tsx
// ✅ Good
<KMaskedInput
  label="Phone Number"
  hint="Format: 123-456-7890"
  mask="000-000-0000"
  value={phone}
  onChange={setPhone}
/>

// ❌ Bad - No guidance
<KMaskedInput
  label="Phone Number"
  mask="000-000-0000"
  value={phone}
  onChange={setPhone}
/>
```

## Testing Accessibility

### Automated Testing

Use tools like:
- **axe DevTools**: Browser extension for accessibility testing
- **Lighthouse**: Accessibility audit in Chrome DevTools
- **WAVE**: Web accessibility evaluation tool

### Manual Testing

1. **Keyboard Navigation**
   - Navigate entire forms using only keyboard
   - Verify focus indicators are visible
   - Test all interactive elements

2. **Screen Reader Testing**
   - Test with NVDA (Windows) or VoiceOver (macOS)
   - Verify labels are announced correctly
   - Check error messages are announced
   - Verify form structure is understandable

3. **Visual Testing**
   - Verify sufficient color contrast (WCAG AA: 4.5:1 for text)
   - Check focus indicators are visible
   - Ensure error states are clear

### Testing Checklist

- [ ] All form inputs have associated labels
- [ ] Error messages are announced by screen readers
- [ ] Required fields are indicated
- [ ] Keyboard navigation works for all interactive elements
- [ ] Focus indicators are visible
- [ ] Color contrast meets WCAG AA standards
- [ ] Modal focus trapping works correctly
- [ ] Loading states are announced
- [ ] Form validation errors are accessible

## Common Accessibility Issues and Solutions

### Issue: Missing Labels

**Problem:**
```tsx
<KTextInput value={email} onChange={setEmail} />
```

**Solution:**
```tsx
<KTextInput label="Email" value={email} onChange={setEmail} />
```

### Issue: Error Not Announced

**Problem:**
```tsx
<div className="error">{errors.email}</div>
```

**Solution:**
```tsx
<KTextInput
  label="Email"
  error={errors.email}
  value={email}
  onChange={setEmail}
/>
```

### Issue: Required Field Not Indicated

**Problem:**
```tsx
<KTextInput label="Email" value={email} onChange={setEmail} />
// User doesn't know it's required
```

**Solution:**
```tsx
<KTextInput
  label="Email"
  required
  value={email}
  onChange={setEmail}
/>
```

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [KendoReact Accessibility](https://www.telerik.com/kendo-react-ui/components/accessibility/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)

## Reporting Accessibility Issues

If you encounter accessibility issues with Kendo Kit components:

1. **Check existing issues**: Search GitHub Issues for similar problems
2. **Create a new issue**: Include:
   - Component name and version
   - Description of the accessibility issue
   - Steps to reproduce
   - Expected vs. actual behavior
   - Screen reader/assistive technology used
   - Browser and OS information

3. **Provide a fix**: If possible, submit a PR with the fix

## Future Improvements

Planned accessibility enhancements:

- Enhanced focus management
- Additional ARIA live regions for dynamic content
- Improved keyboard shortcuts
- Better screen reader announcements for complex interactions
- Dark mode support with proper contrast

---

**Remember**: Accessibility is not optional. Every user deserves a great experience, regardless of their abilities or the tools they use.


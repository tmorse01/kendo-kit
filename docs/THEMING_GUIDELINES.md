# Theming Guidelines

This document provides guidelines for creating custom themes with `KThemeProvider` that follow Material Design principles while allowing for custom brand colors.

## Overview

The `KThemeProvider` automatically generates color variations (hover, active, focus, disabled, etc.) and calculates contrast colors as CSS variables. **Contrast colors are not automatically applied** - you are responsible for ensuring proper contrast in your components. To ensure the best user experience, follow these Material Design-inspired guidelines when selecting colors.

## Color Selection Principles

### Primary Color

The **primary color** is your main brand color and should be:

- **Vibrant and distinctive** - Choose a color that represents your brand identity
- **Medium to dark saturation** - Avoid very light colors (they won't have enough contrast)
- **Good contrast potential** - Should work with both light and dark text depending on usage

**Good Examples:**
- `#8b5cf6` (Vibrant purple)
- `#6366f1` (Indigo)
- `#3b82f6` (Blue)
- `#10b981` (Emerald green)
- `#f43f5e` (Rose)

**Avoid:**
- Very light colors like `#f0f0f0` (poor contrast)
- Very dark colors like `#000000` (unless using light text)

### Secondary Color

The **secondary color** should be:

- **Lighter than primary** - Material Design uses lighter secondary colors for visual hierarchy
- **Complementary or analogous** - Works well with your primary color
- **Light enough for dark text** - Should have sufficient contrast for black/dark text
- **Not too dark** - Avoid dark secondary colors as they can cause contrast issues

**Recommended Approach:**
- Use a lighter shade or tint of your primary color
- Or choose a complementary color that's naturally lighter
- Aim for colors with luminance > 0.5 (will automatically get black text)

**Good Examples:**
- `#06b6d4` (Cyan - lighter, works with dark text)
- `#14b8a6` (Teal - lighter, works with dark text)
- `#a855f7` (Light violet - lighter variant)
- `#60a5fa` (Light blue - lighter variant)

**Avoid:**
- Dark colors like `#1e293b`, `#0f172a` (will require white text, can cause issues)
- Very saturated dark colors
- Colors that are darker than your primary color

### Semantic Colors

For semantic colors (success, warning, error, info), use standard Material Design colors:

- **Success**: `#10b981` (Emerald green)
- **Warning**: `#f59e0b` (Amber - light enough for dark text)
- **Error**: `#ef4444` (Red)
- **Info**: `#3b82f6` (Blue)

## Color Relationship Guidelines

### 1. Maintain Visual Hierarchy

```
Primary (darkest) > Secondary (lighter) > Tertiary (lightest)
```

Your primary color should be the most prominent, with secondary being lighter and less prominent.

### 2. Contrast Ratios

The ThemeProvider generates contrast color CSS variables (e.g., `--kendo-color-primary-contrast`), but **does not automatically apply them**. You are responsible for:

- **Ensuring proper contrast**: Use the generated contrast variables or set your own text colors
- **Primary buttons**: Should have sufficient contrast with their background
- **Secondary buttons**: Should be light enough for dark text (luminance > 0.5) or you must manually set light text
- **Text on backgrounds**: Minimum 4.5:1 contrast ratio for normal text

**Note**: If you choose colors that violate contrast guidelines, you must manually handle text colors in your CSS or component styles.

### 3. Color Harmony

Choose colors that work well together:

- **Monochromatic**: Use different shades/tints of the same hue
- **Analogous**: Use colors next to each other on the color wheel
- **Complementary**: Use colors opposite on the color wheel (use sparingly)

## Example Theme Configurations

### Example 1: Purple & Cyan (Recommended)

```typescript
<KThemeProvider
  theme={{
    colors: {
      primary: '#8b5cf6',    // Vibrant purple - brand color
      secondary: '#06b6d4',   // Cyan - lighter, works with dark text
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
    },
  }}
>
```

**Why this works:**
- Primary is vibrant and distinctive
- Secondary is lighter and complementary
- Both colors have good contrast
- Follows Material Design principles

### Example 2: Blue & Light Blue

```typescript
<KThemeProvider
  theme={{
    colors: {
      primary: '#3b82f6',    // Blue
      secondary: '#60a5fa',   // Light blue - lighter variant
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
    },
  }}
>
```

**Why this works:**
- Monochromatic scheme (same hue, different lightness)
- Secondary is clearly lighter than primary
- Good visual hierarchy

### Example 3: Indigo & Violet

```typescript
<KThemeProvider
  theme={{
    colors: {
      primary: '#6366f1',    // Indigo
      secondary: '#a855f7',   // Violet - lighter, analogous
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
    },
  }}
>
```

**Why this works:**
- Analogous colors (next to each other on color wheel)
- Secondary is lighter
- Creates harmonious color scheme

## What to Avoid

### ❌ Dark Secondary Colors

```typescript
// DON'T DO THIS
colors: {
  primary: '#8b5cf6',
  secondary: '#1e293b',  // Too dark - will require white text
}
```

**Problems:**
- Dark secondary colors require white text, which can conflict with Kendo's default styling
- Breaks Material Design's visual hierarchy (secondary should be lighter)
- Can cause contrast and readability issues

### ❌ Secondary Darker Than Primary

```typescript
// DON'T DO THIS
colors: {
  primary: '#60a5fa',     // Light blue
  secondary: '#3b82f6',   // Darker blue - wrong hierarchy
}
```

**Problems:**
- Reverses visual hierarchy
- Secondary should be lighter, not darker

### ❌ Very Light Primary Colors

```typescript
// DON'T DO THIS
colors: {
  primary: '#f0f0f0',     // Too light - poor contrast
  secondary: '#ffffff',
}
```

**Problems:**
- Poor contrast ratios
- Hard to see on light backgrounds
- Doesn't provide enough visual weight

## Typography Guidelines

### Font Family

Use system fonts or web-safe fonts:

```typescript
typography: {
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
}
```

### Font Size

Standard sizes:
- Base: `16px` (good for readability)
- Can adjust based on your design system

### Line Height

Recommended:
- `1.5` or `1.6` for body text
- `1.2` to `1.4` for headings

## Spacing Guidelines

Use consistent spacing scale:

```typescript
spacing: {
  xs: '4px',   // Extra small
  sm: '8px',   // Small
  md: '16px',  // Medium (base)
  lg: '24px',  // Large
  xl: '32px',  // Extra large
}
```

Follow an 8px grid system for consistency.

## Border Radius Guidelines

Material Design uses subtle border radius:

```typescript
borderRadius: {
  sm: '4px',   // Small elements
  md: '8px',   // Medium elements (buttons, cards)
  lg: '12px',  // Large elements
}
```

## Complete Example

Here's a complete, well-structured theme following all guidelines:

```typescript
<KThemeProvider
  theme={{
    colors: {
      // Primary brand color - vibrant and distinctive
      primary: '#8b5cf6',
      
      // Secondary - lighter and complementary
      secondary: '#06b6d4',
      
      // Semantic colors - Material Design standard
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
    typography: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      fontSize: '16px',
      lineHeight: 1.6,
    },
    spacing: {
      xs: '4px',
      sm: '8px',
      md: '16px',
      lg: '24px',
      xl: '32px',
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

## Quick Reference Checklist

When creating a theme, ensure:

- ✅ Primary color is vibrant and distinctive
- ✅ Secondary color is **lighter** than primary
- ✅ Secondary color has luminance > 0.5 (for dark text)
- ✅ Colors maintain visual hierarchy
- ✅ Semantic colors follow Material Design standards
- ✅ Typography uses readable font sizes
- ✅ Spacing follows 8px grid system
- ✅ Border radius is subtle and consistent

## Testing Your Theme

After creating your theme:

1. **Visual Check**: Ensure buttons have good contrast
2. **Accessibility**: Verify text is readable on all backgrounds
3. **States**: Test hover, active, and disabled states
4. **Components**: Test with various components (buttons, inputs, modals)

## Additional Resources

- [Material Design Color System](https://m2.material.io/design/color/the-color-system.html)
- [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/WCAG21/quickref/)
- [Contrast Ratio Calculator](https://webaim.org/resources/contrastchecker/)


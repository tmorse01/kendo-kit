/**
 * Color utility functions for generating theme color variations
 * Replicates the behavior of k-generate-color-variations from Kendo SCSS
 */

/**
 * Converts a hex color to RGB values
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Converts RGB values to hex color
 */
function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => {
    const hex = Math.round(Math.max(0, Math.min(255, n))).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Lightens a color by a percentage (0-100)
 */
function lighten(color: string, percent: number): string {
  const rgb = hexToRgb(color);
  if (!rgb) return color;

  const factor = percent / 100;
  const r = rgb.r + (255 - rgb.r) * factor;
  const g = rgb.g + (255 - rgb.g) * factor;
  const b = rgb.b + (255 - rgb.b) * factor;

  return rgbToHex(r, g, b);
}

/**
 * Darkens a color by a percentage (0-100)
 */
function darken(color: string, percent: number): string {
  const rgb = hexToRgb(color);
  if (!rgb) return color;

  const factor = percent / 100;
  const r = rgb.r * (1 - factor);
  const g = rgb.g * (1 - factor);
  const b = rgb.b * (1 - factor);

  return rgbToHex(r, g, b);
}

/**
 * Adjusts the opacity of a color
 */
function opacity(color: string, alpha: number): string {
  const rgb = hexToRgb(color);
  if (!rgb) return color;

  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
}

/**
 * Generates color variations for a given base color
 * Replicates k-generate-color-variations behavior for Material theme
 *
 * @param colorName - The name of the color (e.g., 'primary', 'secondary')
 * @param baseColor - The base hex color (e.g., '#ff6358')
 * @returns An object with all color variations mapped to CSS variable names
 */
export function generateColorVariations(
  colorName: string,
  baseColor: string
): Record<string, string> {
  const variations: Record<string, string> = {};

  // Base color
  variations[`--kendo-color-${colorName}`] = baseColor;

  // Hover state - slightly lighter
  variations[`--kendo-color-${colorName}-hover`] = lighten(baseColor, 8);

  // Active/Pressed state - darker
  variations[`--kendo-color-${colorName}-active`] = darken(baseColor, 12);
  variations[`--kendo-color-${colorName}-pressed`] = darken(baseColor, 12);

  // Focus state - slightly lighter than hover
  variations[`--kendo-color-${colorName}-focus`] = lighten(baseColor, 12);

  // Selected state - slightly lighter
  variations[`--kendo-color-${colorName}-selected`] = lighten(baseColor, 5);

  // Disabled state - much lighter with reduced opacity
  variations[`--kendo-color-${colorName}-disabled`] = opacity(
    lighten(baseColor, 40),
    0.38
  );

  // Opacity variants (commonly used in Kendo)
  variations[`--kendo-color-${colorName}-50`] = opacity(baseColor, 0.05);
  variations[`--kendo-color-${colorName}-100`] = opacity(baseColor, 0.1);
  variations[`--kendo-color-${colorName}-200`] = opacity(baseColor, 0.2);
  variations[`--kendo-color-${colorName}-300`] = opacity(baseColor, 0.3);
  variations[`--kendo-color-${colorName}-400`] = opacity(baseColor, 0.4);
  variations[`--kendo-color-${colorName}-500`] = baseColor; // Base color
  variations[`--kendo-color-${colorName}-600`] = darken(baseColor, 10);
  variations[`--kendo-color-${colorName}-700`] = darken(baseColor, 20);
  variations[`--kendo-color-${colorName}-800`] = darken(baseColor, 30);
  variations[`--kendo-color-${colorName}-900`] = darken(baseColor, 40);

  // Text color variants (for contrast)
  // Determine if base color is light or dark
  const rgb = hexToRgb(baseColor);
  if (rgb) {
    const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
    variations[`--kendo-color-${colorName}-contrast`] =
      luminance > 0.5 ? '#000000' : '#ffffff';
  }

  return variations;
}


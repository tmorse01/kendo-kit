/**
 * Theme token types for KThemeProvider
 */

/**
 * Color tokens for theme customization
 */
export interface ColorTokens {
  /** Primary brand color */
  primary?: string;
  /** Secondary brand color */
  secondary?: string;
  /** Tertiary brand color */
  tertiary?: string;
  /** Base/neutral color */
  base?: string;
  /** Light color variant */
  light?: string;
  /** Dark color variant */
  dark?: string;
  /** Inverse color */
  inverse?: string;
  /** Info color */
  info?: string;
  /** Success color */
  success?: string;
  /** Warning color */
  warning?: string;
  /** Error/danger color */
  error?: string;
  /** Series A color (for charts) */
  seriesA?: string;
  /** Series B color (for charts) */
  seriesB?: string;
  /** Series C color (for charts) */
  seriesC?: string;
  /** Series D color (for charts) */
  seriesD?: string;
  /** Series E color (for charts) */
  seriesE?: string;
  /** Series F color (for charts) */
  seriesF?: string;
  /** Custom color tokens */
  [key: string]: string | undefined;
}

/**
 * Typography tokens for theme customization
 */
export interface TypographyTokens {
  /** Font family */
  fontFamily?: string;
  /** Base font size */
  fontSize?: string;
  /** Line height */
  lineHeight?: string | number;
  /** Font weight */
  fontWeight?: string | number;
}

/**
 * Spacing tokens for theme customization
 */
export interface SpacingTokens {
  /** Base spacing unit */
  base?: string;
  /** Extra small spacing */
  xs?: string;
  /** Small spacing */
  sm?: string;
  /** Medium spacing */
  md?: string;
  /** Large spacing */
  lg?: string;
  /** Extra large spacing */
  xl?: string;
}

/**
 * Border radius tokens for theme customization
 */
export interface BorderRadiusTokens {
  /** Small border radius */
  sm?: string;
  /** Medium border radius */
  md?: string;
  /** Large border radius */
  lg?: string;
}

/**
 * Complete theme tokens object
 */
export interface ThemeTokens {
  /** Color tokens */
  colors?: ColorTokens;
  /** Typography tokens */
  typography?: TypographyTokens;
  /** Spacing tokens */
  spacing?: SpacingTokens;
  /** Border radius tokens */
  borderRadius?: BorderRadiusTokens;
  /** Additional custom tokens */
  [key: string]: unknown;
}

/**
 * Theme context value
 */
export interface ThemeContextValue {
  /** Current theme tokens */
  theme: ThemeTokens;
}


import React from 'react';
import { Loader, LoaderProps } from '@progress/kendo-react-indicators';

export type KSpinnerSize = 'sm' | 'md' | 'lg';
export type KSpinnerThemeColor = 'primary' | 'secondary' | 'base';

export interface KSpinnerProps extends Omit<LoaderProps, 'size' | 'themeColor' | 'type'> {
  /**
   * Size of the spinner
   * @default 'md'
   */
  size?: KSpinnerSize;
  /**
   * Theme color of the spinner
   * @default 'primary'
   */
  themeColor?: KSpinnerThemeColor;
  /**
   * Whether to show overlay background
   * @default false
   */
  overlay?: boolean;
}

/**
 * KSpinner - A wrapper around KendoReact Loader with a consistent API
 *
 * @example
 * ```tsx
 * // Basic spinner
 * <KSpinner />
 *
 * // With overlay
 * <KSpinner overlay size="lg" />
 *
 * // Different colors
 * <KSpinner themeColor="secondary" size="sm" />
 * ```
 */
export function KSpinner(props: KSpinnerProps) {
  const {
    size = 'md',
    themeColor = 'primary',
    overlay = false,
    className,
    ...restProps
  } = props;

  // Map size to Kendo size
  const sizeMap: Record<KSpinnerSize, LoaderProps['size']> = {
    sm: 'small',
    md: 'medium',
    lg: 'large',
  };

  // Map themeColor to Kendo themeColor
  const themeColorMap: Record<KSpinnerThemeColor, LoaderProps['themeColor']> = {
    primary: 'primary',
    secondary: 'base',
    base: 'base',
  };

  const spinner = (
    <Loader
      size={sizeMap[size]}
      themeColor={themeColorMap[themeColor]}
      type="pulsing"
      className={className}
      {...restProps}
    />
  );

  if (overlay) {
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
        }}
      >
        {spinner}
      </div>
    );
  }

  return spinner;
}


import React from 'react';

export type KBadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error';
export type KBadgeSize = 'sm' | 'md' | 'lg';

export interface KBadgeProps {
  /**
   * Badge variant style
   * @default 'primary'
   */
  variant?: KBadgeVariant;
  /**
   * Badge size
   * @default 'md'
   */
  size?: KBadgeSize;
  /**
   * Badge content
   */
  children: React.ReactNode;
  /**
   * Additional CSS class name
   */
  className?: string;
  /**
   * Custom styles
   */
  style?: React.CSSProperties;
}

/**
 * KBadge - A simple badge component using Kendo styling patterns
 *
 * @example
 * ```tsx
 * <KBadge variant="primary">New</KBadge>
 * <KBadge variant="success" size="sm">5</KBadge>
 * <KBadge variant="error">Error</KBadge>
 * ```
 */
export function KBadge(props: KBadgeProps) {
  const {
    variant = 'primary',
    size = 'md',
    children,
    className,
    style,
  } = props;

  const sizeStyles: Record<KBadgeSize, React.CSSProperties> = {
    sm: {
      fontSize: '0.75rem',
      padding: '0.125rem 0.375rem',
      minWidth: '1rem',
      height: '1.25rem',
    },
    md: {
      fontSize: '0.875rem',
      padding: '0.25rem 0.5rem',
      minWidth: '1.5rem',
      height: '1.5rem',
    },
    lg: {
      fontSize: '1rem',
      padding: '0.375rem 0.75rem',
      minWidth: '2rem',
      height: '2rem',
    },
  };

  const variantStyles: Record<KBadgeVariant, React.CSSProperties> = {
    primary: {
      backgroundColor: 'var(--kendo-color-primary, #0078d4)',
      color: 'white',
    },
    secondary: {
      backgroundColor: 'var(--kendo-color-base-200, #e5e5e5)',
      color: 'var(--kendo-color-base-800, #333)',
    },
    success: {
      backgroundColor: 'var(--kendo-color-success, #107c10)',
      color: 'white',
    },
    warning: {
      backgroundColor: 'var(--kendo-color-warning, #ffaa44)',
      color: 'white',
    },
    error: {
      backgroundColor: 'var(--kendo-color-error, #d13438)',
      color: 'white',
    },
  };

  return (
    <span
      className={`k-badge k-badge-${variant} k-badge-${size} ${className || ''}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '0.25rem',
        fontWeight: 600,
        lineHeight: 1,
        ...sizeStyles[size],
        ...variantStyles[variant],
        ...style,
      }}
    >
      {children}
    </span>
  );
}


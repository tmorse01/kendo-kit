import React from 'react';

export interface KCardProps {
  /**
   * Card title
   */
  title?: React.ReactNode;
  /**
   * Card footer content
   */
  footer?: React.ReactNode;
  /**
   * Card content
   */
  children: React.ReactNode;
  /**
   * Whether the card has elevated shadow
   * @default false
   */
  elevated?: boolean;
  /**
   * Card padding
   * @default '1rem'
   */
  padding?: number | string;
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
 * KCard - A simple card container component using Kendo styling patterns
 *
 * @example
 * ```tsx
 * <KCard title="Card Title" footer={<button>Action</button>}>
 *   Card content goes here
 * </KCard>
 *
 * <KCard elevated padding="1.5rem">
 *   Elevated card with custom padding
 * </KCard>
 * ```
 */
export function KCard(props: KCardProps) {
  const {
    title,
    footer,
    children,
    elevated = false,
    padding = '1rem',
    className,
    style,
  } = props;

  const paddingValue = typeof padding === 'number' ? `${padding}px` : padding;

  return (
    <div
      className={`k-card ${elevated ? 'k-card-elevated' : ''} ${className || ''}`}
      style={{
        border: '1px solid var(--kendo-color-base-200, #e5e5e5)',
        borderRadius: '0.25rem',
        backgroundColor: 'var(--kendo-color-base-0, #fff)',
        boxShadow: elevated ? '0 2px 8px rgba(0, 0, 0, 0.1)' : 'none',
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}
    >
      {title && (
        <div
          className="k-card-title"
          style={{
            padding: paddingValue,
            paddingBottom: 0,
            borderBottom: title
              ? '1px solid var(--kendo-color-base-200, #e5e5e5)'
              : 'none',
            fontWeight: 600,
            fontSize: '1.125rem',
          }}
        >
          {title}
        </div>
      )}
      <div
        className="k-card-body"
        style={{
          padding: paddingValue,
          flex: 1,
        }}
      >
        {children}
      </div>
      {footer && (
        <div
          className="k-card-footer"
          style={{
            padding: paddingValue,
            borderTop: footer
              ? '1px solid var(--kendo-color-base-200, #e5e5e5)'
              : 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '0.5rem',
          }}
        >
          {footer}
        </div>
      )}
    </div>
  );
}

import React from 'react';
import {
  Button,
  ButtonProps,
  ButtonHandle,
} from '@progress/kendo-react-buttons';

export type KButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type KButtonSize = 'sm' | 'md' | 'lg';

export interface KButtonProps
  extends Omit<ButtonProps, 'themeColor' | 'size' | 'icon'> {
  /**
   * Button variant style
   * @default 'primary'
   */
  variant?: KButtonVariant;
  /**
   * Button size
   * @default 'md'
   */
  size?: KButtonSize;
  /**
   * Show loading state (disables button and shows spinner)
   */
  isLoading?: boolean;
  /**
   * Icon to display on the left side of the button
   */
  iconLeft?: React.ReactNode;
  /**
   * Icon to display on the right side of the button
   */
  iconRight?: React.ReactNode;
}

/**
 * KButton - A wrapper around KendoReact Button with a consistent API
 *
 * @example
 * ```tsx
 * <KButton variant="primary" size="md" onClick={handleClick}>
 *   Click me
 * </KButton>
 * ```
 */
export const KButton = React.forwardRef<ButtonHandle, KButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      iconLeft,
      iconRight,
      disabled,
      children,
      className,
      ...restProps
    },
    ref
  ) => {
    // Map variant to Kendo themeColor
    const themeColorMap: Record<KButtonVariant, ButtonProps['themeColor']> = {
      primary: 'primary',
      secondary: 'base',
      ghost: 'base',
      danger: 'error',
    };

    // Map size to Kendo size
    const sizeMap: Record<KButtonSize, ButtonProps['size']> = {
      sm: 'small',
      md: 'medium',
      lg: 'large',
    };

    // Build icon content
    const iconContent =
      iconLeft || iconRight ? (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          {iconLeft && <span>{iconLeft}</span>}
          {children && <span>{children}</span>}
          {iconRight && <span>{iconRight}</span>}
        </span>
      ) : (
        children
      );

    const themeColor = themeColorMap[variant];
    const buttonProps: ButtonProps = {
      size: sizeMap[size],
      fillMode: variant === 'ghost' ? 'flat' : 'solid',
      themeColor,
      disabled: disabled || isLoading,
      className,
      ...(isLoading && { 'aria-busy': true }),
      ...restProps,
    };

    return (
      <Button ref={ref} {...buttonProps}>
        {isLoading ? (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                width: '1em',
                height: '1em',
                border: '2px solid currentColor',
                borderTopColor: 'transparent',
                borderRadius: '50%',
                animation: 'spin 0.6s linear infinite',
              }}
              aria-hidden="true"
            />
            {children}
          </span>
        ) : (
          iconContent
        )}
      </Button>
    );
  }
);

KButton.displayName = 'KButton';

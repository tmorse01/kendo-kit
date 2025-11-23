import React from 'react';

export type KStackDirection = 'row' | 'column';
export type KStackAlign = 'start' | 'center' | 'end';
export type KStackJustify = 'start' | 'center' | 'end' | 'space-between';

export interface KStackProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Flex direction
   * @default 'row'
   */
  direction?: KStackDirection;
  /**
   * Gap between items (number in px or CSS string)
   * @default 0
   */
  gap?: number | string;
  /**
   * Cross-axis alignment (align-items)
   * @default 'start'
   */
  align?: KStackAlign;
  /**
   * Main-axis alignment (justify-content)
   * @default 'start'
   */
  justify?: KStackJustify;
  /**
   * Stack content
   */
  children: React.ReactNode;
}

/**
 * KStack - A simple flex stack layout helper
 *
 * @example
 * ```tsx
 * // Horizontal stack with gap
 * <KStack direction="row" gap={16}>
 *   <KButton>Button 1</KButton>
 *   <KButton>Button 2</KButton>
 * </KStack>
 *
 * // Vertical stack with alignment
 * <KStack direction="column" gap="1rem" align="center">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </KStack>
 * ```
 */
export const KStack = React.forwardRef<HTMLDivElement, KStackProps>(
  (
    {
      direction = 'row',
      gap = 0,
      align = 'start',
      justify = 'start',
      children,
      style,
      ...restProps
    },
    ref
  ) => {
    // Map align values to CSS align-items values
    const alignMap: Record<KStackAlign, string> = {
      start: 'flex-start',
      center: 'center',
      end: 'flex-end',
    };

    // Map justify values to CSS justify-content values
    const justifyMap: Record<KStackJustify, string> = {
      start: 'flex-start',
      center: 'center',
      end: 'flex-end',
      'space-between': 'space-between',
    };

    // Convert gap to CSS string
    const gapValue = typeof gap === 'number' ? `${gap}px` : gap;

    const stackStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: direction,
      gap: gapValue,
      alignItems: alignMap[align],
      justifyContent: justifyMap[justify],
      ...style,
    };

    return (
      <div ref={ref} style={stackStyle} {...restProps}>
        {children}
      </div>
    );
  }
);

KStack.displayName = 'KStack';


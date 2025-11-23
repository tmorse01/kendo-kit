import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { KStack } from '../src/components/Layout';

describe('KStack', () => {
  it('should render with default props', () => {
    const { container } = render(
      <KStack>
        <div>Item 1</div>
        <div>Item 2</div>
      </KStack>
    );
    const stack = container.firstChild as HTMLElement;
    expect(stack).toBeInTheDocument();
    expect(stack.style.display).toBe('flex');
    expect(stack.style.flexDirection).toBe('row');
  });

  it('should apply column direction', () => {
    const { container } = render(
      <KStack direction="column">
        <div>Item 1</div>
        <div>Item 2</div>
      </KStack>
    );
    const stack = container.firstChild as HTMLElement;
    expect(stack.style.flexDirection).toBe('column');
  });

  it('should apply gap as number (px)', () => {
    const { container } = render(
      <KStack gap={16}>
        <div>Item 1</div>
        <div>Item 2</div>
      </KStack>
    );
    const stack = container.firstChild as HTMLElement;
    expect(stack.style.gap).toBe('16px');
  });

  it('should apply gap as string', () => {
    const { container } = render(
      <KStack gap="1rem">
        <div>Item 1</div>
        <div>Item 2</div>
      </KStack>
    );
    const stack = container.firstChild as HTMLElement;
    expect(stack.style.gap).toBe('1rem');
  });

  it('should apply align prop', () => {
    const { container, rerender } = render(
      <KStack align="start">
        <div>Item 1</div>
      </KStack>
    );
    let stack = container.firstChild as HTMLElement;
    expect(stack.style.alignItems).toBe('flex-start');

    rerender(
      <KStack align="center">
        <div>Item 1</div>
      </KStack>
    );
    stack = container.firstChild as HTMLElement;
    expect(stack.style.alignItems).toBe('center');

    rerender(
      <KStack align="end">
        <div>Item 1</div>
      </KStack>
    );
    stack = container.firstChild as HTMLElement;
    expect(stack.style.alignItems).toBe('flex-end');
  });

  it('should apply justify prop', () => {
    const { container, rerender } = render(
      <KStack justify="start">
        <div>Item 1</div>
      </KStack>
    );
    let stack = container.firstChild as HTMLElement;
    expect(stack.style.justifyContent).toBe('flex-start');

    rerender(
      <KStack justify="center">
        <div>Item 1</div>
      </KStack>
    );
    stack = container.firstChild as HTMLElement;
    expect(stack.style.justifyContent).toBe('center');

    rerender(
      <KStack justify="end">
        <div>Item 1</div>
      </KStack>
    );
    stack = container.firstChild as HTMLElement;
    expect(stack.style.justifyContent).toBe('flex-end');

    rerender(
      <KStack justify="space-between">
        <div>Item 1</div>
      </KStack>
    );
    stack = container.firstChild as HTMLElement;
    expect(stack.style.justifyContent).toBe('space-between');
  });

  it('should render snapshot', () => {
    const { container } = render(
      <KStack direction="column" gap={16} align="center" justify="space-between">
        <div>Item 1</div>
        <div>Item 2</div>
      </KStack>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should forward ref', () => {
    const ref = { current: null };
    render(
      <KStack ref={ref}>
        <div>Item 1</div>
      </KStack>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('should merge custom styles', () => {
    const { container } = render(
      <KStack style={{ backgroundColor: 'red' }}>
        <div>Item 1</div>
      </KStack>
    );
    const stack = container.firstChild as HTMLElement;
    expect(stack.style.backgroundColor).toBe('red');
    expect(stack.style.display).toBe('flex');
  });
});


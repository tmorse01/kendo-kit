import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { KSpinner } from '../src/components/Feedback/KSpinner';

describe('KSpinner', () => {
  it('should render', () => {
    const { container } = render(<KSpinner />);
    const spinner = container.querySelector('.k-loader');
    expect(spinner).toBeInTheDocument();
  });

  it('should render with overlay', () => {
    const { container } = render(<KSpinner overlay />);
    const overlay = container.querySelector('div[style*="position: fixed"]');
    expect(overlay).toBeInTheDocument();
  });

  it('should render without overlay by default', () => {
    const { container } = render(<KSpinner />);
    const overlay = container.querySelector('div[style*="position: fixed"]');
    expect(overlay).not.toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const { container } = render(<KSpinner className="custom-spinner" />);
    const spinner = container.querySelector('.custom-spinner');
    expect(spinner).toBeInTheDocument();
  });
});


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

  it('should render snapshot', () => {
    const { container } = render(<KSpinner />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render with different sizes', () => {
    const { container: sm } = render(<KSpinner size="sm" />);
    expect(sm.querySelector('.k-loader')).toBeInTheDocument();

    const { container: md } = render(<KSpinner size="md" />);
    expect(md.querySelector('.k-loader')).toBeInTheDocument();

    const { container: lg } = render(<KSpinner size="lg" />);
    expect(lg.querySelector('.k-loader')).toBeInTheDocument();
  });

  it('should render with different theme colors', () => {
    const { container: primary } = render(<KSpinner themeColor="primary" />);
    expect(primary.querySelector('.k-loader')).toBeInTheDocument();

    const { container: secondary } = render(<KSpinner themeColor="secondary" />);
    expect(secondary.querySelector('.k-loader')).toBeInTheDocument();
  });

  it('should render overlay with correct styles', () => {
    const { container } = render(<KSpinner overlay />);
    const overlay = container.querySelector('div[style*="position: fixed"]');
    expect(overlay).toBeInTheDocument();
    expect(overlay).toHaveStyle({ zIndex: '9999' });
  });
});


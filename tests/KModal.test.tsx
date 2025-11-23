import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { KModal } from '../src/components/Modal';

describe('KModal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    children: 'Modal content',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render when isOpen is true', () => {
    render(<KModal {...defaultProps} />);
    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });

  it('should not render when isOpen is false', () => {
    render(<KModal {...defaultProps} isOpen={false} />);
    expect(screen.queryByText('Modal content')).not.toBeInTheDocument();
  });

  it('should render title when provided', () => {
    render(<KModal {...defaultProps} title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('should render footer when provided', () => {
    render(<KModal {...defaultProps} footer={<button>Close</button>} />);
    expect(screen.getByText('Close')).toBeInTheDocument();
  });

  it('should call onClose when ESC key is pressed', async () => {
    const onClose = vi.fn();
    render(<KModal {...defaultProps} onClose={onClose} closeOnEscape={true} />);

    await userEvent.keyboard('{Escape}');

    await waitFor(() => {
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  it('should not call onClose when ESC key is pressed if closeOnEscape is false', async () => {
    const onClose = vi.fn();
    render(<KModal {...defaultProps} onClose={onClose} closeOnEscape={false} />);

    await userEvent.keyboard('{Escape}');

    await waitFor(() => {
      expect(onClose).not.toHaveBeenCalled();
    });
  });

  it('should render with different sizes', () => {
    const { rerender } = render(<KModal {...defaultProps} size="sm" />);
    expect(screen.getByText('Modal content')).toBeInTheDocument();

    rerender(<KModal {...defaultProps} size="md" />);
    expect(screen.getByText('Modal content')).toBeInTheDocument();

    rerender(<KModal {...defaultProps} size="lg" />);
    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });

  it('should render snapshot', () => {
    const { container } = render(<KModal {...defaultProps} title="Test" />);
    expect(container.firstChild).toMatchSnapshot();
  });
});


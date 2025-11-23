import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { KBadge } from '../src/components/DataDisplay/KBadge';
import { KCard } from '../src/components/DataDisplay/KCard';

describe('KBadge', () => {
  it('should render with children', () => {
    render(<KBadge>5</KBadge>);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('should render with default variant', () => {
    const { container } = render(<KBadge>Badge</KBadge>);
    const badge = container.querySelector('.k-badge-primary');
    expect(badge).toBeInTheDocument();
  });

  it('should render with different variants', () => {
    const { container: container1 } = render(<KBadge variant="success">Success</KBadge>);
    expect(container1.querySelector('.k-badge-success')).toBeInTheDocument();

    const { container: container2 } = render(<KBadge variant="error">Error</KBadge>);
    expect(container2.querySelector('.k-badge-error')).toBeInTheDocument();
  });

  it('should render with different sizes', () => {
    const { container: container1 } = render(<KBadge size="sm">Small</KBadge>);
    expect(container1.querySelector('.k-badge-sm')).toBeInTheDocument();

    const { container: container2 } = render(<KBadge size="lg">Large</KBadge>);
    expect(container2.querySelector('.k-badge-lg')).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const { container } = render(<KBadge className="custom-badge">Badge</KBadge>);
    const badge = container.querySelector('.custom-badge');
    expect(badge).toBeInTheDocument();
  });
});

describe('KCard', () => {
  it('should render with children', () => {
    render(<KCard>Card content</KCard>);
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('should render with title', () => {
    render(<KCard title="Card Title">Content</KCard>);
    expect(screen.getByText('Card Title')).toBeInTheDocument();
  });

  it('should render with footer', () => {
    render(<KCard footer={<button>Action</button>}>Content</KCard>);
    expect(screen.getByRole('button', { name: /Action/i })).toBeInTheDocument();
  });

  it('should render with title and footer', () => {
    render(
      <KCard title="Title" footer={<button>Action</button>}>
        Content
      </KCard>
    );
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Action/i })).toBeInTheDocument();
  });

  it('should render elevated card', () => {
    const { container } = render(<KCard elevated>Content</KCard>);
    const card = container.querySelector('.k-card-elevated');
    expect(card).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const { container } = render(<KCard className="custom-card">Content</KCard>);
    const card = container.querySelector('.custom-card');
    expect(card).toBeInTheDocument();
  });

  it('should render snapshot', () => {
    const { container } = render(<KCard>Card content</KCard>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should apply custom padding', () => {
    const { container } = render(<KCard padding="2rem">Content</KCard>);
    const body = container.querySelector('.k-card-body');
    expect(body).toHaveStyle({ padding: '2rem' });
  });

  it('should render with only title', () => {
    render(<KCard title="Title only">Content</KCard>);
    expect(screen.getByText('Title only')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('should render with only footer', () => {
    render(<KCard footer={<button>Footer</button>}>Content</KCard>);
    expect(screen.getByRole('button', { name: /Footer/i })).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });
});

describe('KBadge', () => {
  it('should render snapshot', () => {
    const { container } = render(<KBadge>Badge</KBadge>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should apply custom style', () => {
    const { container } = render(
      <KBadge style={{ marginTop: '10px' }}>Badge</KBadge>
    );
    const badge = container.querySelector('.k-badge');
    expect(badge).toHaveStyle({ marginTop: '10px' });
  });

  it('should render with all variants', () => {
    const variants: Array<'primary' | 'secondary' | 'success' | 'warning' | 'error'> = [
      'primary',
      'secondary',
      'success',
      'warning',
      'error',
    ];
    variants.forEach((variant) => {
      const { container } = render(<KBadge variant={variant}>Badge</KBadge>);
      expect(container.querySelector(`.k-badge-${variant}`)).toBeInTheDocument();
    });
  });

  it('should render with all sizes', () => {
    const sizes: Array<'sm' | 'md' | 'lg'> = ['sm', 'md', 'lg'];
    sizes.forEach((size) => {
      const { container } = render(<KBadge size={size}>Badge</KBadge>);
      expect(container.querySelector(`.k-badge-${size}`)).toBeInTheDocument();
    });
  });
});


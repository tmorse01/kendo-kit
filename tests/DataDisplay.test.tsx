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
});


import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { KModal } from '../components/Modal';
import { KButton } from '../components/Button';

const meta: Meta<typeof KModal> = {
  title: 'Components/KModal',
  component: KModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Whether the modal is open',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Modal size',
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Close modal on ESC key press',
    },
    closeOnOverlayClick: {
      control: 'boolean',
      description: 'Close modal on overlay click',
    },
    title: {
      control: 'text',
      description: 'Modal title',
    },
    footer: {
      control: false,
      description: 'Footer content',
    },
  },
};

export default meta;
type Story = StoryObj<typeof KModal>;

// Helper component for interactive stories
const ModalWrapper = ({ children, ...props }: React.ComponentProps<typeof KModal>) => {
  const [isOpen, setIsOpen] = useState(props.isOpen ?? false);
  return (
    <>
      <KButton onClick={() => setIsOpen(true)}>Open Modal</KButton>
      <KModal {...props} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {children}
      </KModal>
    </>
  );
};

export const Default: Story = {
  render: () => (
    <ModalWrapper title="Default Modal">
      This is a default modal with some content. You can close it by clicking the X button, pressing ESC, or clicking the overlay.
    </ModalWrapper>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <ModalWrapper
      title="Modal with Footer"
      footer={
        <>
          <KButton variant="secondary" onClick={() => {}}>
            Cancel
          </KButton>
          <KButton variant="primary" onClick={() => {}}>
            Confirm
          </KButton>
        </>
      }
    >
      This modal has a footer with action buttons.
    </ModalWrapper>
  ),
};

export const Sizes: Story = {
  render: () => {
    const [openSize, setOpenSize] = useState<'sm' | 'md' | 'lg' | null>(null);
    return (
      <>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <KButton onClick={() => setOpenSize('sm')}>Small Modal</KButton>
          <KButton onClick={() => setOpenSize('md')}>Medium Modal</KButton>
          <KButton onClick={() => setOpenSize('lg')}>Large Modal</KButton>
        </div>
        <KModal
          isOpen={openSize === 'sm'}
          onClose={() => setOpenSize(null)}
          title="Small Modal"
          size="sm"
        >
          This is a small modal (400px width).
        </KModal>
        <KModal
          isOpen={openSize === 'md'}
          onClose={() => setOpenSize(null)}
          title="Medium Modal"
          size="md"
        >
          This is a medium modal (600px width).
        </KModal>
        <KModal
          isOpen={openSize === 'lg'}
          onClose={() => setOpenSize(null)}
          title="Large Modal"
          size="lg"
        >
          This is a large modal (800px width).
        </KModal>
      </>
    );
  },
};

export const ConfirmDialog: Story = {
  render: () => (
    <ModalWrapper
      title="Confirm Action"
      footer={
        <>
          <KButton variant="secondary" onClick={() => {}}>
            Cancel
          </KButton>
          <KButton variant="danger" onClick={() => {}}>
            Delete
          </KButton>
        </>
      }
    >
      Are you sure you want to delete this item? This action cannot be undone.
    </ModalWrapper>
  ),
};

export const WithoutTitle: Story = {
  render: () => (
    <ModalWrapper footer={<KButton onClick={() => {}}>Close</KButton>}>
      This modal has no title, just content and a footer.
    </ModalWrapper>
  ),
};

export const NoEscapeClose: Story = {
  render: () => (
    <ModalWrapper title="No ESC Close" closeOnEscape={false}>
      This modal cannot be closed with the ESC key. You must use the close button or overlay click.
    </ModalWrapper>
  ),
};

export const NoOverlayClose: Story = {
  render: () => (
    <ModalWrapper title="No Overlay Close" closeOnOverlayClick={false}>
      This modal cannot be closed by clicking the overlay. You must use the close button or ESC key.
    </ModalWrapper>
  ),
};


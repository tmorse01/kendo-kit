import React, { useEffect } from 'react';
import { Dialog, DialogProps } from '@progress/kendo-react-dialogs';

export type KModalSize = 'sm' | 'md' | 'lg';

export interface KModalProps extends Omit<DialogProps, 'title' | 'width'> {
  /**
   * Whether the modal is open
   */
  isOpen: boolean;
  /**
   * Callback fired when the modal requests to be closed
   */
  onClose: () => void;
  /**
   * Modal title (rendered in header)
   */
  title?: string | React.ReactElement;
  /**
   * Modal content
   */
  children: React.ReactNode;
  /**
   * Footer content (e.g., action buttons)
   */
  footer?: React.ReactNode;
  /**
   * Modal size
   * @default 'md'
   */
  size?: KModalSize;
  /**
   * Whether to close modal on ESC key press
   * @default true
   */
  closeOnEscape?: boolean;
  /**
   * Whether to close modal on overlay click
   * @default true
   */
  closeOnOverlayClick?: boolean;
}

/**
 * KModal - A wrapper around KendoReact Dialog with a consistent API
 *
 * @example
 * ```tsx
 * const [isOpen, setIsOpen] = useState(false);
 *
 * <KModal
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="Confirm Action"
 *   footer={
 *     <>
 *       <KButton onClick={() => setIsOpen(false)}>Cancel</KButton>
 *       <KButton variant="primary" onClick={handleConfirm}>Confirm</KButton>
 *     </>
 *   }
 * >
 *   Are you sure you want to proceed?
 * </KModal>
 * ```
 */
export const KModal: React.FC<KModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  closeOnEscape = true,
  closeOnOverlayClick = true,
  className,
  ...restProps
}) => {
  // Handle ESC key press
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, closeOnEscape, onClose]);

  // Map size to width
  const widthMap: Record<KModalSize, string> = {
    sm: '400px',
    md: '600px',
    lg: '800px',
  };

  // Handle overlay close - Kendo Dialog calls onClose for overlay clicks
  // We control this via closeOnOverlayClick prop by conditionally calling onClose
  const handleDialogClose = closeOnOverlayClick ? onClose : () => {};

  if (!isOpen) {
    return null;
  }

  return (
    <Dialog
      title={title}
      width={widthMap[size]}
      onClose={handleDialogClose}
      className={className}
      {...restProps}
    >
      <div style={{ padding: '1rem 0' }}>{children}</div>
      {footer && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '0.5rem',
            paddingTop: '1rem',
            borderTop: '1px solid #e0e0e0',
            marginTop: '1rem',
          }}
        >
          {footer}
        </div>
      )}
    </Dialog>
  );
};

KModal.displayName = 'KModal';


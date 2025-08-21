import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from '../../src/components/Modal/Modal';
import type { Mock } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { createPortal } from 'react-dom';

vi.mock('../../src/components/Button/Button', () => ({
  Button: vi.fn(({ onClick, children, className }) => (
    <button data-testid="close-button" onClick={onClick} className={className}>
      {children}
    </button>
  )) as Mock,
}));

vi.mock('react-dom', () => ({
  createPortal: vi.fn((children) => children),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe('Modal', () => {
  it('renders modal', () => {
    const onClose = vi.fn();
    const children = <div data-testid="modal-content">Modal Content</div>;

    render(<Modal onClose={onClose}>{children}</Modal>);

    expect(screen.getByTestId('modal-content')).toBeInTheDocument();
    expect(screen.getByTestId('close-button')).toBeInTheDocument();
  });

  it('calls onClose', () => {
    const onClose = vi.fn();
    const children = <div>Modal Content</div>;

    render(<Modal onClose={onClose}>{children}</Modal>);

    const overlay =
      screen.getByText('Modal Content').parentElement?.parentElement;
    if (overlay) {
      fireEvent.click(overlay);
    }

    expect(onClose).toHaveBeenCalled();
  });

  it('calls onClose when click button', () => {
    const onClose = vi.fn();
    const children = <div>Modal Content</div>;

    render(<Modal onClose={onClose}>{children}</Modal>);

    fireEvent.click(screen.getByTestId('close-button'));

    expect(onClose).toHaveBeenCalled();
  });

  it('calls onClose when pressing Esc', () => {
    const onClose = vi.fn();
    const children = <div>Modal Content</div>;

    render(<Modal onClose={onClose}>{children}</Modal>);

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(onClose).toHaveBeenCalled();
  });

  it('does not call onClose', () => {
    const onClose = vi.fn();
    const children = <div>Modal Content</div>;

    render(<Modal onClose={onClose}>{children}</Modal>);

    fireEvent.keyDown(document, { key: 'Enter' });

    expect(onClose).not.toHaveBeenCalled();
  });

  it('cleans up eventListener', () => {
    const onClose = vi.fn();
    const children = <div>Modal Content</div>;

    const { unmount } = render(<Modal onClose={onClose}>{children}</Modal>);

    const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'keydown',
      expect.any(Function)
    );
  });

  it('uses createPortal', () => {
    const onClose = vi.fn();
    const children = <div data-testid="modal-content">Modal Content</div>;

    render(<Modal onClose={onClose}>{children}</Modal>);

    expect(vi.mocked(createPortal)).toHaveBeenCalledWith(
      expect.anything(),
      document.body
    );
  });
});

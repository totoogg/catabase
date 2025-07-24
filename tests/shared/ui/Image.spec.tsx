import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { AppImage } from '../../../src/shared/ui/Image/Image';

vi.mock('../../../src/shared/assets/icons/imgError.svg', () => ({
  default: () => <svg data-testid="error-icon" />,
}));

vi.mock('../../../src/ui/Skeleton/Skeleton', () => ({
  Skeleton: () => <div data-testid="skeleton">Skeleton</div>,
}));

afterEach(() => {
  vi.clearAllMocks();
  vi.restoreAllMocks();
});

describe('AppImage', () => {
  it('show skeleton', () => {
    render(<AppImage src="test.jpg" alt="Test" height="100" />);

    expect(screen.queryByTestId('skeleton')).not.toBeInTheDocument();
    expect(screen.queryByAltText('Test')).not.toBeInTheDocument();
    expect(screen.queryByTestId('error-icon')).not.toBeInTheDocument();
  });

  it('show error image', async () => {
    let errorHandler: (() => void) | null = null;

    global.Image = vi.fn().mockImplementation(() => ({
      set onerror(fn: () => void) {
        errorHandler = fn;
      },
      get onerror() {
        return errorHandler || vi.fn();
      },
      src: '',
    }));

    render(<AppImage src="asd" alt="error" height="100" />);

    await act(async () => {
      errorHandler?.();
    });

    expect(screen.getByTestId('error-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('skeleton')).not.toBeInTheDocument();
    expect(screen.queryByAltText('error')).not.toBeInTheDocument();
  });

  it('show image', async () => {
    let loadHandler: (() => void) | null = null;

    global.Image = vi.fn().mockImplementation(() => ({
      set onload(fn: () => void) {
        loadHandler = fn;
      },
      get onload() {
        return loadHandler || vi.fn();
      },
      src: '',
    }));

    render(<AppImage src="asd" alt="success" height="100" />);

    await act(async () => {
      loadHandler?.();
    });

    const img = screen.getByAltText('success');

    expect(img).toHaveAttribute('src', 'asd');
    expect(img).toHaveAttribute('height', '100');
    expect(screen.queryByTestId('skeleton')).not.toBeInTheDocument();
    expect(screen.queryByTestId('error-icon')).not.toBeInTheDocument();
  });
});

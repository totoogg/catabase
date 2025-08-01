import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ChooseCard } from '../../src/widgets/ChooseCard/ui/ChooseCard';
import * as sharedModule from '../../src/shared';
import * as entitiesModule from '../../src/entities';

vi.mock('@/features', () => ({
  Download: vi.fn(({ data }) => (
    <div data-testid="download">{JSON.stringify(data)}</div>
  )),
}));

vi.mock('@/entities', () => ({
  Choose: vi.fn(() => <div data-testid="choose" />),
  selectCountChoose: vi.fn(),
  selectChoose: vi.fn(),
  removeAll: vi.fn().mockReturnValue({ type: 'REMOVE_ALL' }),
}));

const mockDispatch = vi.fn();

const mockChoose = {
  1: { id: 1, name: 'Card 1' },
  2: { id: 2, name: 'Card 2' },
};

beforeEach(() => {
  vi.clearAllMocks();
  vi.spyOn(sharedModule, 'useAppDispatch').mockReturnValue(mockDispatch);
  vi.spyOn(sharedModule, 'useAppSelector').mockImplementation((selector) => {
    if (selector === entitiesModule.selectCountChoose)
      return Object.keys(mockChoose).length;
    if (selector === entitiesModule.selectChoose) return mockChoose;
    return undefined;
  });
});

describe('ChooseCard', () => {
  it('do not render', () => {
    vi.spyOn(sharedModule, 'useAppSelector').mockImplementation((selector) => {
      if (selector === entitiesModule.selectCountChoose) return 0;
      return undefined;
    });

    const { container } = render(<ChooseCard />);

    expect(container).toBeEmptyDOMElement();
  });

  it('correct render', () => {
    render(<ChooseCard />);

    expect(screen.getByTestId('choose')).toBeInTheDocument();
    expect(screen.getByText('Unselect all')).toBeInTheDocument();
    expect(screen.getByTestId('download')).toBeInTheDocument();

    const downloadComponent = screen.getByTestId('download');

    expect(downloadComponent).toHaveTextContent(
      JSON.stringify(Object.values(mockChoose))
    );
  });

  it('call removeAll', () => {
    render(<ChooseCard />);

    const button = screen.getByText('Unselect all');
    fireEvent.click(button);

    expect(mockDispatch).toHaveBeenCalledWith(entitiesModule.removeAll());
    expect(entitiesModule.removeAll).toHaveBeenCalled();
  });

  it('show correct cards', () => {
    const newCount = 3;
    const newChoose = {
      ...mockChoose,
      3: { id: 3, name: 'Card 3' },
    };

    vi.spyOn(sharedModule, 'useAppSelector').mockImplementation((selector) => {
      if (selector === entitiesModule.selectCountChoose) return newCount;
      if (selector === entitiesModule.selectChoose) return newChoose;
      return undefined;
    });

    render(<ChooseCard />);

    const downloadComponent = screen.getByTestId('download');

    expect(downloadComponent).toHaveTextContent(
      JSON.stringify(Object.values(newChoose))
    );
  });
});

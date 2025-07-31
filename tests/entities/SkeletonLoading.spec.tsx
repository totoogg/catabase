import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SkeletonLoading } from '../../src/entities/CardId/ui/SkeletonLoading';
import '@testing-library/jest-dom';

describe('SkeletonLoading', () => {
  it('renders SkeletonLoading', () => {
    const { container } = render(<SkeletonLoading />);

    const skeletons = container.querySelectorAll('div[class*="skeleton"]');
    const card = container.querySelector('div[class*="cardBlock"]');
    const content = container.querySelector('div[class*="content"]');

    expect(card).toBeInTheDocument();
    expect(content).toBeInTheDocument();
    expect(skeletons).toHaveLength(13);
  });
});

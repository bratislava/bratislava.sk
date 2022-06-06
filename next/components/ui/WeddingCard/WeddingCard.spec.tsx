import { render } from '@testing-library/react';

import WeddingCard from './WeddingCard';

describe('WeddingCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WeddingCard />);
    expect(baseElement).toBeTruthy();
  });
});

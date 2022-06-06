import { render } from '@testing-library/react';

import PrimatorCard from './PrimatorCard';

describe('PrimatorCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PrimatorCard />);
    expect(baseElement).toBeTruthy();
  });
});

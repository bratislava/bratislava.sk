import { render } from '@testing-library/react';

import VerticalCard from './VerticalCard';

describe('VerticalCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<VerticalCard />);
    expect(baseElement).toBeTruthy();
  });
});

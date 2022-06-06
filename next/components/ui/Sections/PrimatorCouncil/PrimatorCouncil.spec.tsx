import { render } from '@testing-library/react';

import PrimatorCouncil from './PrimatorCouncil';

describe('PrimatorCouncil', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PrimatorCouncil />);
    expect(baseElement).toBeTruthy();
  });
});

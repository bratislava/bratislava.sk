import { render } from '@testing-library/react';

import RentAccordion from './RentAccordion';

describe('RentAccordion', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RentAccordion />);
    expect(baseElement).toBeTruthy();
  });
});

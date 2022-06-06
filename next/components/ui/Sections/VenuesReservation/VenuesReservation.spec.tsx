import { render } from '@testing-library/react';

import VenuesReservation from './VenuesReservation';

describe('VenuesReservation', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<VenuesReservation />);
    expect(baseElement).toBeTruthy();
  });
});

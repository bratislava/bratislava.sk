import { render } from '@testing-library/react';

import VenueInfo from './VenueInfo';

describe('VenueInfo', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<VenueInfo />);
    expect(baseElement).toBeTruthy();
  });
});

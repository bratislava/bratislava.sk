import { render } from '@testing-library/react';

import { Venue } from './Venue';

describe('Space', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Venue />);
    expect(baseElement).toBeTruthy();
  });
});

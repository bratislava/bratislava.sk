import { render } from '@testing-library/react';

import ContactCard from './ContactCard';

describe('ContactCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ContactCard />);
    expect(baseElement).toBeTruthy();
  });
});

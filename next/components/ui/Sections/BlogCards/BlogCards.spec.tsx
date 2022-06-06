import { render } from '@testing-library/react';

import BlogCards from './BlogCards';

describe('BlogCards', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BlogCards />);
    expect(baseElement).toBeTruthy();
  });
});

import { render } from '@testing-library/react';

import { Bookmarks } from './Bookmarks';

describe('Bookmarks', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Bookmarks />);
    expect(baseElement).toBeTruthy();
  });
});

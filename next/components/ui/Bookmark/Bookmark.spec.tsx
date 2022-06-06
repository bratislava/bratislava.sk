import { render } from '@testing-library/react';

import { Bookmark } from './Bookmark';

describe('Bookmark', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Bookmark />);
    expect(baseElement).toBeTruthy();
  });
});

import { render } from '@testing-library/react';

import Tag from './Tag';

describe('Tag', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Tag />);
    expect(baseElement).toBeTruthy();
  });
});

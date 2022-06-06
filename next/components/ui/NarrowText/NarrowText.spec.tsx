import { render } from '@testing-library/react';

import NarrowText from './NarrowText';

describe('NarrowText', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NarrowText />);
    expect(baseElement).toBeTruthy();
  });
});

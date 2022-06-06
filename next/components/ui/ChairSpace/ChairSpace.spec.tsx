import { render } from '@testing-library/react';

import ChairSpace from './ChairSpace';

describe('ChairSpace', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChairSpace />);
    expect(baseElement).toBeTruthy();
  });
});

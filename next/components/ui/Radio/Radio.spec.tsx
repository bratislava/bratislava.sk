import { render } from '@testing-library/react';

import Radio from './Radio';

describe('Radio', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Radio />);
    expect(baseElement).toBeTruthy();
  });
});

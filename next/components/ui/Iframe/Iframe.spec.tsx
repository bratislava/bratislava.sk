import { render } from '@testing-library/react';

import { Iframe } from './Iframe';

describe('Iframe', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Iframe />);
    expect(baseElement).toBeTruthy();
  });
});

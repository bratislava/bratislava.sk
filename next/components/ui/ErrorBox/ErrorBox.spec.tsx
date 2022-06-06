import { render } from '@testing-library/react';

import { ErrorBox } from './ErrorBox';

describe('ErrorBox', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ErrorBox />);
    expect(baseElement).toBeTruthy();
  });
});

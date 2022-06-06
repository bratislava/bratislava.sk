import { render } from '@testing-library/react';

import TabBar from './TabBar';

describe('TabBar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TabBar />);
    expect(baseElement).toBeTruthy();
  });
});

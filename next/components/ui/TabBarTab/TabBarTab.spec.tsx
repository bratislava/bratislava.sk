import { render } from '@testing-library/react';

import TabBarTab from './TabBarTab';

describe('TabBarTab', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TabBarTab />);
    expect(baseElement).toBeTruthy();
  });
});

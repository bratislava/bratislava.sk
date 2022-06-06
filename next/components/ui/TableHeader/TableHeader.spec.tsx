import { render } from '@testing-library/react';

import TableHeader from './TableHeader';

describe('TableHeader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TableHeader />);
    expect(baseElement).toBeTruthy();
  });
});

import { render } from '@testing-library/react';

import TestCard from './TestCard';

describe('TestCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TestCard title="title" text="text" />);
    expect(baseElement).toBeTruthy();
  });
});

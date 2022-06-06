import { render } from '@testing-library/react';

import { SectionContainer } from './SectionContainer';

describe('SectionContainer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SectionContainer />);
    expect(baseElement).toBeTruthy();
  });
});

import { render } from '@testing-library/react';

import TopNineSection from './TopNineSection';

describe('TopNineSection', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TopNineSection />);
    expect(baseElement).toBeTruthy();
  });
});

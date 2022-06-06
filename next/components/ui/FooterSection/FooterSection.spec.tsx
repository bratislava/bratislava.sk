import { render } from '@testing-library/react';

import FooterSection from './FooterSection';

describe('FooterSection', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FooterSection />);
    expect(baseElement).toBeTruthy();
  });
});

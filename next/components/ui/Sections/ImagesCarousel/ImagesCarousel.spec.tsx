import { render } from '@testing-library/react';

import ImagesCarousel from './ImagesCarousel';

describe('ImagesCarousel', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ImagesCarousel />);
    expect(baseElement).toBeTruthy();
  });
});

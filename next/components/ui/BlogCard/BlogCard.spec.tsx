import { render } from '@testing-library/react';

import BlogCard from './BlogCard';

describe('BlogCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BlogCard />);
    expect(baseElement).toBeTruthy();
  });
});

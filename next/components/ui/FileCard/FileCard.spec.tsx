import { render } from '@testing-library/react';

import FileCard from './FileCard';

describe('FileCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FileCard />);
    expect(baseElement).toBeTruthy();
  });
});

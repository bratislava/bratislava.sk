import { render } from '@testing-library/react';

import DownloadCard from './DownloadCard';

describe('DownloadCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DownloadCard />);
    expect(baseElement).toBeTruthy();
  });
});

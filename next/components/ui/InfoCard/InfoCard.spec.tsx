import { render } from '@testing-library/react';

import InfoCard from './InfoCard';

describe('SwimmingPoolInfoCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<InfoCard />);
    expect(baseElement).toBeTruthy();
  });
});

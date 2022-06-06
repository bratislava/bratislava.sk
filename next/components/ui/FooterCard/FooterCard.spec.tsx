import { render } from '@testing-library/react';

import SummaryCard from './FooterCard';

describe('SummaryCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SummaryCard />);
    expect(baseElement).toBeTruthy();
  });
});

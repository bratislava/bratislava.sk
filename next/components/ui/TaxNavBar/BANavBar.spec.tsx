import { render } from '@testing-library/react';
import { TaxNavBar } from './TaxNavBar';

describe('TaxNavBar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TaxNavBar />);

    expect(baseElement).toBeTruthy();
  });
});

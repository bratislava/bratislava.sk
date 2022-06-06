import { render } from '@testing-library/react';
import { BANavBar } from './BANavBar';

describe('BANavBar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BANavBar />);

    expect(baseElement).toBeTruthy();
  });
});

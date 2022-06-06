import { render } from '@testing-library/react';

import { TopNine } from './TopNine';

describe('TopNine', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TopNine />);
    expect(baseElement).toBeTruthy();
  });
});

import { render } from '@testing-library/react';

import ProfilePhoto from './ProfilePhoto';

describe('ProfilePhoto', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ProfilePhoto />);
    expect(baseElement).toBeTruthy();
  });
});

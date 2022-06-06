import { render } from '@testing-library/react';

import DateSelect from './DateSelect';

describe('DateSelect', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DateSelect />);
    expect(baseElement).toBeTruthy();
  });
});

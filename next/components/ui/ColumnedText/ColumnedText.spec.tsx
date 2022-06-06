import { render } from '@testing-library/react';

import ColumnedText from './ColumnedText';

describe('ColumnedText', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ColumnedText />);
    expect(baseElement).toBeTruthy();
  });
});
